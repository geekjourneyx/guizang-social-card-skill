# Jieni Gold Theme Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `Jieni Gold` (`jieni-gold`) as a fully documented, test-covered, and visually verified dark Editorial theme for AI, Harness Engineering, open-source launches, product commentary, and personal-brand covers.

**Architecture:** Extend the existing Editorial seed with one package-wide root theme, CSS-only atmosphere overrides, and one localized metallic text utility. Keep selection guidance concise in `SKILL.md`, place exact visual rules in `references/theme-presets.md`, and protect cross-file consistency through deterministic documentation-contract tests plus a rendered three-ratio fixture.

**Tech Stack:** HTML, CSS custom properties, Node.js ESM, Playwright 1.60, repository documentation-contract tests, existing `validate-social-deck.mjs`.

## Global Constraints

- Theme name: `Jieni Gold`; slug: `jieni-gold`.
- Root selector: `<html lang="zh-CN" data-theme="jieni-gold">`.
- Palette: `#050505` near-black, `#f1efe8` warm white, `#8a8780` neutral grey, `#c9a45c` warm gold.
- Gold is an accent, not a surface color; keep visible gold coverage below roughly 10%.
- Permit at most one `.metal-gold` title fragment, number, or symbol per board.
- Preserve the existing Editorial serif display, light weight, wide tracking, and large negative space.
- Use deterministic CSS for grain, haze, vignette, rim light, and metallic text; add no bitmap or font dependency.
- Keep `Midnight Ink`; route it to game art, night photography, and dark cultural imagery.
- Report 7 Editorial palettes plus 4 Swiss accents: 11 presets total.
- Preserve historical version-note counts; update only current-state documentation and add a new handoff entry.
- Set themes on the root `<html>` element, not per-poster `<section>` examples.
- Do not add a third style mode, seed template, layout recipe, or Swiss palette.

---

### Task 1: Capture the Baseline Selection Failure

**Files:**
- Read: `SKILL.md`
- Read: `references/theme-presets.md`
- Record evidence in the implementation notes; do not add a repository artifact.

**Interfaces:**
- Consumes: the unmodified skill on commit `422854c`.
- Produces: evidence that the current skill has no formal preset for the requested black, warm-gold AI/Harness brand treatment.

- [ ] **Step 1: Run a fresh-context baseline scenario**

Ask a fresh agent, without revealing the intended theme:

```text
Use the social-card skill in this repository to plan a 5-card launch carousel about Harness Engineering. The user wants #050505 black, warm white/grey/gold only, cinematic light, paper grain, large negative space, and a premium editorial-cover feel. State the selected existing theme, the root HTML attribute, and the palette/atmosphere rules you would apply. Do not edit files or render images.
```

- [ ] **Step 2: Confirm the baseline lacks the target preset**

Expected baseline: the agent selects `midnight-ink`, declines the exact palette as unsupported, or invents an unregistered theme. Record the exact selection and root attribute. If the agent already chooses `jieni-gold`, the baseline is contaminated; rerun in a fresh context against `origin/main`.

- [ ] **Step 3: Preserve the baseline for the final forward comparison**

Keep the output outside the repository. The final forward test in Task 5 must use the same user scenario without disclosing the expected answer.

---

### Task 2: Add a Failing Theme Contract, Then Implement the Seed

**Files:**
- Modify: `scripts/check-skill-docs.mjs`
- Modify: `assets/template-editorial-card.html`
- Test: `npm run test:docs`

**Interfaces:**
- Consumes: existing `mustInclude(file, needle, label)` and `mustNotMatch(file, pattern, label)` helpers.
- Produces: a registered `jieni-gold` root theme, CSS atmosphere overrides, and `.metal-gold` utility protected by deterministic checks.

- [ ] **Step 1: Add the failing template-contract checks**

Append checks before the final test runner in `scripts/check-skill-docs.mjs`:

