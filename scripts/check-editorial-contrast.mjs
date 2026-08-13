#!/usr/bin/env node
import fs from "node:fs";
import { chromium } from "playwright";

const MIN_NORMAL_TEXT_CONTRAST = 4.5;
const seed = fs.readFileSync("assets/template-editorial-card.html", "utf8");
const style = seed.match(/<style>([\s\S]*?)<\/style>/)?.[1];

if (!style) {
  throw new Error("Editorial seed must contain an inline <style> block");
}

const fixture = `<!doctype html>
<html lang="en" data-theme="jieni-gold">
<head><meta charset="utf-8"><style>${style}</style></head>
<body>
  <section class="poster xhs" id="contrast-fixture">
    <div class="content" style="display:grid;grid-template-rows:620px 560px;gap:40px">
      <div class="map-block" id="map-fixture">
        <div class="map-pin" style="left:20%;top:20%">
          <div class="card">
            <span class="name" id="map-pin-name">Ink pin</span>
            <span class="meta" id="map-pin-meta">Muted caption</span>
          </div>
        </div>
        <div class="map-pin accent" style="left:60%;top:40%">
          <div class="card">
            <span class="name" id="map-pin-accent-name">Accent pin</span>
          </div>
        </div>
        <div class="map-legend" id="map-legend">Muted legend</div>
      </div>
      <div class="beforeafter">
        <div class="ba-block before" id="m15-before">
          <p class="kicker" id="m15-before-kicker">Before baseline</p>
        </div>
        <div class="ba-block"><p class="kicker">After result</p></div>
      </div>
    </div>
  </section>
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

let browser;
try {
  browser = await chromium.launch({
    args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
  });
  const page = await browser.newPage({ viewport: { width: 1200, height: 1600 } });
  await page.setContent(fixture, { waitUntil: "load" });
  if (process.env.CONTRAST_SCREENSHOT) {
    await page.locator("#contrast-fixture").screenshot({ path: process.env.CONTRAST_SCREENSHOT });
  }

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
    return {
      map: styles("#map-fixture"),
      pinCardBackground: getComputedStyle(document.querySelector("#map-pin-name").closest(".card")).backgroundColor,
      pinName: styles("#map-pin-name"),
      pinMeta: styles("#map-pin-meta"),
      accentPinName: styles("#map-pin-accent-name"),
      legend: styles("#map-legend"),
      beforeBlock: styles("#m15-before"),
      beforeKicker: styles("#m15-before-kicker"),
      poster: styles("#contrast-fixture"),
    };
  });

  const mapBackground = parseColor(computed.map.backgroundColor).rgb;
  const pinBackground = parseColor(computed.pinCardBackground);
  const renderedPinBackground = composite(pinBackground.rgb, mapBackground, pinBackground.alpha);
  const legendBackground = parseColor(computed.legend.backgroundColor);
  const renderedLegendBackground = composite(legendBackground.rgb, mapBackground, legendBackground.alpha);

  const checks = [
    ["map pin name", computed.pinName.color, renderedPinBackground],
    ["map pin caption", computed.pinMeta.color, renderedPinBackground],
    ["map legend", computed.legend.color, renderedLegendBackground],
    ["accent map pin name", computed.accentPinName.color, renderedPinBackground],
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
  checks.push(["M15 before kicker", renderedKicker, renderedBeforeBackground]);

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

  if (failed > 0) {
    console.error(`\n${failed} rendered Editorial contrast check(s) failed.`);
    process.exitCode = 1;
  } else {
    console.log(`\n${checks.length} rendered Editorial contrast checks passed.`);
  }
} finally {
  await browser?.close();
}
