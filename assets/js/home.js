let projects = [];
let activeStatus = "all";
let activePlatform = "all";
let activeGenre = "all";
let showAllProjects = false;

const fallbackProjects = [
  {
    title: "내 여동생이 이렇게 귀여울 리가 없어, 포터블이 계속될 리가 없어",
    href: "/projects/oreimo-portable-tsuzuku/",
    image: "/assets/images/oreimo-portable-tsuzuku/2026-10-06-title.webp",
    imageAlt: "내 여동생이 이렇게 귀여울 리가 없어, 포터블이 계속될 리가 없어 한글 타이틀 화면",
    imageFit: "cover",
    platform: "PSP",
    genre: "어드벤처",
    subgenre: "연애",
    type: "한국어 패치",
    status: "public",
    statusLabel: "베타 공개",
    version: "v1.0.0",
    updated: "2026-10-09",
    publicBuilds: 1,
    releaseUrl: "https://github.com/ievy3/ievy3.github.io/releases/tag/oreimo2-v1.0.0",
    releasePublishedAt: "2026-10-09T01:10:57Z",
    download: "https://github.com/ievy3/ievy3.github.io/releases/download/oreimo2-v1.0.0/OreImoDisc2KrPatcher.zip",
    description: "전작의 이야기를 이어가는 PSP용 연애 어드벤처 게임",
    keywords: ["내 여동생이 이렇게 귀여울 리가 없어", "포터블이 계속될 리가 없어", "oreimo", "adventure"]
  },
  {
    title: "사키 아치가편 포터블",
    href: "/projects/saki-achiga-portable/",
    image: "/assets/images/saki-achiga-portable/2026-10-09-title.webp",
    imageAlt: "사키 아치가편 포터블 한글 타이틀 화면",
    imageFit: "cover",
    platform: "PSP",
    genre: "테이블",
    subgenre: "마작",
    type: "한국어 패치",
    status: "public",
    statusLabel: "베타 공개",
    version: "v0.9.0-rc7",
    updated: "2026-10-09",
    publicBuilds: 1,
    releaseUrl: "https://github.com/ievy3/ievy3.github.io/releases/tag/sakiA-v0.9.0",
    releasePublishedAt: "2026-10-09T00:16:57Z",
    latestReleaseTag: "sakiA-v0.9.0",
    download: "https://github.com/ievy3/ievy3.github.io/releases/download/sakiA-v0.9.0/Saki_Achiga_Korean_Patch_v0.9.0-rc7.zip",
    description: "아치가 여학원의 소녀들이 전국 무대를 향해 나아가는 이야기를 바탕으로 한 대전 마작 게임",
    keywords: ["사키 아치가편", "사키 -Saki- 아치가편", "episode of side-A", "saki achiga portable", "mahjong", "alchemist"]
  },
  {
    title: "사키 포터블",
    href: "/projects/saki-portable/",
    image: "/assets/images/saki-portable/2026-10-05-title.webp",
    imageAlt: "사키 포터블 한글 타이틀 화면",
    imageFit: "cover",
    platform: "PSP",
    genre: "테이블",
    subgenre: "마작",
    type: "한국어 패치",
    status: "development",
    statusLabel: "작업 중",
    version: "첫 공개 전",
    updated: "2026-10-05",
    publicBuilds: 0,
    description: "TV 애니메이션을 바탕으로 캐릭터별 능력과 스토리를 재현한 대전 마작 게임",
    keywords: ["사키 포터블", "사키", "咲-Saki- Portable", "saki portable", "mahjong", "alchemist"]
  },
  {
    title: "환상수호전 이어지는 백 년의 시간",
    href: "/projects/genso-suikoden-100-years/",
    image: "/assets/images/genso-suikoden-100-years/2026-10-03-title.webp",
    imageAlt: "환상수호전 이어지는 백 년의 시간 v0.9.0 베타 한글 타이틀 화면",
    imageFit: "cover",
    platform: "PSP",
    genre: "RPG",
    type: "한국어 패치",
    status: "public",
    statusLabel: "베타 공개",
    version: "v0.9.0",
    download: "https://github.com/ievy3/ievy3.github.io/releases/download/SuikodenTHT-v0.9.0/Noctil_Patchworks_Offline_SuikodenTHT_v0.9.0.zip",
    updated: "2026-10-03",
    publicBuilds: 1,
    description: "요구하는 것은 질서인가, 자유인가. 시간을 넘어 방어되는 새로운 백만 세계의 이야기.",
    keywords: ["환상수호전 이어지는 백 년의 시간", "환상수호전 이어지는 백년의 시간", "환상수호전", "gensosuikoden", "genso suikoden", "suikoden", "jrpg", "konami"]
  },
  {
    title: "Sol Trigger",
    href: "/projects/sol-trigger/",
    image: "/assets/images/sol-trigger/2026-10-01-title.webp",
    imageAlt: "Sol Trigger v0.9.1 한글 타이틀 화면",
    imageFit: "cover",
    platform: "PSP",
    genre: "RPG",
    type: "한국어 패치",
    status: "development",
    statusLabel: "작업 중",
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
    genre: "SRPG",
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
    genre: "SRPG",
    subgenre: "전략",
    type: "한국어 패치",
    status: "development",
    statusLabel: "작업 중",
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
    genre: "SRPG",
    subgenre: "전술",
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
    genre: "RPG",
    subgenre: "던전 탐험",
    type: "한국어 패치",
    status: "public",
    statusLabel: "베타 공개",
    version: "v0.9.3-beta.1",
    download: "https://github.com/ievy3/ievy3.github.io/releases/download/hexyz-v0.9.3/Noctil_Patchworks_Offline_v0.9.3-beta.1.zip",
    updated: "2026-10-06",
    publicBuilds: 4,
    description: "두 주인공의 시점으로 세계의 창조와 파괴를 그리는 던전 탐험형 JRPG",
    keywords: ["엑시즈 포스", "hexyz", "rpg", "atlus"]
  }
];

