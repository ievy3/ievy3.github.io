let projects = [];
let activeStatus = "all";

const fallbackProjects = [
  {
    title: "환상수호전 이어지는 백 년의 시간",
    href: "/projects/genso-suikoden-100-years/",
    image: "/assets/images/genso-suikoden-100-years/2026-10-03-title.webp",
    imageAlt: "환상수호전 이어지는 백 년의 시간 v0.9.0 베타 한글 타이틀 화면",
    imageFit: "cover",
    platform: "PSP",
    type: "한국어 패치",
    status: "public",
    statusLabel: "베타 공개",
    version: "v0.9.0",
    download: "https://github.com/ievy3/ievy3.github.io/releases/download/SuikodenTHT-v0.9.0/Noctil_Patchworks_Offline_SuikodenTHT_v0.9.0.zip",
    updated: "2026-10-03",
    publicBuilds: 1,
    description: "100년의 시간을 넘어 서로 다른 시대의 동료들과 인연을 잇는 스토리 중심 JRPG",
    keywords: ["환상수호전 이어지는 백 년의 시간", "환상수호전 이어지는 백년의 시간", "환상수호전", "gensosuikoden", "genso suikoden", "suikoden", "jrpg", "konami"]
  },
  {
    title: "Sol Trigger",
    href: "/projects/sol-trigger/",
    image: "/assets/images/sol-trigger/2026-10-01-title.webp",
    imageAlt: "Sol Trigger v0.9.1 한글 타이틀 화면",
    imageFit: "cover",
    platform: "PSP",
    type: "한국어 패치",
    status: "development",
    statusLabel: "개발 중",
    version: "첫 공개 전",
    updated: "2026-09-29",
    publicBuilds: 0,
    description: "에너지 ‘솔’을 둘러싼 지배와 저항의 이야기를 그린 스토리 중심 JRPG",
    keywords: ["솔 트리거", "솔트리거", "sol trigger", "jrpg", "imageepoch"]
  },
  {
    title: "Summon Night 5",
    href: "/projects/summon-night-5/",
    image: "/assets/images/summon-night-5/2026-09-28-title.webp",
    imageAlt: "Summon Night 5 v0.7.0 베타 한글 타이틀 화면",
    platform: "PSP",
    type: "한국어 패치",
    status: "public",
    statusLabel: "베타 공개",
    version: "v0.7.0",
    download: "https://github.com/ievy3/ievy3.github.io/releases/download/SN5-v0.7.0/Noctil_Patchworks_Offline_SN5_v0.7.0.zip",
    updated: "2026-09-28",
    publicBuilds: 1,
    description: "소환술과 파트너 시스템을 중심으로 전개되는 판타지 전략 RPG",
    keywords: ["서몬 나이트 5", "서몬나이트5", "summon night 5", "summonnight", "srpg", "felistella"]
  },
  {
    title: "Generation of Chaos 6",
    href: "/projects/generation-of-chaos-6/",
    image: "https://images.launchbox-app.com/d4799dcc-27cf-4a16-b315-c3bbbf6a3292.png",
    imageAlt: "Generation of Chaos 6 대표 PSP 타이틀 화면",
    platform: "PSP",
    type: "한국어 패치",
    status: "development",
    statusLabel: "개발 중",
    version: "첫 공개 전",
    updated: "2026-09-23",
    publicBuilds: 0,
    description: "대륙 제패를 목표로 내정·부대 운용·전투를 병행하는 판타지 전략 RPG",
    keywords: ["제네레이션 오브 카오스 6", "제네레이션오브카오스6", "generation of chaos 6", "goc6", "srpg", "sting", "idea factory"]
  },
  {
    title: "Gungnir",
    href: "/projects/gungnir/",
    image: "/assets/images/gungnir/latest-2026-09-23-title.webp",
    imageAlt: "궁그닐 v0.9.0 공개 검수판 한글 타이틀 화면",
    platform: "PSP",
    type: "한국어 패치",
    status: "public",
    statusLabel: "베타 공개",
    version: "v0.9.0",
    download: "https://github.com/ievy3/ievy3.github.io/releases/download/gungnir-v0.9.0/Noctil_Patchworks_Gungnir_Offline_v0.9.0.exe",
    updated: "2026-09-22",
    publicBuilds: 2,
    description: "신화의 창 ‘궁그닐’을 손에 넣은 소년과 반란군의 전쟁을 그린 전술 RPG",
    keywords: ["궁그닐", "gungnir", "srpg", "atlus"]
  },
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
    description: "두 주인공의 시점으로 세계의 창조와 파괴를 그리는 던전 탐험형 JRPG",
    keywords: ["엑시즈 포스", "hexyz", "rpg", "atlus"]
  }
];

