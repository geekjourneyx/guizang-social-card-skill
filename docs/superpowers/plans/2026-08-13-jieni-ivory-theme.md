# Jieni Ivory Theme Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `Jieni Ivory` (`jieni-ivory`) as the reading-first light companion to `Jieni Gold`, with a narrowly supported Gold-cover/Ivory-body sequence, complete routing guidance, real-browser contrast gates, and three-ratio visual evidence.

**Architecture:** Extend the existing Editorial seed with one new root theme and theme-scoped CSS effects. Preserve the package-wide root theme as the default, but make existing Gold selectors section-safe so an Ivory package may use Gold on at most its first and last posters without duplicating Gold tokens. Protect the design through deterministic documentation contracts, Chromium-computed contrast checks, a five-board ignored fixture, and a fresh skill-routing test.

**Tech Stack:** HTML, CSS custom properties, Node.js ESM, Playwright 1.60, existing `validate-social-deck.mjs`, Git, GitHub connector.

## Global Constraints

- Theme name: `Jieni Ivory`; slug: `jieni-ivory`.
- Root selector: `<html lang="zh-CN" data-theme="jieni-ivory">`.
- Palette: paper `#f3efe6`, secondary paper `#e8e1d5`, ink `#171612`, muted `#625d54`, accent `#845b20`, accent-soft `#ded0b5`.
- Normal text and captions must remain at least 4.5:1 after alpha and ancestor-opacity composition; large display text and graphical emphasis must remain at least 3:1.
- Gold coverage stays below roughly 8% of an Ivory board and below roughly 10% of a Gold board.
- Use solid antique gold on Ivory; do not make the dark theme's metallic gradient the default light-theme treatment.
- Use fine multiply-blended paper grain, localized low-opacity warm wash, and no page-wide fog.
- Preserve current Editorial typography, minimum font sizes, root-level default theme selection, and all existing layouts.
- A deliberate Jieni family package may contain at most two Gold posters, normally first and last; all body posters inherit Ivory.
- The Jieni family is the only documented per-poster palette exception. Do not generalize arbitrary theme mixing.
- Report 8 Editorial palettes (6 light + 2 dark) plus 4 Swiss accents: 12 presets total.
- Preserve all historical theme counts in release notes; change current-state facts only.
- Do not add a template, visual mode, font, bitmap texture, layout recipe, Swiss accent, or runtime dependency.
- Continue work on `agent/add-jieni-gold-theme` and update Draft PR #1; do not merge it.

---

### Task 1: Capture the Baseline Selection Failure

**Files:**
- Read: `SKILL.md`
- Read: `references/theme-presets.md`
- Record ignored evidence: `.superpowers/sdd/2026-08-13-jieni-ivory-theme/task-1-report.md`

**Interfaces:**
- Consumes: the current skill before Ivory implementation.
- Produces: attributable evidence that dense Jieni content currently has no reading-first companion theme.

- [ ] **Step 1: Capture the current fresh-agent routing baseline**

Run a fresh no-fork agent against the current branch with this exact prompt and keep the attributable transcript under the ignored SDD workspace:

```text
Use this repository's social-card skill to plan an 8-card Xiaohongshu tutorial titled “Build a Reliable Agent Harness.” It contains screenshots, a process diagram, two dense explanatory cards, and a final personal-brand CTA. The user likes the Jieni black/white/grey/warm-gold visual identity but does not name a theme. State the selected root theme, whether any page uses a second theme, the exact HTML attributes, and the readability restraints. Do not edit or render files.
```

Expected baseline: the current skill selects `jieni-gold` for the whole package because `jieni-ivory` does not exist. Record agent identity, model, `fork_turns=none`, branch HEAD, exact prompt, and verbatim answer.

- [ ] **Step 2: Verify the baseline did not modify the repository**

```bash
git status --porcelain=v1 --untracked-files=all
git diff --check
```