const additionalVerificationByHref = {
  "/projects/oreimo-portable-tsuzuku/": ["PSP-1000"],
  "/projects/saki-achiga-portable/": ["PSP-1000"],
  "/projects/saki-portable/": ["PSP-1000"],
  "/projects/jinguji-ashes-and-diamonds/": ["PSP-1000"],
  "/projects/hexyz-force/": ["PSP-1000"],
  "/projects/genso-suikoden-100-years/": ["PSP-1000"],
  "/projects/generation-of-chaos-6/": ["PSP-1000"],
  "/projects/sol-trigger/": ["PS Vita"],
  "/projects/summon-night-5/": ["PS Vita"]
};
fallbackProjects.forEach(project => {
  project.verification = [...new Set([
    ...(project.platform === "PSP" ? ["PPSSPP"] : []),
    ...(additionalVerificationByHref[project.href] || [])
  ])];
});

const grid = document.querySelector("#project-grid");
const emptyState = document.querySelector("#empty-state");
const resultCount = document.querySelector("#result-count");
const searchInput = document.querySelector("#project-search");
const searchBox = document.querySelector(".search-box");
const statusButtons = [...document.querySelectorAll("[data-status-filter]")];
const platformFilters = document.querySelector("#platform-filters");
const genreFilters = document.querySelector("#genre-filters");
const moreWrap = document.querySelector("#archive-more");
const moreButton = document.querySelector("#archive-more-button");
const popularList = document.querySelector("#popular-list");
const plannedSection = document.querySelector("#planned");
const plannedList = document.querySelector("#planned-list");
let plannedProjects = [];

// 대문 "한글 패치는 이렇게 만들어집니다"의 여섯 단계와 같은 순서입니다.
const PATCH_STAGES = ["게임 분석", "번역 준비", "대사 번역", "화면 한글화", "실행 검수", "패치 배포"];

// 장르는 이 네 가지 큰 분류로만 묶고, 마작·추리·연애 같은 세부 장르는 subgenre에 둡니다.
const GENRES = ["RPG", "SRPG", "어드벤처", "테이블"];
const GENRE_NAMES = { RPG: "롤플레잉", SRPG: "시뮬레이션 RPG", 어드벤처: "어드벤처", 테이블: "테이블 게임" };

// 카드의 기종·장르·세부 장르를 누르면 그 조건으로 목록을 거릅니다.
function genreMarkup(project) {
  const genre = project.genre || "RPG";
  const sub = project.subgenre
    ? `<i aria-hidden="true">·</i><button class="kicker-tag project-subgenre" type="button" data-pick-search="${project.subgenre}" title="${project.subgenre} 프로젝트만 보기">${project.subgenre}</button>`
    : "";
  return `<button class="kicker-tag" type="button" data-pick-genre="${genre}" title="${GENRE_NAMES[genre] || genre} 프로젝트만 보기">${genre}</button>${sub}`;
}

