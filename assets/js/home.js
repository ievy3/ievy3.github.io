let projects = [];

const fallbackProjects = [
  {
    title: "Hexyz Force",
    href: "/projects/hexyz-force/",
    image: "/assets/images/hexyz-force/worklog-2026-09-13/01-title-screen.webp",
    imageAlt: "엑시즈 포스 한글 타이틀 화면",
    platform: "PSP",
    type: "한국어 패치",
    status: "public",
    statusLabel: "베타 공개",
    version: "v0.9.2-beta.1",
    download: "https://github.com/ievy3/ievy3.github.io/releases/download/hexyz-v0.9.2/Noctil_Patchworks_Offline_v0.9.2-beta.1.zip",
    updated: "2026-09-19",
    publicBuilds: 3,
    description: "v0.9.2-beta.1 공개 · 전체 플레이 QA 진행 중",
    keywords: ["엑시즈 포스", "hexyz", "rpg", "atlus"]
  },
  {
    title: "Gungnir",
    href: "/projects/gungnir/",
    image: "/assets/images/gungnir/worklog-2026-09-13/01-first-korean-dialogue.png",
    imageAlt: "궁그닐 첫 한글 대사 적용 화면",
    platform: "PSP",
    type: "한국어 패치",
    status: "development",
    statusLabel: "개발 중",
    version: "첫 공개 전",
    updated: "2026-09-16",
    publicBuilds: 0,
    description: "최종 통합본 생성과 첫 맵 안정화 · 플레이 QA 진행 필요",
    keywords: ["궁그닐", "gungnir", "srpg", "atlus"]
  },
  {
    title: "Summon Night 5",
    href: "/projects/summon-night-5/",
    image: "https://s.pacn.ws/1/p/fv/Summon_Night_5_285867.9.jpg?crop=1500%2C1500&v=mjp2zz&width=300",
    imageAlt: "Summon Night 5 일본판 PSP 게임 커버",
    platform: "PSP",
    type: "한국어 패치",
    status: "development",
    statusLabel: "개발 중",
    version: "첫 공개 전",
    updated: "2026-09-19",
    publicBuilds: 0,
    description: "Phase 1 돌파 · 시나리오 전량 추출·재삽입 및 한글 글리프 표시 확인",
    keywords: ["서몬 나이트 5", "서몬나이트5", "summon night 5", "summonnight", "srpg", "felistella"]
  }
];

const grid = document.querySelector("#project-grid");
const emptyState = document.querySelector("#empty-state");
const resultCount = document.querySelector("#result-count");
const resetButton = document.querySelector("#reset-filters");
const controls = {
  sort: document.querySelector("#sort-projects"),
  status: document.querySelector("#filter-status"),
  platform: document.querySelector("#filter-platform"),
  type: document.querySelector("#filter-type"),
  search: document.querySelector("#project-search")
};

function addOptions(select, values) {
  values
    .sort((a, b) => a.localeCompare(b, "ko"))
    .forEach(value => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      select.append(option);
    });
}

function formatDate(date) {
  return date ? date.replaceAll("-", ".") : "—";
}

function card(project) {
  const article = document.createElement("article");
  article.className = "project-card";
  article.innerHTML = `
    <a class="project-cover" href="${project.href}" aria-label="${project.title} 프로젝트 보기"><img src="${project.image}" alt="${project.imageAlt}" loading="lazy"${project.image.startsWith("http") ? ' referrerpolicy="no-referrer"' : ""}></a>
    <div class="project-info">
      <span class="project-kicker">${project.platform} · ${project.type}</span>
      <h3><a href="${project.href}">${project.title}</a></h3>
      <p class="project-desc">${project.description}</p>
      <div class="project-tags"><span class="tag version">${project.version}</span><span class="tag type">${project.type}</span></div>
      <div class="project-foot">
        <div><span class="project-state ${project.status}"><i></i>${project.statusLabel}</span><time class="project-date" datetime="${project.updated}">업데이트 ${formatDate(project.updated)}</time></div>
        <div class="project-actions">
          <a class="card-button secondary" href="${project.href}">프로젝트 보기</a>
          ${project.download ? `<a class="card-button download" href="${project.download}" download>최신 패치 ↓</a>` : ""}
        </div>
      </div>
    </div>`;
  return article;
}

function normalized(value) {
  return value.toLocaleLowerCase("ko").replace(/\s+/g, "");
}

function render() {
  const query = normalized(controls.search.value.trim());
  const filtered = projects.filter(project => {
    const haystack = normalized([
      project.title,
      project.platform,
      project.type,
      project.statusLabel,
      ...(project.keywords || [])
    ].join(" "));

    return (controls.status.value === "all" || project.status === controls.status.value)
      && (controls.platform.value === "all" || project.platform === controls.platform.value)
      && (controls.type.value === "all" || project.type === controls.type.value)
      && (!query || haystack.includes(query));
  });

  const statusOrder = { public: 0, development: 1 };
  filtered.sort((a, b) => {
    if (controls.sort.value === "title-asc") return a.title.localeCompare(b.title, "ko");
    if (controls.sort.value === "status") {
      return (statusOrder[a.status] ?? 99) - (statusOrder[b.status] ?? 99)
        || b.updated.localeCompare(a.updated);
    }
    return b.updated.localeCompare(a.updated);
  });

  grid.replaceChildren(...filtered.map(card));
  emptyState.hidden = filtered.length !== 0;
  resultCount.innerHTML = filtered.length === projects.length
    ? `전체 <strong>${projects.length}</strong>개 프로젝트`
    : `전체 ${projects.length}개 중 <strong>${filtered.length}</strong>개 표시`;
  resetButton.hidden = controls.status.value === "all"
    && controls.platform.value === "all"
    && controls.type.value === "all"
    && !query;
}

function reset() {
  controls.sort.value = "updated-desc";
  controls.status.value = "all";
  controls.platform.value = "all";
  controls.type.value = "all";
  controls.search.value = "";
  render();
}

async function loadProjects() {
  try {
    const response = await fetch("/assets/data/projects.generated.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`project index HTTP ${response.status}`);
    const payload = await response.json();
    if (!Array.isArray(payload.projects) || payload.projects.length === 0) {
      throw new Error("project index is empty");
    }
    return payload.projects;
  } catch (error) {
    console.warn("Generated project index unavailable; using fallback data.", error);
    return fallbackProjects;
  }
}

async function init() {
  projects = await loadProjects();

  addOptions(controls.platform, [...new Set(projects.map(project => project.platform))]);
  addOptions(controls.type, [...new Set(projects.map(project => project.type))]);

  document.querySelector("#project-count").textContent = String(projects.length).padStart(2, "0");
  document.querySelector("#platform-count").textContent = String(new Set(projects.map(project => project.platform)).size).padStart(2, "0");
  document.querySelector("#release-count").textContent = String(
    projects.reduce((total, project) => total + (project.publicBuilds || 0), 0)
  ).padStart(2, "0");

  Object.values(controls).forEach(control => {
    control.addEventListener(control === controls.search ? "input" : "change", render);
  });
  resetButton.addEventListener("click", reset);

  render();
}

init();
