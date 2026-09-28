function localizeHcb() {
  const box = document.querySelector("#HCB_comment_box");
  if (!box) return;

  box.querySelectorAll('input[placeholder="Name"]').forEach(el => el.placeholder = "이름");
  box.querySelectorAll('textarea[placeholder="Enter your comment here"]').forEach(el => el.placeholder = "메시지를 남겨 주세요");

  box.querySelectorAll("button,input[type=submit]").forEach(el => {
    const label = (el.textContent || el.value || "").trim();
    if (label === "Comment") {
      if ("value" in el) el.value = "등록";
      if (el.textContent) el.textContent = "등록";
    }
    if (label === "Add Image") {
      if ("value" in el) el.value = "이미지 첨부";
      if (el.textContent) el.textContent = "이미지 첨부";
    }
  });

  box.querySelectorAll("*").forEach(el => {
    if (el.children.length) return;
    const value = (el.textContent || "").trim();
    if (value === "Comments") el.style.display = "none";
    if (value === "Not using HtmlCommentBox yet?") el.parentElement?.style.setProperty("display", "none");
    if (value === "No one has commented yet. Be the first!") {
      el.textContent = "아직 작성된 글이 없습니다. 첫 메시지를 남겨 주세요.";
    }
  });
}

const hcbTarget = document.querySelector("#HCB_comment_box");
if (hcbTarget) {
  const observer = new MutationObserver(localizeHcb);
  observer.observe(hcbTarget, { childList: true, subtree: true });
  localizeHcb();
}
