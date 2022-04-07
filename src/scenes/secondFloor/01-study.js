import { navArrows, singleViewNavArrow } from "../../buttons";
import { textBubble, addToMessageLog } from "../../message";
import { playBGM, stopBGM, playSFX } from "../../sounds";
import { setGameState, getGameState } from "../../state.js";
import { cellarKey, heartKey } from "../../items.js";
import { debugRectSize } from "../../debug.js";

import {
  addToInventory,
  checkInventoryForItem,
  removeFromInventory,
} from "../../inventory.js";

const roomName = "study";
const roomNavArrows = navArrows(roomName);

export const createStudy = async () => {
  scene(roomName + "Down", () => {
    window.roomName = roomName;
    window.viewDirection = "singleViewRoom";

    onLoad(() => {
      add([sprite("study"), scale(1)]);
      add([rect(50, 28), pos(441, 335), color(0, 0, 0)]);
      add([rect(50, 28), pos(441, 372), color(0, 0, 0)]);
      add([sprite("books"), pos(680, 260), scale(2), area(), "SCENE", "books"]);
      add([sprite('white-curtains-closed'), pos(88, 88), scale(1), area(), "SCENE", 'closedCurtains'])
    });

    const deskDrawer1 = add([
      sprite("deskDrawer"),
      scale(1.05),
      pos(441, 335),
      area(), "SCENE",
      "deskDrawer1",
    ]);
    const deskDrawer2 = add([
      sprite("deskDrawer"),
      scale(1.05),
      pos(441, 372),
      area(), "SCENE",
      "deskDrawer2",
    ]);

    onClick("deskDrawer1", () => {
      if (!getGameState(roomName, "deskDrawer1Opened")) {
        playSFX("drawerOpening");
        deskDrawer1.pos.y += 20;

        setGameState(roomName, "deskDrawer1Opened", true);
      } else {
        playSFX("drawerClosing");
        deskDrawer1.pos.y -= 20;

        setGameState(roomName, "deskDrawer1Opened", false);
      }
    });

    onClick("deskDrawer2", () => {
      if (!getGameState(roomName, "deskDrawer2Opened")) {
        playSFX("drawerOpening");
        deskDrawer2.pos.y += 20;
        setGameState(roomName, "deskDrawer2Opened", true);
      } else {
        playSFX("drawerClosing");
        deskDrawer2.pos.y -= 20;

        setGameState(roomName, "deskDrawer2Opened", false);
      }
      if (!getGameState(roomName, "heartKeyPickedUp")) {
        add([
          sprite("heart-key"),
          pos(441, 372),
          scale(0.8),
          area(), "SCENE",
          "heartKey",
        ]);
        onClick("heartKey", (heartKey1) => {
          playSFX("keyNoise");
          textBubble([["A key was added to your inventory"]], () => {
            singleViewNavArrow("studyDown", "secondFloorHallwayDown")
          });
          addToInventory(heartKey);
          setGameState(roomName, "heartKeyPickedUp", true);
          heartKey1.destroy();
        });
      }
    });

    function nun() {
      add([sprite("nun"), pos(330, 0), scale(1.6), area()]);
      textBubble([["Boooooo!!"]]);
      playSFX("dundundun");
    }

    function setAndClearGameoverInterval() {
      const gameover = setInterval(() => {
        go("gameover")
      }, 1500)
      setTimeout(() => {
        clearInterval(gameover)
      }, 2000)
    }

    onClick("books", () => {
      nun();
      setAndClearGameoverInterval();
    });

    onClick("closedCurtains", () => {
      nun();
      setAndClearGameoverInterval();
    });

    singleViewNavArrow("studyDown", "secondFloorHallwayDown");
  });
};
