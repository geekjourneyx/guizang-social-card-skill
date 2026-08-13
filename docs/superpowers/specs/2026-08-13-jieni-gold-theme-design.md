# Jieni Gold Theme Design

## Goal

Add `Jieni Gold` (`jieni-gold`) as a branded Editorial Magazine × E-ink theme for AI, Agent, Harness Engineering, open-source launches, product commentary, and personal-brand covers.

The theme must feel cinematic, restrained, and editorial: near-black negative space, warm-white type, quiet grey support text, sparse warm-gold accents, paper grain, localized volumetric haze, narrow rim light, and occasional metallic detail. It must not read as gaming key art, neon technology art, luxury e-commerce, or a generic black-and-gold template.

## Product Positioning

`Jieni Gold` is the second sanctioned dark Editorial palette and does not replace `Midnight Ink`.

| Theme | Primary role | Visual character |
| --- | --- | --- |
| `midnight-ink` | Game art, night photography, dark cultural and cinematic source imagery | Brown-black paper, gilt warmth, image-led atmosphere |
| `jieni-gold` | AI, Harness Engineering, open source, product launches, personal brand | Absolute black, warm white, neutral grey, sparse warm gold, controlled studio light |

After the change, the project contains 7 Editorial palettes and 4 Swiss accents: 11 presets in total. Product guidance must say that Editorial has two sanctioned dark palettes with distinct routing rules.

## Visual Contract

### Theme tokens

```css
[data-theme="jieni-gold"] {
  --paper: #050505;
  --paper-2: #0d0d0c;
  --ink: #f1efe8;
  --muted: #8a8780;
  --line: rgba(201,164,92,.22);
  --accent: #c9a45c;
  --accent-soft: #2a2113;
  --ink-rgb: 241,239,232;
  --paper-rgb: 5,5,5;
  --accent-rgb: 201,164,92;
}
```

The palette uses only near-black, warm white, neutral grey, and warm gold. Gold must remain an accent rather than a surface color.

### Atmosphere

- Render paper grain with low-opacity `screen` blending and fine warm specks.
- Render volumetric haze as localized radial light, biased to one side or behind the title. Do not create a page-wide glow.
- Use a dark vignette to preserve low luminance and negative space.
- Give image wells a `1px` low-opacity gold outline and extremely weak warm glow.
- Use dark, shallow-depth-of-field photography with a warm rim light and enough quiet space for type.
- Keep the existing Editorial serif display, light weight, and generous tracking.

### Metallic accent

Add a `.metal-gold` utility that uses a restrained dark-gold-to-warm-highlight gradient with `background-clip:text`. Limit it to one title fragment, number, or symbol per board. Body copy, cards, and large surfaces must continue to use solid tokens.

### Restraint rules

- Keep visible gold coverage below roughly 10% of the board.
- Use no neon blue or purple, glassmorphism, glossy gold panels, oversized lens flares, or saturated yellow.
- Use at most one metallic text treatment per board.
- Preserve large black negative-space regions.
- Use warm white for the main title and grey for supporting copy; do not set whole paragraphs in gold.

## Architecture

Extend the existing `assets/template-editorial-card.html`; do not add a third template or a third style mode.

Theme selection remains package-wide on the document root:

```html
<html lang="zh-CN" data-theme="jieni-gold">
```

The template will contain:

1. The `jieni-gold` token block.
2. Theme-specific `.grain`, `.paper-wash`, `.frame-img`, and `.frame-shot` overrides.
3. The `.metal-gold` utility scoped to `jieni-gold`.
4. Updated theme-option comments at the top and bottom of the seed.

No bitmap background asset is required. Grain, haze, vignette, rim light, and metallic text are deterministic CSS effects. Shallow depth of field remains an image-selection rule, not a blur applied to user content.

## Skill Discovery

