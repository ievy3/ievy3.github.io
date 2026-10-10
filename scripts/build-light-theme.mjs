// 어두운 기본 테마 CSS에서 밝은 테마 덮어쓰기(assets/css/theme-light.css)를 만듭니다.
// 색이 들어간 선언만 골라 html[data-theme="light"] 아래로 옮기고, 무채색은 명도를 뒤집고
// 글자색으로 쓰인 강조색(금색·보라·초록)은 밝은 바탕에서 읽히도록 어둡게 바꿉니다.
// 기본 CSS를 고친 뒤 다시 실행하면 같은 규칙으로 갱신됩니다.
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
// 같은 클래스 이름(.hero, .badge 등)이 두 스타일시트에 따로 있으므로, 각 덮어쓰기를 그 CSS를 쓰는 페이지로 한정합니다.
const sources = [
  ["assets/css/home.css", ":not(.project-page)"],
  ["assets/css/project.css", ".project-page"],
  ["assets/css/site-ui.css", ""]
];
const outPath = path.join(root, "assets/css/theme-light.css");
const scope = 'html[data-theme="light"]';

const colorProps = /^(color|background(-color|-image)?|border(-top|-right|-bottom|-left)?(-color)?|outline(-color)?|box-shadow|text-shadow|fill|stroke|caret-color|text-decoration(-color)?|--[\w-]+)$/;
const textProps = /^(color|fill|stroke|caret-color|text-decoration(-color)?)$/;
const shadowProps = /^(box-shadow|text-shadow)$/;
const textVars = /^--(text|muted|gold|accent|accent-2|violet|green)$/;

function stripComments(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, "").replace(/@import\s+url\([^)]*\)\s*;/g, "");
}

// 중첩(@media)까지 다루는 단순한 규칙 분해기 — 이 사이트의 손으로 쓴 CSS에 맞춤.
function parse(css) {
  const out = [];
  let i = 0;
  while (i < css.length) {
    const open = css.indexOf("{", i);
    const semi = css.indexOf(";", i);
    if (open === -1) break;
    if (semi !== -1 && semi < open && css.slice(i, semi).trim().startsWith("@")) { i = semi + 1; continue; }
    const head = css.slice(i, open).trim();
    let depth = 1, j = open + 1;
    while (j < css.length && depth) { if (css[j] === "{") depth++; else if (css[j] === "}") depth--; j++; }
    const body = css.slice(open + 1, j - 1);
    if (head.startsWith("@media") || head.startsWith("@supports")) out.push({ media: head, rules: parse(body) });
    else if (!head.startsWith("@")) out.push({ selector: head, body });
    i = j;
  }
  return out;
}

function splitDecls(body) {
  const decls = []; let depth = 0, start = 0;
  for (let k = 0; k < body.length; k++) {
    const ch = body[k];
    if (ch === "(") depth++; else if (ch === ")") depth--;
    else if (ch === ";" && depth === 0) { decls.push(body.slice(start, k)); start = k + 1; }
  }
  decls.push(body.slice(start));
  return decls.map(d => d.trim()).filter(Boolean).map(d => {
    const c = d.indexOf(":");
    return { prop: d.slice(0, c).trim(), value: d.slice(c + 1).trim() };
  });
}

function toHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2;
  let h = 0, s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
    h /= 6;
  }
  return [h, s, l];
}
function toRgb(h, s, l) {
  if (!s) { const v = Math.round(l * 255); return [v, v, v]; }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q;
  const f = t => { t = (t + 1) % 1; return t < 1 / 6 ? p + (q - p) * 6 * t : t < 1 / 2 ? q : t < 2 / 3 ? p + (q - p) * (2 / 3 - t) * 6 : p; };
  return [f(h + 1 / 3), f(h), f(h - 1 / 3)].map(v => Math.round(v * 255));
}
function fmt([r, g, b], a) {
  if (a === undefined || a >= 1) return "#" + [r, g, b].map(v => v.toString(16).padStart(2, "0")).join("");
  return `rgba(${r},${g},${b},${+a.toFixed(3)})`;
}

