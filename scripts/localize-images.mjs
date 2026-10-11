// 프로젝트 페이지가 외부 사이트 주소로 불러오는 그림(<img src="https://...">)을 내려받아
// assets/images/<slug>/ 아래에 저장하고, 페이지의 주소를 사이트 안 경로로 바꿉니다.
// 내려받지 못한 그림은 그대로 두고 다음 실행 때 다시 시도합니다. 여러 번 실행해도 결과가 같습니다.
import { readFile, writeFile, readdir, mkdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const projectsDir = path.join(root, "projects");
const siteUrl = "https://ievy3.github.io";
const extByType = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/gif": "gif" };

function decodeAttr(value) {
  return value.replace(/&amp;/g, "&").replace(/&quot;/g, '"');
}

async function download(url) {
  const response = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; NoctilPatchworks site build)", Accept: "image/*" },
    redirect: "follow",
    signal: AbortSignal.timeout(30000)
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const type = (response.headers.get("content-type") || "").split(";")[0].trim();
  const ext = extByType[type];
  if (!ext) throw new Error(`not an image (${type || "no content-type"})`);
  const data = Buffer.from(await response.arrayBuffer());
  if (data.length < 1024) throw new Error(`too small (${data.length} B)`);
  return { data, ext };
}

let changed = 0;
let failed = 0;
for (const slug of await readdir(projectsDir)) {
  const file = path.join(projectsDir, slug, "index.html");
  let html;
  try {
    html = await readFile(file, "utf8");
  } catch {
    continue;
  }

  // 원작 패키지 그림(.game-cover)은 official-cover, 그 밖의 그림은 external-1, external-2 … 로 저장합니다.
  const images = [...html.matchAll(/<img\b[^>]*\ssrc="(https?:\/\/[^"]+)"[^>]*>/gi)];
  const original = html;
  let other = 0;
  for (const [tag, source] of images) {
    const url = decodeAttr(source);
    try {
      const { data, ext } = await download(url);
      const name = /class="game-cover"/.test(tag) ? `official-cover.${ext}` : `external-${++other}.${ext}`;
      const dir = path.join(root, "assets/images", slug);
      await mkdir(dir, { recursive: true });
      await writeFile(path.join(dir, name), data);
      const local = `/assets/images/${slug}/${name}`;
      html = html.replace(tag, tag.replace(`src="${source}"`, `src="${local}"`).replace(/\s+referrerpolicy="no-referrer"/, ""));
      // 같은 그림을 쓰는 og:image·twitter:image 주소도 사이트 주소로 바꿉니다.
      html = html.split(`content="${source}"`).join(`content="${siteUrl}${local}"`);
      console.log(`Saved ${url} -> ${local} (${data.length} B)`);
      changed += 1;
    } catch (error) {
      console.warn(`Could not download ${url}: ${error.message}`);
      failed += 1;
    }
  }
  if (html !== original) await writeFile(file, html, "utf8");
}

console.log(`Localized ${changed} external image(s); ${failed} left as external links.`);
