import { saveCurrentRoom, savePreviousRoom, getPreviousRoom } from "./state";
import { openMessageLog } from "./message";
import { InGameMenu } from "./menu.js";
import { playSFX } from './sounds'
const inGameMenu = new InGameMenu();

export function displayNavArrows(arrayOfDirectionsStrings = []) {
  inGameMenu.display();
  // createInGameMenu()
  displayMessageLog();
  for (let i = 0; i < arrayOfDirectionsStrings.length; i++) {
    let direction = arrayOfDirectionsStrings[i];
    if (direction === "left") {
      add([
        sprite("left-arrow"),
        pos(7.5, 250),
        scale(1),
        area(),
        "left-arrow",
      ]);
    }
    if (direction === "right") {
      add([
        sprite("right-arrow"),
        pos(1190, 250),
        scale(1),
        area(),
        "right-arrow",
      ]);
    }
    if (direction === "up") {
      add([sprite("up-arrow"), pos(600, 15), scale(1), area(), "up-arrow"]);
    }
    if (direction === "down") {
      add([
        sprite("down-arrow"),
        pos(575, 475),
        scale(1),
        area(),
        "down-arrow",
      ]);
    }
  }
}

export const singleViewNavArrow = (roomName, previousRoom) => {
  function goPreviousRoom(previousRoom) {
    go(previousRoom)
  }
  saveCurrentRoom(roomName);
  displayNavArrows(["down"]);
  onClick("down-arrow", () => {
    playSFX('footSteps')
    go(previousRoom);
  });
}

export const navArrows = (roomName) => (d) => {
  saveCurrentRoom(roomName + d);
  if (d == "Up") {
    onClick("right-arrow", () => {
      go(roomName + "Right");
    });
    onClick("left-arrow", () => {
      go(roomName + "Left");
    });
    onClick("down-arrow", () => {
      go(roomName + "Down");
    });
    displayNavArrows(["left", "right", "down"]);
  } else if (d == "Right") {
    onClick("left-arrow", () => {
      go(roomName + "Up");
    });
    displayNavArrows(["left"]);
  } else if (d == "Down") {
    onClick("up-arrow", () => {
      go(roomName + "Up");
    });
    displayNavArrows(["up"]);
  } else if (d == "Left") {
    onClick("right-arrow", () => {
      go(roomName + "Up");
    });
    displayNavArrows(["right"]);
  }
};

export const destroyNavArrows = () => {
  every("up-arrow", destroy);
  every("down-arrow", destroy);
  every("left-arrow", destroy);
  every("right-arrow", destroy);
  every("messageLogButton", destroy);
};

export function displayMessageLog() {
  add([
    rect(180,30),
    pos(40,5),
    color(100,100,100),
    area(),
    outline(2),
    "messageLogButton",
    "messageLogButtonBox",
  ])
  add([
    text("[Message Log].black", { size: 20, font: 'sink', styles: { black: { color: rgb(0, 0, 0)}}}),
    pos(49, 10),
    color(255,255,255),
    "messageLogButton",
    "messageLogButtonText",
  ]);


  onClick("messageLogButtonBox",() => {
    go("messageLog")
  });
}
