//@ts-nocheck
import { APIKEY } from "../vars";

{
  (async () => {
    console.log("Q");
    let div = document.querySelector("#injected-div");
    const selection = getSelection();

    const text = selection.toString();
    if (!text) {
      if (div) {
        const display = div.style.display;
        display == "block"
          ? (div.style.display = "none")
          : (div.style.display = "block");
      }
      return;
    }

    selection.empty();
    const [ok, answer] = await fetchAnswer(text);
    navigator.clipboard.writeText(answer);
    if (ok) {
      console.log("ok");
      if (div) div.style.display = "block";
      if (!div) {
        div = document.createElement("div");
        div.id = "injected-div";
        div.setAttribute(
          "style",
          `
            position: fixed;
            bottom: 0;
            background-color: rgba(0,0,0,.2);
            color: white;
            width:100%;
            padding: 0px 4px;
            backdrop-filter: blur(500px);
            z-index: 50;
            display:block;
          `
        );
        document.body.append(div);
      }
      div.innerText = answer;
    }
    console.log(div);
    console.log("finished");
  })();

  async function fetchAnswer(selectionText) {
    try {
      console.log("fetch");
      let openAiKey = APIKEY;
      let apiRequestBody = {
        model: "gpt-3.5-turbo-0301",
        messages: [
          {
            role: "system",
            content: "understand and expand upon the upcoming text: ",
          },
          {
            role: "user",
            content: selectionText,
          },
        ],
      };
      let res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + openAiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiRequestBody),
      });
      let json = await res.json();
      console.log("fetch c");
      console.log(json);
      if (json.error) return [false, json.error.code];
      let answer = json.choices[0].message.content;
      return [true, answer];
    } catch (error) {
      console.log(error);
    }
  }
}