```js
const editorialSeed = "assets/template-editorial-card.html";

mustInclude(editorialSeed, '[data-theme="jieni-gold"]', "Jieni Gold theme selector");
for (const token of [
  "--paper:     #050505;",
  "--paper-2:   #0d0d0c;",
  "--ink:       #f1efe8;",
  "--muted:     #8a8780;",
  "--line:      rgba(201,164,92,.22);",
  "--accent:    #c9a45c;",
  "--accent-soft: #2a2113;",
  "--ink-rgb: 241,239,232;",
  "--paper-rgb: 5,5,5;",
  "--accent-rgb: 201,164,92;",
]) {
  mustInclude(editorialSeed, token, `Jieni Gold token ${token}`);
}
mustInclude(editorialSeed, '[data-theme="jieni-gold"] .grain', "Jieni Gold grain override");
mustInclude(editorialSeed, '[data-theme="jieni-gold"] .paper-wash', "Jieni Gold haze override");
mustInclude(editorialSeed, '[data-theme="jieni-gold"] .frame-img', "Jieni Gold image rim light");
mustInclude(editorialSeed, '[data-theme="jieni-gold"] .frame-shot', "Jieni Gold screenshot rim light");
mustInclude(editorialSeed, '[data-theme="jieni-gold"] .metal-gold', "Jieni Gold metallic utility");
```

- [ ] **Step 2: Run the contract and verify RED**

Run: `npm run test:docs`

Expected: FAIL for the new `Jieni Gold` checks because the theme does not exist. Existing checks must continue to pass.

- [ ] **Step 3: Add the theme token block**

In the Editorial theme-token section, after `midnight-ink`, add exactly:

```css
[data-theme="jieni-gold"] {
  --paper:     #050505;
  --paper-2:   #0d0d0c;
  --ink:       #f1efe8;
  --muted:     #8a8780;
  --line:      rgba(201,164,92,.22);
  --accent:    #c9a45c;
  --accent-soft: #2a2113;
  --ink-rgb: 241,239,232;
  --paper-rgb: 5,5,5;
  --accent-rgb: 201,164,92;
}
```

- [ ] **Step 4: Add the theme-specific atmosphere and rim-light rules**

Place these beside the existing Midnight Ink dark overrides:

```css
[data-theme="jieni-gold"] .grain {
  opacity: .18;
  mix-blend-mode: screen;
  background-image: radial-gradient(rgba(241,239,232,.075) .7px, transparent .8px);
  background-size: 3px 3px;
}
[data-theme="jieni-gold"] .paper-wash {
  background:
    radial-gradient(72% 46% at 22% 18%, rgba(201,164,92,.12), transparent 66%),
    radial-gradient(58% 54% at 78% 58%, rgba(241,239,232,.055), transparent 72%),
    linear-gradient(180deg, rgba(241,239,232,.012), rgba(0,0,0,.42));
}
[data-theme="jieni-gold"] .frame-img,
[data-theme="jieni-gold"] .frame-shot {
  background: #080808;
  box-shadow:
    0 0 0 1px rgba(201,164,92,.24),
    0 18px 56px rgba(0,0,0,.52),
    0 0 32px rgba(201,164,92,.06);
}
[data-theme="jieni-gold"] .metal-gold {
  color: var(--accent);
  background: linear-gradient(105deg, #8a672d 0%, #c9a45c 42%, #ead596 58%, #a77d38 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

- [ ] **Step 5: Register the slug in both seed comments**

Add `jieni-gold` to the top `Theme switching` list and bottom `THEME_OVERRIDE` list. Keep `ink-classic` as the default root value.

- [ ] **Step 6: Run the template contract and verify GREEN**

Run: `npm run test:docs`

Expected: all checks added in Step 1 pass; no existing check regresses.

- [ ] **Step 7: Commit the template contract and implementation**

```bash
git add scripts/check-skill-docs.mjs assets/template-editorial-card.html
git commit -m "feat: add Jieni Gold editorial theme"
```

---

### Task 3: Teach the Skill to Select Jieni Gold

**Files:**
- Modify: `scripts/check-skill-docs.mjs`
- Modify: `SKILL.md`
- Modify: `references/theme-presets.md`
- Modify: `references/style-system.md`
- Test: `npm run test:docs`

**Interfaces:**
- Consumes: the `jieni-gold` seed selector from Task 2.
- Produces: concise discovery guidance plus detailed reference rules that route the intended content to Jieni Gold without conflating it with Midnight Ink.

- [ ] **Step 1: Add failing discovery-contract checks**

Add:

```js
mustInclude("SKILL.md", "Jieni Gold", "Jieni Gold discovery name");
mustInclude("SKILL.md", "jieni-gold", "Jieni Gold root slug");
mustInclude("references/theme-presets.md", "### Jieni Gold", "Jieni Gold preset reference");
mustInclude(
  "references/style-system.md",
  "two sanctioned dark palettes",
  "Editorial two-dark-theme boundary",
);
```

- [ ] **Step 2: Run the contract and verify RED**

Run: `npm run test:docs`

Expected: FAIL only on the new discovery checks.

- [ ] **Step 3: Update concise discovery in `SKILL.md`**

Replace the Editorial theme-selection bullet with:

```markdown
- Editorial Magazine x E-ink uses one of 7 magazine palettes: Ink Classic, Indigo Porcelain, Forest Ink, Kraft Paper, Dune, Midnight Ink, or Jieni Gold. Use Midnight Ink for game art, night photography, and dark cultural imagery; use Jieni Gold for AI, Agent, Harness Engineering, open-source launches, product commentary, and personal-brand covers that call for near-black negative space, warm white/grey type, sparse warm gold, and controlled cinematic light.
```

Update the root attribute example to include `jieni-gold`:

```markdown
- Editorial: `<html data-theme="ink-classic | indigo-porcelain | forest-ink | kraft-paper | dune | midnight-ink | jieni-gold">`.
```

- [ ] **Step 4: Add the complete preset reference**

In `references/theme-presets.md`, add `### Jieni Gold` after Midnight Ink with:

