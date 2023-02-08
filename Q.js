if (document.readyState !== "complete") {
  document.onreadystatechange = function () {
    if (document.readyState == "complete") {
      initInjection();
    }
  };
} else {
  initInjection();
}

async function initInjection() {
  console.log("Injecting... Q");

  return;
}

function setNativeValue(element, value) {
  let lastValue = element.value;
  element.value = value;
  let event = new Event("input", { target: element, bubbles: true });
  // React 15
  event.simulated = true;
  // React 16
  let tracker = element._valueTracker;
  if (tracker) {
    tracker.setValue(lastValue);
  }
  element.dispatchEvent(event);
}

// Make Instagram Comment
/*
let posts = await WaitForQueryAll("article");
  for (let post of posts) {
    post.querySelector('[aria-label="Comment"]');
    let commentArea = await ChildInParent(post, '[aria-label="Add a comment…"]');
    setNativeValue(commentArea, "Hello");
    await PauseFor(1000);
    let button = post.querySelector("._aidp").children[0].click();}*/
