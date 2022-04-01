import { navArrows, singleViewNavArrow, destroyNavArrows } from "../../buttons";
import { fadeOutOpacity, flickerOpacity } from "../../sprites";

import { textBubble, addToMessageLog } from "../../message";

import { rustyKey, number2, number1, number4 } from "../../items";

import { setGameState, getGameState, saveCurrentRoom } from "../../state.js";

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

const prettyPainting = [
  ["Your eye is caught by the beauty of this painting"],
  ["You pause to gaze at it. This is a nice break."],
];

const doorIsLocked = [["It's locked."]];

export const createMainEntrance = async () => {
  scene(roomName + "Down", () => {
    window.roomName = roomName;
    window.viewDirection = "singleViewRoom";

    onLoad(() => {
      add([sprite("main-entrance"), scale(1)]);
      add([
        sprite("missingNumbers"),
        pos(450, 250),
        scale(1.5),
        area(1),
        "missingNumbers",
      ]);
      add([
        rect(18, 18),
        pos(450, 250),
        color(128, 128, 128),
        area(),
        "number2square",
      ]);
      add([
        rect(18, 18),
        pos(468, 290),
        color(128, 128, 128),
        area(),
        "number1square",
      ]);
      add([
        rect(18, 18),
        pos(485, 250),
        color(128, 128, 128),
        area(),
        "number4square",
      ]);
      add([rect(155, 240), opacity(0), pos(533, 110), area(), "center-door"]);
      add([rect(300, 75), pos(450, 30), opacity(0)]);
      add([
        text("Solve the number puzzle.", { size: 18, font: "apl386o" }),
        pos(480, 33),
        color(255, 0, 0),
      ]);
      add([
        text("It may unlock the door.", { size: 18, font: "apl386o" }),
        pos(480, 53),
        color(255, 0, 0),
      ]);
      add([
        text("Each column and row must", { size: 18, font: "apl386o" }),
        pos(480, 73),
        color(255, 0, 0),
      ]);
      add([
        text("equal 15.", { size: 18, font: "apl386o" }),
        pos(550, 91),
        color(255, 0, 0),
      ]);

      add([rect(240, 75), opacity(0), pos(25, 150), area(), "prettyPainting"]);

      add([
        rect(200, 280),
        opacity(0),
        pos(1040, 150),
        area(),
        "right-near-door",
      ]);

      onClick("prettyPainting", () => {
        textBubble(prettyPainting, () => {
          singleViewNavArrow("mainEntranceDown", "firstFloorHallwayDown");
        });
      });

      onClick("number2square", (number2square) => {
        if (!getGameState(roomName, "textShowed2")) {
          textBubble([["Seems like a number can go here."]], () => {
            singleViewNavArrow("mainEntranceDown", "firstFloorHallwayDown");
          });
          setGameState(roomName, "textShowed2", true)
        } 
        if (
          checkInventoryForItem(number2) &&
          window.selectedItem == "piece number2"
        ) {
          setGameState(roomName, "addedNumber2", true);
          removeFromInventory(number2);
          number2square.destroy();
          add([sprite("number2"), pos(450, 250), scale(1.5)]);
        }
      });

      onClick("number1square", (number1square) => {
        if (!getGameState(roomName, "textShowed1")) {
          textBubble([["Seems like a number can go here."]], () => {
            singleViewNavArrow("mainEntranceDown", "firstFloorHallwayDown");
          });
          setGameState(roomName, "textShowed1", true)
        } 
        if (
          checkInventoryForItem(number1) &&
          window.selectedItem == "piece number1"
        ) {
          setGameState(roomName, "addedNumber1", true);
          removeFromInventory(number1);
          number1square.destroy();
          add([sprite("number1"),  pos(468, 290), scale(1.5)]);
        }
      });

      onClick("number4square", (number4square) => {
        if (!getGameState(roomName, "textShowed4")) {
          textBubble([["Seems like a number can go here."]], () => {
            singleViewNavArrow("mainEntranceDown", "firstFloorHallwayDown");
          });
          setGameState(roomName, "textShowed4", true)
        } 
        if (
          checkInventoryForItem(number4) &&
          window.selectedItem == "piece number4"
        ) {
          setGameState(roomName, "addedNumber4", true);
          removeFromInventory(number4);
          number4square.destroy();
          add([sprite("number4"), pos(485, 250), scale(1.5)]);
        }
      });

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
      playSFX("doorClose");
      go("libraryUp");
    });

    onClick("center-door", () => {
      if (getGameState(roomName, "doorUnlocked")) {
        go("win");
      } else if (
        checkInventoryForItem(rustyKey) &&
        window.selectedItem == "rusty key"
      ) {
        playSFX("lockClick");
        setGameState(roomName, "doorUnlocked", true);
        removeFromInventory(rustyKey);
        textBubble([["The key unlocked the door!"]], () => {
          singleViewNavArrow("mainEntranceDown", "firstFloorHallwayDown");
        });
      } else if (window.selectedItem == "pry bar") {
        textBubble([["It doesn't work"]], () => {
          singleViewNavArrow("mainEntranceDown", "firstFloorHallwayDown");
        });
      } else if (!getGameState(roomName, "centerDoorClicked")) {
        textBubble(doorMessage, () => {
          singleViewNavArrow("mainEntranceDown", "firstFloorHallwayDown");
        });
        setGameState(roomName, "centerDoorClicked", true);
      } else {
        textBubble(doorIsLocked, () => {
          singleViewNavArrow("mainEntranceDown", "firstFloorHallwayDown");
        });
      }

      // if (!getGameState(roomName, "centerDoorClicked")) {
      //   textBubble(doorMessage, () => {
      //     singleViewNavArrow("mainEntranceDown", "firstFloorHallwayDown");
      //   });
      //   setGameState(roomName, "centerDoorClicked", true);
      // } else {
      //   textBubble(doorIsLocked, () => {
      //     singleViewNavArrow("mainEntranceDown", "firstFloorHallwayDown");
      //   });
      // }
    });

    // if (!InGameMenu.isOpen()) {
    //     onClick("right-near-door", () => {

    //         textBubble([["it won't open"]]);
    //       });
    // }

    //debugRectSize();
  });
};
