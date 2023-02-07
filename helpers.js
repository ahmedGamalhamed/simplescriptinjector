console.log("HelperInjected");

function WaitForQueryAll(selector, Qinterval = 1000, killcount = "") {
  return new Promise((resolve, reject) => {
    let y,
      tries = 0;
    y = setInterval(() => {
      //console.log(tries)
      tries++;
      let x;
      try {
        x = document.querySelectorAll(selector);
      } catch {
        x = [];
      }
      if (x[0]) {
        clearInterval(y);
        resolve(x);
      } else if (killcount && tries > killcount) {
        clearInterval(y);
        console.log("Killed...", selector);
        resolve("killed");
      }
      {
        //console.log("Not found restart", selector);
      }
    }, Qinterval);
  });
}

function PauseFor(timer) {
  return new Promise((resolved) => {
    setTimeout(() => {
      resolved();
    }, timer);
  });
}

function random(min, max) {
  let number = Math.floor(Math.random() * (max - min)) + min;
  return number;
}
function getElementByXpath(path, killcount = "") {
  return new Promise((resolve, reject) => {
    let y,
      tries = 0;
    y = setInterval(() => {
      tries++;
      let x;
      try {
        x = document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      } catch {
        x = [];
      }
      if (x) {
        clearInterval(y);
        resolve(x);
      } else if (killcount && tries > killcount) {
        clearInterval(y);
        resolve("killed");
      }
      {
        //console.log("Not found restart", selector);
      }
    }, 500);
  });
}
function callMeBack() {
  chrome.runtime.sendMessage({ order: "CallMeBack" });
}
function runfileHere(file) {
  chrome.runtime.sendMessage({ order: "runFileHere", file: file });
}
function playAudio(link) {
  chrome.runtime.sendMessage({ order: "playAudio", src: link });
}
