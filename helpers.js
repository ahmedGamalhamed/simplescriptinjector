console.log("helpers injected");
async function WaitForQueryAll(selector, Qinterval = 500, killcount = "") {
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
        //console.log("solved", x);
        resolve(x);
      } else if (killcount && tries > killcount) {
        //  console.log("killed",x)
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
function simuateKey(parent) {
  console.log("smiulate inside");
  parent.dispatchEvent(
    new KeyboardEvent("keydown", {
      bubbles: true,
      composed: true,
      charCode: 119,
      code: "KeyW",
      key: "w",
      keyCode: "119",
      which: 119,
    })
  );
}
function PauseFor(timer) {
  //console.log("Pausing For ", timer);
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
        //console.log("solved", x);
        resolve(x);
      } else if (killcount && tries > killcount) {
        //console.log("killed", x);
        clearInterval(y);
        //console.log("Killed...", selector);
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
function ChildInParent(parentELe, childSelector) {
  let i;
  let child;
  return new Promise((resolved) => {
    i = setInterval(() => {
      child = parentELe.querySelector(childSelector);
      if (child) {
        console.log("Child in Parent");
        clearInterval(i);
        resolved(child);
      } else {
        console.log("trying...");
      }
    }, 500);
  });
}
function waitForElementToIncludeClassName(ele, className) {
  let i;
  return new Promise((resolved) => {
    i = setInterval(() => {
      console.log("checking...");
      if (ele.className.includes(className)) {
        console.log("resolved");
        clearInterval(i);
        resolved();
      }
    }, 500);
  });
}
function setMemory(memory) {
  chrome.runtime.sendMessage({ order: "setMemory", memory });
}
async function getMemory() {
  let Memory = await chrome.runtime.sendMessage({ order: "getMemory" });
  return Memory;
}
