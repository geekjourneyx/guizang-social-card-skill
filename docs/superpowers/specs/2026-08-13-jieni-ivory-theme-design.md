# Jieni Ivory Theme Design

## Goal

Add `Jieni Ivory` (`jieni-ivory`) as the light, reading-first companion to `Jieni Gold`. The pair forms one branded Editorial family: Ivory carries tutorials, explanatory carousels, screenshots, diagrams, tables, and dense WeChat information; Gold remains the sparse, cinematic cover and brand-statement treatment.

The new theme must improve feed brightness and sustained mobile reading without becoming a generic white template, beige lifestyle card, cream e-commerce layout, or nostalgic scrapbook. It keeps the same Jieni identity through warm paper, disciplined black typography, deep antique gold, editorial grids, fine paper texture, quiet studio light, and large but functional negative space.

## Product Positioning

| Theme | Primary job | Default content density | Visual character |
| --- | --- | --- | --- |
| `jieni-ivory` | Tutorials, explainers, screenshots, processes, data, long carousels, WeChat infographics | Medium to high | Warm ivory paper, black ink, restrained antique gold, bright editorial reading surface |
| `jieni-gold` | Launch covers, sparse opinion cards, hero statements, personal-brand openings and closings | Low to medium | Near-black field, warm-white type, localized haze, rim light, sparse metallic gold |

After this change, the project contains 8 Editorial palettes and 4 Swiss accents: 12 presets in total. Editorial contains 6 light palettes and 2 sanctioned dark palettes.

`Jieni Ivory` is the default Jieni choice when reading duration or information density matters. `Jieni Gold` remains available and is not replaced or lightened.

## Visual Contract

### Theme tokens

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

The background is warm ivory rather than pure white. The accent is deliberately darker than the dark theme's gold so it remains readable at normal text sizes on both `--paper` and `--paper-2`.

### Contrast contract

WCAG 2.x contrast is a hard acceptance gate, not an aesthetic suggestion:

| Foreground | On `#f3efe6` | On `#e8e1d5` | Required use |
| --- | ---: | ---: | --- |
| Ink `#171612` | 15.78:1 | 13.93:1 | Body, headings, captions |
| Muted `#625d54` | 5.70:1 | 5.03:1 | Metadata and supporting copy |
| Accent `#845b20` | 5.23:1 | 4.62:1 | Small labels, numbers, rules, highlights |

- Normal text and captions must be at least 4.5:1 after alpha and ancestor-opacity composition.
- Large display text and non-text graphical emphasis must be at least 3:1.
- Do not create cream-on-cream text, low-opacity gold captions, or group opacity that pushes text below the threshold.
- Validate at full export size and 360px-wide thumbnails.

### Atmosphere and material

- Use fine, low-opacity paper grain with `multiply` blending. Grain must remain visible only as material, never as noise over small text.
- Use a localized warm wash and extremely subtle edge vignette. Do not reuse dark-theme volumetric fog or a page-wide glow.
- Keep WebGL atmosphere optional, low-opacity, localized, and `multiply` blended. It must not reduce the text quiet zone or make the paper look dirty.
- Use thin antique-gold or ink rules, not broad gold blocks.
- Use a soft editorial shadow and 1px warm outline around screenshots and images. Do not lower source-image brightness globally.
- Use solid `--accent` on the light theme. The dark theme's metallic text gradient is not the default light-theme treatment.

### Restraint rules

- Gold remains below roughly 8% of the light board.
- Large reading surfaces stay ivory; do not use gold panels or extensive tan cards.
- Avoid pure white, yellow cream, pink-beige, rounded lifestyle cards, tape/sticker decoration, glassmorphism, neon, and luxury-product gloss.
- Preserve the current Editorial serif display, light weights, and disciplined spacing.
- Negative space must support hierarchy; it cannot reduce necessary body copy below current font-size limits.

## Jieni Family Sequence

The standard architecture remains a package-wide root theme:

```html
<html lang="zh-CN" data-theme="jieni-ivory">
```

For a deliberate Jieni brand sequence, one package may use at most two dark boards—normally the first cover and final brand card—by overriding those poster sections:

```html
<html lang="zh-CN" data-theme="jieni-ivory">
  <section class="poster xhs" data-theme="jieni-gold">...</section>
  <section class="poster xhs">...</section>
  <section class="poster xhs">...</section>
  <section class="poster xhs" data-theme="jieni-gold">...</section>
</html>
```

All unmarked posters inherit Ivory. This is the only documented per-poster palette exception; arbitrary theme mixing remains prohibited.

To make the exception deterministic, Gold's atmosphere/component selectors must support both root and poster scope, and must override the enclosing Ivory atmosphere when applied to a poster. No Gold token values may be duplicated into a new `tone` class.

