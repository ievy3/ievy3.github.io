import { readFile, writeFile, readdir, mkdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const configPath = path.join(root, "assets/data/projects.config.json");
const outputPath = path.join(root, "assets/data/projects.generated.json");
const defaultReleaseRepository = process.env.GITHUB_REPOSITORY || "ievy3/ievy3.github.io";
const token = process.env.GITHUB_TOKEN || "";

function stripHtml(value = "") {
  return value
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

async function fetchAllReleases(repository) {
  const releases = [];
  for (let page = 1; ; page += 1) {
    const response = await fetch(
      `https://api.github.com/repos/${repository}/releases?per_page=100&page=${page}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
      }
    );
    if (!response.ok) {
      throw new Error(`GitHub releases API failed: ${response.status} ${response.statusText}`);
    }
    const batch = await response.json();
    releases.push(...batch);
    if (batch.length < 100) break;
  }
  return releases;
}

async function latestWorklog(slug) {
  const dir = path.join(root, "projects", slug, "updates");
  let files = [];
  try {
    files = await readdir(dir);
  } catch {
    return null;
  }

  const dated = files
    .filter(name => /^\d{4}-\d{2}-\d{2}\.html$/.test(name))
    .sort((a, b) => b.localeCompare(a));

  if (!dated.length) return null;

  const filename = dated[0];
  const date = filename.slice(0, 10);
  const html = await readFile(path.join(dir, filename), "utf8");
  const header = html.match(/<header[\s\S]*?<h1>([\s\S]*?)<\/h1>/i);
  const title = header ? stripHtml(header[1]) : `${date} 작업일지`;

  return {
    date,
    title,
    href: `/projects/${slug}/updates/${filename}`
  };
}

function releaseDate(release) {
  return (release.published_at || release.created_at || "").slice(0, 10);
}

function selectReleaseAsset(release) {
  const assets = (release.assets || []).filter(asset =>
    !/^source code/i.test(asset.name)
    && !/(?:^|[-_.])(license|readme|default)(?:[-_.]|$)/i.test(asset.name)
  );

  for (const pattern of [/\.zip$/i, /\.exe$/i, /\.7z$/i]) {
    const asset = assets.find(candidate => pattern.test(candidate.name));
    if (asset) return asset;
  }

  return null;
}

function versionFromRelease(release, prefix, asset = null) {
  if (asset) {
    const stem = asset.name.replace(/\.(?:zip|exe|7z)$/i, "");
    const match = stem.match(/v\d+(?:\.\d+)+(?:-[A-Za-z0-9.]+)?$/i);
    if (match) return match[0];
  }

  const raw = release.tag_name.startsWith(prefix)
    ? release.tag_name.slice(prefix.length)
    : release.tag_name;
  return raw.startsWith("v") ? raw : `v${raw}`;
}

function latestReleaseFor(project, releases) {
  return releases
    .filter(release => !release.draft && release.tag_name.startsWith(project.releasePrefix))
    .sort((a, b) => {
      const aTime = a.published_at || a.created_at || "";
      const bTime = b.published_at || b.created_at || "";
      return bTime.localeCompare(aTime);
    })[0] || null;
}

function newestDate(...dates) {
  return dates.filter(Boolean).sort((a, b) => b.localeCompare(a))[0] || "";
}

const config = JSON.parse(await readFile(configPath, "utf8"));
const releaseCache = new Map();
const generated = [];

async function releasesFor(project) {
  const repository = project.releaseRepository || project.repository || defaultReleaseRepository;
  if (!releaseCache.has(repository)) {
    releaseCache.set(repository, fetchAllReleases(repository));
  }
  return {
    repository,
    releases: await releaseCache.get(repository)
  };
}

for (const project of config) {
  const { repository: releaseRepository, releases } = await releasesFor(project);
  const worklog = await latestWorklog(project.slug);
  const matchingReleases = releases.filter(
    release => !release.draft && release.tag_name.startsWith(project.releasePrefix)
  );
  const release = latestReleaseFor(project, releases);
  const asset = release ? selectReleaseAsset(release) : null;
  const version = release ? versionFromRelease(release, project.releasePrefix, asset) : "첫 공개 전";
  const updated = newestDate(release ? releaseDate(release) : "", worklog?.date);

  generated.push({
    title: project.title,
    href: `/projects/${project.slug}/`,
    repository: project.repository || null,
    repositoryUrl: project.repository ? `https://github.com/${project.repository}` : null,
    issuesUrl: project.repository ? `https://github.com/${project.repository}/issues` : null,
    releaseRepository,
    image: project.image,
    imageAlt: project.imageAlt,
    platform: project.platform,
    type: project.type,
    status: release ? "public" : "development",
    statusLabel: release ? (release.prerelease ? "베타 공개" : "공개 중") : "개발 중",
    version,
    ...(asset ? {
      download: asset.browser_download_url,
      downloadAsset: asset.name,
      downloadCount: Number(asset.download_count) || 0
    } : {}),
    ...(release ? {
      releaseUrl: release.html_url,
      releaseName: release.name || version,
      releasePublishedAt: release.published_at || release.created_at || null
    } : {}),
    updated,
    publicBuilds: matchingReleases.length,
    description: project.description || (release
      ? `${version} 공개 · 전체 플레이 QA 진행 중`
      : worklog
        ? `${worklog.title} · 플레이 QA 진행 필요`
        : "개발 진행 중"),
    keywords: project.keywords || [],
    latestWorklog: worklog,
    latestReleaseTag: release?.tag_name || null
  });
}

generated.sort((a, b) => b.updated.localeCompare(a.updated) || a.title.localeCompare(b.title, "ko"));

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(
  outputPath,
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      projects: generated
    },
    null,
    2
  ) + "\n",
  "utf8"
);

console.log(`Generated ${generated.length} project entries -> ${path.relative(root, outputPath)}`);
