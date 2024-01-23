{
  const rows = Array.from(
    document.querySelectorAll(
      '[role="application"] [role="row"] .copyable-text'
    )
  ) as HTMLDivElement[];
  const data = rows
    .map((ele) => {
      //@ts-ignore
      const fullText = ele.innerText.replace("\n", " ").trim() || "Not Found";
      return {
        fullText,
        text: fullText.split(" ").slice(1).join(" ").replace("جنيه", ""),
        price: fullText.split(" ")[0] || "0",
        date: ele
          .getAttribute("data-pre-plain-text")
          ?.split(" ")[1]
          .replace("]", ""),
      };
    })
    .filter((d) => d.date);

  const text = jsonToText(data);
  downloadJSONAsCSV(text);

  function downloadJSONAsCSV(csvData: string) {
    // Create a CSV file and allow the user to download it
    let a = document.createElement("a");
    a.setAttribute(
      "href",
      "data:text/csv;charset=utf-8,%EF%BB%BF," + encodeURI(csvData)
    );
    a.download = "data.csv";
    document.body.appendChild(a);
    a.click();
  }
}

function jsonToText(
  jsonData: { text: string; date: string | undefined; price: string }[]
) {
  const header = Object.keys(jsonData[0]);

  const values = jsonData.map((ele) => {
    //@ts-ignore
    return header.map((h) => ele[h]).join(",");
  });
  return header.join(",") + "\r\n" + values.join("\r\n");
}
