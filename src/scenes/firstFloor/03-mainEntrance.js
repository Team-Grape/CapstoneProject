import { navArrows, singleViewNavArrow, destroyNavArrows } from "../../buttons";
import { fadeOutOpacity, flickerOpacity } from "../../sprites";

import { textBubble, addToMessageLog } from "../../message";

import { rustyKey } from "../../items";

import {
  setGameState,
  getGameState,
  saveCurrentRoom,
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
const roomNavArrows = navArrows(roomName);


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
      textBubble(mainEntranceMessage, () => {
        setGameState(roomName, "mainEntranceMessageRead", true);
        addToMessageLog(mainEntranceMessage);
        singleViewNavArrow("mainEntranceDown", "firstFloorHallwayDown");
      });
    } else {
      singleViewNavArrow("mainEntranceDown", "firstFloorHallwayDown");
    }

    ///////////////////////////////////////////////////////////////////////////////////////////

    onClick("right-near-door", () => {
      playSFX('doorClose')
      go("libraryUp");
    });

    onClick("center-door", () => {
      if (!getGameState(roomName, "centerDoorClicked")) {
        textBubble(doorMessage, () => {
          singleViewNavArrow("mainEntranceDown", "firstFloorHallwayDown");
        });
        setGameState(roomName, "centerDoorClicked", true);
      } else {
        textBubble(doorIsLocked, () => {
          singleViewNavArrow("mainEntranceDown", "firstFloorHallwayDown");
        });
      }
      
      if (getGameState(roomName, "doorUnlocked")) {
        go("win");
      } else if (
        checkInventoryForItem(rustyKey) &&
        window.selectedItem == "rusty key"
      ) {
        playSFX('lockClick')
        setGameState(roomName, "doorUnlocked", true);
        removeFromInventory(rustyKey);
        textBubble([["The key unlocked the door!"]], () => {
          singleViewNavArrow("mainEntranceDown", "firstFloorHallwayDown");
        });
      } else if (window.selectedItem == "pry bar") {
        textBubble([["It doesn't work"]], () => {
          singleViewNavArrow("mainEntranceDown", "firstFloorHallwayDown");
        });
      } else {
        textBubble(doorIsLocked, () => {
          singleViewNavArrow("mainEntranceDown", "firstFloorHallwayDown");
        });
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
