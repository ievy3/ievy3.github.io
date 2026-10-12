// 정적 페이지 공통 처리: <head> 메타 태그 보강, 공용 CSS/JS 캐시 버전 통일,
// sitemap.xml 과 feed.xml(Atom) 생성. 여러 번 실행해도 결과가 같도록 작성했습니다.
import { readFile, writeFile, readdir } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import path from "node:path";

const root = process.cwd();
const siteUrl = "https://ievy3.github.io";
const siteName = "Noctil Patchworks";
const defaultImage = "/assets/images/genso-suikoden-100-years/2026-10-03-title.webp";
const feedLimit = 40;
const skipDirs = new Set([".git", ".github", "node_modules", "scripts", "assets"]);

const config = JSON.parse(await readFile(path.join(root, "assets/data/projects.config.json"), "utf8"));
const projectsBySlug = new Map(config.map(project => [project.slug, project]));

async function walkHtml(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!skipDirs.has(entry.name)) found.push(...await walkHtml(path.join(dir, entry.name)));
    } else if (entry.name.endsWith(".html")) {
      found.push(path.join(dir, entry.name));
    }
  }
  return found;
}

function pageUrl(rel) {
  const urlPath = "/" + rel.split(path.sep).join("/");
  return siteUrl + urlPath.replace(/(^|\/)index\.html$/, "$1");
}