function pickFromCard(event) {
  const tag = event.target.closest(".kicker-tag");
  if (!tag) return;
  const pick = (container, value) => container?.querySelector(`[data-facet="${CSS.escape(value)}"]`)?.click();
  event.stopPropagation();
  if (tag.dataset.pickPlatform) pick(platformFilters, tag.dataset.pickPlatform);
  if (tag.dataset.pickGenre) pick(genreFilters, tag.dataset.pickGenre);
  if (tag.dataset.pickSearch && searchInput) {
    searchInput.value = tag.dataset.pickSearch;
    render();
  }
  document.querySelector(".archive-controls")?.scrollIntoView({ block: "center", behavior: "smooth" });
}

function stageMarkup(stage) {
  if (!Number.isInteger(stage) || stage < 1 || stage > PATCH_STAGES.length) return "";
  const name = PATCH_STAGES[stage - 1];
  const dots = PATCH_STAGES.map((_, index) => `<b class="${index < stage ? "is-done" : ""}"></b>`).join("");
  return `<a class="project-stage" href="#patch-workflow" title="제작 단계 ${stage}/${PATCH_STAGES.length} · ${name}" aria-label="제작 단계 ${stage}단계: ${name}"><span class="stage-dots" aria-hidden="true">${dots}</span>${stage}단계 · ${name}</a>`;
}

function formatDate(date) {
  return date ? date.replaceAll("-", ".") : "—";
}

function normalized(value) {
  return value.toLocaleLowerCase("ko").replace(/\s+/g, "");
}

// 인기 패치: 모든 공개 버전의 GitHub 누적 다운로드 수가 많은 순서로 세 개를 보여 줍니다.
function downloadsOf(project) {
  return project.totalDownloads ?? project.downloadCount ?? 0;
}

function renderPopular() {
  if (!popularList) return;
  const popular = projects
    .filter(project => project.status === "public" && downloadsOf(project) > 0)
    .sort((a, b) => downloadsOf(b) - downloadsOf(a) || a.title.localeCompare(b.title, "ko"))
    .slice(0, 3);

  popularList.replaceChildren(...popular.map((project, index) => {
    const link = document.createElement("a");
    link.className = "latest-update-card popular-card";
    link.href = project.href;
    link.innerHTML = `
      <span class="popular-rank" aria-label="${index + 1}위">${index + 1}</span>
      <span class="latest-update-copy">
        <strong>${project.title}</strong>
        <span>${project.platform} · ${GENRE_NAMES[project.genre] || project.genre} · 다운로드 ${downloadsOf(project).toLocaleString("ko-KR")}회</span>
      </span>
      <span class="latest-update-arrow" aria-hidden="true">→</span>`;
    return link;
  }));
}

// 작업 예정: 아직 페이지가 없으므로 링크 없이 표지와 기본 정보만 보여 줍니다.
function renderPlanned() {
  if (!plannedSection || !plannedList) return;
  plannedSection.hidden = plannedProjects.length === 0;
  plannedList.replaceChildren(...plannedProjects.map(project => {
    const item = document.createElement("li");
    item.className = "planned-item";
    item.innerHTML = `
      <span class="planned-cover">${project.image ? `<img src="${project.image}" alt="${project.imageAlt || project.title}" loading="lazy">` : `<b aria-hidden="true">${project.platform}</b>`}</span>
      <strong>${project.title}</strong>
      <small>${project.platform} · ${GENRE_NAMES[project.genre] || project.genre}${project.subgenre ? ` · ${project.subgenre}` : ""}</small>
      ${project.note ? `<p>${project.note}</p>` : ""}`;
    return item;
  }));
}

