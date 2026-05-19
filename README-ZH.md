# 創辦人的行動手冊 · 精華導讀版

Anthropic《[The Founder's Playbook][pdf]》——一份 36 頁、從構想到規模化四階段的 AI 原生新創指南——的雙語視覺化版本（網頁版 + Markdown 版）。

English README: [**README.md**](./README.md)

---

## 開始閱讀

### 🌐 網頁版

完整的瀏覽體驗——固定式目錄、閱讀進度條、語言切換。

| 語言        | GitHub Pages 線上版                                                                  | 本機（`git clone` 後）              |
| ----------- | ----------------------------------------------------------------------------------- | ---------------------------------- |
| English     | <https://tingwei161803.github.io/anthropic-the-founder-playbook/>                   | 開啟 [`index.html`](./index.html)               |
| 繁體中文    | <https://tingwei161803.github.io/anthropic-the-founder-playbook/zh-Hant/>           | 開啟 [`zh-Hant/index.html`](./zh-Hant/index.html) |

### 📄 Markdown 版

GitHub 直接渲染——不開瀏覽器分頁就能快速閱讀。

- English: [`docs/playbook.en.md`](./docs/playbook.en.md)
- 繁體中文: [`docs/playbook.zh-Hant.md`](./docs/playbook.zh-Hant.md)

### 📑 原文 PDF

需要引用或想看完整原文時，本 repo 也內附一份，Anthropic 官方也有線上版：

- 本機檔案：[`docs/playbook.pdf`](./docs/playbook.pdf)
- Anthropic CDN：[直接連結][pdf]

---

## Repo 結構

```
.
├── README.md                   # 英文版說明
├── README-ZH.md                # 本檔（繁體中文）
├── LICENSE
├── .editorconfig
├── .gitignore
│
├── index.html                  # 🌐 英文網頁入口
├── zh-Hant/
│   └── index.html              # 🌐 繁體中文網頁入口
│
├── assets/
│   ├── styles.css              # 共用樣式表
│   └── app.js                  # 進度條、目錄高亮、語言切換
│
└── docs/
    ├── playbook.en.md          # 📄 英文 Markdown 導讀
    ├── playbook.zh-Hant.md     # 📄 繁體中文 Markdown 導讀
    └── playbook.pdf            # 📑 原文 PDF（Anthropic, 2026 年 5 月）
```

純靜態 HTML、CSS、約 50 行 JS——沒有 build step、沒有相依套件。整個資料夾丟到任何靜態主機（GitHub Pages、Vercel、Netlify、Cloudflare Pages、S3）都可直接運作。

---

## 在本機執行

clone 下來後有兩種方式：

**方式一：直接開檔案** — 雙擊 [`index.html`](./index.html) 或 [`zh-Hant/index.html`](./zh-Hant/index.html)，瀏覽器即可開啟。所有連結都是相對路徑，無需架伺服器就能用。

**方式二：起一個本機伺服器**（部分瀏覽器會阻擋本機檔案的 fetch，這時用 server 比較穩）：

```bash
python3 -m http.server 4000
# 接著開啟 http://localhost:4000/
```

---

## 著作權與授權

- 底層內容——*The Founder's Playbook: Building an AI-Native Startup*——© Anthropic，2026 年 5 月，內容著作權皆歸 Anthropic。
- 本 repo 中的視覺化呈現（改寫的導讀文字、版面、程式碼、翻譯）採用 [MIT 授權](./LICENSE)。
- Anthropic 品牌與產品名稱（Claude、Claude Code、Claude Cowork）皆為 Anthropic 所有。

[pdf]: https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/69fe2a55b93bb0732b1fe33c_The-Founders-Playbook-05062026_v3%20(1).pdf
