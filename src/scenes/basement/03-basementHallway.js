import { navArrows, singleViewNavArrow } from "../../buttons";
import { textBubble, addToMessageLog } from "../../message";
import { playBGM, stopBGM, playSFX } from "../../sounds";
import { setGameState, getGameState } from "../../state.js";
import { cellarKey, silverKey, diamondKey, heartKey } from "../../items.js";
import { debugRectSize } from "../../debug.js";

import {
  addToInventory,
  checkInventoryForItem,
  removeFromInventory,
} from "../../inventory.js";

import { createTrapDoor } from "../trapRoom.js";

const roomName = "basementHallway";
const roomNavArrows = navArrows(roomName);

const introMessage = [
  ["You step out of the room and into a hallway"],
  ["The challanges will increase"],
  ["If you can't escape from the room, then stay here in my tummy forever~~~"],
];

export const createBasementHallway = async () => {
  scene(roomName + "Down", () => {
    window.roomName = roomName;
    window.viewDirection = "singleViewRoom";

    onLoad(() => {
      add([sprite("basementHallway"), scale(1)]);

      // left-near-door
      add([sprite("basementHallwayDoor"), scale(0.85), pos(30, 180)]);
      add([
        rect(156, 270),
        opacity(0),
        pos(30, 180),
        area(),
        "SCENE",
        "left-near-door",
      ]);

      // left-far-door
      add([sprite("basementHallwayDoor"), scale(0.58), pos(240, 180)]);
      add([
        rect(108, 145),
        opacity(0),
        pos(240, 180),
        area(),
        "SCENE",
        "left-far-door",
      ]);
      add([
        rect(62, 39),
        opacity(0),
        pos(287, 327),
        area(),
        "SCENE",
        "left-far-door",
      ]);

      // right-near-door
      add([
        sprite("basementHallwayDoor", { flipX: true }),
        scale(0.85),
        pos(1060, 180),
      ]);
      add([
        rect(160, 280),
        opacity(0),
        pos(1060, 180),
        area(),
        "SCENE",
        "right-near-door",
      ]);

      // right-far-door
      add([
        sprite("basementHallwayDoor", { flipX: true }),
        scale(0.58),
        pos(890, 180),
      ]);
      add([
        rect(105, 145),
        opacity(0),
        pos(890, 180),
        area(),
        "SCENE",
        "right-far-door",
      ]);
      add([
        rect(70, 40),
        opacity(0),
        pos(890, 325),
        area(),
        "SCENE",
        "right-far-door",
      ]);

      // center-door
      add([
        sprite("door2", { flipX: true }),
        scale(0.8),
        pos(577, 170),
        area(),
        "SCENE",
        "center-door",
      ]);

      add([
        sprite("barrel1"),
        scale(3.7),
        area(),
        "SCENE",
        pos(185, 325),
        "barrelLeft",
      ]);
      add([
        sprite("barrel1"),
        scale(3.7),
        area(),
        "SCENE",
        pos(960, 325),
        "barrelRight",
      ]);

      playBGM("ambience");
    });

    ///////////////////////////////////////////////////////////////////////////////////////////

    if (!getGameState(roomName, "introMessageRead")) {
      textBubble(introMessage, () => {
        setGameState(roomName, "introMessageRead", true);
        addToMessageLog(introMessage);
        singleViewNavArrow("basementHallwayDown", "basementRoomOneLeft");
      });
    } else {
      singleViewNavArrow("basementHallwayDown", "basementRoomOneLeft");
    }

    ///////////////////////////////////////////////////////////////////////////////////////////

    onClick("left-near-door", () => {
      if (getGameState(roomName, "leftNearDoorUnlocked")) {
        playSFX("dundundun");
        playSFX("doorClose");
        createTrapDoor();
      } else if (
        checkInventoryForItem(diamondKey) &&
        window.selectedItem == "diamond key"
      ) {
        playSFX("lockClick");
        setGameState(roomName, "leftNearDoorUnlocked", true);
        removeFromInventory(diamondKey);
        textBubble([["The key unlocked the door!"]], () => {
          singleViewNavArrow("basementHallwayDown", "basementRoomOneLeft");
        });
      } else if (window.selectedItem == "pry bar") {
        textBubble([["It doesn't work"]], () => {
          singleViewNavArrow("basementHallwayDown", "basementRoomOneLeft");
        });
      } else {
        textBubble(
          [["It doesn't open, it seems like it needs a special key."]],
          () => {
            singleViewNavArrow("basementHallwayDown", "basementRoomOneLeft");
          }
        );
      }
    });

    onClick("left-far-door", () => {
      playSFX("doorClose");
      go("basementRoomTwoUp");
    });

    onClick("right-near-door", () => {
      if (getGameState(roomName, "rightNearDoorUnlocked")) {
        playSFX("doorClose");
        go("basementStorageOneDown");
      } else if (
        checkInventoryForItem(heartKey) &&
        window.selectedItem == "heart key"
      ) {
        playSFX("lockClick");
        setGameState(roomName, "rightNearDoorUnlocked", true);
        removeFromInventory(heartKey);
        textBubble([["The key unlocked the door!"]], () => {
          singleViewNavArrow("basementHallwayDown", "basementRoomOneLeft");
        });
      } else if (window.selectedItem == "pry bar") {
        textBubble([["It doesn't work"]], () => {
          singleViewNavArrow("basementHallwayDown", "basementRoomOneLeft");
        });
      } else {
        textBubble(
          [["It doesn't open, it seems like it needs a special key."]],
          () => {
            singleViewNavArrow("basementHallwayDown", "basementRoomOneLeft");
          }
        );
      }
    });

    onClick("right-far-door", () => {
      playSFX("doorClose");
      go("basementStorageTwoDown");
    });

    onClick("center-door", () => {
      if (getGameState(roomName, "centerDoorUnlocked")) {
        playSFX("doorClose");
        go("firstFloorHallwayDown");
      } else if (
        checkInventoryForItem(silverKey) &&
        window.selectedItem == "silver key"
      ) {
        playSFX("lockClick");
        setGameState(roomName, "centerDoorUnlocked", true);
        removeFromInventory(silverKey);
        textBubble([["The key unlocked the door!"]], () => {
          singleViewNavArrow("basementHallwayDown", "basementRoomOneLeft");
        });
      } else if (window.selectedItem == "pry bar") {
        textBubble([["It doesn't work"]], () => {
          singleViewNavArrow("basementHallwayDown", "basementRoomOneLeft");
        });
      } else {
        textBubble([["It doesn't open, it seems like it needs a key."]], () => {
          singleViewNavArrow("basementHallwayDown", "basementRoomOneLeft");
        });
      }
    });
  });
};
