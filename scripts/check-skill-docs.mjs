#!/usr/bin/env node
import fs from "node:fs";

const checks = [];

function fileText(file) {
  return fs.readFileSync(file, "utf8");
}

function mustInclude(file, needle, label) {
  checks.push(() => {
    const ok = fileText(file).includes(needle);
    return {
      ok,
      label,
      detail: ok ? `${file} includes "${needle}"` : `${file} must include "${needle}"`,
    };
  });
}

function mustNotMatch(file, pattern, label) {
  checks.push(() => {
    const ok = !pattern.test(fileText(file));
    return {
      ok,
      label,
      detail: ok ? `${file} does not match ${pattern}` : `${file} must not match ${pattern}`,
    };
  });
}

function mustOnlyAllowJieniGoldPosterTheme(file) {
  checks.push(() => {
    const invalidThemes = [];
    for (const tag of fileText(file).match(/<section\b[^>]*>/g) ?? []) {
      const classMatch = tag.match(/\bclass\s*=\s*(["'])(.*?)\1/);
      const themeMatch = tag.match(/\bdata-theme\s*=\s*(["'])(.*?)\1/);
      if (classMatch?.[2].split(/\s+/).includes("poster") && themeMatch && themeMatch[2] !== "jieni-gold") {
        invalidThemes.push(themeMatch[2]);
      }
    }
    const ok = invalidThemes.length === 0;
    return {
      ok,
      label: `${file} only permits Jieni Gold poster overrides`,
      detail: ok ? `${file} has no invalid poster theme overrides` : `${file} has invalid poster theme overrides: ${invalidThemes.join(", ")}`,
    };
  });
}

mustInclude(
  "SKILL.md",
  "Generated work must live in a task folder, not in the skill root.",
  "root output guardrail in SKILL.md",
);
mustInclude(
  "SKILL.md",
  "local-tests/<slug>/",
  "default task folder in SKILL.md",
);
mustInclude(
  "SKILL.md",
  "Triple Live Photo",
  "triple Live Photo capability in SKILL.md",
);
mustInclude(
  "SKILL.md",
  "material-first Live Photo puzzle layouts",
  "material-first puzzle capability in SKILL.md",
);
mustInclude(
  "SKILL.md",
  "use the M16 Image-Led Cover / text-on-image rules",
  "single-video text uses M16 overlay rules",
);
mustInclude(
  "SKILL.md",
  "Do not invent extra kicker, meta, hairlines",
  "single-video text must not invent extra overlay copy",
);
mustInclude(
  "SKILL.md",
  "platform limits (`5s` Xiaohongshu, `3s` WeChat Official Account)",
  "platform publishing reminder in SKILL.md",
);
mustInclude(
  "SKILL.md",
  "Audience-facing copy must describe the user's actual scene",
  "audience-facing copy guardrail in SKILL.md",
);
mustInclude(
  "SKILL.md",
  "Do not add non-template ornaments just to satisfy an automated density warning",
  "non-template ornament guardrail in SKILL.md",
);
mustNotMatch(
  "SKILL.md",
  /Create a task folder in the current workspace/,
  "no root-level task-folder instruction in SKILL.md",
);

mustInclude(
  "references/production-workflow.md",
  "Create a task folder under `local-tests/` by default",
  "production workflow uses local-tests",
);
mustInclude(
  "references/production-workflow.md",
  "Do not create generated task folders or rendered assets in the skill root",
  "production workflow forbids skill-root outputs",
);

mustInclude(
  "references/live-photo-production.md",
  "## Live Photo Information Budget",
  "Live Photo information budget section",
);
mustInclude(
  "references/live-photo-production.md",
  "## Triple Live Photo Collage",
  "triple collage section",
);
mustInclude(
  "references/live-photo-production.md",
  "## Material-First Puzzle Layouts",
  "material-first puzzle section",
);
mustInclude(
  "references/live-photo-production.md",
  "Do not render single-video text as generic subtitles.",
  "single-video text is not subtitle-style",
);
mustInclude(
  "references/live-photo-production.md",
  "Do not invent extra kicker, meta, hairlines",
  "single-video overlay must not invent extra copy",
);
mustInclude(
  "references/live-photo-production.md",
  "Four-grid",
  "four-grid puzzle guidance",
);
mustInclude(
  "references/live-photo-production.md",
  "## Long Video Intake",
  "long video intake section",
);
mustInclude(
  "references/live-photo-production.md",
  "Web-sourced free videos are only for making our own demo/promo cases",
  "user-supplied video is the normal path",
);
mustInclude(
  "references/live-photo-production.md",
  "Audience-facing copy should name the real scene in the video.",
  "Live Photo visible-copy guardrail",
);

mustInclude(
  "references/category-cookbook.md",
  "## Live Photo Scene Library",
  "category scene library section",
);
mustInclude(
  "references/category-cookbook.md",
  "This is not a fixed template list.",
  "category library stays heuristic",
);

mustInclude(
  "PRODUCT.md",
  "## 10. Live Photo 复盘（2026-07-01）",
  "product doc records Live Photo retrospective",
);
mustInclude(
  "PRODUCT.md",
  "把内部制作要求写成观众可见文案",
  "product doc records visible-copy failure mode",
);
mustInclude(
  "HANDOFF.md",
  "### v0.15 · 2026-07-01",
  "handoff records Live Photo version history",
);
mustInclude(
  "HANDOFF.md",
  "不要把制作要求当成观众可见内容",
  "handoff records Live Photo execution pitfall",
);

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
mustInclude(
  editorialSeed,
  `html[data-theme="jieni-gold"] canvas.mag-bg,
    .poster[data-theme="jieni-gold"] canvas.mag-bg {
      opacity: .16;
      -webkit-mask-image: radial-gradient(ellipse 64% 52% at 18% 78%, #000 0%, rgba(0,0,0,.72) 38%, transparent 76%);
      mask-image: radial-gradient(ellipse 64% 52% at 18% 78%, #000 0%, rgba(0,0,0,.72) 38%, transparent 76%);
    }`,
  "Jieni Gold localized WebGL atmosphere",
);
mustInclude(editorialSeed, '[data-theme="jieni-gold"] .frame-img', "Jieni Gold image rim light");
mustInclude(editorialSeed, '[data-theme="jieni-gold"] .frame-shot', "Jieni Gold screenshot rim light");
mustInclude(editorialSeed, '[data-theme="jieni-gold"] .metal-gold', "Jieni Gold metallic utility");
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
mustNotMatch(
  editorialSeed,
  /Midnight Ink — the ONLY official dark Editorial palette\./,
  "Midnight Ink seed comment does not claim sole dark-palette status",
);

mustInclude("SKILL.md", "Jieni Gold", "Jieni Gold discovery name");
mustInclude("SKILL.md", "jieni-gold", "Jieni Gold root slug");
mustInclude("references/theme-presets.md", "### Jieni Gold", "Jieni Gold preset reference");
mustInclude(
  "references/style-system.md",
  "two sanctioned dark palettes",
  "Editorial two-dark-theme boundary",
);

mustInclude("SKILL.md", "Jieni Ivory", "Jieni Ivory discovery name");
mustInclude("SKILL.md", "jieni-ivory", "Jieni Ivory root slug");
mustInclude("references/theme-presets.md", "### Jieni Ivory", "Jieni Ivory preset reference");
mustInclude("references/theme-presets.md", "at most two Gold posters", "Jieni family dark-board cap");
mustInclude(
  "references/theme-presets.md",
  `<html lang="zh-CN" data-theme="jieni-ivory">
  <section class="poster xhs" data-theme="jieni-gold">...</section>
  <section class="poster xhs">...</section>
  <section class="poster xhs">...</section>
  <section class="poster xhs" data-theme="jieni-gold">...</section>
</html>`,
  "Jieni family exact Ivory-root mixed sequence",
);
mustInclude("SKILL.md", "may use `jieni-gold` only on the first and/or last poster, never for variety", "Jieni Gold first-last restraint");
mustInclude("references/theme-presets.md", "Light palettes (the first six)", "all six light palettes retain contrast rule");
mustInclude("references/theme-presets.md", "Use Jieni Gold for sparse launch covers, cinematic hero statements, and brand closes.", "Jieni Gold density-based routing");
mustInclude("SKILL.md", "Use one of the 12 verified presets. Do not invent arbitrary colors.", "closed verified-preset boundary");
mustInclude("README.md", "12 套主题预设", "Chinese README total theme count");
mustInclude("README.md", "Editorial 8 套", "Chinese README Editorial count");
mustInclude("README.md", "Jieni Gold", "Chinese README Jieni Gold row");
mustInclude("README.md", "稀疏发布封面 / 电影感 hero / 品牌收束", "Chinese README Gold density row");
mustInclude("README.md", "`#f3efe6` / `#171612` / `#845b20`", "Chinese README Ivory token row");
mustInclude("README.en.md", "12 theme presets", "English README total theme count");
mustInclude("README.en.md", "Editorial 8", "English README Editorial count");
mustInclude("README.en.md", "Jieni Gold", "English README Jieni Gold row");
mustInclude("README.en.md", "Sparse launch covers / cinematic hero statements / brand closes", "English README Gold density row");
mustInclude("README.en.md", "`#f3efe6` / `#171612` / `#845b20`", "English README Ivory token row");
mustInclude("references/style-system.md", "6 light and 2 dark", "Editorial light-dark boundary");
mustInclude(
  "README.md",
  '<section class="poster xhs" data-theme="jieni-gold">',
  "Chinese Jieni family exception",
);
mustInclude(
  "README.en.md",
  '<section class="poster xhs" data-theme="jieni-gold">',
  "English Jieni family exception",
);
mustInclude("PRODUCT.md", "Jieni Gold", "product boundary includes Jieni Gold");
mustInclude("PRODUCT.md", "已验证的 palette 边界从 11 套推进到 12 套", "product records validated 12-preset boundary");
mustInclude("PRODUCT.md", "Jieni Gold 服务稀疏发布封面、电影感 hero 与品牌收束", "product replaces broad Gold topic routing");
mustInclude("PRODUCT.md", "Gold 仍只承担稀疏封面、电影感 hero 和品牌收束", "product records Jieni density routing");
mustInclude("HANDOFF.md", "Jieni Gold", "handoff records Jieni Gold");
mustInclude("HANDOFF.md", "Editorial 8 套（6 浅 + 2 暗）+ Swiss 4 套 = 12 套", "handoff current 8/12 coverage");
mustInclude("HANDOFF.md", "Theme palette 计数：5 + 4 = 9 套。", "historical v0.6 count remains");
mustInclude("HANDOFF.md", "Editorial palette 从 5 套变 6 套。", "historical v0.12 count remains");
mustNotMatch(
  "HANDOFF.md",
  /\/Users\//,
  "handoff excludes macOS user absolute paths",
);
mustNotMatch(
  "HANDOFF.md",
  /path\/to\/skill-creator/,
  "handoff excludes unusable skill-creator placeholders",
);
mustNotMatch(
  "HANDOFF.md",
  /6 套杂志 palette（含 Midnight Ink）\+ 4 套 Swiss accent/,
  "handoff current directory overview uses 8 Editorial palettes",
);
for (const readme of ["README.md", "README.en.md"]) {
  mustOnlyAllowJieniGoldPosterTheme(readme);
}

let failed = 0;
for (const run of checks) {
  const result = run();
  const marker = result.ok ? "PASS" : "FAIL";
  console.log(`${marker} ${result.label}`);
  if (!result.ok) {
    failed += 1;
    console.log(`  ${result.detail}`);
  }
}

if (failed > 0) {
  console.error(`\n${failed} skill doc check(s) failed.`);
  process.exit(1);
}

console.log(`\n${checks.length} skill doc checks passed.`);
