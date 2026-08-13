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
  `[data-theme="jieni-gold"] canvas.mag-bg {
      opacity: .16;
      -webkit-mask-image: radial-gradient(ellipse 64% 52% at 18% 78%, #000 0%, rgba(0,0,0,.72) 38%, transparent 76%);
      mask-image: radial-gradient(ellipse 64% 52% at 18% 78%, #000 0%, rgba(0,0,0,.72) 38%, transparent 76%);
    }`,
  "Jieni Gold localized WebGL atmosphere",
);
mustInclude(editorialSeed, '[data-theme="jieni-gold"] .frame-img', "Jieni Gold image rim light");
mustInclude(editorialSeed, '[data-theme="jieni-gold"] .frame-shot', "Jieni Gold screenshot rim light");
mustInclude(editorialSeed, '[data-theme="jieni-gold"] .metal-gold', "Jieni Gold metallic utility");
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

mustInclude("README.md", "11 套主题预设", "Chinese README total theme count");
mustInclude("README.md", "Editorial 7 套", "Chinese README Editorial count");
mustInclude("README.md", "Jieni Gold", "Chinese README Jieni Gold row");
mustInclude("README.en.md", "11 theme presets", "English README total theme count");
mustInclude("README.en.md", "Editorial 7", "English README Editorial count");
mustInclude("README.en.md", "Jieni Gold", "English README Jieni Gold row");
mustInclude("PRODUCT.md", "Jieni Gold", "product boundary includes Jieni Gold");
mustInclude("HANDOFF.md", "Jieni Gold", "handoff records Jieni Gold");
mustNotMatch(
  "HANDOFF.md",
  /6 套杂志 palette（含 Midnight Ink）\+ 4 套 Swiss accent/,
  "handoff current directory overview uses 7 Editorial palettes",
);
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
