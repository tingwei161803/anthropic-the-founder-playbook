# Full Edition + Version Switcher — Design Spec

**Date:** 2026-05-20
**Status:** Approved (design), pending implementation

## Goal

Offer two reading depths of the playbook, bilingual:

1. **Reader's edition (導讀)** — the existing condensed summary. Unchanged in
   substance; gains a version switch and a "see the full edition" entry point.
2. **Full edition (完整版)** — new, comprehensive coverage that mirrors every
   section of the source book, including the parts the condensed edition omits.

All full-edition prose is **paraphrased / restructured, never copied verbatim**
from the source PDF (copyright). Original links are kept for verification.

## File structure

```
/index.html              EN  reader's     css: assets/styles.css
/zh-Hant/index.html      繁中 reader's     css: ../assets/styles.css
/full/index.html         EN  full         css: ../assets/styles.css
/full/zh-Hant/index.html 繁中 full         css: ../../assets/styles.css
/assets/styles.css       shared (+ version-switch, decision-table, story card)
/assets/app.js           shared (+ version-switch hash preservation)
```

Relative CSS/JS/link depth differs per page; verify each page loads its assets
(the root index.html was previously broken by a wrong `../` prefix — re-check).

## Header (2×2 navigation matrix)

`brand … [Reader's | Full] [EN | 繁中] [★ GitHub]`

- **Version switch** — same language, toggles reader's ↔ full.
- **Language switch** — same version, toggles EN ↔ 繁中.
- Both preserve the URL hash so the reader stays on the same chapter.
- Mobile: GitHub collapses to icon, brand drops its subtitle, version/language
  use short labels. Verify no horizontal overflow down to 360px.

Reader's pages also get a lightweight inline CTA under the hero:
"This is the condensed reader's edition — read the full section-by-section
edition →".

## Full-edition content (EN + 繁中, paraphrased)

Mirrors the book; restores what the condensed edition cut:

- **Ch2** — sub-detail under the three capabilities (deep research / document
  drafting / strategic thinking partner); "timing and orchestration".
- **Ch3 Idea** (largest gap) — Chat/Cowork/Code decision table; define &
  pressure-test the hypothesis; market research & competitive landscape
  (competitor neglect, TAM/SAM/SOM, trend analysis); customer discovery
  (who to talk to / what to ask / post-interview analysis); customer outreach &
  scheduling (Gmail/Calendar via MCP); design the final solution concept; build
  the lightweight prototype. Includes the "42% failed" statistic.
- **Ch4 MVP** — names Claude Code Security; per-exercise detail.
- **Ch6 Scale** — restores the 4th challenge (scaling organizational functions:
  hiring, payroll, accounting, legal).
- **Resources** — 7 "Building with Claude" links; **Founder stories**
  (YC trio, GC AI, Carta Healthcare, Anything, Cogent, Airtree, Duvo, Zingage,
  Kindora, Wordsmith — paraphrased summaries + links); 3 startup-support links.

New component styles: `.decision-table` (the Chat/Cowork/Code table) and
`.story` (founder-story cards).

## Components / reuse

- Reuse existing classes: `.section`, `.chapter__*`, `.prose`, `.stage*`,
  `.challenge*`, `.tool*`, `.pullquote`, `.resource*`, `.closing`.
- `app.js` product highlighting, star count, and chip animation already key off
  classes and work on any page — no change needed beyond the version-switch
  hash preservation (mirror the existing `[data-lang-link]` handler).

## Out of scope

- No build step / framework — stays pure static HTML/CSS/JS.
- No verbatim reproduction of source prose.
- Markdown docs (`docs/playbook.*.md`) stay as the condensed summary for now.

## Verification

For each of the 4 pages, over `file://` and `http://`:
CSS loaded (logo == 16px), correct `lang`, correct brand text, no horizontal
overflow at 1280 / 390 / 360, version + language switches resolve to the right
page and preserve hash, product chips highlight, star count renders.
