#!/usr/bin/env node
import fs from "node:fs";
import { chromium } from "playwright";

const MIN_NORMAL_TEXT_CONTRAST = 4.5;
const seed = fs.readFileSync("assets/template-editorial-card.html", "utf8");
const style = seed.match(/<style>([\s\S]*?)<\/style>/)?.[1];
const mountScript = [...seed.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)]
  .map((match) => match[1])
  .find((script) => script.includes("function mountAll()"));

if (!style) {
  throw new Error("Editorial seed must contain an inline <style> block");
}
if (!mountScript) {
  throw new Error("Editorial seed must contain the MagazineBg mount script");
}

function componentFixture(prefix) {
  return `
    <div class="map-block" id="${prefix}-map-fixture">
      <div class="map-pin" style="left:20%;top:20%">
        <div class="card">
          <span class="name" id="${prefix}-map-pin-name">Ink pin</span>
          <span class="meta" id="${prefix}-map-pin-meta">Muted caption</span>
        </div>
      </div>
      <div class="map-pin accent" style="left:60%;top:40%">
        <div class="card">
          <span class="name" id="${prefix}-map-pin-accent-name">Accent pin</span>
        </div>
      </div>
      <div class="map-legend" id="${prefix}-map-legend">Muted legend</div>
    </div>
    <div class="beforeafter">
      <div class="ba-block before" id="${prefix}-m15-before">
        <p class="kicker" id="${prefix}-m15-before-kicker">Before baseline</p>
      </div>
      <div class="ba-block"><p class="kicker">After result</p></div>
    </div>`;
}

const goldFixture = `<!doctype html>
<html lang="en" data-theme="jieni-gold">
<head><meta charset="utf-8"><style>${style}</style></head>
<body>
  <section class="poster xhs" id="contrast-fixture">
    <div class="content" style="display:grid;grid-template-rows:620px 560px;gap:40px">
      ${componentFixture("gold")}
    </div>
    <p class="meta" id="gold-meta">Gold metadata</p>
    <p class="label" id="gold-label">Gold label</p>
  </section>
  <section class="poster xhs" data-theme="jieni-ivory" id="poster-scoped-ivory">
    <p class="meta" id="poster-scoped-ivory-meta">Poster-scoped metadata</p>
    <div id="poster-scoped-ivory-paper-2" style="background:var(--paper-2)">
      <p class="label" id="poster-scoped-ivory-label">Poster-scoped label</p>
    </div>
  </section>
</body>
</html>`;

const fixture = `<!doctype html>
<html lang="en" data-theme="jieni-ivory">
<head><meta charset="utf-8"><style>${style}</style></head>
<body>
  <section class="poster xhs" data-theme="jieni-ivory" id="ivory-paper">
    <p class="body" id="ivory-ink">Ink body</p>
    <p class="kicker" id="ivory-muted">Muted metadata</p>
    <p id="ivory-accent" style="color:var(--accent);font-size:16px">Accent label</p>
    <p class="meta" id="ivory-meta">Generic metadata</p>
    <p class="label" id="ivory-label">Generic label</p>
    <canvas class="mag-bg" id="ivory-canvas"></canvas>
    <div class="frame-shot bg-paper-2 corners-sm shadow-ed" id="ivory-shadow-ed"></div>
    <div class="content" style="display:grid;grid-template-rows:620px 560px;gap:40px">
      ${componentFixture("ivory")}
    </div>
  </section>
  <section class="poster xhs" data-theme="jieni-ivory" id="ivory-paper-2">
    <div id="ivory-paper-2-surface" style="background:var(--paper-2)">
      <span id="ivory-paper-2-ink" style="color:var(--ink)">Ink</span>
      <span id="ivory-paper-2-muted" style="color:var(--muted)">Muted</span>
      <span id="ivory-paper-2-accent" style="color:var(--accent)">Accent</span>
      <span class="meta" id="ivory-paper-2-meta">Metadata</span>
      <span class="label" id="ivory-paper-2-label">Label</span>
    </div>
  </section>
  <section class="poster xhs" data-theme="jieni-gold" id="mixed-gold-proof">
    <div class="grain" id="mixed-gold-grain"></div>
    <canvas class="mag-bg" id="mixed-gold-canvas"></canvas>
    <p class="meta" id="mixed-gold-meta">Nested Gold metadata</p>
    <p class="label" id="mixed-gold-label">Nested Gold label</p>
  </section>
  <script>
    window.__magazineMounts = [];
    window.MagazineBg = {
      mount: function (canvas, options) {
        window.__magazineMounts.push({ id: canvas.id, options: JSON.parse(JSON.stringify(options)) });
      }
    };
  </script>
  <script>${mountScript}</script>
</body>
</html>`;

