document.addEventListener("DOMContentLoaded", initListeners());

function listen(e) {
  let key = e.code[3];
  let ctrl = e.ctrlKey;
  let shift = e.shiftKey;
  let alt = e.altKey;
  if ((key && ctrl && shift) || (key && alt && ctrl)) {
    if (key == "E") {
      console.log("refreshing listenr");
      document.removeEventListener("keydown", listen);
      document.addEventListener("keydown", listen);
    }
    chrome.runtime.sendMessage({ order: "Macro", key: key, shift: shift, ctrl: ctrl });
    console.log(key, ctrl, shift, alt);
  }
}

async function initListeners() {
  document.addEventListener("keydown", listen);
}