- the exact ten tokens from Task 2;
- use cases: AI, Agent, Harness Engineering, open source, product launches, personal brand;
- atmosphere rules: fine screen-blended grain, localized haze, vignette, narrow rim light;
- image rules: dark background, shallow depth of field, warm rim light, quiet zone;
- metallic rule: one `.metal-gold` fragment per board;
- restraint rules: gold below roughly 10%, no gold paragraphs, no neon blue/purple, glass, large flares, or gold panels.

Replace `Midnight Ink` wording that calls it the only official dark palette with a two-theme routing statement. Keep its existing CSS overrides unchanged.

- [ ] **Step 5: Update the style-system boundary**

Replace the single-dark-theme paragraph with:

```markdown
Use one of the 7 magazine palettes in `theme-presets.md`. Do not improvise arbitrary warm paper or dark colors. Five palettes are light; two sanctioned dark palettes have separate roles: **Midnight Ink** for game art, night photography, and dark cultural imagery, and **Jieni Gold** for AI, Agent, Harness Engineering, open-source launches, product commentary, and personal-brand covers. Do not invent a third dark palette.
```

Ensure the file contains the exact phrase `two sanctioned dark palettes` for the contract check.

- [ ] **Step 6: Run the discovery contract and verify GREEN**

Run: `npm run test:docs`

Expected: all template and discovery checks pass.

- [ ] **Step 7: Commit discovery and reference guidance**

```bash
git add scripts/check-skill-docs.mjs SKILL.md references/theme-presets.md references/style-system.md
git commit -m "docs: route branded dark covers to Jieni Gold"
```

---

### Task 4: Synchronize Product Truth and Bilingual Documentation

**Files:**
- Modify: `scripts/check-skill-docs.mjs`
- Modify: `README.md`
- Modify: `README.en.md`
- Modify: `PRODUCT.md`
- Modify: `HANDOFF.md`
- Test: `npm run test:docs`

**Interfaces:**
- Consumes: the selection and reference wording from Task 3.
- Produces: consistent current-state counts, corrected root switching examples, and a preserved historical record.

- [ ] **Step 1: Add failing current-state documentation checks**

Add:

```js
mustInclude("README.md", "11 套主题预设", "Chinese README total theme count");
mustInclude("README.md", "Editorial 7 套", "Chinese README Editorial count");
mustInclude("README.md", "Jieni Gold", "Chinese README Jieni Gold row");
mustInclude("README.en.md", "11 theme presets", "English README total theme count");
mustInclude("README.en.md", "Editorial 7", "English README Editorial count");
mustInclude("README.en.md", "Jieni Gold", "English README Jieni Gold row");
mustInclude("PRODUCT.md", "Jieni Gold", "product boundary includes Jieni Gold");
mustInclude("HANDOFF.md", "Jieni Gold", "handoff records Jieni Gold");
mustNotMatch(
  "README.md",
  /<section class="poster" data-theme=/,
  "Chinese README uses root theme switching",
);
mustNotMatch(
  "README.en.md",
  /<section class="poster" data-theme=/,
  "English README uses root theme switching",
);
```

