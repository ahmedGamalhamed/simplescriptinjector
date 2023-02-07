let Binds = {};
document.addEventListener("DOMContentLoaded", async () => {
  chrome.storage.local.get(["Binds"], (res) => {
    console.log(res);
    response = res.Binds;
    for (key in response) {
      let url = response[key];
      createRow(key, url);
    }
  });

  const saveBtn = document.getElementById("save-btn");
  const addBtn = document.getElementById("plus-btn");
  addBtn.onclick = () => {
    createRow();
  };

  saveBtn.onclick = () => {
    let rows = document.querySelector("tbody").querySelectorAll("tr");
    for (let row of rows) {
      let key = row.querySelector(".keys").value.toUpperCase();
      let url = row.querySelector(".urls").value;

      if (key !== "" && key !== "-" && url !== "" && url !== "-") {
        Binds[key] = url;
      }
    }
    chrome.runtime.sendMessage({ order: "update", Binds });
    location.reload();
  };
});
function createRow(key = "", url) {
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

<td><input  value = ${url || "-"}  type="text" class="form-control urls" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" /></td>
</tr>`;
  document.querySelector("tbody").append(newRow);
}