function card(project) {
  const article = document.createElement("article");
  article.className = "project-card";

  const cardImage = project.image;
  const verificationMarkup = (project.verification || []).length
    ? `<div class="project-verify" aria-label="확인된 실행 환경">
        <span class="project-verify-label">검증 환경</span>
        ${project.verification.map(environment => `<span class="verify-badge">${environment} ✓</span>`).join("")}
      </div>`
    : "";
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
      <span class="project-kicker"><button class="kicker-tag" type="button" data-pick-platform="${project.platform}" title="${project.platform} 프로젝트만 보기">${project.platform}</button><i aria-hidden="true">·</i>${genreMarkup(project)}${stageMarkup(project.stage)}</span>
      <div class="project-title-row">
        <h3><a href="${project.href}">${project.title}</a></h3>
        <span class="version-pill">${project.version}</span>
      </div>
      <p class="project-desc">${displayDescription}</p>
      ${verificationMarkup}
      <div class="project-foot">
        <div>
          <span class="project-state ${project.status}"><i></i>${project.statusLabel}</span>
          <time class="project-date" datetime="${project.updated}">업데이트 ${formatDate(project.updated)}</time>
        </div>
        <div class="project-actions">
          <a class="card-button secondary" href="${project.href}">프로젝트 보기</a>
          ${project.download ? (project.downloadMode === "release-page" && project.releaseUrl ? `<a class="card-button download" href="${project.releaseUrl}">배포 파일 보기 ↗</a>` : `<a class="card-button download" href="${project.download}" download>패치 다운로드 ↓</a>`) : ""}
        </div>
      </div>
    </div>`;
  // Clamped card text remains readable in full on hover.
  article.querySelector(".project-title-row h3 a").title = project.title;
  article.querySelector(".project-desc").title = displayDescription;
  return article;
}

function render() {
  const query = normalized(searchInput?.value.trim() || "");
  const filtered = projects
    .filter(project => {
      const haystack = normalized([
        project.title,
        project.platform,
        project.genre,
        GENRE_NAMES[project.genre] || "",
        project.subgenre || "",
        project.statusLabel,
        ...(project.keywords || [])
      ].join(" "));

      return (activeStatus === "all" || project.status === activeStatus)
        && (activePlatform === "all" || project.platform === activePlatform)
        && (activeGenre === "all" || project.genre === activeGenre)
        && (!query || haystack.includes(query));
    })
    .sort((a, b) => {
      const statusOrder = { public: 0, development: 1 };
      const statusDelta = (statusOrder[a.status] ?? 9) - (statusOrder[b.status] ?? 9);
      return statusDelta || b.updated.localeCompare(a.updated) || a.title.localeCompare(b.title, "ko");
    });

  // 필터·검색을 쓰지 않을 때는 처음 세 줄(1열 화면은 6개)만 보여 주고 나머지는 「더 보기」로 펼칩니다.
  const filtering = Boolean(query) || activeStatus !== "all" || activePlatform !== "all" || activeGenre !== "all";
  const limit = collapsedLimit();
  const collapsible = !filtering && filtered.length > limit;
  const visible = collapsible && !showAllProjects ? filtered.slice(0, limit) : filtered;

  grid.replaceChildren(...visible.map(card));
  emptyState.hidden = filtered.length !== 0;
  if (moreWrap && moreButton) {
    moreWrap.hidden = !collapsible;
    moreButton.textContent = showAllProjects ? "접기" : `더 보기 (+${filtered.length - limit})`;
    moreButton.setAttribute("aria-expanded", String(showAllProjects));
  }
  resultCount.innerHTML = filtered.length === projects.length
    ? `전체 <strong>${projects.length}</strong>개 프로젝트`
    : `전체 ${projects.length}개 중 <strong>${filtered.length}</strong>개 표시`;
}

function collapsedLimit() {
  const columns = getComputedStyle(grid).gridTemplateColumns.split(" ").filter(Boolean).length || 1;
  return columns === 1 ? 6 : columns * 3;
}

// 기종·장르 선택지를 데이터에서 만듭니다. 항목이 하나뿐이면 숨깁니다.
// dropdown이면 버튼 하나만 보이고, 누르면 선택지가 세로로 펼쳐집니다.
function buildFacet(container, { key, allLabel, order, label = value => value, onSelect, dropdown = false }) {
  if (!container) return;
  const counts = projects.reduce((map, project) => map.set(project[key], (map.get(project[key]) || 0) + 1), new Map());
  if (counts.size < 2) { container.hidden = true; return; }
  const values = [...counts.keys()].sort((a, b) => order(a, b, counts));
  const entries = [["all", allLabel, projects.length], ...values.map(value => [value, label(value), counts.get(value)])];

  let toggle, menu, toggleText;
  const setOpen = open => {
    if (!menu) return;
    menu.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
  };

  const buttons = entries.map(([value, text, count]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.facet = value;
    if (dropdown) {
      button.className = "facet-option";
      button.setAttribute("role", "option");
      button.innerHTML = `<span>${text}</span><small>${count}</small>`;
    } else {
      button.className = "status-filter";
      button.textContent = text;
    }
    button.addEventListener("click", () => {
      buttons.forEach(other => {
        const active = other === button;
        other.classList.toggle("is-active", active);
        other.setAttribute(dropdown ? "aria-selected" : "aria-pressed", String(active));
      });
      if (dropdown) {
        toggleText.textContent = text;
        toggle.classList.toggle("is-active", value !== "all");
        setOpen(false);
      }
      onSelect(value);
      render();
    });
    const active = value === "all";
    button.classList.toggle("is-active", active);
    button.setAttribute(dropdown ? "aria-selected" : "aria-pressed", String(active));
    return button;
  });

  const slot = container.querySelector(".facet-buttons");
  if (!dropdown) {
    slot.replaceChildren(...buttons);
  } else {
    const wrap = document.createElement("div");
    wrap.className = "facet-dropdown";
    toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "status-filter facet-toggle";
    toggle.setAttribute("aria-haspopup", "listbox");
    toggle.setAttribute("aria-expanded", "false");
    toggle.innerHTML = `<span>${allLabel}</span><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 4.5 6 8l3.5-3.5"/></svg>`;
    toggleText = toggle.querySelector("span");
    menu = document.createElement("div");
    menu.className = "facet-menu";
    menu.setAttribute("role", "listbox");
    menu.setAttribute("aria-labelledby", container.getAttribute("aria-labelledby") || "");
    menu.hidden = true;
    menu.append(...buttons);
    wrap.append(toggle, menu);
    slot.replaceChildren(wrap);

    toggle.addEventListener("click", () => {
      const open = menu.hidden;
      setOpen(open);
      if (open) (buttons.find(button => button.classList.contains("is-active")) || buttons[0]).focus();
    });
    document.addEventListener("click", event => { if (!wrap.contains(event.target)) setOpen(false); });
    wrap.addEventListener("keydown", event => {
      if (event.key === "Escape" && !menu.hidden) { setOpen(false); toggle.focus(); return; }
      if (menu.hidden || !["ArrowDown", "ArrowUp"].includes(event.key)) return;
      event.preventDefault();
      const index = buttons.indexOf(document.activeElement);
      const next = event.key === "ArrowDown" ? Math.min(buttons.length - 1, index + 1) : Math.max(0, index - 1);
      buttons[next].focus();
    });
  }
  container.hidden = false;
}

