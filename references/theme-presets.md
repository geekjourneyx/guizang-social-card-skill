# Theme Presets

Use one theme for one image package. The only sanctioned exception is a deliberate Jieni family sequence: an Ivory-root package may use Jieni Gold only on its first and/or last poster as specified below. Do not mix any other palettes across pages, including for a deliberate multi-chapter system.

## Editorial Magazine x E-ink Palettes

These are adapted from the Guizang PPT electronic-magazine mode for static Rednote and WeChat images.

### Ink Classic

Use for business commentary, AI essays, product thinking, and neutral editorial posts.

```css
:root {
  --paper: #f3f0e8;
  --paper-2: #ebe6da;
  --ink: #0a0a0b;
  --muted: #68625a;
  --line: rgba(10,10,11,.22);
  --accent: #111111;
  --accent-soft: #d8d2c6;
}
```

### Indigo Porcelain

Use for technology, research, data, AI infrastructure, and calm analytical writing.

```css
:root {
  --paper: #f2f4f5;
  --paper-2: #e5ebef;
  --ink: #0a1f3d;
  --muted: #5f6d78;
  --line: rgba(10,31,61,.20);
  --accent: #315d93;
  --accent-soft: #d7e1ec;
}
```

### Forest Ink

Use for hiking, outdoor, nature, sustainability, personal field notes, and grounded lifestyle posts.

```css
:root {
  --paper: #f5f1e8;
  --paper-2: #e8dfcf;
  --ink: #16251b;
  --muted: #5d665d;
  --line: rgba(22,37,27,.22);
  --accent: #2e6b4f;
  --accent-soft: #d4dfd2;
}
```

### Kraft Paper

Use for memory, craft, personal essays, old objects, creator notes, and warm low-tech topics.

```css
:root {
  --paper: #eedfc7;
  --paper-2: #dfc9a8;
  --ink: #2a1e13;
  --muted: #755f49;
  --line: rgba(42,30,19,.24);
  --accent: #9b5a2e;
  --accent-soft: #d5b58f;
}
```

### Dune

Use for design, object studies, portfolio-like covers, gallery tone, and restrained aesthetic posts.

```css
:root {
  --paper: #f0e6d2;
  --paper-2: #ded0b7;
  --ink: #1f1a14;
  --muted: #6f6557;
  --line: rgba(31,26,20,.22);
  --accent: #8f7650;
  --accent-soft: #d4c2a4;
}
```

### Jieni Ivory

Use for Jieni-family tutorials, explainers, screenshots, processes, data, long carousels, and WeChat infographics when sustained mobile reading or information density matters. It is the light, reading-first companion to Jieni Gold: warm ivory paper, black ink, restrained antique gold, and a bright editorial reading surface.

```css
[data-theme="jieni-ivory"] {
  --paper: #f3efe6;
  --paper-2: #e8e1d5;
  --ink: #171612;
  --muted: #625d54;
  --line: rgba(23,22,18,.18);
  --accent: #845b20;
  --accent-soft: #ded0b5;
  --ink-rgb: 23,22,18;
  --paper-rgb: 243,239,230;
  --accent-rgb: 132,91,32;
}
```

Contrast is a hard acceptance gate:

| Foreground | On `#f3efe6` | On `#e8e1d5` | Required use |
| --- | ---: | ---: | --- |
| Ink `#171612` | 15.78:1 | 13.93:1 | Body, headings, captions |
| Muted `#625d54` | 5.70:1 | 5.03:1 | Metadata and supporting copy |
| Accent `#845b20` | 5.23:1 | 4.62:1 | Small labels, numbers, rules, highlights |

- Normal text and captions must be at least 4.5:1 after alpha and ancestor-opacity composition; large display text and non-text graphical emphasis must be at least 3:1.
- Validate at full export size and 360px-wide thumbnails. Do not create cream-on-cream text, low-opacity gold captions, or group opacity that pushes text below the threshold.

Material rules:

- Use fine, low-opacity paper grain with `multiply` blending; it is material, never noise over small text.
- Use a localized warm wash, extremely subtle edge vignette, and optional low-opacity localized WebGL atmosphere; never reuse dark-theme volumetric fog or a page-wide glow.
- Use thin antique-gold or ink rules, plus a soft editorial shadow and 1px warm outline around screenshots and images. Do not lower source-image brightness globally.
- Use solid `--accent` on Ivory; the dark theme's metallic text gradient is not the default light-theme treatment.

Anti-patterns:

- Keep gold below roughly 8% of the board. Large reading surfaces stay ivory: no gold panels or extensive tan cards.
- Avoid pure white, yellow cream, pink-beige, rounded lifestyle cards, tape/sticker decoration, glassmorphism, neon, and luxury-product gloss.
- Preserve Editorial serif display, light weights, and disciplined spacing. Negative space must support hierarchy, not reduce necessary body copy below current font-size limits.

The standard architecture remains a package-wide root theme:

```html
<html lang="zh-CN" data-theme="jieni-ivory">
```

A deliberate Jieni family package may use at most two Gold posters, normally the first cover and final brand card; every unmarked body poster inherits Jieni Ivory. This is the only sanctioned per-poster palette exception.

