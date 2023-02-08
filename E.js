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
  console.log("Injecting... E");
  //
  //
}

function simulateMouseClick(element) {
  const mouseClickEvents = ["mousedown", "click", "mouseup"];

  mouseClickEvents.forEach((mouseEventType) =>
    element.dispatchEvent(
      new MouseEvent(mouseEventType, {
        view: window,
        bubbles: true,
        cancelable: true,
        buttons: 1,
      })
    )
  );
}
// Interact with google sheets
/*
var element = document.getElementById("docs-file-menu");
  console.log(element);
  simulateMouseClick(element);
  let menuDownload = document.querySelectorAll("[aria-label='Download d']");
  menuDownload = menuDownload[0];
  simulateMouseClick(menuDownload);
  simulateMouseClick(menuDownload);
  let pdf = await WaitForQueryAll('[aria-label="PDF (.pdf) p"]');
  pdf = pdf[0];
  simulateMouseClick(pdf);
  let download = await WaitForQueryAll(".docs-material-button-content");
  download = download[7];
  simulateMouseClick(download);
  console.log(download[0]);*/
