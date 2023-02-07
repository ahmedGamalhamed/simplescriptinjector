let Combos;
document.addEventListener("DOMContentLoaded", async () => {
  chrome.storage.local.get(["Macros"], (res) => {
    response = res.Macros;
    for (key in response) {
      let TabAndScript = response[key]["TabAndScript"];
      let url = response[key]["url"];
      createRow(key, TabAndScript ? "checked" : "", url !== "" ? `value = ${url}` : false, url == "" ? false : true);
      BindToggles();
    }
  });

  Combos = {};
  const saveBtn = document.getElementById("save-btn");
  const toggles = document.getElementsByClassName("checks");
  const addBtn = document.getElementById("plus-btn");
  addBtn.onclick = () => {
    createRow();
    BindToggles();
  };

  BindToggles();

  saveBtn.onclick = () => {
    let rows = document.querySelector("tbody").querySelectorAll("tr");
    for (let row of rows) {
      let key = row.querySelector(".keys").value.toUpperCase();
      let toggle = row.querySelector(".checks").children[0].checked;
      let url = row.querySelector(".urls").value;

      if (key !== "" && key !== "-") {
        url == "" ? (toggle = false) : "";
        console.log(url);
        Combos[key] = { TabAndScript: toggle, url: toggle && url !== "" ? url : "" };
      }
    }
    chrome.runtime.sendMessage({ order: "update", Combos });
    location.reload();
  };
});
function createRow(key = "", toggle = "checked", url = false, UrlShow = true) {
  console.log(key, toggle, url);
  let newRow = document.createElement("tr");
  newRow.innerHTML = `<tr>
<th scope="row">
  <input
    style="text-transform: uppercase"
    type="text"
    maxlength="1"
    class="form-control keys"
    aria-label="Sizing example input"
    aria-describedby="inputGroup-sizing-sm"
    value = ${key || "-"}
  />
</th>
<td>
  <div class="form-switch checks">
    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" ${toggle} />
  </div>
</td>
<td><input ${url}  ${UrlShow || "style=display:none"} type="text" class="form-control urls" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" /></td>
</tr>`;
  document.querySelector("tbody").append(newRow);
}
function BindToggles() {
  let toggles = document.getElementsByClassName("checks");

  for (let toggle of toggles) {
    toggle.onchange = (e) => {
      let urlInput = e.target.parentElement.parentElement.parentElement.getElementsByClassName("urls")[0];
      urlInput.style.display == "" ? (urlInput.style.display = "none") : (urlInput.style.display = "");
    };
  }
}