Expected: no visible change. The attributable transcript and analysis live only in the ignored task report. Task 1 creates no commit.

---

### Task 2: Implement the Ivory Seed and Section-Safe Jieni Family

**Files:**
- Modify: `assets/template-editorial-card.html`
- Modify: `scripts/check-skill-docs.mjs`
- Test: `npm run test:docs`
- Test: `npm run test:contrast`

**Interfaces:**
- Consumes: Task 1 baseline evidence; existing Gold token block and atmosphere/component overrides.
- Produces: root `jieni-ivory`, exact material behavior, contrast-safe shared components, and a Gold section override that wins inside an Ivory root.

- [ ] **Step 1: Add the failing seed, token, and section-scope checks**

Append these checks beside the existing Jieni Gold checks:

```js
mustInclude(editorialSeed, '[data-theme="jieni-ivory"]', "Jieni Ivory theme selector");
for (const token of [
  "--paper:     #f3efe6;",
  "--paper-2:   #e8e1d5;",
  "--ink:       #171612;",
  "--muted:     #625d54;",
  "--line:      rgba(23,22,18,.18);",
  "--accent:    #845b20;",
  "--accent-soft: #ded0b5;",
  "--ink-rgb: 23,22,18;",
  "--paper-rgb: 243,239,230;",
  "--accent-rgb: 132,91,32;",
]) {
  mustInclude(editorialSeed, token, `Jieni Ivory token ${token}`);
}
for (const [selector, label] of [
  ['[data-theme="jieni-ivory"] .grain', "Jieni Ivory grain override"],
  ['[data-theme="jieni-ivory"] .paper-wash', "Jieni Ivory paper wash"],
  ['[data-theme="jieni-ivory"] canvas.mag-bg', "Jieni Ivory localized WebGL"],
  ['[data-theme="jieni-ivory"] .frame-img', "Jieni Ivory image treatment"],
  ['[data-theme="jieni-ivory"] .frame-shot', "Jieni Ivory screenshot treatment"],
  ['html[data-theme="jieni-gold"] .grain,', "Jieni Gold root atmosphere scope"],
  ['.poster[data-theme="jieni-gold"] .grain', "Jieni Gold poster atmosphere scope"],
  ['.poster[data-theme="jieni-gold"] .map-pin .card', "Jieni Gold poster map scope"],
  ['.poster[data-theme="jieni-gold"] .beforeafter .ba-block.before', "Jieni Gold poster M15 scope"],
]) {
  mustInclude(editorialSeed, selector, label);
}
```

- [ ] **Step 2: Run the contract and verify RED**

```bash
NPM_CONFIG_CACHE=/tmp/jieni-ivory-npm-cache npm run test:docs
```

Expected: only the new Ivory seed and Gold section-scope checks fail; all 60 prior checks remain green. Save exact output in the task report.

- [ ] **Step 3: Add the Ivory token block**

Place this after the five existing light themes and before the dark-theme guidance:

```css
[data-theme="jieni-ivory"] {
  --paper:     #f3efe6;
  --paper-2:   #e8e1d5;
  --ink:       #171612;
  --muted:     #625d54;
  --line:      rgba(23,22,18,.18);
  --accent:    #845b20;
  --accent-soft: #ded0b5;
  --ink-rgb: 23,22,18;
  --paper-rgb: 243,239,230;
  --accent-rgb: 132,91,32;
}
```

- [ ] **Step 4: Add Ivory material overrides**

Place Ivory rules before the Jieni Gold rules so poster-scoped Gold rules can win later:

