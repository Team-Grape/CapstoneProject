import { saveCurrentRoom } from "./state";
import { openMessageLog } from "./message";
import { InGameMenu } from "./menu.js";
const inGameMenu = new InGameMenu();

export function displayNavArrows(arrayOfDirectionsStrings = []) {
  inGameMenu.display();
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
  // console.log(previousRoom)
  saveCurrentRoom(roomName);
  onClick("down-arrow", () => {
    go(previousRoom);
  });
  displayNavArrows(["down"]);
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
};

export function displayMessageLog() {
  const viewPastMessage = add([
    text("Message Log", { size: 20 }),
    pos(1100, 500),
    area(),
  ]);
  viewPastMessage.onClick(() => {
    openMessageLog();
  });
}