function buildFacets() {
  buildFacet(platformFilters, {
    key: "platform",
    allLabel: "모든 기종",
    order: (a, b, counts) => counts.get(b) - counts.get(a),
    onSelect: value => { activePlatform = value; },
    dropdown: true
  });
  buildFacet(genreFilters, {
    key: "genre",
    allLabel: "모든 장르",
    order: (a, b) => (GENRES.indexOf(a) + 1 || 99) - (GENRES.indexOf(b) + 1 || 99),
    label: value => GENRE_NAMES[value] || value,
    onSelect: value => { activeGenre = value; },
    dropdown: true
  });
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
  const loaded = await loadProjects();
  projects = loaded.filter(project => project.status !== "planned");
  plannedProjects = loaded.filter(project => project.status === "planned");

  const platformCounts = projects.reduce((counts, project) => counts.set(project.platform, (counts.get(project.platform) || 0) + 1), new Map());
  const platformLabel = [...platformCounts.keys()].sort((a, b) => platformCounts.get(b) - platformCounts.get(a)).join(" · ");
  const heroSummary = document.querySelector("#hero-summary");
  if (heroSummary) heroSummary.textContent = `${projects.length} Projects · ${platformLabel}`;
  if (searchBox) searchBox.hidden = projects.length < 6;

  statusButtons.forEach(button => {
    const status = button.dataset.statusFilter;
    if (status !== "all") button.hidden = !projects.some(project => project.status === status);
  });

  renderPopular();
  renderPlanned();

  statusButtons.forEach(button => {
    button.addEventListener("click", () => setStatus(button.dataset.statusFilter));
  });
  searchInput?.addEventListener("input", render);
  grid.addEventListener("click", pickFromCard);
  buildFacets();
  moreButton?.addEventListener("click", () => {
    showAllProjects = !showAllProjects;
    render();
    if (!showAllProjects) document.querySelector("#patches")?.scrollIntoView({ block: "start" });
  });
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(render, 150);
  });

  setStatus("all");
}

init();
