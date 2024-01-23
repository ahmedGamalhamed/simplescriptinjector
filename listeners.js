document.addEventListener("DOMContentLoaded", initListeners());

function listen(e) {
  let key = e.key;
  let ctrl = e.ctrlKey;
  let shift = e.shiftKey;
  let alt = e.altKey;
  if (
    (/^[a-zA-Z]$/i.test(key) && key && ctrl && shift) ||
    (key && alt && ctrl)
  ) {
    chrome.runtime.sendMessage({
      order: "Macro",
      key: key,
      shift: shift,
      ctrl: ctrl,
    });
    console.log(key, ctrl, shift, alt);
  }
}

async function initListeners() {
  document.addEventListener("keydown", listen);
}
