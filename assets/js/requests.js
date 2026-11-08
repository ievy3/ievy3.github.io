(() => {
  const REPO = "ievy3/ievy3.github.io";
  const LABEL = "patch-request";
  const STATUS_LABELS = { "status:검토중": "검토 중", "status:예정": "예정", "status:완료": "완료", "status:보류": "보류" };
  const $ = id => document.getElementById(id);
  const body = $("rq-body");
  let items = [];

  function field(text, name) {
    const m = (text || "").match(new RegExp("###\\s*" + name + "\\s*\\n+([^\\n]*)"));
    const v = m ? m[1].trim() : "";
    return v === "_No response_" ? "" : v;
  }

  function parse(issue) {
    const names = issue.labels.map(l => l.name);
    let status = "접수";
    for (const n of names) if (STATUS_LABELS[n]) status = STATUS_LABELS[n];
    if (status === "접수" && issue.state === "closed") status = "보류";
    const game = field(issue.body, "게임 이름") || issue.title.replace(/^\[요청\]\s*/, "");
    return {
      url: issue.html_url,
      game,
      platform: field(issue.body, "플랫폼") || "기타",
      status,
      votes: (issue.reactions && issue.reactions["+1"]) || 0,
      created: issue.created_at
    };
  }

  function fmtDate(iso) {
    const d = new Date(new Date(iso).getTime() + 9 * 3600e3);
    return d.toISOString().slice(0, 10);
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  function render() {
    const q = $("rq-search").value.trim().toLowerCase();
    const p = $("rq-platform").value;
    const s = $("rq-status").value;
    const sort = $("rq-sort").value;
    const rows = items.filter(i => (!q || i.game.toLowerCase().includes(q)) && (!p || i.platform === p) && (!s || i.status === s));
    rows.sort((a, b) =>
      sort === "title" ? a.game.localeCompare(b.game, "ko") :
      sort === "new" ? b.created.localeCompare(a.created) :
      b.votes - a.votes || b.created.localeCompare(a.created));
    if (!rows.length) {
      body.innerHTML = `<tr><td colspan="5" class="rq-empty">${items.length ? "조건에 맞는 요청이 없습니다." : "아직 올라온 요청이 없습니다. 첫 요청을 남겨 보세요."}</td></tr>`;
    } else {
      body.innerHTML = rows.map(i => `<tr>
        <td class="c-votes"><a href="${esc(i.url)}" target="_blank" rel="noopener" title="요청 페이지에서 👍 을 눌러 응원">👍 ${i.votes}</a></td>
        <td class="c-game"><a href="${esc(i.url)}" target="_blank" rel="noopener">${esc(i.game)}</a></td>
        <td class="c-platform">${esc(i.platform)}</td>
        <td class="c-status"><span class="rq-badge" data-status="${esc(i.status)}">${esc(i.status)}</span></td>
        <td class="c-date">${fmtDate(i.created)}</td></tr>`).join("");
    }
    $("rq-foot").textContent = `총 ${items.length}건` + (rows.length !== items.length ? ` · ${rows.length}건 표시` : "") + " · 응원은 요청 페이지에서 👍 을 눌러 주세요.";
  }

  function fillPlatforms() {
    const set = [...new Set(items.map(i => i.platform))].sort((a, b) => a.localeCompare(b, "ko"));
    $("rq-platform").insertAdjacentHTML("beforeend", set.map(x => `<option>${esc(x)}</option>`).join(""));
  }

  async function load() {
    try {
      const r = await fetch(`https://api.github.com/repos/${REPO}/issues?labels=${LABEL}&state=all&per_page=100&sort=created&direction=desc`, { headers: { Accept: "application/vnd.github+json" } });
      if (!r.ok) throw new Error(r.status);
      const data = await r.json();
      items = data.filter(i => !i.pull_request).map(parse);
      fillPlatforms();
      render();
    } catch (e) {
      body.innerHTML = `<tr><td colspan="5" class="rq-empty">목록을 불러오지 못했습니다. 잠시 후 다시 시도하거나 <a href="https://github.com/${REPO}/issues?q=label%3A${LABEL}" target="_blank" rel="noopener">GitHub에서 직접 보기 ↗</a></td></tr>`;
    }
  }

  ["rq-search", "rq-platform", "rq-status", "rq-sort"].forEach(id => $(id).addEventListener("input", render));
  load();
})();