function parseColor(value) {
  const parts = value.match(/[\d.]+/g)?.map(Number);
  if (!parts || parts.length < 3) throw new Error(`Unsupported CSS color: ${value}`);
  return { rgb: parts.slice(0, 3), alpha: parts[3] ?? 1 };
}

function composite(foreground, background, alpha) {
  return foreground.map((channel, index) =>
    channel * alpha + background[index] * (1 - alpha));
}

function linearize(channel) {
  const value = channel / 255;
  return value <= 0.04045
    ? value / 12.92
    : ((value + 0.055) / 1.055) ** 2.4;
}

function luminance(color) {
  return 0.2126 * linearize(color[0])
    + 0.7152 * linearize(color[1])
    + 0.0722 * linearize(color[2]);
}

function contrast(foreground, background) {
  const [lighter, darker] = [luminance(foreground), luminance(background)]
    .sort((a, b) => b - a);
  return (lighter + 0.05) / (darker + 0.05);
}

function renderedTextColor(textColor, surfaceColor) {
  return composite(textColor.rgb, surfaceColor, textColor.alpha);
}

function componentChecks(labelPrefix, computed) {
  const mapBackground = parseColor(computed.map.backgroundColor).rgb;
  const pinBackground = parseColor(computed.pinCardBackground);
  const renderedPinBackground = composite(pinBackground.rgb, mapBackground, pinBackground.alpha);
  const accentPinBackground = parseColor(computed.accentPinCardBackground);
  const renderedAccentPinBackground = composite(accentPinBackground.rgb, mapBackground, accentPinBackground.alpha);
  const legendBackground = parseColor(computed.legend.backgroundColor);
  const renderedLegendBackground = composite(legendBackground.rgb, mapBackground, legendBackground.alpha);

  const checks = [
    [`${labelPrefix}map pin name`, computed.pinName.color, renderedPinBackground],
    [`${labelPrefix}map pin caption`, computed.pinMeta.color, renderedPinBackground],
    [`${labelPrefix}map legend`, computed.legend.color, renderedLegendBackground],
    [`${labelPrefix}accent map pin name`, computed.accentPinName.color, renderedAccentPinBackground],
  ];

  const posterBackground = parseColor(computed.poster.backgroundColor).rgb;
  const beforeBackground = parseColor(computed.beforeBlock.backgroundColor);
  const groupOpacity = Number(computed.beforeBlock.opacity);
  const renderedBeforeBackground = composite(
    beforeBackground.rgb,
    posterBackground,
    beforeBackground.alpha * groupOpacity,
  );
  const kickerColor = parseColor(computed.beforeKicker.color);
  const kickerInsideGroup = renderedTextColor(kickerColor, beforeBackground.rgb);
  const renderedKicker = composite(kickerInsideGroup, posterBackground, groupOpacity);
  checks.push([`${labelPrefix}M15 before kicker`, renderedKicker, renderedBeforeBackground]);

  return checks;
}

async function readComponentStyles(page, prefix, posterSelector) {
  return page.evaluate(({ fixturePrefix, fixturePosterSelector }) => {
    const styles = (selector) => {
      const element = document.querySelector(selector);
      if (!element) throw new Error(`Missing contrast fixture selector: ${selector}`);
      const computedStyle = getComputedStyle(element);
      return {
        color: computedStyle.color,
        backgroundColor: computedStyle.backgroundColor,
        opacity: computedStyle.opacity,
      };
    };
    return {
      map: styles(`#${fixturePrefix}-map-fixture`),
      pinCardBackground: getComputedStyle(document.querySelector(`#${fixturePrefix}-map-pin-name`).closest(".card")).backgroundColor,
      accentPinCardBackground: getComputedStyle(document.querySelector(`#${fixturePrefix}-map-pin-accent-name`).closest(".card")).backgroundColor,
      pinName: styles(`#${fixturePrefix}-map-pin-name`),
      pinMeta: styles(`#${fixturePrefix}-map-pin-meta`),
      accentPinName: styles(`#${fixturePrefix}-map-pin-accent-name`),
      legend: styles(`#${fixturePrefix}-map-legend`),
      beforeBlock: styles(`#${fixturePrefix}-m15-before`),
      beforeKicker: styles(`#${fixturePrefix}-m15-before-kicker`),
      poster: styles(fixturePosterSelector),
    };
  }, { fixturePrefix: prefix, fixturePosterSelector: posterSelector });
}