```css
[data-theme="jieni-ivory"] .grain {
  opacity: .12;
  mix-blend-mode: multiply;
  background-image: radial-gradient(rgba(23,22,18,.11) .55px, transparent .7px);
  background-size: 3px 3px;
}
[data-theme="jieni-ivory"] .paper-wash {
  background:
    radial-gradient(68% 42% at 18% 16%, rgba(132,91,32,.075), transparent 68%),
    radial-gradient(62% 50% at 82% 72%, rgba(23,22,18,.035), transparent 74%),
    linear-gradient(180deg, rgba(255,255,255,.11), rgba(23,22,18,.025));
}
[data-theme="jieni-ivory"] canvas.mag-bg {
  opacity: .07;
  mix-blend-mode: multiply;
  -webkit-mask-image: radial-gradient(ellipse 62% 50% at 18% 78%, #000 0%, rgba(0,0,0,.68) 40%, transparent 78%);
  mask-image: radial-gradient(ellipse 62% 50% at 18% 78%, #000 0%, rgba(0,0,0,.68) 40%, transparent 78%);
}
[data-theme="jieni-ivory"] .frame-img,
[data-theme="jieni-ivory"] .frame-shot {
  background: #e4dccf;
  box-shadow:
    0 0 0 1px rgba(132,91,32,.22),
    0 18px 48px rgba(23,22,18,.12);
}
```

- [ ] **Step 5: Make Gold atmosphere selectors section-safe without duplicating tokens**

For every current Jieni Gold override—grain, paper wash, canvas, image/screenshot frames, metallic text, map card/legend, and M15 before block—use a root form plus a higher-specificity poster form. Example:

```css
html[data-theme="jieni-gold"] .grain,
.poster[data-theme="jieni-gold"] .grain {
  /* retain the existing Gold declarations byte-for-byte */
}
```

Apply the same selector structure to the remaining Gold rules. Keep the generic token block as `[data-theme="jieni-gold"]`; a poster with this attribute receives the exact registered token set through normal CSS inheritance.

Add deterministic checks for the two representative selector forms:

```js
mustInclude(editorialSeed, 'html[data-theme="jieni-gold"] .grain,', "Jieni Gold root atmosphere scope");
mustInclude(editorialSeed, '.poster[data-theme="jieni-gold"] .grain', "Jieni Gold poster atmosphere scope");
mustInclude(editorialSeed, '.poster[data-theme="jieni-gold"] .map-pin .card', "Jieni Gold poster map scope");
mustInclude(editorialSeed, '.poster[data-theme="jieni-gold"] .beforeafter .ba-block.before', "Jieni Gold poster M15 scope");
```

- [ ] **Step 6: Add Ivory map and M15 compatibility overrides**

```css
[data-theme="jieni-ivory"] .map-pin .card {
  background: rgba(var(--paper-rgb),.94);
}
[data-theme="jieni-ivory"] .map-legend {
  background: rgba(var(--paper-rgb),.92);
}
[data-theme="jieni-ivory"] .beforeafter .ba-block.before {
  opacity: 1;
  border-left-color: rgba(var(--accent-rgb),.52);
}
```

Ensure the poster-scoped Gold versions occur after these declarations and have higher specificity inside an Ivory root.

- [ ] **Step 7: Register the slug in both seed comments**

Change both Editorial theme lists to exactly:

```text
ink-classic | indigo-porcelain | forest-ink | kraft-paper | dune | jieni-ivory | midnight-ink | jieni-gold
```

- [ ] **Step 8: Run the contract and verify GREEN**

```bash
NPM_CONFIG_CACHE=/tmp/jieni-ivory-npm-cache npm run test:docs
```

Expected: every Task 1 check and all 60 pre-existing checks pass. No documentation/routing checks for Task 3 have been added yet.

- [ ] **Step 9: Commit seed and contract changes**

```bash
git add assets/template-editorial-card.html scripts/check-skill-docs.mjs
git commit -m "feat: add Jieni Ivory editorial theme"
```

---

### Task 3: Teach the Skill the Reading-First Routing Boundary

**Files:**
- Modify: `SKILL.md`
- Modify: `references/theme-presets.md`
- Modify: `references/style-system.md`
- Modify: `README.md`
- Modify: `README.en.md`
- Modify: `PRODUCT.md`
- Modify: `HANDOFF.md`
- Modify: `scripts/check-skill-docs.mjs`
- Test: `npm run test:docs`

