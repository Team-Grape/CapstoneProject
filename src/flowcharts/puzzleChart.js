import mermaid from "mermaid";
mermaid.initialize({ startOnLoad: true });

import basementRoomOne from "./01-basement.mmd";
import basementRoomTwo from "./02-basement.mmd";

const allChartsAsStrings = {
  basementRoomOne,
  basementRoomTwo,
};

Object.values(allChartsAsStrings).map((msg, idx) => {

  const chartAndHeadingContainer = document.createElement("div");
  chartAndHeadingContainer.classList.add("chartAndHeadingContainer");
  chartAndHeadingContainer.style["border"] = "2px solid black";
  chartAndHeadingContainer.style["margin"] = "5px";
  chartAndHeadingContainer.style["text-align"] = "center";

  const chartTextNode = document.createTextNode(msg);
  const chartContainer = document.createElement("div");
  chartContainer.classList.add("mermaid");
  chartContainer.classList.add("content-inner");
  chartContainer.appendChild(chartTextNode);

  const msgName = Object.keys(allChartsAsStrings)[idx];
  const headingTextNode = document.createTextNode(msgName);
  const headingContainer = document.createElement("h1");
  headingContainer.style["text-decoration"] = "underline";
  headingContainer.appendChild(headingTextNode);

  const checkbox = document.createElement("input");
  checkbox.setAttribute("id", `collapsible-${msgName}`);
  checkbox.classList.add("toggle");
  checkbox.setAttribute("type", "checkbox");
  const label = document.createElement("label");
  label.setAttribute("for", `collapsible-${msgName}`);
  label.classList.add("lbl-toggle");
  label.appendChild(headingContainer);

  const collapseDiv = document.createElement("div");
  collapseDiv.classList.add("collapsible-content");

  collapseDiv.appendChild(chartContainer);

  chartAndHeadingContainer.appendChild(checkbox);
  chartAndHeadingContainer.appendChild(label);
  chartAndHeadingContainer.appendChild(collapseDiv);

  document.getElementById("chartParent").appendChild(chartAndHeadingContainer);
});