- [ ] **Step 2: Run the documentation contract and verify RED**

Run: `npm run test:docs`

Expected: FAIL for the new counts, Jieni Gold references, and root-switching checks.

- [ ] **Step 3: Update `README.md` current-state facts**

Make these consistent changes:

- `10 套主题预设` → `11 套主题预设`.
- `Editorial 6 套` → `Editorial 7 套` and list Jieni Gold.
- Add a table row for `杰尼金 Jieni Gold` with `#050505 / #f1efe8 / #c9a45c` and the approved use cases.
- `10 套预设` / `10 套色票` / `只允许从 10 套` → 11 equivalents.
- Template tree annotation: `Editorial 种子(7 主题 / 3 画板)`.
- Theme reference annotation: `11 套色票详解`.
- Correct switching prose to `<html data-theme="...">`; explain Swiss uses `<html data-accent="...">`.
- Update the contribution note to mention both `[data-theme]` and `[data-accent]` blocks.

- [ ] **Step 4: Mirror the same facts in `README.en.md`**

Use `11 theme presets`, `Editorial 7`, a Jieni Gold table row, `Editorial seed (7 themes / 3 canvases)`, `All 11 palettes in detail`, and root `<html>` switching examples.

- [ ] **Step 5: Update the product boundary without erasing history**

In `PRODUCT.md`:

- Rename Decision 5 to `暗色 Editorial 采用双主题分工`.
- Preserve the v0.12 explanation of why Midnight Ink was originally added.
- Add the current rule: Midnight Ink serves game/night/cultural imagery; Jieni Gold serves AI/Harness/open-source/product/personal-brand imagery.
- Replace the current 10-palette ceiling with 11 validated palettes.
- State that a third dark Editorial palette remains disallowed without a new validated use case.

- [ ] **Step 6: Update current handoff facts and add a release entry**

In `HANDOFF.md`:

- Update only the current coverage table to `Editorial 7 套（5 浅 + 2 暗）+ Swiss 4 套 = 11 套`.
- Add a new top version-history entry dated `2026-08-13` describing Jieni Gold, root switching correction, deterministic contract tests, and the three-ratio visual fixture.
- Keep old entries such as `5 + 4 = 9` and the v0.12 transition from 5 to 6 as historical facts.

- [ ] **Step 7: Run the full documentation contract and verify GREEN**

Run: `npm run test:docs`

Expected: all old and new checks pass with zero failures.

- [ ] **Step 8: Commit synchronized documentation**

```bash
git add scripts/check-skill-docs.mjs README.md README.en.md PRODUCT.md HANDOFF.md
git commit -m "docs: document Jieni Gold theme"
```

---

### Task 5: Render and Validate the Three-Ratio Theme Fixture

**Files:**
- Create ignored fixture: `local-tests/jieni-gold-theme/index.html`
- Create ignored renderer: `local-tests/jieni-gold-theme/render.mjs`
- Create ignored outputs: `local-tests/jieni-gold-theme/output/*.png`
- Modify only if visual defects are found: `assets/template-editorial-card.html`

**Interfaces:**
- Consumes: the final Editorial seed from Tasks 2–4.
- Produces: 3:4, 1:1, and 21:9 evidence plus a post-change skill-selection result.

- [ ] **Step 1: Install the locked dependency set**

Run: `npm ci`

Expected: Playwright dependency installation completes without changing `package-lock.json`.

- [ ] **Step 2: Create the ignored fixture from the actual seed**

Copy `assets/template-editorial-card.html` to `local-tests/jieni-gold-theme/index.html`, set the root to `data-theme="jieni-gold"`, and replace the placeholder area with exactly three representative boards:

- `#jieni-gold-xhs`: 1080×1440 AI/Harness launch cover, large warm-white serif title, one `.metal-gold` word, grey deck, one gold rule, and large black negative space.
- `#jieni-gold-square`: 1080×1080 short-title cover with one gold index and no image.
- `#jieni-gold-wide`: 2100×900 WeChat cover with a dark image well or CSS-lit object block, narrow rim light, title on the quiet side, and muted metadata.

Use only existing Editorial classes plus `.metal-gold`; do not add task-scoped colors.

- [ ] **Step 3: Create the deterministic renderer**

`render.mjs` must launch Playwright Chromium, open `index.html` through `file://`, wait for `document.fonts.ready`, screenshot the three IDs into `output/`, and close the browser in a `finally` block. Use output filenames:

