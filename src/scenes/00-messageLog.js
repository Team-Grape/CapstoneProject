import { displayInventoryDiv, removeInventoryDiv } from "../inventory";
import { getCurrentRoom } from "../state";
import { openMessageLog } from "../message";
import { debugRectSize } from "../debug";

import { playSFX } from "../sounds";

export const createMessageLogScene = () => {
  scene("messageLog", () => {
    onLoad(() => {
      removeInventoryDiv()
      add([
        sprite("open-book-scene"),
        pos(width() / 2, height() / 2 + 30),
        origin("center"),
        scale(6, 4),
      ]);
    });

    add([
      text("Message Log", { size: 54, width: width() - 230, font: "sinko" }),
      color(255, 0, 0),
      pos(width() / 2, 35),
      origin("center"),
    ]);

    const returnButton = add([
      text("Return", {
        size: 32,
        width: width() - 230,
        font: "sinko",
      }),
      pos(1100, 35),
      color(255, 255, 255),
      origin("center"),
      area({ width: 160, height: 40 }),
      outline(100, (255, 255, 255)),
      "return",
    ]);

    onClick("return", async () => {
      
      while (document.getElementById("bookContainerDiv")) {
        document.getElementById("bookContainerDiv").remove();
        await new Promise(resolve => setTimeout(resolve, 10));
      }

      playSFX("click");
      displayInventoryDiv();

      go(getCurrentRoom());
    });

    // ---------------------------------------------------------------- //

    const bookContainerDiv = document.createElement("div");
    bookContainerDiv.id = "bookContainerDiv";
    bookContainerDiv.style["display"] = "flex";
//    bookContainerDiv.style["border"] = "solid #5B6DCD 2px";
    bookContainerDiv.style["box-sizing"] = "content-box";
    bookContainerDiv.style["position"] = "fixed";
    bookContainerDiv.style["top"] = "50%";
    bookContainerDiv.style["left"] = "50%";
    bookContainerDiv.style["transform"] = "translate(-50%, -44%)";
    bookContainerDiv.style["width"] = "60%";
    bookContainerDiv.style["height"] = "70%";
    bookContainerDiv.style["justify-content"] = "center";
    bookContainerDiv.style["gap"] = "2%";

    const leftPageDiv = document.createElement("div");
    leftPageDiv.id = "leftPageDiv";
//    leftPageDiv.style["border"] = "solid #997744 2px";
    leftPageDiv.style["box-sizing"] = "content-box";
    leftPageDiv.style["width"] = "50%";
    leftPageDiv.style["height"] = "95%";
    leftPageDiv.style["top"] = "5%";
    leftPageDiv.style["left"] = "5%";

    const rightPageDiv = document.createElement("div");
    rightPageDiv.id = "leftPageDiv";
//    rightPageDiv.style["border"] = "solid #447799 2px";
    rightPageDiv.style["box-sizing"] = "content-box";
    rightPageDiv.style["width"] = "50%";
    rightPageDiv.style["height"] = "95%";
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
    bookContainerDiv.appendChild(rightPageDiv);
    document.body.appendChild(bookContainerDiv);
  });
};
