import { displayInventoryDiv, removeInventoryDiv } from "../inventory";
import { getCurrentRoom } from "../state";
import { openMessageLog } from "../message";
import { debugRectSize } from "../debug";

import { playSFX } from "../sounds";

export const createMessageLogScene = () => {
  scene("messageLog", () => {
    onLoad(() => {
      removeInventoryDiv()
    });

    const bookContainerDiv = document.createElement("div");
    bookContainerDiv.id = "bookContainerDiv";
    bookContainerDiv.style["background-image"] = "url('./assets/Openbook.png')";
    bookContainerDiv.style["background-repeat"] = "no-repeat";
    bookContainerDiv.style["background-size"] = "cover";
    bookContainerDiv.style["background-position"] = "center";
    bookContainerDiv.style["image-rendering"] = "pixelated";
    bookContainerDiv.style["display"] = "flex";
    bookContainerDiv.style["box-sizing"] = "content-box";
    bookContainerDiv.style["position"] = "fixed";
    bookContainerDiv.style["top"] = "50%";
    bookContainerDiv.style["left"] = "50%";
    bookContainerDiv.style["transform"] = "translate(-50%, -44%)";
    bookContainerDiv.style["width"] = "75%";
    bookContainerDiv.style["height"] = "75%";
    bookContainerDiv.style["justify-content"] = "center";
    bookContainerDiv.style["gap"] = "2%";


    const leftPageDiv = document.createElement("div");
    leftPageDiv.id = "leftPageDiv";
    leftPageDiv.style["box-sizing"] = "content-box";
    leftPageDiv.style["width"] = "37%";
    leftPageDiv.style["height"] = "100%";
    leftPageDiv.style["top"] = "5%";
    leftPageDiv.style["left"] = "5%";

    const rightPageDiv = document.createElement("div");
    rightPageDiv.id = "leftPageDiv";
    rightPageDiv.style["box-sizing"] = "content-box";
    rightPageDiv.style["width"] = "37%";
    rightPageDiv.style["height"] = "100%";
    rightPageDiv.style["top"] = "5%";
    rightPageDiv.style["left"] = "5%";

    const leftPageList = document.createElement("ul");
    const rightPageList = document.createElement("ul");

    let counter = 0;
    let currentMessageLog = JSON.parse(
      window.localStorage.getItem("messageLog")
    );
    currentMessageLog
      .slice()
      .reverse()
      .forEach((message, idxA) => {
        message
          .slice()
          .reverse()
          .map((currentMessage, idxB) => {
            counter++;
            const textNode = document.createTextNode(currentMessage);
            const listItem = document.createElement("li");
            listItem.style["padding"] = "10px";
            listItem.appendChild(textNode)
            if (counter < 8) {
              leftPageList.appendChild(listItem);
            } else {
              rightPageList.appendChild(listItem);
            }
            leftPageDiv.appendChild(leftPageList);
            rightPageDiv.appendChild(rightPageList);
          });
      });
    bookContainerDiv.appendChild(leftPageDiv);
    bookContainerDiv.appendChild(leftPageDiv);
    bookContainerDiv.appendChild(rightPageDiv);
    document.body.appendChild(bookContainerDiv);

    const heading = document.createElement("h1");
    heading.id = "messageLogHeading";
    heading.style["position"] = "fixed";
    heading.style["top"] = "0";
    heading.style["left"] = "50%";
    heading.style["transform"] = "translate(-50%, 0%)";
    heading.style["color"] = "red";
    heading.style["text-decoration-color"] = "red";
    heading.style["text-shadow"] = "0 0 13px #FF0000";
    heading.style["font-size"] = "300%";
    const headingTextNode = document.createTextNode("Message Log");
    heading.appendChild(headingTextNode)
    document.body.appendChild(heading);


    const returnButton = document.createElement("h1");
    returnButton.id = "returnButton"
    returnButton.style["position"] = "fixed";
    returnButton.style["top"] = "0";
    returnButton.style["right"] = "2%";
    returnButton.style["color"] = "#FFCCCC";
    returnButton.style["font-size"] = "300%";
    returnButton.style["transition"] = "all .4s ease";

    returnButton.onclick = async () => {
      while (document.getElementById("bookContainerDiv")) {
        document.getElementById("bookContainerDiv").remove();
        await new Promise(resolve => setTimeout(resolve, 10));
      }

      while (document.getElementById("returnButton")) {
        document.getElementById("returnButton").remove();
        await new Promise(resolve => setTimeout(resolve, 10));
      }

      while (document.getElementById("messageLogHeading")) {
        document.getElementById("messageLogHeading").remove();
        await new Promise(resolve => setTimeout(resolve, 10));
      }

      playSFX("click");
      displayInventoryDiv();

      go(getCurrentRoom());
    }
    
    returnButton.appendChild(document.createTextNode("Return"))
    document.body.appendChild(returnButton);

    returnButton.addEventListener('mouseenter', () => {
      returnButton.style["color"] = "white";
      returnButton.style["text-shadow"] = "0 0 13px #666666";
    });
    returnButton.addEventListener('mouseleave', () => {
      returnButton.style["color"] = "#FFCCCC";
      returnButton.style["text-shadow"] = "none";
    });


  });
};
