let Binds = {};
chrome.storage.local.get("Binds", (res) => (Binds = res.Binds));

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  chrome.storage.local.get("Binds", (res) => (Binds = res.Binds));
  const order = request.order;
  if (order == "Macro") {
    const key = request.key;
    const shift = request.shift;
    const ctrl = request.ctrl;
    if (key && ctrl && shift) {
      let tabId = sender.tab.id;
      if (Binds[key]) {
        runfileHere(tabId, Binds[key]);
      }
    }
  } else if (order == "update") {
    Binds = request.Binds;
    chrome.storage.local.set({ Binds });
  }
});
async function runfileHere(tabId, file) {
  chrome.scripting
    .executeScript({
      target: { tabId: tabId },
      files: [file],
    })
    .catch((error) => {
      console.log("The Script for this combo doesnt exist \n", error);
    });
}