**Interfaces:**
- Consumes: Task 2 selectors and exact tokens.
- Produces: discoverable density-based routing, the single mixed-package exception, and current-state 8/12 counts without rewriting history.

- [ ] **Step 1: Add failing routing, count, and family checks**

```js
mustInclude("SKILL.md", "Jieni Ivory", "Jieni Ivory discovery name");
mustInclude("SKILL.md", "jieni-ivory", "Jieni Ivory root slug");
mustInclude("references/theme-presets.md", "### Jieni Ivory", "Jieni Ivory preset reference");
mustInclude("references/theme-presets.md", "at most two Gold posters", "Jieni family dark-board cap");
mustInclude("README.md", "12 套主题预设", "Chinese README total theme count");
mustInclude("README.md", "Editorial 8 套", "Chinese README Editorial count");
mustInclude("README.en.md", "12 theme presets", "English README total theme count");
mustInclude("README.en.md", "Editorial 8", "English README Editorial count");
mustInclude("references/style-system.md", "6 light and 2 dark", "Editorial light-dark boundary");
mustInclude("README.md", '<section class="poster xhs" data-theme="jieni-gold">', "Chinese Jieni family exception");
mustInclude("README.en.md", '<section class="poster xhs" data-theme="jieni-gold">', "English Jieni family exception");
mustInclude("HANDOFF.md", "Theme palette 计数：5 + 4 = 9 套。", "historical v0.6 count remains");
mustInclude("HANDOFF.md", "Editorial palette 从 5 套变 6 套。", "historical v0.12 count remains");
```

- [ ] **Step 2: Run the new documentation contract and verify RED**

```bash
NPM_CONFIG_CACHE=/tmp/jieni-ivory-npm-cache npm run test:docs
```

Expected: only the new discovery/current-state checks fail; every seed and pre-existing check stays green.

- [ ] **Step 3: Update concise selection guidance in `SKILL.md`**

Replace the Editorial selection paragraph with wording that contains these exact rules:

```markdown
- Editorial Magazine x E-ink uses one of 8 magazine palettes: Ink Classic, Indigo Porcelain, Forest Ink, Kraft Paper, Dune, Jieni Ivory, Midnight Ink, or Jieni Gold. For the Jieni brand family, use Jieni Ivory for tutorials, explainers, screenshots, processes, data, and sustained mobile reading; use Jieni Gold for sparse launch covers, cinematic hero statements, and brand closes. A multi-page instructional package uses `jieni-ivory` on the root and may use `jieni-gold` only on the first and/or last poster, never for variety.
```

Update the root selector example:

```markdown
- Editorial: `<html data-theme="ink-classic | indigo-porcelain | forest-ink | kraft-paper | dune | jieni-ivory | midnight-ink | jieni-gold">`.
```

- [ ] **Step 4: Add the full preset and family exception to `references/theme-presets.md`**

Add `### Jieni Ivory` with the exact Task 2 token block, contrast table from the design spec, material rules, anti-patterns, and this exact cap sentence:

```markdown
A deliberate Jieni family package may use at most two Gold posters, normally the first cover and final brand card; every unmarked body poster inherits Jieni Ivory. This is the only sanctioned per-poster palette exception.
```

Include the exact HTML sequence from the design spec. Change the general “one theme per package” opening so it names this one exception and continues to prohibit every other palette mix.

- [ ] **Step 5: Update `references/style-system.md`**

State that Editorial now has `6 light and 2 dark` palettes. Keep Midnight Ink and Jieni Gold as the only dark palettes, and add the density-based Ivory/Gold decision rule. Do not call Ivory a third dark palette.

- [ ] **Step 6: Update both READMEs**

Change only current-state counts and tables:

```text
Editorial 8 (6 light + 2 dark) + Swiss 4 = 12 presets
```