const grid = document.querySelector("#project-grid");
const emptyState = document.querySelector("#empty-state");
const resultCount = document.querySelector("#result-count");
const searchInput = document.querySelector("#project-search");
const searchBox = document.querySelector(".search-box");
const statusButtons = [...document.querySelectorAll("[data-status-filter]")];

function formatDate(date) {
  return date ? date.replaceAll("-", ".") : "—";
}

function normalized(value) {
  return value.toLocaleLowerCase("ko").replace(/\s+/g, "");
}

function card(project) {
  const article = document.createElement("article");
  article.className = "project-card";

  const cardImage = project.image;
  let displayDescription = project.description || "";
  if (project.version && displayDescription.startsWith(project.version)) {
    displayDescription = displayDescription.slice(project.version.length).trim();
    displayDescription = displayDescription.replace(/^(?:베타\s+)?(?:배포본\s+확정|공개)\s*·\s*/, "");
  }

  article.innerHTML = `
    <a class="project-cover" style="--card-image:url('${cardImage}')" href="${project.href}" aria-label="${project.title} 프로젝트 보기">
      <img src="${cardImage}" alt="${project.imageAlt}" loading="lazy" style="object-fit:${project.imageFit || "cover"}"${cardImage.startsWith("http") ? ' referrerpolicy="no-referrer"' : ""}>
    </a>
    <div class="project-info">
      <span class="project-kicker">${project.platform}</span>
      <div class="project-title-row">
        <h3><a href="${project.href}">${project.title}</a></h3>
        <span class="version-pill">${project.version}</span>
      </div>
      <p class="project-desc">${displayDescription}</p>
      <div class="project-foot">
        <div>
          <span class="project-state ${project.status}"><i></i>${project.statusLabel}</span>
          <time class="project-date" datetime="${project.updated}">업데이트 ${formatDate(project.updated)}</time>
        </div>
        <div class="project-actions">
          <a class="card-button secondary" href="${project.href}">프로젝트 보기</a>
          ${project.download ? `<a class="card-button download" href="${project.download}" download>패치 다운로드 ↓</a>` : ""}
        </div>
      </div>
    </div>`;
  return article;
}

function render() {
  const query = normalized(searchInput?.value.trim() || "");
  const filtered = projects
    .filter(project => {
      const haystack = normalized([
        project.title,
        project.platform,
        project.statusLabel,
        ...(project.keywords || [])
      ].join(" "));

      return (activeStatus === "all" || project.status === activeStatus)
        && (!query || haystack.includes(query));
    })
    .sort((a, b) => {
      const statusOrder = { public: 0, development: 1 };
      const statusDelta = (statusOrder[a.status] ?? 9) - (statusOrder[b.status] ?? 9);
      return statusDelta || b.updated.localeCompare(a.updated) || a.title.localeCompare(b.title, "ko");
    });

  grid.replaceChildren(...filtered.map(card));
  emptyState.hidden = filtered.length !== 0;
  resultCount.innerHTML = filtered.length === projects.length
    ? `전체 <strong>${projects.length}</strong>개 프로젝트`
    : `전체 ${projects.length}개 중 <strong>${filtered.length}</strong>개 표시`;
}

function setStatus(status) {
  activeStatus = status;
  statusButtons.forEach(button => {
    const active = button.dataset.statusFilter === status;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
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

  const platforms = [...new Set(projects.map(project => project.platform))];
  const platformLabel = platforms.length === 1 ? platforms[0] : `${platforms.length} Platforms`;
  const heroSummary = document.querySelector("#hero-summary");
  if (heroSummary) heroSummary.textContent = `${projects.length} Projects · ${platformLabel}`;
  if (searchBox) searchBox.hidden = projects.length < 6;

  statusButtons.forEach(button => {
    button.addEventListener("click", () => setStatus(button.dataset.statusFilter));
  });
  searchInput?.addEventListener("input", render);

  setStatus("all");
}

init();
