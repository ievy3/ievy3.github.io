/* Shared project landing-page layout. Keep this synchronous and independent
   of release API requests so the reading order also works when they fail. */
(() => {
  const main = document.querySelector("body.project-page main");
  const recent = main?.querySelector(":scope > #recent-update");
  if (!recent || main.dataset.projectLayout === "reader-first") return;

  const nav = main.querySelector(":scope > .nav");
  const preview = main.querySelector(":scope > .preview-section");
  const developmentSections = Array.from(main.children).filter(element =>
    element.matches("#progress, #now, #pipeline, #milestones")
  );

  // Move the original nodes, preserving images, IDs, links and event handlers.
  if (preview) {
    if (!preview.id) preview.id = "preview";
    recent.after(preview);
    if (nav) {
      let link = Array.from(nav.querySelectorAll("a")).find(element =>
        element.getAttribute("href") === `#${preview.id}`
      );
      if (!link) link = document.createElement("a");
      link.href = `#${preview.id}`;
      link.textContent = "게임 내 적용 화면";
      const previous = nav.querySelector('a[href="#release"]')
        || nav.querySelector('a[href="#recent-update"]');
      if (previous) previous.after(link);
      else nav.append(link);
    }
  }

  if (developmentSections.length) {
    const stack = document.createElement("section");
    stack.className = "detail-stack development-details";
    stack.setAttribute("aria-label", "작업 상세 정보");

    const details = document.createElement("details");
    details.id = "development-details";
    // No `open` attribute: the entire development area starts collapsed.
    const summary = document.createElement("summary");
    const title = document.createElement("span");
    title.textContent = "작업 상세 정보";
    const hint = document.createElement("small");
    hint.textContent = "진행 현황 · 현재 작업 · 번역 기준 · 기술 기반";
    summary.append(title, hint);

    const body = document.createElement("div");
    body.className = "details-body development-details-body";
    body.append(...developmentSections);
    details.append(summary, body);
    stack.append(details);
    const footer = main.querySelector(":scope > footer");
    if (footer) footer.before(stack);
    else main.append(stack);

    if (nav) {
      const movedIds = new Set(developmentSections.map(element => `#${element.id}`));
      nav.querySelectorAll("a").forEach(link => {
        if (movedIds.has(link.getAttribute("href"))) link.remove();
      });
      const link = document.createElement("a");
      link.href = "#development-details";
      link.textContent = "작업 상세 정보";
      nav.append(link);
    }

    if (!document.querySelector("link[data-project-layout-styles]")) {
      const stylesheet = document.createElement("link");
      stylesheet.rel = "stylesheet";
      stylesheet.href = "/assets/css/project-layout.css?v=1";
      stylesheet.dataset.projectLayoutStyles = "";
      document.head.append(stylesheet);
    }
  }

  // Keep old #progress/#now/#pipeline/#milestones links usable inside details.
  // Also handle clicking the same anchor after the user closes its disclosure.
  function revealHashTarget(hash) {
    let target;
    try {
      target = hash && document.getElementById(decodeURIComponent(hash.slice(1)));
    } catch {
      return;
    }
    if (!target || !main.contains(target)) return;
    let disclosure = target.closest("details");
    let changed = false;
    while (disclosure) {
      if (!disclosure.open) {
        disclosure.open = true;
        changed = true;
      }
      disclosure = disclosure.parentElement?.closest("details");
    }
    if (changed) requestAnimationFrame(() => target.scrollIntoView({ block: "start", behavior: "instant" }));
  }

  nav?.addEventListener("click", event => {
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest('a[href^="#"]');
    if (link) revealHashTarget(link.getAttribute("href"));
  });
  window.addEventListener("hashchange", () => revealHashTarget(window.location.hash));
  main.dataset.projectLayout = "reader-first";
  revealHashTarget(window.location.hash);
})();

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

  function escapeHtml(value = "") {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function renderReleaseHistory(project) {
    const host = document.querySelector("[data-release-history], .release-history-list");
    if (!host || !Array.isArray(project.releaseHistory) || !project.releaseHistory.length) return;

    host.innerHTML = project.releaseHistory.map(release => {
      const version = escapeHtml(release.version || release.tag || "릴리스");
      const badge = release.prerelease ? "BETA" : "RELEASE";
      const date = escapeHtml(formatDate(release.date || (release.publishedAt || "").slice(0, 10)));
      const count = Number.isFinite(release.downloadCount)
        ? `다운로드 ${release.downloadCount.toLocaleString("ko-KR")}회`
        : "다운로드 파일 없음";
      const summary = escapeHtml(release.releaseName || `${version} 릴리스`);
      const url = escapeHtml(release.releaseUrl || "#");

      return `
        <article class="release-history-item">
          <div class="release-history-version"><strong>${version}</strong><span>${badge}</span></div>
          <div class="release-history-meta"><time>${date}</time><small>${count}</small></div>
          <p>${summary}</p>
          <a class="release-detail-link" href="${url}" target="_blank" rel="noopener">릴리스 보기 <span>→</span></a>
        </article>
      `;
    }).join("");
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
        `https://api.github.com/repos/${project.releaseRepository || "ievy3/ievy3.github.io"}/releases/tags/${encodeURIComponent(project.latestReleaseTag)}`,
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

      document.querySelectorAll("[data-release-download-count]").forEach(count => {
        count.textContent = `다운로드 ${(Number(asset.download_count) || 0).toLocaleString("ko-KR")}회`;
      });
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
      setText("[data-release-version]", project.version || "");
      setText("[data-release-status-label]", project.statusLabel || "");
      setText("[data-release-date]", formatDate(project.updated));
      setText("[data-release-date-badge]", project.updated ? `${formatDate(project.updated)} 업데이트` : "");
      setText("[data-release-title]", label);
      renderReleaseHistory(project);
      if (!Array.isArray(project.releaseHistory) || !project.releaseHistory.length) {
        setText("[data-release-history-version]", project.version || "");
      }

      document.querySelectorAll("[data-release-status]").forEach(element => {
        element.dataset.releaseStatus = project.status || "";
        element.classList.toggle("fact-live", project.status === "public");
        element.classList.toggle("fact-development", project.status !== "public");
      });

      const download = document.querySelector("[data-release-download]");
      if (download) {
        if (project.download) {
          download.href = project.download;
          download.removeAttribute("aria-disabled");
          download.classList.remove("disabled");
          const extMatch = project.downloadAsset?.match(/\.(zip|exe|7z)$/i);
          const extLabel = extMatch ? ` (.${extMatch[1].toLowerCase()})` : "";
          download.textContent = `${project.version} 패처 다운로드${extLabel}`;
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

      if (Number.isFinite(project.downloadCount)) {
        document.querySelectorAll("[data-release-download-count]").forEach(count => {
          count.textContent = `다운로드 ${project.downloadCount.toLocaleString("ko-KR")}회`;
        });
      }

      refreshLiveReleaseAsset(project);
    } catch (error) {
      console.warn("Release metadata unavailable; keeping static fallback.", error);
    }
  }

  loadReleaseMetadata();
})();