let browser;
try {
  browser = await chromium.launch({
    args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
  });
  const page = await browser.newPage({ viewport: { width: 1200, height: 1600 } });
  await page.setContent(goldFixture, { waitUntil: "load" });
  if (process.env.CONTRAST_SCREENSHOT) {
    await page.locator("#contrast-fixture").screenshot({ path: process.env.CONTRAST_SCREENSHOT });
  }
  const goldComputed = await readComponentStyles(page, "gold", "#contrast-fixture");
  const goldRoles = await page.evaluate(() => {
    const styles = (selector) => {
      const computedStyle = getComputedStyle(document.querySelector(selector));
      return { color: computedStyle.color, backgroundColor: computedStyle.backgroundColor };
    };
    return {
      meta: styles("#gold-meta"),
      label: styles("#gold-label"),
      posterScopedPaper: styles("#poster-scoped-ivory"),
      posterScopedPaper2: styles("#poster-scoped-ivory-paper-2"),
      posterScopedMeta: styles("#poster-scoped-ivory-meta"),
      posterScopedLabel: styles("#poster-scoped-ivory-label"),
    };
  });

  await page.setContent(fixture, { waitUntil: "load" });
  const ivoryComputed = await readComponentStyles(page, "ivory", "#ivory-paper");
  const computed = await page.evaluate(() => {
    const styles = (selector) => {
      const element = document.querySelector(selector);
      if (!element) throw new Error(`Missing contrast fixture selector: ${selector}`);
      const computedStyle = getComputedStyle(element);
      return {
        color: computedStyle.color,
        backgroundColor: computedStyle.backgroundColor,
        opacity: computedStyle.opacity,
      };
    };
    const mixedPoster = document.querySelector("#mixed-gold-proof");
    const mixedPosterStyle = getComputedStyle(mixedPoster);
    return {
      ivoryBase: {
        paper: styles("#ivory-paper"),
        ink: styles("#ivory-ink"),
        muted: styles("#ivory-muted"),
        accent: styles("#ivory-accent"),
        meta: styles("#ivory-meta"),
        label: styles("#ivory-label"),
        paper2: styles("#ivory-paper-2-surface"),
        paper2Ink: styles("#ivory-paper-2-ink"),
        paper2Muted: styles("#ivory-paper-2-muted"),
        paper2Accent: styles("#ivory-paper-2-accent"),
        paper2Meta: styles("#ivory-paper-2-meta"),
        paper2Label: styles("#ivory-paper-2-label"),
      },
      mixedGold: {
        paperToken: mixedPosterStyle.getPropertyValue("--paper").trim(),
        backgroundColor: mixedPosterStyle.backgroundColor,
        grainBlendMode: getComputedStyle(document.querySelector("#mixed-gold-grain")).mixBlendMode,
        canvasBlendMode: getComputedStyle(document.querySelector("#mixed-gold-canvas")).mixBlendMode,
        metaColor: getComputedStyle(document.querySelector("#mixed-gold-meta")).color,
        labelColor: getComputedStyle(document.querySelector("#mixed-gold-label")).color,
      },
      ivoryCanvasBlendMode: getComputedStyle(document.querySelector("#ivory-canvas")).mixBlendMode,
      ivoryShadow: getComputedStyle(document.querySelector("#ivory-shadow-ed")).boxShadow,
      magazineMounts: window.__magazineMounts,
    };
  });

  const paperBackground = parseColor(computed.ivoryBase.paper.backgroundColor).rgb;
  const paper2Background = parseColor(computed.ivoryBase.paper2.backgroundColor).rgb;
  const checks = [
    ...componentChecks("", goldComputed),
    ["Ivory ink on paper", computed.ivoryBase.ink.color, paperBackground],
    ["Ivory muted on paper", computed.ivoryBase.muted.color, paperBackground],
    ["Ivory accent on paper", computed.ivoryBase.accent.color, paperBackground],
    ["Ivory meta on paper", computed.ivoryBase.meta.color, paperBackground],
    ["Ivory label on paper", computed.ivoryBase.label.color, paperBackground],
    ["Ivory ink on paper-2", computed.ivoryBase.paper2Ink.color, paper2Background],
    ["Ivory muted on paper-2", computed.ivoryBase.paper2Muted.color, paper2Background],
    ["Ivory accent on paper-2", computed.ivoryBase.paper2Accent.color, paper2Background],
    ["Ivory meta on paper-2", computed.ivoryBase.paper2Meta.color, paper2Background],
    ["Ivory label on paper-2", computed.ivoryBase.paper2Label.color, paper2Background],
    ["Poster-scoped Ivory meta", goldRoles.posterScopedMeta.color, parseColor(goldRoles.posterScopedPaper.backgroundColor).rgb],
    ["Poster-scoped Ivory label on paper-2", goldRoles.posterScopedLabel.color, parseColor(goldRoles.posterScopedPaper2.backgroundColor).rgb],
    ...componentChecks("Ivory ", ivoryComputed),
  ];

  let failed = 0;
  for (const [label, foregroundValue, background] of checks) {
    const foreground = typeof foregroundValue === "string"
      ? renderedTextColor(parseColor(foregroundValue), background)
      : foregroundValue;
    const ratio = contrast(foreground, background);
    const passed = ratio >= MIN_NORMAL_TEXT_CONTRAST;
    console.log(`${passed ? "PASS" : "FAIL"} ${label}: ${ratio.toFixed(2)}:1`);
    if (!passed) failed += 1;
  }

  const mixedChecks = [
    ["nested Gold paper token", computed.mixedGold.paperToken.toLowerCase(), "#050505"],
    ["nested Gold grain blend mode", computed.mixedGold.grainBlendMode, "screen"],
    ["nested Gold poster background", computed.mixedGold.backgroundColor, "rgb(5, 5, 5)"],
    ["nested Gold canvas blend mode", computed.mixedGold.canvasBlendMode, "screen"],
    ["root Ivory canvas blend mode", computed.ivoryCanvasBlendMode, "multiply"],
    [
      "nested Gold canvas mount options",
      JSON.stringify(computed.magazineMounts.find((entry) => entry.id === "mixed-gold-canvas")?.options),
      '{"ink":[241,239,232],"paper":[5,5,5],"accent":[201,164,92],"strength":0.32,"frozenTime":12.5}',
    ],
    [
      "root Ivory canvas mount options",
      JSON.stringify(computed.magazineMounts.find((entry) => entry.id === "ivory-canvas")?.options),
      '{"ink":[23,22,18],"paper":[243,239,230],"accent":[132,91,32],"strength":0.32,"frozenTime":12.5}',
    ],
    ["nested Gold meta preserves Gold role", computed.mixedGold.metaColor, goldRoles.meta.color],
    ["nested Gold label preserves Gold role", computed.mixedGold.labelColor, goldRoles.label.color],
    [
      "Ivory shadow-ed outline and editorial shadow",
      computed.ivoryShadow,
      "rgba(132, 91, 32, 0.22) 0px 0px 0px 1px, rgba(20, 18, 14, 0.32) 0px 28px 60px -24px, rgba(20, 18, 14, 0.08) 0px 6px 14px 0px",
    ],
  ];
  for (const [label, actual, expected] of mixedChecks) {
    const passed = actual === expected;
    console.log(`${passed ? "PASS" : "FAIL"} ${label}: ${actual || "<empty>"}`);
    if (!passed) failed += 1;
  }

  if (failed > 0) {
    console.error(`\n${failed} rendered Editorial contrast/precedence check(s) failed.`);
    process.exitCode = 1;
  } else {
    console.log(`\n${checks.length} rendered Editorial contrast checks and ${mixedChecks.length} Jieni rendering contract checks passed.`);
  }
} finally {
  await browser?.close();
}