function mapColor(r, g, b, a, kind) {
  const [h, s, l] = toHsl(r, g, b);
  const neutral = s < 0.25 || l < 0.15 || l > 0.85;
  if (kind === "shadow") {
    if (l < 0.5) return fmt([r, g, b], (a ?? 1) * 0.35);
    return fmt([30, 32, 44], (a ?? 1) * 0.5);
  }
  if (kind === "text") {
    if (neutral) return fmt(toRgb(h, s, Math.min(0.9, Math.max(0.08, 1 - l))), a);
    return fmt(toRgb(h, Math.min(s, 0.75), Math.min(l, 0.36)), a);
  }
  if (neutral) return fmt(toRgb(h, s, 1 - l), a);
  return fmt([r, g, b], a);
}

const colorToken = /#([0-9a-fA-F]{3,8})\b|rgba?\(([^)]*)\)|\b(white|black)\b/g;
function transform(value, kind) {
  return value.replace(colorToken, (m, hex, args, named) => {
    let r, g, b, a;
    if (hex) {
      if (hex.length <= 4) hex = [...hex].map(c => c + c).join("");
      [r, g, b] = [0, 2, 4].map(k => parseInt(hex.slice(k, k + 2), 16));
      if (hex.length === 8) a = parseInt(hex.slice(6, 8), 16) / 255;
    } else if (args) {
      const p = args.split(",").map(x => x.trim());
      if (p.length < 3 || p.some(x => x.includes("var("))) return m;
      [r, g, b] = p.slice(0, 3).map(Number);
      if (p[3] !== undefined) a = parseFloat(p[3]);
    } else {
      [r, g, b] = named === "white" ? [255, 255, 255] : [0, 0, 0];
    }
    return mapColor(r, g, b, a, kind);
  });
}

function scopeSelector(sel, bodyQual) {
  const base = bodyQual ? `${scope} body${bodyQual}` : scope;
  return sel.split(",").map(s => s.trim()).filter(Boolean).map(s => {
    if (s === ":root" || s === "html") return base;
    if (s.startsWith("html")) return scope + s.slice(4);
    if (s.startsWith("body")) return `${scope} body${bodyQual}${s.slice(4)}`;
    return `${base} ${s}`;
  }).join(",\n");
}

function render(rules, bodyQual, indent = "") {
  const parts = [];
  for (const rule of rules) {
    if (rule.media) {
      const inner = render(rule.rules, bodyQual, indent + "  ");
      if (inner) parts.push(`${indent}${rule.media}{\n${inner}\n${indent}}`);
      continue;
    }
    const decls = [];
    for (const { prop, value } of splitDecls(rule.body)) {
      if (prop === "color-scheme") { decls.push("color-scheme:light"); continue; }
      if (!colorProps.test(prop)) continue;
      const kind = shadowProps.test(prop) ? "shadow" : (textProps.test(prop) || textVars.test(prop)) ? "text" : "fill";
      const next = transform(value, kind);
      if (next !== value) decls.push(`${prop}:${next}`);
    }
    if (decls.length) parts.push(`${indent}${scopeSelector(rule.selector, bodyQual)}{${decls.join(";")}}`);
  }
  return parts.join("\n");
}

let css = "/* 자동 생성: scripts/build-light-theme.mjs — 직접 고치지 말고 스크립트를 다시 실행하세요. */\n";
for (const [file, bodyQual] of sources) {
  const src = stripComments(await readFile(path.join(root, file), "utf8"));
  css += `\n/* ${file} */\n` + render(parse(src), bodyQual) + "\n";
}
// 자동 변환으로 맞추기 어려운 부분은 아래에서 손으로 보정합니다.
css += await readFile(path.join(root, "assets/css/theme-light.extra.css"), "utf8").catch(() => "");
await writeFile(outPath, css, "utf8");
console.log(`Wrote ${path.relative(root, outPath)} (${css.length} bytes)`);