Keep the selection rule concise in `SKILL.md`: list `Jieni Gold` among Editorial palettes, register `jieni-gold` in the root attribute example, and route AI, Agent, Harness, open-source, product-launch, and personal-brand requests to it when the user wants a black, cinematic, premium editorial treatment.

Keep exact colors, atmosphere behavior, metallic limits, and anti-patterns in `references/theme-presets.md` so the large reference loads only when theme selection or implementation needs it.

Update `references/style-system.md` to describe two sanctioned dark Editorial palettes. Remove the obsolete rule that Midnight Ink is the only official dark palette.

## Documentation Changes

Update the following current-state facts without rewriting historical release notes:

- `README.md`: 7 Editorial / 11 total, theme table, selection guidance, directory counts.
- `README.en.md`: English equivalents.
- `SKILL.md`: discovery list and root attribute values.
- `references/theme-presets.md`: full Jieni Gold specification.
- `references/style-system.md`: two-dark-theme routing rule.
- `PRODUCT.md`: replace the 10-palette ceiling and single-dark-theme boundary.
- `HANDOFF.md`: update the current coverage table and add a new release entry; preserve old version-history counts as historical facts.
- Repository About description: replace `10 themes` with `11 themes` after code is published.

Correct README theme-switching examples to use `<html data-theme="...">` or `<html data-accent="...">`, matching the seeds, `SKILL.md`, and validator style detection.

## Test Strategy

### RED: contract tests first

Extend `scripts/check-skill-docs.mjs` before adding the theme. The new checks must fail against the current repository because `jieni-gold` is absent.

The checks will require:

- `[data-theme="jieni-gold"]` in the Editorial seed.
- The complete token set, including all three RGB tokens.
- Theme-specific grain, paper-wash, image-well, and `.metal-gold` selectors.
- `jieni-gold` in `SKILL.md` and `references/theme-presets.md`.
- Current-state counts of 7 Editorial palettes and 11 total presets in both READMEs.
- A two-dark-theme rule in `references/style-system.md`.
- Root-level theme-switching examples rather than section-level examples.

Run `npm run test:docs` and record the expected failure before implementing the theme.

### GREEN: implementation and deterministic checks

Add the smallest template and documentation changes that satisfy the contract. Run:

```bash
npm ci
npm run test:docs
```

### Visual and layout validation

Create an ignored test deck under `local-tests/jieni-gold-theme/`, copied from the Editorial seed and set to `data-theme="jieni-gold"`. Render representative 3:4, 1:1, and 21:9 boards covering:

- a large editorial title with one metallic word;
- a dark product or portrait image well with rim light;
- supporting text, rules, metadata, and one gold numeric accent;
- large negative-space regions.

Run:

```bash
npm run validate -- local-tests/jieni-gold-theme --style=editorial
```

Inspect the full-size renders and 360px-wide thumbnails. Acceptance requires readable type, no overflow, no footer collision, controlled gold coverage, no neon or e-commerce feel, and clear separation from Midnight Ink.

### Skill forward test

Test a fresh request for a black, cinematic AI/Harness launch carousel. Before the change, the skill should select Midnight Ink or lack a matching formal preset. After the change, it should select `Jieni Gold`, use the correct root attribute, and apply the restraint rules without inventing extra colors.

## Out of Scope

- A third visual mode or third seed template.
- New layout recipes.
- New fonts.
- Bitmap texture assets.
- Changing Swiss palettes.
- Replacing or visually redesigning Midnight Ink.

## Acceptance Criteria

1. `Jieni Gold` is selectable through `jieni-gold` on the root `<html>` element.
2. The theme renders consistently at 3:4, 1:1, and 21:9.
3. The skill routes intended AI, Harness, open-source, launch, and personal-brand requests to it.
4. The theme stays within the black, warm-white, grey, and warm-gold system.
5. Metallic treatment is optional, localized, and limited to one element per board.
6. All document-contract and layout checks pass.
7. Current documentation reports 7 Editorial palettes and 11 total presets while historical version notes remain unchanged.
