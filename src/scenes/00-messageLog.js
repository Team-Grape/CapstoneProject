import { displayInventoryDiv } from "../inventory";
import { getCurrentRoom } from "../state";
import { openMessageLog } from "../message";
import { debugRectSize } from "../debug";

export const createMessageLogScene = () => {
  scene("messageLog", () => {
    onLoad(() => {
      add([sprite("open-book-scene"),
        pos(width() / 2, (height() / 2) + 30),
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

    onClick("return", () => {
      playSFX("click");
      displayInventoryDiv();
      go(getCurrentRoom());
    });

  // ---------------------------------------------------------------- //
//  const canvas = document.getElementsByTagName("canvas")[0];
  const bookContainerDiv = document.createElement("div");
  bookContainerDiv.id = "bookContainerDiv"
  bookContainerDiv.style["display"] = "flex";
  bookContainerDiv.style["border"] = "solid #5B6DCD 2px";
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
  leftPageDiv.style["border"] = "solid #997744 2px";
  leftPageDiv.style["box-sizing"] = "content-box";
  leftPageDiv.style["width"] = "50%";
  leftPageDiv.style["height"] = "95%";
  leftPageDiv.style["top"] = "5%";
  leftPageDiv.style["left"] = "5%";

  const rightPageDiv = document.createElement("div");
  rightPageDiv.id = "leftPageDiv";
  rightPageDiv.style["border"] = "solid #447799 2px";
  rightPageDiv.style["box-sizing"] = "content-box";
  rightPageDiv.style["width"] = "50%";
  rightPageDiv.style["height"] = "95%";
  rightPageDiv.style["top"] = "5%";
  rightPageDiv.style["left"] = "5%";

  const leftPageList = document.createElement("ul");
  const rightPageList = document.createElement("ul");
  
/*
  const txt = 'sdkjfasdkljfsdkfskladfjklasdjfkl;sdjf sdf sdkljf klsdfkldjfjsdklf jasdkl;fjkl sdjfk asjkl;d'
  const textNode = document.createTextNode(txt);
  const line1p = document.createElement("p");


  line1p.appendChild(textNode);
  leftPageDiv.appendChild(line1p);


  bookContainerDiv.appendChild(leftPageDiv)
  bookContainerDiv.appendChild(rightPageDiv)
  document.body.appendChild(bookContainerDiv)
*/

//  let msgY = 110;
  let counter = 0
  let currentMessageLog = JSON.parse(window.localStorage.getItem("messageLog"));
  currentMessageLog.slice().reverse().forEach((message, idxA) => {
    message.map((currentMessage, idxB) => {
      counter++;
      const textNode = document.createTextNode(currentMessage);
//      const lineP = document.createElement("p");
//      lineP.appendChild(textNode);
//      leftPageDiv.appendChild(lineP);
      const listItem = document.createElement("li");
      listItem.style['padding'] = "10px"
      listItem.appendChild(textNode);
//      console.log('counter: ', counter, 'idxA: ', idxA, 'idxB: ', idxB, 'message: ', currentMessage)
      if (counter < 6) {
        leftPageList.appendChild(listItem)
      } else {
        rightPageList.appendChild(listItem)
      }
      leftPageDiv.appendChild(leftPageList);
      rightPageDiv.appendChild(rightPageList);
      


//      msgY = msgY + 20;
//      const cm = add([
//        text(currentMessage, { size: 24, font: "sinko" }),
//        //pos(width() / 2 - 280, msgY),
//        pos(265, msgY),
//      ]);
    });
  });
  bookContainerDiv.appendChild(leftPageDiv)
  bookContainerDiv.appendChild(rightPageDiv)
  document.body.appendChild(bookContainerDiv)

//  let msgY = 110;
//  let currentMessageLog = JSON.parse(window.localStorage.getItem("messageLog"));
//  currentMessageLog.forEach((message) => {
//    message.forEach((currentMessage) => {
//      msgY = msgY + 20;
//      const cm = add([
//        text(currentMessage, { size: 24, font: "sinko" }),
//        //pos(width() / 2 - 280, msgY),
//        pos(265, msgY),
//      ]);
//    });
//  });




//  openMessageLog()


  debugRectSize()


  });

};

