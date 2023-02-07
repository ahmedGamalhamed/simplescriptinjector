document.addEventListener("DOMContentLoaded", initListeners());

async function initListeners() {
  document.addEventListener("keypress", (e) => {
    let key = e.code[3];
    let ctrl = e.ctrlKey;
    let shift = e.shiftKey;
    if (key && ctrl && shift) {
      chrome.runtime.sendMessage({ order: "Macro", key: key, shift: shift, ctrl: ctrl });
      console.log(key, ctrl, shift);
    }
  });
}