Add a Jieni Ivory row with `#f3efe6 / #171612 / #845b20` and reading-first use cases. Add a short Jieni family example showing Ivory root plus optional Gold first/last sections. Keep generic theme-switching examples root-only.

Replace the old broad section-theme negative checks with an exception-aware form in `scripts/check-skill-docs.mjs`:

```js
for (const readme of ["README.md", "README.en.md"]) {
  mustNotMatch(
    readme,
    /<section class="poster(?: [^"]*)?" data-theme="(?!jieni-gold")/,
    `${readme} forbids non-Jieni per-poster theme switching`,
  );
}
```

This must continue to reject every per-poster palette except the exact `jieni-gold` family override.

- [ ] **Step 7: Update product and handoff truth**

In `PRODUCT.md`, move the validated boundary from 11 to 12 and explain that Ivory is allowed because it solves a verified reading/distribution job inside an existing brand family, not because arbitrary customization is now accepted.

In `HANDOFF.md`, add a new current release entry and update current directory/coverage tables to:

```text
Editorial 8 套（6 浅 + 2 暗）+ Swiss 4 套 = 12 套
```

Do not edit v0.12's `5 → 6`, v0.6's `5 + 4 = 9`, or any other historical release count.

- [ ] **Step 8: Run docs tests and stale-current scans**

```bash
NPM_CONFIG_CACHE=/tmp/jieni-ivory-npm-cache npm run test:docs
rg -n "current 11|当前 11|11 theme presets|11 套主题预设|Editorial 7 套|Editorial 7" README.md README.en.md PRODUCT.md HANDOFF.md SKILL.md references
```

Expected: all documentation checks pass. Remaining old counts appear only in explicitly historical release sections or unrelated “11 Xiaohongshu categories” text.

- [ ] **Step 9: Commit routing and documentation**

```bash
git add SKILL.md references/theme-presets.md references/style-system.md README.md README.en.md PRODUCT.md HANDOFF.md scripts/check-skill-docs.mjs
git commit -m "docs: route dense Jieni content to Ivory"
```

---

### Task 4: Expand Real-Browser Contrast Regression to Both Jieni Themes

**Files:**
- Modify: `scripts/check-editorial-contrast.mjs`
- Modify: `package.json` only if the existing `test:contrast` command is missing or incorrect; otherwise leave it unchanged.
- Test: `npm run test:contrast`

**Interfaces:**
- Consumes: tracked seed CSS and Task 2 component overrides.
- Produces: browser-computed 4.5:1 gates for Ivory base text, both paper surfaces, map components, M15 composition, and mixed Gold section precedence.

- [ ] **Step 1: Add Ivory fixtures before changing contrast logic**

Extend the in-memory HTML with:

```html
<section class="poster xhs" data-theme="jieni-ivory" id="ivory-paper">
  <p class="body" id="ivory-ink">Ink body</p>
  <p class="kicker" id="ivory-muted">Muted metadata</p>
  <p id="ivory-accent" style="color:var(--accent);font-size:16px">Accent label</p>
  <!-- include the same map and M15 structures used by the Gold fixture -->
</section>
<section class="poster xhs" data-theme="jieni-ivory" id="ivory-paper-2">
  <div id="ivory-paper-2-surface" style="background:var(--paper-2)">
    <span id="ivory-paper-2-ink" style="color:var(--ink)">Ink</span>
    <span id="ivory-paper-2-muted" style="color:var(--muted)">Muted</span>
    <span id="ivory-paper-2-accent" style="color:var(--accent)">Accent</span>
  </div>
</section>
<section class="poster xhs" data-theme="jieni-gold" id="mixed-gold-proof">
  <div class="grain" id="mixed-gold-grain"></div>
</section>
```

Keep the document root `data-theme="jieni-ivory"` so `mixed-gold-proof` exercises the real nested override.

- [ ] **Step 2: Run the expanded script before compatibility changes if Task 2 is being rebased**

Run:

