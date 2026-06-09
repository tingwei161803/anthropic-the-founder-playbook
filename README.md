# The Founder's Playbook · Reader's Edition

A bilingual web + Markdown visualization of Anthropic's *[The Founder's Playbook][pdf]* — a 36-page
guide to building an AI-native startup across the Idea, MVP, Launch, and Scale stages.

繁體中文版說明：[**README-ZH.md**](./README-ZH.md)

---

## Read the playbook

### 🌐 Web version

The browser experience — sticky table of contents, reading progress, language switcher.

| Language            | On GitHub Pages (live)                                                          | Local (after `git clone`)         |
| ------------------- | ------------------------------------------------------------------------------- | --------------------------------- |
| English             | <https://anthropic-the-founder-playbook.peteraim.com/>               | open [`index.html`](./index.html)               |
| 繁體中文              | <https://anthropic-the-founder-playbook.peteraim.com/zh-Hant/>       | open [`zh-Hant/index.html`](./zh-Hant/index.html) |

### 📄 Markdown version

GitHub renders these inline — perfect for quick reading without opening a browser tab.

- English: [`docs/playbook.en.md`](./docs/playbook.en.md)
- 繁體中文: [`docs/playbook.zh-Hant.md`](./docs/playbook.zh-Hant.md)

### 📑 Original PDF

For citation or the canonical text, the 36-page PDF is included locally and hosted by Anthropic:

- Local copy: [`docs/playbook.pdf`](./docs/playbook.pdf)
- Anthropic CDN: [direct link][pdf]

---

## Repository layout

```
.
├── README.md                   # This file (English)
├── README-ZH.md                # 繁體中文版說明
├── LICENSE
├── .editorconfig
├── .gitignore
│
├── index.html                  # 🌐 English web entry
├── zh-Hant/
│   └── index.html              # 🌐 Traditional Chinese web entry
│
├── assets/
│   ├── styles.css              # Shared editorial stylesheet
│   └── app.js                  # Progress bar, TOC highlighting, lang preservation
│
└── docs/
    ├── playbook.en.md          # 📄 English Markdown summary
    ├── playbook.zh-Hant.md     # 📄 Traditional Chinese Markdown summary
    └── playbook.pdf            # 📑 Source PDF (Anthropic, May 2026)
```

Pure static HTML, CSS, and ~50 lines of JS — no build step, no dependencies. Drop the folder onto
any static host (GitHub Pages, Vercel, Netlify, Cloudflare Pages, S3) and it just works.

---

## Run it locally

After cloning the repo, you have two options:

**Open the file directly** — double-click [`index.html`](./index.html) (or
[`zh-Hant/index.html`](./zh-Hant/index.html)) and your browser will open it. Everything is
relatively linked, so it works without a server.

**Or serve it locally** (better for some browsers that block local-file fetches):

```bash
python3 -m http.server 4000
# then open http://localhost:4000/
```

---

## Attribution

- The source material — *The Founder's Playbook: Building an AI-Native Startup* — is © Anthropic,
  May 2026. All rights to the underlying content remain with Anthropic.
- The reader's edition presentation in this repository (paraphrased prose, layout, code,
  translation) is released under the [MIT License](./LICENSE).
- Anthropic's brand and product names (Claude, Claude Code, Claude Cowork) belong to Anthropic.

[pdf]: https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/69fe2a55b93bb0732b1fe33c_The-Founders-Playbook-05062026_v3%20(1).pdf
