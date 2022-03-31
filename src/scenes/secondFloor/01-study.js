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
      add([sprite('heart-key'), pos(300, 300), scale(1), area(), 'heartKey'])
    });

    onClick('heartKey', (heartKey1) => {
      if (!getGameState(roomName, 'heartKeyPickedUp')) {
        playSFX('keyNoise');
        textBubble([['A key was added to your inventory']], () => {
          singleViewNavArrow("studyDown", "secondFloorHallwayDown");
        });
        addToInventory(heartKey);
        setGameState(roomName, 'silverKeyPickedUp', true);
        heartKey1.destroy();
      }
    })

    const nunInterval = setInterval(() => {
      const nun = add([sprite("nun"), pos(330, 0), scale(1.6), area()]);
      textBubble([["Boooooo!!"]])
    }, 5000);

    const gameoverInterval = setInterval(() => {
      go("gameover");
    }, 7000);

    setTimeout(() => {
        clearInterval(nunInterval);
    }, 6000)
        
    setTimeout(() => {
        clearInterval(gameoverInterval)
    }, 8000)

    singleViewNavArrow("studyDown", "secondFloorHallwayDown");
  });
};