```bash
PLAYWRIGHT_BROWSERS_PATH=/tmp/jieni-gold-playwright npm run test:contrast
```

Expected RED on any unimplemented Ivory/component or mixed-selector condition. Preserve exact ratios. If Task 2 is already present, use its parent commit in a temporary worktree to demonstrate RED rather than weakening the test.

- [ ] **Step 3: Add exact computed checks**

Reuse `parseColor`, `composite`, `renderedTextColor`, and `contrast`. Add checks for:

```js
const ivoryChecks = [
  ["Ivory ink on paper", "#ivory-ink", "#ivory-paper", 4.5],
  ["Ivory muted on paper", "#ivory-muted", "#ivory-paper", 4.5],
  ["Ivory accent on paper", "#ivory-accent", "#ivory-paper", 4.5],
  ["Ivory ink on paper-2", "#ivory-paper-2-ink", "#ivory-paper-2-surface", 4.5],
  ["Ivory muted on paper-2", "#ivory-paper-2-muted", "#ivory-paper-2-surface", 4.5],
  ["Ivory accent on paper-2", "#ivory-paper-2-accent", "#ivory-paper-2-surface", 4.5],
];
```

Add Ivory map pin name, caption, legend, accent name, and M15 kicker using the same alpha/background/ancestor-opacity composition as the existing Gold checks. Assert the nested Gold poster computes `--paper: #050505`, its grain uses `screen`, and its poster background is the Gold paper token rather than Ivory.

- [ ] **Step 4: Run the browser regression GREEN**

```bash
PLAYWRIGHT_BROWSERS_PATH=/tmp/jieni-gold-playwright NPM_CONFIG_CACHE=/tmp/jieni-ivory-npm-cache npm run test:contrast
```

Expected: all previous 5 Gold checks and all new Ivory/mixed checks pass. The minimum Ivory normal-text ratio must be at least 4.50:1; expected token floor is 4.62:1.

- [ ] **Step 5: Run docs and dependency integrity checks**

```bash
NPM_CONFIG_CACHE=/tmp/jieni-ivory-npm-cache npm run test:docs
git diff --exit-code origin/main...HEAD -- package-lock.json
git diff --check origin/main...HEAD
```

Expected: green; no lockfile change.

- [ ] **Step 6: Commit the browser gate**

```bash
git add scripts/check-editorial-contrast.mjs package.json
git commit -m "test: cover Jieni Ivory rendered contrast"
```

Do not stage `package.json` when it is unchanged.

---

### Task 5: Render and Inspect the Jieni Family at Production Ratios

**Files:**
- Create ignored fixture: `local-tests/jieni-ivory-theme/index.html`
- Create ignored renderer: `local-tests/jieni-ivory-theme/render.mjs`
- Create ignored outputs: `local-tests/jieni-ivory-theme/output/*.png`
- Read: `assets/template-editorial-card.html`
- Test: `validate-social-deck.mjs`

**Interfaces:**
- Consumes: exact tracked seed CSS and mixed-sequence markup.
- Produces: five full-size PNGs, five 360px thumbnails, validator evidence, and visual inspection notes; none are committed.

- [ ] **Step 1: Build the ignored five-board fixture from the seed**

Use `<html data-theme="jieni-ivory">` and these IDs/roles:

```text
jieni-family-cover-xhs   — 1080×1440, poster data-theme=jieni-gold, sparse launch cover
jieni-ivory-body-xhs     — 1080×1440, inherited Ivory, dense tutorial/process page
jieni-ivory-square       — 1080×1080, inherited Ivory, screenshot + data + caption
jieni-ivory-wide         — 2100×900, inherited Ivory, WeChat title + supporting explanation
jieni-family-close-xhs   — 1080×1440, poster data-theme=jieni-gold, sparse CTA close
```

Use real current components: `.kicker`, `.h-display`/`.h-xl`, `.body`, `.frame-shot`, one map or process component, `.beforeafter`, metadata, rules, and footer. Gold boards may use one `.metal-gold` fragment each; Ivory boards use solid accent only.

