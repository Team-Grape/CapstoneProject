// https://mermaid-js.github.io/mermaid/#/flowchart

import mermaid from "mermaid";
mermaid.initialize({ startOnLoad: true });

const varToString = (varObj) => Object.keys(varObj)[0];

import basementRoomOne from "./scenes/01-basement.mmd";
import basementRoomTwo from "./scenes/02-basement.mmd";

const allChartsAsStrings = {
  basementRoomOne,
  basementRoomTwo,
};

Object.values(allChartsAsStrings).map((msg, idx) => {
  const msgName = Object.keys(allChartsAsStrings)[idx];
  const headingTextNode = document.createTextNode(msgName);
  const headingContainer = document.createElement("h1");

  headingContainer.style["text-decoration"] = "underline";
  headingContainer.appendChild(headingTextNode);

  const chartTextNode = document.createTextNode(msg);
  const chartContainer = document.createElement("div");
  //  chartContainer.style['border'] = '2px solid black'
  chartContainer.classList.add("mermaid");
  chartContainer.appendChild(chartTextNode);

  const chartAndHeadingContainer = document.createElement("div");
  chartAndHeadingContainer.appendChild(headingContainer);
  chartAndHeadingContainer.appendChild(chartContainer);
  chartAndHeadingContainer.style["border"] = "2px solid black";
  chartAndHeadingContainer.style["margin"] = "5px";
  chartAndHeadingContainer.style["text-align"] = "center";

  //  document.getElementById("chartParent").appendChild(headingContainer);
  //  document.getElementById("chartParent").appendChild(chartContainer);
  document.getElementById("chartParent").appendChild(chartAndHeadingContainer);
});
