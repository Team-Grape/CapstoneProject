import { navArrows, singleViewNavArrow, destroyNavArrows } from "../../buttons";
import { fadeOutOpacity, flickerOpacity } from "../../sprites";

import { Message, textBubble, addToMessageLog } from "../../message";

import {
  setGameState,
  getGameState,
  saveCurrentRoom,
  setPreviousRoom,
} from "../../state.js";

import { debugRectSize } from "../../debug";

import { playBGM, stopBGM, playSFX } from "../../sounds";

import { InGameMenu } from "../../menu";

import {
  addToInventory,
  checkInventoryForItem,
  removeFromInventory,
} from "../../inventory.js";

const roomName = "mainEntrance";
saveCurrentRoom(roomName + "Down");
const roomNavArrows = navArrows(roomName);
const message = new Message();

const mainEntranceMessage = [
  [
    "You feel your excitement swell when you see what looks like the front door to the house.",
  ],
  ["You pause for a moment."],
  ["It would be too easy if the door was unlocked, wouldn't it?"],
];

const doorMessage = [
  ["You reach your trembling hand out to the doorknob."],
  ["You grip it firmly in your hand."],
  ["You give it a turn."],
  ["it's locked."],
];

const doorIsLocked = [["It's locked."]];

export const createMainEntrance = async () => {
  scene(roomName + "Down", () => {
    window.roomName = roomName;
    window.viewDirection = "singleViewRoom";

    onLoad(() => {
      add([sprite("main-entrance"), scale(1)]);

      add([rect(155, 240), opacity(0), pos(533, 110), area(), "center-door"]);

      add([
        rect(200, 280),
        opacity(0),
        pos(1040, 150),
        area(),
        "right-near-door",
      ]);

      playBGM("ambience");
    });

    ///////////////////////////////////////////////////////////////////////////////////////////

    if (!getGameState(roomName, "mainEntranceMessageRead")) {
      message.textBubble(mainEntranceMessage, () => {
        setGameState(roomName, "mainEntranceMessageRead", true);
        message.addToMessageLog(mainEntranceMessage);
      });
    } else {
      singleViewNavArrow("mainEntranceDown", "firstFloorHallwayDown");
    }

    ///////////////////////////////////////////////////////////////////////////////////////////

    onClick("right-near-door", () => {
      go("libraryDown");
    });

    onClick("center-door", () => {
      if (!getGameState(roomName, "centerDoorClicked")) {
        message.textBubble(doorMessage);
        setGameState(roomName, "centerDoorClicked", true);
      } else {
        message.textBubble(doorIsLocked);
      }
    });

    // if (!InGameMenu.isOpen()) {
    //     onClick("right-near-door", () => {

    //         textBubble([["it won't open"]]);
    //       });
    // }

    //debugRectSize();
  });
};
