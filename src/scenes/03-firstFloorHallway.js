import { navArrows, singleViewNavArrow } from "../buttons";
import { Message, textBubble, addToMessageLog } from "../message";
import { playBGM, stopBGM, playSFX } from "../sounds";
import { setGameState, getGameState, setPreviousRoom } from "../state.js";
import { cellarKey } from "../items.js";
import { debugRectSize } from "../debug.js";

import {
  addToInventory,
  checkInventoryForItem,
  removeFromInventory,
} from "../inventory.js";

const roomName = "firstFloorHallway";
const roomNavArrows = navArrows(roomName);
const message = new Message();

const introMessage = [
  ["You found stairs and followed them out of the basement.  "],
  ["You've made it to the first floor!  "],
];

export const createFirstFloorHallway = async () => {
  scene(roomName + "Down", () => {
    window.roomName = roomName;
    window.viewDirection = "singleViewRoom";

    onLoad(() => {
      add([sprite('first-floor-hallway'), scale(1)]);
      // left-near-door
      add([ rect(160, 235), opacity(0), pos(72, 158), area(), "left-near-door", ]);
      add([ rect(94, 47), opacity(0), pos(72, 392), area(), "left-near-door", ]);
      // left-far-door
      add([ rect(140, 235), opacity(0), pos(355, 110), area(), "left-far-door", ]);
      // right-far-door
      add([ rect(140, 235), opacity(0), pos(710, 110), area(), "right-far-door", ]);
      // left-near-door
      add([ rect(162, 235), opacity(0), pos(998, 158), area(), "right-near-door", ]);
      add([ rect(80, 47), opacity(0), pos(1088, 392), area(), "right-near-door", ]);

      playBGM("ambience");
    });

    ///////////////////////////////////////////////////////////////////////////////////////////

    if (!getGameState(roomName, "introMessageRead")) {
      message.textBubble(introMessage, () => {
        setGameState(roomName, "introMessageRead", true);
        message.addToMessageLog(introMessage);
        //singleViewNavArrow(roomName + "Down", "basementHallwayDown");
      });
  //    singleViewNavArrow("basementHallwayDown", "basementRoomOneLeft");
    } else {
     singleViewNavArrow(roomName + "Down", "basementHallwayDown");
     // singleViewNavArrow("basementHallwayDown", "basementRoomOneLeft");
    }

    ///////////////////////////////////////////////////////////////////////////////////////////


    onClick("left-near-door", () => {
      message.textBubble([["it won't open"]]);
    });

    onClick("left-far-door", () => {
      console.log('Room Name and Direction',window.roomName, window.viewDirection)
      setPreviousRoom(roomName + 'Down')
      go('mainEntranceDown')
    });

    onClick("right-near-door", () => {
      message.textBubble([["it won't open"]]);
    });

    onClick("right-far-door", () => {
      go('secondFloorHallwayDown')
      setPreviousRoom(roomName + 'Down')
      //go('libraryUp')
      // textBubble([["it won't open"]]);
    });
//    debugRectSize();
  });
};