```text
jieni-gold-xhs.png
jieni-gold-square.png
jieni-gold-wide.png
```

- [ ] **Step 4: Render all three ratios**

Run: `node local-tests/jieni-gold-theme/render.mjs`

Expected: three PNG files with exact dimensions `1080×1440`, `1080×1080`, and `2100×900`.

- [ ] **Step 5: Run layout validation**

Run: `npm run validate -- local-tests/jieni-gold-theme --style=editorial`

Expected: zero FAIL results. Read and resolve any WARN that indicates avoidable title crowding, empty-bottom drift, or insufficient content density.

- [ ] **Step 6: Inspect full-size and thumbnail renders**

Create 360px-wide thumbnail copies outside the repository or inside the ignored fixture. Confirm:

- main title remains readable;
- black remains neutral rather than brown or blue;
- gold appears only on one metallic fragment plus sparse rules/numbers;
- haze stays localized and low-luminance;
- no neon, glass, glossy panel, large flare, or e-commerce cue appears;
- the result is visually distinct from Midnight Ink.

- [ ] **Step 7: Refine only documented theme CSS if needed**

If inspection finds a defect, change only the relevant `jieni-gold` override, rerun Steps 4–6, then run `npm run test:docs`. Do not change global Editorial defaults to improve this theme.

- [ ] **Step 8: Run the post-change forward scenario**

Repeat Task 1's exact fresh-context request. Expected: the agent selects `Jieni Gold`, returns `<html data-theme="jieni-gold">`, stays inside the four-color system, and states the metallic/gold restraint without inventing another palette.

- [ ] **Step 9: Commit any visual refinement**

If Task 5 changed tracked files:

```bash
git add assets/template-editorial-card.html
git commit -m "fix: refine Jieni Gold visual treatment"
```

Do not commit `local-tests/` or rendered outputs.

---

### Task 6: Final Verification and GitHub Publication

**Files:**
- Verify all tracked changes.
- Optional external metadata: repository About description.

**Interfaces:**
- Consumes: all commits and evidence from Tasks 1–5.
- Produces: a clean feature branch and Draft PR against `geekjourneyx/guizang-social-card-skill:main`.

- [ ] **Step 1: Run fresh source verification**

Run:

```bash
npm run test:docs
npm run validate -- local-tests/jieni-gold-theme --style=editorial
git diff --check origin/main...HEAD
git status -sb
```

Expected: documentation checks pass, validator reports zero FAIL, diff check is clean, and only ignored visual-fixture files remain outside Git status.

- [ ] **Step 2: Review the complete diff against the design**

Run: `git diff --stat origin/main...HEAD` and `git diff origin/main...HEAD`.

Confirm every acceptance criterion in `docs/superpowers/specs/2026-08-13-jieni-gold-theme-design.md`, including current counts, two-dark-theme routing, root switching, full tokens, atmosphere overrides, metallic limit, and historical-note preservation.

- [ ] **Step 3: Push the feature branch**

Push `agent/add-jieni-gold-theme` to the user's fork. If local HTTPS credentials are unavailable, reproduce the verified commits through the connected GitHub app using the exact tracked file contents and branch name; do not bypass validation or force-push.

- [ ] **Step 4: Open a Draft PR**

Title: `Add Jieni Gold editorial theme`

PR body must summarize the theme positioning, CSS atmosphere, skill discovery updates, documentation synchronization, RED/GREEN contract evidence, three-ratio render evidence, and remaining metadata limitation if any.

- [ ] **Step 5: Update or report the repository About description**

Change `10 themes` to `11 themes` only if the connected GitHub capability exposes repository metadata mutation. If it does not, leave source and PR untouched and report this single external metadata follow-up explicitly.

---

## Plan Self-Review

- Spec coverage: theme tokens, atmosphere, metallic limit, routing, counts, root switching, product boundary, historical preservation, visual rendering, forward testing, and publication each map to a task.
- Placeholder scan: the plan contains no unresolved implementation placeholder; fixture copy is specified by exact IDs, ratios, content roles, and constraints.
- Interface consistency: all tasks use `jieni-gold`, `.metal-gold`, the root `<html>` selector, 7 Editorial palettes, and 11 total presets.
- Scope check: the plan adds one Editorial preset and no unrelated layout, font, Swiss, or template refactor.
