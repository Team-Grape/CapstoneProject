import {
  addToInventory,
  checkInventoryForItem,
  removeFromInventory,
} from "../inventory";

import { setGameState, getGameState } from "../state";

import { textBubble, addToMessageLog } from "../message";

import { playBGM, stopBGM } from "../sounds";
import { navArrows } from "../buttons";

const roomName = "basementRoomThree";
const roomNavArrows = navArrows(roomName);

export const createBasementRoomThree = () => {
  // ======================================================== //
  scene(roomName + "Up", () => {
    const direction = "Up";
    onLoad(() => {
      add([sprite("room-three-background"), scale(1), area()]);
      add([sprite("seats"), scale(3), pos(20, 400)]);
      add([sprite("orange-carpet"), scale(3), pos(800, 400)]);
      add([sprite("little-drawer"), scale(6), pos(360, 270)]);
      add([sprite("flower-painting"), scale(4), pos(500, 120)]);
      add([sprite("flower-painting"), scale(4), pos(320, 90)]);
      add([sprite("flower"), scale(3), pos(360, 230)]);
      add([sprite("books"), scale(3), pos(475, 250)]);
      playBGM("kidMusic");
    });
    roomNavArrows(direction);
  });
  // ======================================================== //
  scene(roomName + "Right", () => {
    const direction = "Right";
    onLoad(() => {
      add([sprite("room-three-background-side"), scale(1), area()]);
      add([sprite("red-carpet"), scale(1.5), pos(100, 500)]);
      add([sprite("pink-bed"), scale(5), pos(90, 265)]);
      add([sprite("little-drawer"), scale(4.5), pos(350, 270)]);
      add([sprite("deng"), scale(2.5), pos(350, 230)]);
      add([sprite("clock"), scale(3), pos(400, 130)]);
      add([sprite("opened-book"), scale(2), pos(400, 275)]);
      add([sprite("cycle-chair"), scale(3.2), pos(385, 370)]);
      add([sprite("bookshelve"), scale(3.2), pos(520, 230)]);
      add([sprite("empty-picture"), scale(2.7), pos(850, 110)]);
      add([sprite("empty-picture"), scale(2.4), pos(950, 140)]);
      add([sprite("books-on-chair"), scale(2.2), pos(710, 370)]);
    });
    roomNavArrows(direction);
  });
  // ======================================================== //
  scene(roomName + "Down", () => {
    const direction = "Down";
    onLoad(() => {
      add([sprite("room-three-background-side"), scale(1), area()]);
      add([sprite("orange-carpet"), scale(3), pos(800, 400)]);
      add([sprite("makeup-table"), scale(6), pos(120, 230)]);
      add([sprite("clothset"), scale(6), pos(400, 200)]);
      add([sprite("cycle-chair"), scale(3.5), pos(165, 400)]);
      add([sprite("land-scape-painting"), scale(3), pos(600, 120)]);
      add([sprite("red-flower"), scale(3.5), pos(1200, 300)]);
      add([
        sprite("woodenDoor", { flipX: true }),
        pos(900, 106),
        scale(3),
        area(),
        "woodenDoor",
      ]);
    });
    onClick("woodenDoor", () => {
      go("basementRoomTwoLeft");
    });
    roomNavArrows(direction);
  });
  // ======================================================== //
  scene(roomName + "Left", () => {
    const direction = "Left";
    onLoad(() => {
      add([sprite("room-three-background-side"), scale(1), area()]);
      add([sprite("orange-big-carpet"), scale(3), pos(200, 350)]);
      add([sprite("toy"), scale(3.5), pos(220, 380)]);
      add([sprite("ball"), scale(3.5), pos(500, 480)]);
      add([sprite("another-painting"), scale(3), pos(600, 120)]);
      add([sprite("white-flowers"), scale(3), pos(650, 300)]);
      add([sprite("seats"), scale(3), pos(1200, 400)]);
      add([sprite("wood-door"), scale(4), pos(880, 185)]);
    });
    roomNavArrows(direction);
  });
  // ======================================================== //
};