- [ ] **Step 2: Make the renderer deterministic**

The renderer must:

```js
await page.goto(pathToFileURL(indexPath).href, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);
for (const id of ids) {
  await page.locator(`#${id}`).screenshot({ path: outputPathFor(id) });
}
await browser.close();
```

Close Chromium in `finally`. Generate 360px thumbnails at proportional heights: 480 for XHS, 360 for square, and 154 for wide.

- [ ] **Step 3: Prove the fixture is synchronized with the tracked seed**

Extract the fixture `<style>` and seed `<style>` blocks and compare them byte-for-byte, or generate the fixture style directly from the seed before rendering. Expected: no CSS drift.

- [ ] **Step 4: Render and validate**

```bash
PLAYWRIGHT_BROWSERS_PATH=/tmp/jieni-gold-playwright node local-tests/jieni-ivory-theme/render.mjs
PLAYWRIGHT_BROWSERS_PATH=/tmp/jieni-gold-playwright NPM_CONFIG_CACHE=/tmp/jieni-ivory-npm-cache npm run validate -- local-tests/jieni-ivory-theme --style=editorial
```

Expected: 5 clean sections, 0 failures, 0 warnings.

- [ ] **Step 5: Confirm exact image dimensions**

```bash
identify -format '%f %wx%h %m\n' local-tests/jieni-ivory-theme/output/*.png local-tests/jieni-ivory-theme/output/thumbnails/*.png
```

Expected: three 1080×1440 full-size XHS files, one 1080×1080 square, one 2100×900 wide, plus 360×480 / 360×360 / 360×154 thumbnails as appropriate.

- [ ] **Step 6: Inspect every full-size image and thumbnail**

Use `view_image` on all ten outputs. Reject and iterate if any of these occur:

- body/caption text requires zooming at 360px;
- paper looks grey, muddy, dirty, yellow, or lifestyle-cream;
- gold behaves as a panel rather than an accent;
- grain/WebGL crosses a text quiet zone;
- dark first/last pages look unrelated to Ivory body pages;
- screenshot edges, map labels, M15 kicker, or footer lose contrast;
- light pages lose the premium editorial-cover character.

- [ ] **Step 7: Verify ignored-only fixture status**

```bash
git check-ignore -v local-tests/jieni-ivory-theme/index.html local-tests/jieni-ivory-theme/output/jieni-ivory-wide.png
git status --porcelain=v1 --untracked-files=all
```

Expected: fixture paths are ignored and no fixture/output enters the tracked diff.

---

### Task 6: Forward-Test, Review, Verify, and Update Draft PR #1

**Files:**
- Read: `docs/superpowers/specs/2026-08-13-jieni-ivory-theme-design.md`
- Read: `docs/superpowers/plans/2026-08-13-jieni-ivory-theme.md`
- Verify: every tracked file changed since `origin/main`
- Publish: branch `agent/add-jieni-gold-theme`, Draft PR #1

**Interfaces:**
- Consumes: Tasks 1–5 and their reports/evidence.
- Produces: clean independent review, final verification evidence, and an updated remote Draft PR whose tree matches local HEAD.

- [ ] **Step 1: Repeat the exact fresh-agent scenario from Task 1**

Expected answer:

```text
root: <html data-theme="jieni-ivory">
body pages: inherit Jieni Ivory
optional cover/close: <section class="poster ..." data-theme="jieni-gold">
dark-board cap: at most two, first and/or last
normal/caption contrast: >= 4.5:1
gold: accent only; no gold paragraphs or panels
```

Require exact registered tokens and no invented palette.

- [ ] **Step 2: Request an independent whole-branch review**

Give a fresh reviewer the design spec, plan, `origin/main...HEAD` diff, both theme fixtures, all full-size/thumbnail outputs, and the hard user requirement that brightness must improve without sacrificing readability or brand identity. Require severity-ranked findings with file:line references. Fix every Critical/Important finding, then run one scoped re-review.

- [ ] **Step 3: Run the complete final gate on the exact publish tree**

```bash
NPM_CONFIG_CACHE=/tmp/jieni-ivory-npm-cache npm run test:docs
PLAYWRIGHT_BROWSERS_PATH=/tmp/jieni-gold-playwright NPM_CONFIG_CACHE=/tmp/jieni-ivory-npm-cache npm run test:contrast
PLAYWRIGHT_BROWSERS_PATH=/tmp/jieni-gold-playwright NPM_CONFIG_CACHE=/tmp/jieni-ivory-npm-cache npm run validate -- local-tests/jieni-gold-theme --style=editorial
PLAYWRIGHT_BROWSERS_PATH=/tmp/jieni-gold-playwright NPM_CONFIG_CACHE=/tmp/jieni-ivory-npm-cache npm run validate -- local-tests/jieni-ivory-theme --style=editorial
git diff --check origin/main...HEAD
git diff --exit-code origin/main...HEAD -- package-lock.json
git status -sb
git status --porcelain=v1 --untracked-files=all
```

Expected: every test green, both fixtures clean with zero validator warnings, no lockfile delta, and no tracked/untracked visible changes.

- [ ] **Step 4: Confirm the remote base and existing Draft PR head**

Through the GitHub connector, verify:

```text
repository: geekjourneyx/guizang-social-card-skill
base: main
PR: #1, draft, open
head branch: agent/add-jieni-gold-theme
remote head parent before update: current PR head
```

Stop if `main` moved from the verified merge base; rebase and rerun the final gate rather than forcing a ref.

- [ ] **Step 5: Publish the exact local tree as a fast-forward PR update**

Because HTTPS Git credentials are unavailable, use the GitHub connector's blob/tree/commit/ref operations:

1. Create blobs for every path in `git diff --name-only origin/main...HEAD`.
2. Create a tree based on current remote `main`'s tree.
3. Assert the returned tree SHA equals `git rev-parse HEAD^{tree}`.
4. Create one intentional commit with the current PR head as parent.
5. Move `agent/add-jieni-gold-theme` with `force:false`.
6. Do not create a second PR and do not mark PR #1 ready or merge it.

- [ ] **Step 6: Update and re-read Draft PR #1**

Update the title/body to describe both Jieni themes, 12 total presets, the mixed-sequence cap, docs/contrast/validator results, and ignored visual fixtures. Re-fetch the PR and compare:

```text
draft = true
mergeable_state = clean
head.sha = newly created remote commit
changed_files = local diff path count
head commit tree = local HEAD tree
```

- [ ] **Step 7: Report the remaining repository metadata follow-up**

The connector currently has no repository-description mutation. Report that GitHub About still needs `10 themes` changed to `12 themes`; do not claim it was updated.

---

## Final Acceptance Checklist

- [ ] `jieni-ivory` exists as a root Editorial theme with exact approved tokens.
- [ ] Current docs say 8 Editorial / 12 total and preserve historical counts.
- [ ] Skill routing selects Ivory for dense reading and Gold for sparse covers.
- [ ] Mixed Jieni packages contain no more than two Gold posters and use no duplicated Gold token block.
- [ ] Browser-computed normal/caption contrast is at least 4.5:1 for both Jieni themes and affected components.
- [ ] Gold fixture remains 3/3 clean; Ivory family fixture is 5/5 clean; both report zero validator warnings.
- [ ] All sixteen relevant full-size/thumbnail images are visually inspected (six existing Gold outputs plus ten new family outputs; where a Gold output is reused, count unique files and document the reuse rather than double-counting).
- [ ] Final independent review has no open Critical or Important findings.
- [ ] Local publish tree and remote PR tree SHA match exactly.
- [ ] Draft PR #1 remains draft and unmerged.
