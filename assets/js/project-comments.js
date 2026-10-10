// 프로젝트 페이지 하단 댓글(HtmlCommentBox). 방명록과 같은 계정을 쓰고,
// 프로젝트 주소별로 댓글이 따로 저장됩니다. 게시 승인은 HtmlCommentBox 관리 화면에서 설정합니다.
(() => {
  const host = document.querySelector("[data-project-slug]");
  const box = document.querySelector("#HCB_comment_box");
  if (!host || !box) return;

  const slug = host.dataset.projectSlug;
  const title = (document.querySelector(".hero h1")?.innerText || document.title).replace(/\s+/g, " ").trim();

  window.hcb_user = window.hcb_user || {};
  window.hcb_user.PAGE = `https://ievy3.github.io/projects/${slug}/`;
  window.hcb_user.PAGE_TITLE = `${title} 댓글 | Noctil Patchworks`;
  window.hcb_user.WEBSITE = "https://ievy3.github.io/";

  const skin = document.createElement("link");
  skin.rel = "stylesheet";
  skin.href = "https://www.htmlcommentbox.com/static/skins/bootstrap/twitter-bootstrap.css?v=0";
  document.head.appendChild(skin);

  const script = document.createElement("script");
  script.src = "https://www.htmlcommentbox.com/jread?page=" + encodeURIComponent(window.hcb_user.PAGE).replace("+", "%2B")
    + "&mod=%241%24wq1rdBcg%24kHaIjI8Ixmze9N%2FKElWkL.&opts=16798&num=10&ts=1790570372623";
  document.head.appendChild(script);

  function setLabel(el, from, to) {
    const label = (el.textContent || el.value || "").trim();
    if (label !== from) return;
    if ("value" in el && el.value) el.value = to;
    if (el.textContent) el.textContent = to;
  }

  function localize() {
    box.querySelectorAll('input[placeholder="Name"]').forEach(el => { el.placeholder = "이름"; });
    box.querySelectorAll('textarea[placeholder="Enter your comment here"]').forEach(el => { el.placeholder = "댓글을 남겨 주세요"; });
    box.querySelectorAll("button,input[type=submit]").forEach(el => {
      setLabel(el, "Comment", "등록");
      setLabel(el, "Add Image", "이미지 첨부");
    });
    box.querySelectorAll("*").forEach(el => {
      if (el.children.length) return;
      const value = (el.textContent || "").trim();
      if (value === "Comments") el.style.display = "none";
      if (value === "Not using HtmlCommentBox yet?") el.parentElement?.style.setProperty("display", "none");
      if (value === "No one has commented yet. Be the first!") el.textContent = "아직 댓글이 없습니다. 첫 댓글을 남겨 주세요.";
    });
  }

  new MutationObserver(localize).observe(box, { childList: true, subtree: true });
  localize();
})();