## Architecture

Extend `assets/template-editorial-card.html`; do not add another seed template or visual mode.

The implementation contains:

1. A `jieni-ivory` token block.
2. Ivory-specific grain, paper wash, localized WebGL, image, and screenshot treatments.
3. Section-safe selector forms for the existing Jieni Gold overrides so intentional first/last dark boards inherit the exact registered Gold tokens and effects.
4. Existing map and M15 contrast compatibility under both Jieni themes.
5. Browser-computed contrast regression tests sourced from the tracked seed CSS.

No bitmap texture, font, or new JavaScript runtime dependency is required.

## Skill Discovery and Routing

Keep the discovery rule concise in `SKILL.md`:

- Select `Jieni Ivory` for AI, Agent, Harness, open-source, product, and personal-brand content when the package is instructional, screenshot-heavy, data-heavy, or intended for sustained mobile reading.
- Select `Jieni Gold` when the artifact is a sparse cover, launch statement, cinematic hero, or brand close.
- For a multi-page Jieni instructional carousel, use Ivory as the root; Gold may appear only on the first and/or last board.
- Do not mix Jieni themes merely for variety.

Put exact tokens, material rules, contrast rules, and mixed-sequence markup in `references/theme-presets.md`.

## Documentation Changes

Update current-state facts while preserving historical release notes:

- `README.md`: 8 Editorial / 12 total, new theme row, density-based selection guidance, directory counts, and Jieni family sequence.
- `README.en.md`: English equivalents.
- `SKILL.md`: 8-palette discovery list, `jieni-ivory` slug, and reading-density routing.
- `references/theme-presets.md`: full Ivory visual contract and the only sanctioned mixed-theme exception.
- `references/style-system.md`: 6 light + 2 dark Editorial palettes and Jieni family routing.
- `PRODUCT.md`: move the validated palette boundary from 11 to 12 and record why the reading-first companion is allowed.
- `HANDOFF.md`: update current coverage and add a new release entry; preserve all old counts as historical facts.
- Repository About description: change the stale theme total to 12 after publication when a metadata-capable interface is available.

## Test Strategy

### Contract tests first

Extend `scripts/check-skill-docs.mjs` before implementation. New checks must fail because `jieni-ivory`, 8 Editorial, and 12 total are not present.

The checks lock:

- the complete Ivory token set;
- theme-specific material selectors;
- root slug and selection guidance;
- 8 Editorial / 12 total current-state counts;
- the 6-light / 2-dark boundary;
- the constrained Jieni family sequence and two-dark-board maximum;
- unchanged historical counts.

### Browser-computed contrast

Extend `scripts/check-editorial-contrast.mjs` so the tracked seed CSS is rendered in Chromium for both themes. Include Ivory body/muted/accent text on both paper surfaces plus map pin, map caption, map legend, accent pin, and M15 kicker composition. All normal/caption cases use a 4.5:1 gate.

### Visual fixture

Create an ignored fixture under `local-tests/jieni-ivory-theme/` and render:

1. one Gold 3:4 launch cover;
2. one Ivory 3:4 tutorial body page;
3. one Ivory 1:1 screenshot/data card;
4. one Ivory 21:9 WeChat cover;
5. one Gold 3:4 closing card.

Inspect full-size outputs and 360px-wide thumbnails. Acceptance requires immediate legibility in a feed, no muddy paper, no cream-on-cream regions, no footer collision, restrained gold, and obvious family resemblance between dark and light boards.

### Forward selection test

A fresh agent receives a screenshot-heavy, eight-card Harness tutorial request with the user's Jieni brand preference but no theme name. It must choose `jieni-ivory` as the root, may use `jieni-gold` only for the first/last card, and must state the contrast and restraint rules.

## Out of Scope

- Replacing or lightening `Jieni Gold`.
- Adding another template, style mode, font, layout recipe, or Swiss accent.
- General arbitrary theme mixing.
- Automatic per-page theme selection in JavaScript.
- Bitmap paper textures.
- Redesigning existing non-Jieni light palettes.

## Acceptance Criteria

1. `Jieni Ivory` is selectable with `jieni-ivory` on the root `<html>` element.
2. Current documentation reports 8 Editorial palettes and 12 total presets; historical counts remain historical.
3. Normal/caption text remains at least 4.5:1 after real CSS alpha and ancestor-opacity composition.
4. Ivory renders cleanly at 3:4, 1:1, and 21:9, including 360px-wide review.
5. The skill routes dense and instructional Jieni content to Ivory and sparse cinematic covers to Gold.
6. A deliberate Jieni sequence supports no more than two Gold boards, normally first and last, without duplicating Gold tokens.
7. Existing palettes and layout behavior do not regress.