```html
<html lang="zh-CN" data-theme="jieni-ivory">
  <section class="poster xhs" data-theme="jieni-gold">...</section>
  <section class="poster xhs">...</section>
  <section class="poster xhs">...</section>
  <section class="poster xhs" data-theme="jieni-gold">...</section>
</html>
```

### Midnight Ink

Midnight Ink and Jieni Gold are the two sanctioned dark Editorial palettes with separate roles. Use Midnight Ink for game key art, night photography, cinematic covers, and dark cultural pieces — content whose source imagery is already dark and would be diminished by paper backgrounds. Use Jieni Gold for sparse launch covers, cinematic hero statements, and brand closes; use Jieni Ivory for tutorials, explainers, screenshots, processes, data, and sustained mobile reading. Do not improvise another dark palette.

```css
:root {
  --paper: #0e0d0c;
  --paper-2: #1a1714;
  --ink: #ece2cf;
  --muted: #9a8c75;
  --line: rgba(236,226,207,.22);
  --accent: #d4a04a;
  --accent-soft: #3a2a14;
}
```

Midnight Ink **must** also override two background layers — light-paper math does not carry over:

```css
[data-theme="midnight-ink"] .grain {
  opacity: .26;
  mix-blend-mode: screen;
  background-image: radial-gradient(rgba(255,244,214,.10) 1px, transparent 1px);
}
[data-theme="midnight-ink"] .paper-wash {
  background:
    radial-gradient(80% 50% at 28% 16%, rgba(212,160,74,.12), transparent 64%),
    radial-gradient(70% 60% at 80% 86%, rgba(60,40,20,.20), transparent 72%),
    linear-gradient(180deg, rgba(236,226,207,.02), rgba(0,0,0,.32));
}
[data-theme="midnight-ink"] .frame-img {
  background: #18120f;
  box-shadow: 0 0 0 1px rgba(236,226,207,.10);
}
```

The seed `template-editorial-card.html` ships these overrides — just switch `data-theme` and they apply automatically.

### Jieni Gold

Use Jieni Gold for sparse launch covers, cinematic hero statements, and brand closes. Use Jieni Ivory for Jieni-family tutorials, explainers, screenshots, processes, data, and sustained mobile reading. Gold is the near-black Editorial route: warm white and grey type, sparse warm gold, and controlled cinematic light.

```css
:root {
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

- Build atmosphere with fine screen-blended grain, localized haze, a vignette, and narrow rim light.
- Use dark-background images with shallow depth of field, warm rim light, and a quiet zone for type.
- Use one `.metal-gold` fragment per board.
- Keep gold below roughly 10%; never use gold paragraphs, neon blue or purple, glass, large flares, or gold panels.

Magazine palette rules:

- Use `--paper` as the main background and `--ink` as primary type.
- Use `--accent` sparingly: section marker, page number, pull quote rule, or one highlighted phrase.
- `--paper-2` can support photo wells, issue strips, or checklist bands.
- Light palettes (the first six): do not turn into beige-on-beige. Maintain real contrast.
- Midnight Ink: do not stack opaque cards or fills on the page. Dark Editorial relies on photo bleeds + warm gilt accent for hierarchy, not background blocks.
- Jieni Gold: keep the near-black field open; let quiet image space, controlled haze, and one metallic fragment carry the hierarchy rather than gold panels.

## Swiss International Palettes

These are adapted from the Guizang PPT Swiss mode.

### IKB Blue

Default for AI, technology, product updates, design, and engineering topics.

```css
:root {
  --paper: #fafaf8;
  --ink: #0a0a0a;
  --grey-1: #f0f0ee;
  --grey-2: #d4d4d2;
  --grey-3: #737373;
  --accent: #002FA7;
  --accent-on: #ffffff;
}
```

### Lemon Yellow

Use for young, consumer, active, retail, sporty, or playful information.

```css
:root {
  --paper: #fafaf8;
  --ink: #0a0a0a;
  --grey-1: #f0f0ee;
  --grey-2: #d4d4d2;
  --grey-3: #737373;
  --accent: #FFD500;
  --accent-on: #0a0a0a;
}
```

### Lemon Green

Use for ecology, future, emerging tech, health, and highlighter-like contemporary topics.

```css
:root {
  --paper: #fafaf8;
  --ink: #0a0a0a;
  --grey-1: #f0f0ee;
  --grey-2: #d4d4d2;
  --grey-3: #737373;
  --accent: #C5E803;
  --accent-on: #0a0a0a;
}
```

### Safety Orange

Use for industrial, warning, urgency, risk, decision points, and sharp corrections.

```css
:root {
  --paper: #fafaf8;
  --ink: #0a0a0a;
  --grey-1: #f0f0ee;
  --grey-2: #d4d4d2;
  --grey-3: #737373;
  --accent: #FF6B35;
  --accent-on: #ffffff;
}
```

Swiss palette rules:

- Use exactly one `--accent`.
- Do not use gradients, shadows, glass, or mixed accent colors.
- If the accent is yellow or green, text on accent must use `--accent-on: #0a0a0a`.
- Prefer pure blocks, hairline rules, and grid rhythm.
