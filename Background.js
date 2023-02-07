chrome.runtime.onMessage.addListener(function (response, sender, sendResponse) {
  const key = response.key;
  const shift = response.shift;
  const ctrl = response.ctrl;
  const order = response.order;
  if (order == "Macro") {
    if (key == "Q" && ctrl && shift) {
      let tabId = sender.tab.id;
      runfileHere(tabId, "inject.js");
    }
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
