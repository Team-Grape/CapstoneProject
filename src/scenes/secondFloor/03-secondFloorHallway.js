

import { navArrows, singleViewNavArrow } from "../../buttons";
import { textBubble, addToMessageLog } from "../../message";
import { playBGM, stopBGM, playSFX } from "../../sounds";
import { setGameState, getGameState } from "../../state.js";
import { cellarKey } from "../../items.js";
import { debugRectSize } from "../../debug.js";


import {
  addToInventory,
  checkInventoryForItem,
  removeFromInventory,
} from '../../inventory.js';

const roomName = 'secondFloorHallway';
const roomNavArrows = navArrows(roomName);

const introMessage = [
  ["You've made it to the second floor!  "],
];


export const createSecondFloorHallway = async () => {
  scene(roomName + 'Down', () => {
    window.roomName = roomName;
    window.viewDirection = 'singleViewRoom';

    onLoad(() => {
      add([sprite('second-floor-hallway'), scale(1)]);

      // left-door
      add([rect(160, 235), opacity(0), pos(72, 158), area(), 'left-door']);
      add([rect(94, 47), opacity(0), pos(72, 392), area(), 'left-door']);

      // right-door
      add([rect(162, 235), opacity(0), pos(998, 158), area(), 'right-door']);
      add([rect(80, 47), opacity(0), pos(1088, 392), area(), 'right-door']);

      // center-door
      add([rect(138, 230), opacity(0), pos(542, 115), area(), 'center-door']);

      playBGM('spooky');
    });

    ///////////////////////////////////////////////////////////////////////////////////////////


    if (!getGameState(roomName, "introMessageRead")) {
      textBubble(introMessage, () => {
        setGameState(roomName, "introMessageRead", true);
        addToMessageLog(introMessage);
        singleViewNavArrow(roomName + "Down", "firstFloorHallwayDown");
      });
    } else {
      singleViewNavArrow(roomName + 'Down', 'firstFloorHallwayDown');
    }

    ///////////////////////////////////////////////////////////////////////////////////////////

    // onClick('down-arrow', () => {
    //   go('firstFloorHallwayDown');
    // });

    onClick('left-door', () => {
      go('kidRoomUp');
    });


    onClick("center-door", () => {
      go("studyDown")
    });

    onClick('right-door', () => {
      go('bedroomLeft');
    });

    //    onClick("right-far-door", () => {
    //      //go('secondFloorHallwayDown')
    //      //go('libraryUp')
    //      textBubble([["it won't open"]]);
    //    });

    //    debugRectSize();
  });
};