function stripHtml(value = "") {
  return value
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function decodeEntities(value = "") {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function escapeXml(value = "") {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function absolute(src) {
  if (/^https?:\/\//.test(src)) return src;
  return siteUrl + (src.startsWith("/") ? src : "/" + src);
}

function gitDate(file) {
  try {
    return execFileSync("git", ["log", "-1", "--format=%cs", "--", file], { cwd: root, encoding: "utf8" }).trim();
  } catch {
    return "";
  }
}

const files = (await walkHtml(root)).sort();
const pages = [];
for (const file of files) {
  pages.push({ file, rel: path.relative(root, file), html: await readFile(file, "utf8") });
}

// 공용 자산은 사이트 전체에서 가장 높은 버전 번호로 맞춥니다.
const versionedAssets = ["home.css", "project.css", "site-ui.css", "theme-light.css", "site-ui.js", "home.js", "project-release.js", "guestbook.js"];
const latestVersion = new Map();
for (const { html } of pages) {
  for (const asset of versionedAssets) {
    const pattern = new RegExp(`/assets/(?:css|js)/${asset.replace(".", "\\.")}\\?v=(\\d+)`, "g");
    for (const match of html.matchAll(pattern)) {
      latestVersion.set(asset, Math.max(latestVersion.get(asset) || 0, Number(match[1])));
    }
  }
}

function pageKind(rel) {
  const parts = rel.split(path.sep);
  if (parts[0] !== "projects") return { kind: "site" };
  const slug = parts[1];
  if (parts[2] === "updates" && /^\d{4}-\d{2}-\d{2}\.html$/.test(parts[3] || "")) {
    return { kind: "worklog", slug, date: parts[3].slice(0, 10) };
  }
  if (parts[2] === "releases" && parts.length === 5) return { kind: "release", slug };
  return { kind: "project", slug };
}

function headMeta(page, info) {
  const { html, rel } = page;
  const title = (html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || siteName).trim();
  const description = html.match(/<meta name="description" content="([^"]*)"/i)?.[1] || "";
  const url = pageUrl(rel);
  const project = info.slug ? projectsBySlug.get(info.slug) : null;
  const main = html.match(/<main[\s\S]*<\/main>/i)?.[0] || "";
  const firstImage = main.match(/<img[^>]*\ssrc="([^"]+\.(?:webp|png|jpe?g))"/i)?.[1];
  const image = absolute(firstImage || project?.image || defaultImage);
  const ogType = info.kind === "worklog" || info.kind === "release" ? "article" : "website";

  return [
    ["theme-color", `<meta name="theme-color" content="#090a0e">`, /<meta name="theme-color"/i],
    ["canonical", `<link rel="canonical" href="${url}">`, /<link rel="canonical"/i],
    ["icon", `<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">`, /<link rel="icon"/i],
    ["feed", `<link rel="alternate" type="application/atom+xml" title="${siteName} 작업일지" href="/feed.xml">`, /application\/atom\+xml/i],
    ["og:type", `<meta property="og:type" content="${ogType}">`, /property="og:type"/i],
    ["og:site_name", `<meta property="og:site_name" content="${siteName}">`, /property="og:site_name"/i],
    ["og:title", `<meta property="og:title" content="${title}">`, /property="og:title"/i],
    ["og:description", `<meta property="og:description" content="${description}">`, /property="og:description"/i],
    ["og:url", `<meta property="og:url" content="${url}">`, /property="og:url"/i],
    ["og:image", `<meta property="og:image" content="${image}">`, /property="og:image"/i],
    ["twitter:card", `<meta name="twitter:card" content="summary_large_image">`, /name="twitter:card"/i],
    ["twitter:title", `<meta name="twitter:title" content="${title}">`, /name="twitter:title"/i],
    ["twitter:description", `<meta name="twitter:description" content="${description}">`, /name="twitter:description"/i],
    ["twitter:image", `<meta name="twitter:image" content="${image}">`, /name="twitter:image"/i]
  ].filter(([key]) => key !== "og:description" && key !== "twitter:description" || description);
}

let changedPages = 0;
for (const page of pages) {
  const info = pageKind(page.rel);
  let html = page.html;

  for (const [asset, version] of latestVersion) {
    const pattern = new RegExp(`(/assets/(?:css|js)/${asset.replace(".", "\\.")}\\?v=)\\d+`, "g");
    html = html.replace(pattern, `$1${version}`);
  }

  if (page.rel !== "404.html") {
    const head = html.match(/<head>[\s\S]*?<\/head>/i)?.[0];
    const titleLine = head?.match(/^([ \t]*)<title>[\s\S]*?<\/title>[^\n]*\n/m);
    if (head) {
      const missingTags = headMeta({ ...page, html }, info).filter(([, , exists]) => !exists.test(head));
      if (missingTags.length && titleLine) {
        // 기존 태그 블록이 있으면 그 뒤에, 없으면 <title> 바로 뒤에 넣습니다.
        const missing = missingTags.map(([, tag]) => titleLine[1] + tag + "\n").join("");
        const anchor = head.match(/^[^\n]*(?:name="twitter:image"|property="og:image"|rel="icon")[^\n]*\n/m) || titleLine;
        html = html.replace(head, head.replace(anchor[0], anchor[0] + missing));
      } else if (missingTags.length) {
        // 한 줄로 압축된 페이지는 </title> 바로 뒤에 이어 붙입니다.
        const missing = missingTags.map(([, tag]) => tag).join("");
        html = html.replace(head, head.replace("</title>", "</title>" + missing));
      }
    }
  }

  // 밝은 테마: 저장된 선택을 첫 화면 그리기 전에 적용하고, 덮어쓰기 CSS를 마지막에 불러옵니다.
  if (!html.includes("theme-light.css")) {
    const themeTags = `<script>try{if(localStorage.getItem("np-theme")==="light")document.documentElement.dataset.theme="light"}catch(e){}</script><link rel="stylesheet" href="/assets/css/theme-light.css?v=${latestVersion.get("theme-light.css") || 1}">`;
    html = html.replace(/(\n?)([ \t]*)<\/head>/, (m, nl, indent) => nl ? `\n  ${themeTags}\n${indent}</head>` : `${themeTags}</head>`);
  }

  if (info.kind === "worklog" || info.kind === "release") {
    html = html.replace(/<img(?![^>]*\sloading=)([^>]*)>/gi, '<img loading="lazy" decoding="async"$1>');
  }

  if (html !== page.html) {
    page.html = html;
    await writeFile(page.file, html, "utf8");
    changedPages += 1;
  }
}

// 대문: 자바스크립트가 목록을 그리기 전에 보이는 숫자·noscript 목록과 home.js 예비 데이터를
// projects.generated.json에 맞춥니다.
const generatedIndex = JSON.parse(await readFile(path.join(root, "assets/data/projects.generated.json"), "utf8").catch(() => "{}"));
const listed = (generatedIndex.projects || []).filter(project => project.status !== "planned" && project.href);
if (listed.length) {
  const platformCounts = listed.reduce((map, project) => map.set(project.platform, (map.get(project.platform) || 0) + 1), new Map());
  const platformLabel = [...platformCounts.keys()].sort((a, b) => platformCounts.get(b) - platformCounts.get(a)).join(" · ");
  const home = pages.find(page => page.rel === "index.html");
  if (home) {
    let html = home.html
      .replace(/(<span id="hero-summary"[^>]*>)[^<]*(<\/span>)/, `$1${listed.length} Projects · ${platformLabel}$2`)
      .replace(/(<p id="result-count"[^>]*>)[\s\S]*?(<\/p>)/, `$1전체 <strong>${listed.length}</strong>개 프로젝트$2`)
      .replace(/(<noscript>\n)[\s\S]*?(\n[ \t]*<\/noscript>)/, (m, open, close) =>
        open + listed.map(project => `          <a href="${project.href}">${escapeXml(project.title)}</a>`).join("\n") + close);
    if (html !== home.html) {
      home.html = html;
      await writeFile(home.file, html, "utf8");
      changedPages += 1;
    }
  }

  const fallbackKeys = ["title", "slug", "href", "image", "imageAlt", "imageFit", "platform", "genre", "subgenre", "type", "status", "statusLabel",
    "stage", "version", "updated", "download", "downloadMode", "releaseUrl", "releasePublishedAt", "totalDownloads", "description", "note",
    "keywords", "verification", "latestWorklog"];
  const fallback = (generatedIndex.projects || []).map(project =>
    Object.fromEntries(fallbackKeys.filter(key => project[key] !== undefined && project[key] !== null).map(key => [key, project[key]])));
  // README.md의 프로젝트 목록: 공개 → 작업 중 → 작업 예정 순서.
  const stageNames = ["게임 분석", "번역 준비", "대사 번역", "화면 한글화", "실행 검수", "패치 배포"];
  const byUpdated = (a, b) => (b.updated || "").localeCompare(a.updated || "") || a.title.localeCompare(b.title, "ko");
  const projectLink = project => `[${project.title}](${siteUrl}${project.href}) (${project.platform})`;
  const publicList = listed.filter(project => project.status === "public").sort(byUpdated)
    .map(project => `- ${projectLink(project)} — **${project.version}** · ${project.statusLabel}`);
  const workingList = listed.filter(project => project.status !== "public").sort((a, b) => (b.stage || 0) - (a.stage || 0) || byUpdated(a, b))
    .map(project => `- ${projectLink(project)} — 작업 중${project.stage ? ` · ${project.stage}단계 ${stageNames[project.stage - 1]}` : ""}`);
  const plannedList = (generatedIndex.projects || []).filter(project => project.status === "planned")
    .map(project => `- ${project.title} (${project.platform})`);
  const readmeBlock = [
    `현재 공개 허브에서 관리하는 프로젝트는 **${listed.length}개**입니다(공개 ${publicList.length} · 작업 중 ${workingList.length}). 버전은 공개된 최신 배포본 기준입니다.`,
    "",
    "### 공개",
    "",
    ...publicList,
    ...(workingList.length ? ["", "### 작업 중", "", ...workingList] : []),
    ...(plannedList.length ? ["", "### 작업 예정", "", ...plannedList] : [])
  ].join("\n");
  const readmePath = path.join(root, "README.md");
  const readme = await readFile(readmePath, "utf8").catch(() => "");
  const nextReadme = readme.replace(/(<!-- BEGIN projects[^\n]*-->\n)[\s\S]*?(<!-- END projects -->)/, `$1${readmeBlock}\n$2`);
  if (readme && nextReadme !== readme) await writeFile(readmePath, nextReadme, "utf8");

  const homeJsPath = path.join(root, "assets/js/home.js");
  const homeJs = await readFile(homeJsPath, "utf8");
  const nextJs = homeJs.replace(/(\/\/ BEGIN fallback projects\n)[\s\S]*?(\/\/ END fallback projects)/,
    `$1const fallbackProjects = ${JSON.stringify(fallback, null, 2)};\n$2`);
  if (nextJs !== homeJs) await writeFile(homeJsPath, nextJs, "utf8");
}

// sitemap.xml
const sitemapEntries = pages
  .filter(page => page.rel !== "404.html")
  .map(page => {
    const info = pageKind(page.rel);
    const lastmod = info.date || gitDate(page.rel);
    return { loc: pageUrl(page.rel), lastmod };
  })
  .sort((a, b) => a.loc.localeCompare(b.loc));

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.map(entry => `  <url><loc>${escapeXml(entry.loc)}</loc>${entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : ""}</url>`).join("\n")}
</urlset>
`;
await writeFile(path.join(root, "sitemap.xml"), sitemap, "utf8");

// feed.xml (Atom) — 프로젝트별 날짜 작업일지를 최신순으로
const worklogs = pages
  .map(page => ({ page, info: pageKind(page.rel) }))
  .filter(({ info }) => info.kind === "worklog")
  .map(({ page, info }) => {
    const project = projectsBySlug.get(info.slug);
    const projectTitle = project?.title || info.slug;
    const heading = stripHtml(page.html.match(/<header[\s\S]*?<h1>([\s\S]*?)<\/h1>/i)?.[1] || "") || `${info.date} 작업일지`;
    const lead = stripHtml(page.html.match(/<header[\s\S]*?<h1>[\s\S]*?<\/h1>\s*<p[^>]*>([\s\S]*?)<\/p>/i)?.[1] || "");
    const description = page.html.match(/<meta name="description" content="([^"]*)"/i)?.[1] || "";
    return {
      url: pageUrl(page.rel),
      date: info.date,
      title: `[${projectTitle}] ${decodeEntities(heading)}`,
      summary: decodeEntities(lead || description),
      projectTitle
    };
  })
  .sort((a, b) => b.date.localeCompare(a.date) || a.url.localeCompare(b.url))
  .slice(0, feedLimit);

const feedUpdated = worklogs[0]?.date || new Date().toISOString().slice(0, 10);
const feed = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="ko">
  <title>${siteName} 작업일지</title>
  <subtitle>비공식 한국어 게임 번역 패치 작업일지</subtitle>
  <link href="${siteUrl}/feed.xml" rel="self"/>
  <link href="${siteUrl}/"/>
  <id>${siteUrl}/</id>
  <updated>${feedUpdated}T00:00:00+09:00</updated>
  <author><name>Noctil</name></author>
${worklogs.map(item => `  <entry>
    <title>${escapeXml(item.title)}</title>
    <link href="${escapeXml(item.url)}"/>
    <id>${escapeXml(item.url)}</id>
    <updated>${item.date}T00:00:00+09:00</updated>
    <category term="${escapeXml(item.projectTitle)}"/>
    <summary>${escapeXml(item.summary)}</summary>
  </entry>`).join("\n")}
</feed>
`;
await writeFile(path.join(root, "feed.xml"), feed, "utf8");

console.log(`Normalized ${changedPages} page(s); sitemap ${sitemapEntries.length} URLs; feed ${worklogs.length} entries.`);
