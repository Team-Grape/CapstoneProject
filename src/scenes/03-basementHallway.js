import { navArrows, singleViewNavArrow } from "../buttons";
import { textBubble, addToMessageLog } from "../message";
import { playBGM, stopBGM, playSFX } from "../sounds";
import { setGameState, getGameState } from "../state.js";
import { cellarKey } from "../items.js";
import { debugRectSize } from "../debug.js";

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
  scene(roomName + "Down", () => {
    window.roomName = roomName;
    window.viewDirection = "singleViewRoom";

    onLoad(() => {
//      add([sprite("basementHallway"), scale(1)]);

      // left-near-door
/*
      add([
        sprite("basementHallwayDoor"),
        scale(0.85),
        pos(30, 180),
        area({
          area: {
            pos: { x: 100, y: 80 },
            shape: "polygon",
          },
          pts: [
            { x: 100, y: 80 },
            { x: 100, y: 80 },
            { x: 100, y: 80 },
            { x: 100, y: 80 },

//            vec2(-12),
//            vec2(10, 10),
//            vec2(20, 10),
//            vec2(20, 20),
//            vec2(10, 20),
//            vec2(-8),
          ],
        }),
        "left-near-door",
      ]);
*/

//            add([sprite("basementHallwayDoor"), scale(0.85), pos(30, 180)]);
  //          add([
drawPolygon({
    pts: [
           {x:30, y:450},
           {x:190, y:450},
           {x:30, y:530},

//        vec2(-12),
//        vec2(0, 16),
//        vec2(12, 4),
//        vec2(0, -2),
//        vec2(-8),
    ],
})
//,opacity(1), color([255,255,255]), pos(30, 180), "left-near-door"]);



      // left-near-door
      //      add([sprite("basementHallwayDoor"), scale(0.85), pos(30, 180)]);
      //      add([rect(156, 270), opacity(0), pos(30, 180), area(), "left-near-door"]);

      // left-far-door
      add([sprite("basementHallwayDoor"), scale(0.58), pos(240, 180)]);
      add([rect(108, 145), opacity(0), pos(240, 180), area(), "left-far-door"]);
      add([rect(62, 39), opacity(0), pos(287, 327), area(), "left-far-door"]);

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
        "right-far-door",
      ]);
      add([rect(70, 40), opacity(0), pos(890, 325), area(), "right-far-door"]);

      // center-door
      add([
        sprite("door2", { flipX: true }),
        scale(0.8),
        pos(577, 170),
        area(),
        "center-door",
      ]);

      add([sprite("barrel1"), scale(3.7), area(), pos(185, 325), "barrelLeft"]);
      add([
        sprite("barrel1"),
        scale(3.7),
        area(),
        pos(960, 325),
        "barrelRight",
      ]);

      playBGM("spooky");
    });

    ///////////////////////////////////////////////////////////////////////////////////////////

    if (!getGameState(roomName, "introMessageRead")) {
      textBubble(introMessage, () => {
        setGameState(roomName, "introMessageRead", true);
        addToMessageLog(introMessage);
      });
      singleViewNavArrow("basementHallwayDown", "basementRoomOneLeft");
    } else {
      singleViewNavArrow("basementHallwayDown", "basementRoomOneLeft");
    }

    ///////////////////////////////////////////////////////////////////////////////////////////

//    onClick("left-near-door", () => {
//      textBubble([["it won't open"]]);
//    });

    onClick("left-far-door", () => {
      textBubble([["it won't open"]]);
    });

    onClick("right-near-door", () => {
      textBubble([["it won't open"]]);
    });

    onClick("right-far-door", () => {
      textBubble([["it won't open"]]);
    });

    onClick("center-door", () => {
      textBubble([["it won't open"]]);
    });

    debugRectSize();
  });
};
