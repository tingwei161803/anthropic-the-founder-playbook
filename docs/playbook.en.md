# The Founder's Playbook · Reader's Edition

> A bilingual reader's edition of Anthropic's *The Founder's Playbook* — a guide to building an AI-native
> startup across the Idea, MVP, Launch, and Scale stages.

**Source:** [Original 36-page PDF (Anthropic, May 2026)](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/69fe2a55b93bb0732b1fe33c_The-Founders-Playbook-05062026_v3%20(1).pdf)
**Languages:** [English](./playbook.en.md) · [繁體中文](./playbook.zh-Hant.md)

---

## Contents

1. [The startup lifecycle, rebooted for 2026](#chapter-1--the-startup-lifecycle-rebooted-for-2026)
2. [What it means to be a founder is changing](#chapter-2--what-it-means-to-be-a-founder-is-changing)
3. [Idea Stage](#chapter-3--idea-stage)
4. [MVP Stage](#chapter-4--mvp-stage)
5. [Launch Stage](#chapter-5--launch-stage)
6. [Scale Stage](#chapter-6--scale-stage)
7. [Same job, new rules](#chapter-7--same-job-new-rules)
8. [Resources](#resources)

---

## Chapter 1 — The startup lifecycle, rebooted for 2026

*AI hasn't just sped up the work — it has redrawn the map between idea and exit.*

A founder in 2026 can write production code without engineering experience, run market research without a
consultant, and ship a product without a team. AI has dissolved the historic prerequisites of starting a
company — and with them, the linear arc of **validate → raise → hire → build → raise again** that defined
every prior startup generation.

The lean ten-person unicorn is no longer a slogan; it's a deliberate plan of action. This playbook re-maps
the four stages of the journey — **Idea, MVP, Launch, Scale** — for an era where the bottleneck is no longer
what you can build, but what you choose to build.

> AI has erased the expectation that each new phase requires a bigger team, a different skill set, and a
> fresh funding round.
>
> — *The Founder's Playbook*, Ch. 1

---

## Chapter 2 — What it means to be a founder is changing

*From individual contributor to orchestrator of agents.*

The wall between "people who can build" and "people with ideas worth building" has dissolved. A
non-technical founder can ship production software; a technical founder can produce financial models and
pitch decks without a finance hire. The founder's attention shifts up the stack — from execution to
direction.

Three AI capabilities make a lean startup function like a much larger organization:

- **Conversational intelligence — the on-call expert.** Competitive analysis, market sizing, financial
  modeling, devil's-advocate framing — answers to every "how do I…" that used to send a founder hunting
  for someone who knows.
- **Agentic coding — the engineer who's never blocked.** Describe what you want in plain language; AI
  generates, tests, debugs, and refactors a production-grade codebase at the speed of a full engineering
  team.
- **Workflow automation — the on-demand ops team.** CRM updates, weekly reports, doc sync, compliance
  tracking — the connective tissue of running a company, configured to happen automatically.

This work doesn't happen on autopilot. The founder orchestrating these tools needs to know *how* and *when*
to apply each one. The rest of this playbook walks through that orchestration, stage by stage.

> The founder's attention shifts up the stack — from execution to direction.
>
> — *The Founder's Playbook*, Ch. 2

---

## Chapter 3 — Idea Stage

> *Where the discipline is not building until the evidence justifies it.*

Every startup begins from the same place: a problem the founder can't stop thinking about. The work here is
research, customer discovery, and the honest evaluation of disconfirming evidence — all *before* asking
Claude Code to generate a single line of production code.

### Goal

Assemble solid evidence that a real problem exists, and that your proposed solution actually addresses it —
before committing resources to building.

### Exit criteria

1. The problem is real and specific — you can name who has it, how often, and how severely.
2. Your solution addresses the problem validation revealed, not the one you originally assumed.
3. You have enough signal to justify building — qualitative evidence that committing to an MVP is reasoned,
   not an act of faith.

### Challenges to watch

#### 1. Mistaking building for validating

When prototyping feels effortless, founders skip the most important work: confirming people actually need
what they're about to build. A prototype is not evidence — the conversations it provokes are.

#### 2. Premature scaling

Agentic coding can scale execution far ahead of validated problem-solution fit. The intelligence in the
system is yours. Keep sense-making ahead of building.

#### 3. Loss of objectivity

Ask AI to validate your idea and it will find supporting evidence. Confirmation bias now has a research
engine. The antidote: point the same tool in the opposite direction — let it argue against you.

### How Claude can help

- **Define the problem with specificity.** "Contract review takes too long" isn't testable. "In-house legal
  teams at mid-market companies spend 3+ days per contract because redlines live in email threads" is.
- **Map competitors by tier.** Direct, indirect, potential acquirers, adjacent players — then ask Claude to
  argue why each one beats you.
- **Design the interview framework.** Ask about the relevant past, not the imagined future. Replace "would
  you use this?" with "tell me about the last time you dealt with this problem."
- **Run a 5-interview synthesis loop.** After every five conversations, Claude Cowork produces two lists —
  evidence for, evidence against. If the first is much longer, ask whether that asymmetry reflects the data
  or your hopes.
- **Build only one core interaction.** When you finally open Claude Code, ship the single interaction your
  solution depends on. Put it in front of five validated targets. Their reactions decide whether you keep
  building.

---

## Chapter 4 — MVP Stage

> *Translate a validated problem into a working product real users will actually use.*

The MVP stage is still an evidence-gathering exercise — only now the evidence is about the *solution*:
whether an identifiable group finds it valuable enough to return to it, pay for it, or tell others about
it. How you build now also determines what's possible later.

### Goal

The smallest, most focused iteration of the idea that generates genuine evidence of product-market fit —
without accruing the kind of technical debt that compounds.

### Exit criteria

A specific, identifiable group of users finds the product valuable enough to:

1. Return to it (**retention**).
2. Pay for it (**revenue**).
3. Tell others about it (**referral**).

Sean Ellis's "very disappointed if I lost this" test above 40% is one useful litmus.

### Challenges to watch

#### 1. Agentic technical debt

Without specs and architectural constraints written down somewhere AI can read, each session re-derives
foundational decisions. The pieces work; they were never designed to fit together.

#### 2. False product-market fit

Launch energy from friends, a Hacker News spike, or warm intros is not PMF. None of those reliably predict
week six.

#### 3. Zero-friction scope creep

Each addition is defensible in isolation. Together they sprawl. Write your scope before building and
require user evidence to amend it.

#### 4. Insecure by inexperience

Agentic tools produce code that works, not code that is inherently secure. A security review before any
user touches the app is the minimum responsible threshold.

### How Claude can help

- **Architectural context document.** Open Claude (not Claude Code) and describe what you're building, who
  it serves, and the scale you expect. Save the output as `CLAUDE.md` — persistent project memory every
  Claude Code session reads.
- **Written scope, evidence to amend.** What the product does, what it deliberately does not do, and what
  user evidence would justify a new feature. Moves the question from "should we build this?" to "have users
  told us they can't get value without it?"
- **Session template for Claude Code.** Open with the context doc and the specific task. Close with a brief
  log entry. Five minutes of documentation per session is cheap insurance against architectural drift.
- **Security review before users.** Run Claude across authentication, session handling, input validation,
  API response surface, and dependency vulnerabilities. Treat findings as required remediation, not
  suggestions.
- **Measurement framework *before* launch.** Define retention benchmarks, activation criteria, Day 7 /
  Day 30 targets, and what a false positive would look like — before the first user signs up.
- **Pivot when the evidence demands it.** After three iteration cycles without movement, run a diagnostic:
  is a segment responding differently? Is it a positioning or a product problem? What would have to be true
  for the current product to find PMF?

---

## Chapter 5 — Launch Stage

> *Prove your product deserves to exist. Now prove your business deserves to grow.*

Launch is where companies that found real product traction can still fall apart — if the organization
around the product can't keep up. The goal isn't to remove yourself from the company. It's to build
operational systems that free your attention for the decisions only a founder can make.

### Goal

Turn early signal into sustainable growth. Harden the infrastructure underneath the product. Build an
actual company around it.

### Exit criteria

Three conditions, all true:

1. **Growth is repeatable and channel-driven.** CAC, LTV, and payback are numbers you know and can defend.
2. **The product handles production workloads.** Infrastructure hardened, security and compliance in order.
3. **Operations run without founder bottlenecks.** Processes exist; automation is in place; you're no
   longer personally triaging.

### Challenges to watch

#### 1. Technical debt comes due

The MVP codebase ran well enough to prove the product worked. Production traffic, new features, and growing
complexity expose the shortcuts. Audit, refactor, and expand test coverage before the next feature cycle.

#### 2. Founder becomes the bottleneck

Decisions that should take an hour now take a week. Support requests stack up because only you know the
answer. The transition from doing the work to designing the systems is the hardest shift in the lifecycle.

#### 3. Security and compliance go from theoretical to existential

With real users, real data, and enterprise contracts on the table, what was deferrable at MVP is now a
liability. Do the systematic review *before* scale arrives — not after.

#### 4. Expansion before you're ready

New markets and new audiences introduce variables you can't yet interpret. Chasing them risks neglecting
the original users who actually made the traction real.

### How Claude can help

- **Remediate before it compounds.** Claude Code runs the architectural audit; Claude triages and sequences
  the work; `CLAUDE.md` captures the decisions that previously lived only in your head.
- **Make security a workstream, not a project.** Code-level review oriented to SOC 2 / GDPR / HIPAA
  depending on your market. Output: prioritized remediation plus the documentation an enterprise
  procurement team will ask for.
- **A lightweight product OS.** Sprint cadence, minimum spec template, bug triage decision tree, weekly
  metrics brief pulled from your actual data sources — designed in Claude, run on Claude Cowork.
- **Founder bottleneck audit.** Inventory everything currently routed through you. Categorize into
  *automate*, *delegate*, and *founder-only*. Build the workflow logic for the first two.

---

## Chapter 6 — Scale Stage

> *From a bet to a business. The founder's role re-centers from builder to public-facing executive.*

At Scale, the work of growing the codebase is joined by the work of growing the company around it.
Thousands of users become millions; one market becomes many. The exit isn't a single milestone but a
threshold: the company is sustainable even as the founder is, increasingly, not directly running day-to-day
operations.

### Goal

Build a moat through accumulated depth — domain expertise embedded in the product, deep integration with
the tools users rely on, and proprietary system data competitors can't recreate.

### Exit criteria

Three forms, all auditable:

1. Sustainable profitability at a scale that no longer requires external capital.
2. IPO readiness — growth, governance, and compliance all stand up to public-market scrutiny.
3. Acquisition by a buyer who recognizes the moat.

### Challenges to watch

#### 1. Delegating the operational layer

Hand off too fast and critical decisions get made without founder context. Hold on too long and you become
the bottleneck. The hard work is codifying the institutional knowledge that lives only in your head.

#### 2. Enterprise-grade everything

Customers no longer evaluate only your product — they want documentation, SLAs, observability, incident
response, and reliability guarantees that signal organizational maturity.

#### 3. Building a real GTM function

Founder hustle has a ceiling. Most startups hit it at Scale. You'll need market segmentation, messaging
architecture, sales playbooks, and a brand voice for audiences you've never sold to before.

### How Claude can help

- **Externalize founder knowledge.** Capture industry jargon, regulatory gotchas, edge cases, and "the
  obvious answer doesn't work because…" into a searchable context. Over months, a proprietary knowledge
  substrate no generalist AI can match.
- **Encode domain edge cases into the product.** Your test suite becomes a map of your moat. Every time a
  competitor would get it wrong, add the case.
- **Compound user data into a defensible advantage.** The behavioral fingerprint of thousands of users
  refining their workflows inside your product is time-locked and impossible to recreate. Identify the
  highest-signal patterns and design the loop that turns usage into systematic improvement.
- **Create workflow lock-in via depth, not lock-in via friction.** Native integrations, APIs, webhooks,
  SDKs — let customers build *on top of* your product, not just use it. The deepest form of stickiness.
- **Bootstrap the GTM engine.** Claude drafts the segmentation, messaging, and investor-facing narrative;
  Claude Cowork runs the content pipelines, outbound sequences, and pipeline reporting; Claude Code builds
  the demo environments and integration docs that close deals while you're in board meetings.

---

## Chapter 7 — Same job, new rules

*The founder's job hasn't changed. The path to do it has.*

Find a real problem. Build something that solves it. Scale it into a company that matters. The work is
unchanged. What's different is the **compression**: validation cycles that took months now take afternoons.
A working prototype requires a clear problem and a few focused sessions with a coding agent — not a
co-founder with the right stack. Launch readiness becomes a continuous workstream, not a pre-launch
scramble. Scale-stage operational weight gets handed off to AI, freeing your team for the judgment calls
that become your moat.

> The bottlenecks are no longer what you can build, but what you choose to build.
>
> — *The Founder's Playbook*, Ch. 7

---

## Resources

*Where to go next from Anthropic's library.*

### Building with Claude

- [Claude Code docs](https://docs.claude.com/en/docs/claude-code/overview) — From installation to advanced
  agentic workflows.
- [Claude Code best practices](https://www.anthropic.com/engineering/claude-code-best-practices) — Context
  management, permissions, planning, verification.
- [Using `CLAUDE.md` files](https://docs.claude.com/en/docs/claude-code/memory) — Configure persistent
  project memory; essential MVP-stage reading.
- [Tutorials library](https://claude.com/resources/tutorials) — Searchable, hands-on walkthroughs for
  specific tasks.

### Programs & community

- [Anthropic Startups Program](https://www.anthropic.com/startups) — API credits, top-tier rate limits, and
  founder events for VC-backed startups.
- [The full 36-page PDF](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/69fe2a55b93bb0732b1fe33c_The-Founders-Playbook-05062026_v3%20(1).pdf)
  — Original publication with all founder stories and case studies.

---

*Reader's edition · summarized in good faith from the [original PDF](https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/69fe2a55b93bb0732b1fe33c_The-Founders-Playbook-05062026_v3%20(1).pdf).
All rights to the underlying content remain with Anthropic.*
