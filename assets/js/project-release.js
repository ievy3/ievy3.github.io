(() => {
  const host = document.querySelector("[data-project-slug]");
  if (!host) return;

  const slug = host.dataset.projectSlug;
  const projectHref = `/projects/${slug}/`;

  function setText(selector, value) {
    if (!value) return;
    document.querySelectorAll(selector).forEach(element => {
      element.textContent = value;
    });
  }

  function formatDate(value) {
    return value ? value.replaceAll("-", ".") : "";
  }

  function versionLabel(project) {
    if (!project.version) return "";
    return project.statusLabel === "베타 공개"
      ? `${project.version} 공개 검수판`
      : project.version;
  }

  function selectReleaseAsset(release, preferredName = "") {
    const assets = (release.assets || []).filter(asset =>
      !/^source code/i.test(asset.name)
      && !/(?:^|[-_.])(license|readme|default)(?:[-_.]|$)/i.test(asset.name)
    );

    if (preferredName) {
      const preferred = assets.find(asset => asset.name === preferredName);
      if (preferred) return preferred;
    }

    for (const pattern of [/\.zip$/i, /\.exe$/i, /\.7z$/i]) {
      const asset = assets.find(candidate => pattern.test(candidate.name));
      if (asset) return asset;
    }

    return null;
  }

  async function refreshLiveReleaseAsset(project) {
    if (!project.latestReleaseTag) return;

    try {
      const response = await fetch(
        `https://api.github.com/repos/ievy3/ievy3.github.io/releases/tags/${encodeURIComponent(project.latestReleaseTag)}`,
        { headers: { Accept: "application/vnd.github+json" } }
      );
      if (!response.ok) throw new Error(`GitHub release API ${response.status}`);

      const release = await response.json();
      const asset = selectReleaseAsset(release, project.downloadAsset);
      if (!asset) return;

      const download = document.querySelector("[data-release-download]");
      if (download) {
        download.href = asset.browser_download_url;
        download.removeAttribute("aria-disabled");
        download.classList.remove("disabled");
      }

      const count = document.querySelector("[data-release-download-count]");
      if (count) {
        count.textContent = `다운로드 ${(Number(asset.download_count) || 0).toLocaleString("ko-KR")}회`;
      }
    } catch (error) {
      console.warn("Live GitHub release metadata unavailable; keeping generated metadata.", error);
    }
  }

  async function loadReleaseMetadata() {
    try {
      const response = await fetch("/assets/data/projects.generated.json", { cache: "no-store" });
      if (!response.ok) throw new Error(`project index HTTP ${response.status}`);

      const payload = await response.json();
      const project = (payload.projects || []).find(item => item.href === projectHref);
      if (!project) throw new Error(`project metadata not found: ${slug}`);

      const label = versionLabel(project);
      setText("[data-release-version-label]", label);
      setText("[data-release-date]", formatDate(project.updated));
      setText("[data-release-date-badge]", project.updated ? `${formatDate(project.updated)} 업데이트` : "");
      setText("[data-release-title]", label);
      setText("[data-release-history-version]", project.version || "");

      const download = document.querySelector("[data-release-download]");
      if (download) {
        if (project.download) {
          download.href = project.download;
          download.removeAttribute("aria-disabled");
          download.classList.remove("disabled");
          download.textContent = `${project.version} 패처 다운로드${project.downloadAsset?.toLowerCase().endsWith(".exe") ? " (.exe)" : ""}`;
        } else {
          download.removeAttribute("href");
          download.setAttribute("aria-disabled", "true");
          download.classList.add("disabled");
          download.textContent = `${project.version || "최신"} 배포 파일 등록 전`;
        }
      }

      const releaseLink = document.querySelector("[data-release-notes]");
      if (releaseLink && project.releaseUrl) {
        releaseLink.href = project.releaseUrl;
        releaseLink.hidden = false;
      }

      const count = document.querySelector("[data-release-download-count]");
      if (count && Number.isFinite(project.downloadCount)) {
        count.textContent = `다운로드 ${project.downloadCount.toLocaleString("ko-KR")}회`;
      }

      refreshLiveReleaseAsset(project);
    } catch (error) {
      console.warn("Release metadata unavailable; keeping static fallback.", error);
    }
  }

  loadReleaseMetadata();
})();
