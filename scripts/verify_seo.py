#!/usr/bin/env python3
"""驗證 canonical / hreflang / sitemap / robots.txt 四者互相一致。

    python3 scripts/verify_seo.py           # 靜態檢查(不連網)
    python3 scripts/verify_seo.py --live    # 另外檢查線上是否已部署且回應正確

**為什麼需要這支程式**:hreflang 與 robots 有個共同的惡劣特性——設錯時 Google
不會報錯,只會靜靜忽略。你不會看到紅字,只會看到中文版莫名其妙沒有流量。
所以這裡的每條規則都要機器斷言,不能靠人眼比對四個檔案。

最容易踩到的兩個陷阱,都在下面被斷言:
  1. hreflang 不對稱——群組裡只要有一頁沒回指,Google 整組忽略。
  2. sitemap 列出的網址被自己的 robots.txt 擋住——等於一邊請 Google 來、
     一邊把門關上。

只用標準函式庫,沒有相依套件。
"""
from __future__ import annotations

import re
import sys
from pathlib import Path
from xml.etree import ElementTree as ET

BASE = "https://anthropic-the-founder-playbook.peteraim.com"
ROOT = Path(__file__).resolve().parents[1]
NS = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9",
      "x": "http://www.w3.org/1999/xhtml"}

# 四個頁面 = 語言 × 深度 的 2×2。檔案 -> (自身網址, 預期 <html lang>)
PAGES: dict[str, tuple[str, str]] = {
    "index.html":              (f"{BASE}/",              "en"),
    "zh-Hant/index.html":      (f"{BASE}/zh-Hant/",      "zh-Hant"),
    "full/index.html":         (f"{BASE}/full/",         "en"),
    "full/zh-Hant/index.html": (f"{BASE}/full/zh-Hant/", "zh-Hant"),
}

# 一個 hreflang 群組 = 同一份內容的各語言版本。
# 導讀版與完整版是**不同內容**(完整版含導讀版刻意省略的章節),各自成群、不互指。
CLUSTERS = [["index.html", "zh-Hant/index.html"],
            ["full/index.html", "full/zh-Hant/index.html"]]

fails: list[str] = []


def check(ok: bool, msg: str) -> None:
    print(("  ✓ " if ok else "  ✗ ") + msg)
    if not ok:
        fails.append(msg)


def head_of(path: Path) -> tuple[str, str]:
    text = path.read_text(encoding="utf-8")
    return text.split("</head>")[0], text


def main() -> int:
    html_alts: dict[str, dict[str, str]] = {}

    print("── HTML head")
    for f, (self_url, lang) in PAGES.items():
        head, whole = head_of(ROOT / f)
        canon = re.search(r'rel="canonical"\s+href="([^"]+)"', head)
        ogurl = re.search(r'property="og:url"\s+content="([^"]+)"', head)
        htmllang = re.search(r'<html\s+lang="([^"]+)"', whole)
        alts = dict(re.findall(r'hreflang="([^"]+)"\s+href="([^"]+)"', head))
        html_alts[f] = alts
        check(bool(canon) and canon.group(1) == self_url, f"{f}: canonical 指向自己")
        check(bool(ogurl) and ogurl.group(1) == self_url, f"{f}: og:url == canonical")
        check(bool(htmllang) and htmllang.group(1) == lang, f"{f}: <html lang> == {lang}")
        check(alts.get(lang) == self_url, f"{f}: hreflang 自我參照")
        check("x-default" in alts, f"{f}: 有 x-default")
        check(all(u.startswith("https://") for u in alts.values()),
              f"{f}: hreflang 全為絕對網址")

    print("── hreflang 群組對稱性")
    for i, group in enumerate(CLUSTERS, 1):
        sets = [html_alts[f] for f in group]
        check(all(s == sets[0] for s in sets), f"群組 {i}:各頁 hreflang 集合完全相同")
        check(set(sets[0].values()) == {PAGES[f][0] for f in group},
              f"群組 {i}:hreflang 目標 == 群組成員(無外洩/遺漏)")
    check(not (set(html_alts[CLUSTERS[0][0]].values())
               & set(html_alts[CLUSTERS[1][0]].values())),
          "導讀版群組與完整版群組無交集")

    print("── sitemap.xml")
    tree = ET.parse(ROOT / "sitemap.xml")
    locs: list[str] = []
    sm_alts: dict[str, dict[str, str]] = {}
    for u in tree.getroot().findall("s:url", NS):
        loc = u.find("s:loc", NS).text
        locs.append(loc)
        sm_alts[loc] = {l.get("hreflang"): l.get("href") for l in u.findall("x:link", NS)}
    check(set(locs) == {v[0] for v in PAGES.values()}, "<loc> 集合 == 四個 canonical 網址")
    check(len(locs) == len(set(locs)), "沒有重複的 <loc>")
    check(not any("/docs/" in l for l in locs), "未列出 /docs/(原始素材,見 robots.txt)")
    check(not tree.getroot().findall(".//s:lastmod", NS),
          "刻意無 <lastmod>(沒有可信的內容修改時間來源)")
    for f, (self_url, _) in PAGES.items():
        check(sm_alts.get(self_url) == html_alts[f],
              f"sitemap 的 hreflang == HTML 的 hreflang({self_url.replace(BASE, '') or '/'})")

    print("── robots.txt")
    robots = (ROOT / "robots.txt").read_text(encoding="utf-8")
    disallows = re.findall(r"(?mi)^Disallow:\s*(\S+)", robots)
    sitemaps = re.findall(r"(?mi)^Sitemap:\s*(\S+)", robots)
    check(bool(re.search(r"(?mi)^User-agent:\s*\*", robots)), "有 User-agent: *")
    check(sitemaps == [f"{BASE}/sitemap.xml"], "Sitemap: 指向正確的絕對網址")
    check("/docs/" in disallows, "擋住 /docs/")
    blocked = [l for l in locs for d in disallows if l.replace(BASE, "").startswith(d)]
    check(not blocked,
          "sitemap 網址皆未被自己的 robots.txt 擋住"
          + (f" ← 被擋:{blocked}" if blocked else ""))

    if "--live" in sys.argv:
        import urllib.request
        print("── 線上(--live)")
        for f, (self_url, _) in PAGES.items():
            try:
                with urllib.request.urlopen(self_url, timeout=15) as r:
                    body = r.read().decode("utf-8", "replace")
                    ok = r.status == 200 and f'rel="canonical" href="{self_url}"' in body
                    check(ok, f"{self_url} 回 200 且 canonical 已部署")
            except Exception as e:  # noqa: BLE001
                check(False, f"{self_url} 取得失敗:{e}")
        for p in ("/robots.txt", "/sitemap.xml"):
            try:
                with urllib.request.urlopen(BASE + p, timeout=15) as r:
                    check(r.status == 200, f"{p} 回 200")
            except Exception as e:  # noqa: BLE001
                check(False, f"{p} 取得失敗:{e}")

    print("\n" + (f"❌ {len(fails)} 項失敗:\n  - " + "\n  - ".join(fails)
                  if fails else "✅ 全部通過"))
    return 1 if fails else 0


if __name__ == "__main__":
    raise SystemExit(main())
