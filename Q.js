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
  //
}
