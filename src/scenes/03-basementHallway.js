import { navArrows, singleViewNavArrow } from "../buttons";
import { textBubble, addToMessageLog } from "../message";
import { playBGM, stopBGM, playSFX } from "../sounds";
import { setGameState, getGameState } from "../state.js";
import { cellarKey } from "../items.js";

import {
  addToInventory,
  checkInventoryForItem,
  removeFromInventory,
} from "../inventory.js";

const roomName = "basementHallway";
const roomNavArrows = navArrows(roomName);

const introMessage = [
  ["You step out of the room and into a hallway"],
  ["The challanges will increase  "],
  ["If you can't escape from the room, then stay here in my tummy forever~~~ "],
];

export const createBasementHallway = async () => {
  // ======================================================== //

  let spookyMusic;

  scene(roomName + "Down", () => {
    window.roomName = roomName;
    window.viewDirection = "singleViewRoom"

    // let fruitPaintingY;
    onLoad(async () => {
      add([sprite("basementHallway"), scale(1), area()]);
      add([sprite('basementHallwayDoor'), scale(.85), area(), pos(30, 180), 'basementHallwayDoorLeftClose'])
      add([sprite('basementHallwayDoor'), scale(.58), area(), pos(240, 180) , 'basementHallwayDoorLeftFar'])
      add([sprite('basementHallwayDoor', { flipX: true }), scale(.85), area(), pos(1060, 180), 'basementHallwayDoorRightClose'])
      add([sprite('basementHallwayDoor', { flipX: true }), scale(.58), area(), pos(890, 180), 'basementHallwayDoorRightFar'])

      add([sprite('barrel1'), scale(3.7), area(), pos(185, 325) , 'barrelLeft'])
      add([sprite('barrel1'), scale(3.7), area(), pos(960, 325) , 'barrelRight'])

      //   add([sprite("help-me"), pos(500, 100), scale(0.2), area()]);
    //   add([
    //     sprite("grandfather-clock"),
    //     pos(900, 100),
    //     scale(4),
    //     area(),
    //     "grandfather-clock",
    //   ]);
      playBGM("spooky");
    });

    ///////////////////////////////////////////////////////////////////////////////////////////

    if (!getGameState(roomName, "introMessageRead")) {
      textBubble(introMessage, () => {
        setGameState(roomName, "introMessageRead", true);
        addToMessageLog(introMessage);
      });
      singleViewNavArrow('basementHallwayDown', 'basementRoomOneLeft')
    } else {
     singleViewNavArrow('basementHallwayDown', 'basementRoomOneLeft')
    }

    ///////////////////////////////////////////////////////////////////////////////////////////

    // onLoad(() => {
    //   if (!getGameState(roomName, "fruitPaintingMoved")) {
    //     fruitPaintingY = 100;
    //   } else {
    //     fruitPaintingY = 350;
    //   }
    //   add([
    //     sprite("fruit-painting"),
    //     pos(500, fruitPaintingY),
    //     scale(5),
    //     area(),
    //     "fruit-painting",
    //   ]);
    // });

    onClick("grandfather-clock", () => {
      playBGM("gong");
    });

    onClick('basementHallwayDoor', () => {
        console.log('near')
    })

    onClick('basementHallwayDoorLeftFar', () => {
        console.log('far')
    })

    onClick("fruit-painting", (fruitPainting) => {
      setGameState(roomName, "fruitPaintingMoved", true);
      fruitPainting.pos.y = 350;
      playSFX("falling");
      playBGM("horror");
    });
  //  singleViewNavArrow('basementRoomOneLeft')
  });
}