import { navArrows } from "../buttons";
import { textBubble, addToMessageLog } from "../message";
import { playBGM, stopBGM, playSFX } from "../sounds";
import { setGameState, getGameState } from "../state.js";
import { cellarKey } from "../items.js";

import {
  addToInventory,
  checkInventoryForItem,
  removeFromInventory,
} from "../inventory.js";

const roomName = "basementRoomTwo";
const roomNavArrows = navArrows(roomName);

const introMessage = [
  ["Now you are in the second room"],
  ["The challanges will increase  "],
  ["If you can't escape from the room, then stay here in my tummy forever~~~ "],
];

export const createBasementRoomTwo = async () => {
  // ======================================================== //

  let spookyMusic;

  scene(roomName + "Up", () => {
    const direction = "Up";
    let fruitPaintingY;
    onLoad(async () => {
      add([sprite("background-tile"), scale(1), area()]);
      add([sprite("help-me"), pos(500, 100), scale(0.2), area()]);
      add([
        sprite("grandfather-clock"),
        pos(900, 100),
        scale(4),
        area(),
        "grandfather-clock",
      ]);
      playBGM("spooky");
    });

    ///////////////////////////////////////////////////////////////////////////////////////////

    if (!getGameState(roomName, "introMessageRead")) {
      textBubble(introMessage, () => {
        setGameState(roomName, "introMessageRead", true);
        roomNavArrows(direction);
        addToMessageLog(introMessage);
      });
    } else {
      roomNavArrows(direction);
    }

    ///////////////////////////////////////////////////////////////////////////////////////////

    onLoad(() => {
      if (!getGameState(roomName, "fruitPaintingMoved")) {
        fruitPaintingY = 100;
      } else {
        fruitPaintingY = 350;
      }
      add([
        sprite("fruit-painting"),
        pos(500, fruitPaintingY),
        scale(5),
        area(),
        "fruit-painting",
      ]);
    });
    onClick("grandfather-clock", () => {
      playBGM("gong");
    });

    onClick("fruit-painting", (fruitPainting) => {
      setGameState(roomName, "fruitPaintingMoved", true);
      fruitPainting.pos.y = 350;
      playSFX("falling");
      playBGM("horror");
    });
    roomNavArrows(direction);
  });

  // ======================================================== //

  scene(roomName + "Down", async () => {
    const direction = "Down";
    onLoad(() => {
      add([sprite("background-tile"), scale(1), area()]);
      add([sprite("door"), pos(440, 150), scale(4), area(), "door"]);
    });
    onClick("door", async () => {
      stopBGM();
      go("basementRoomOneUp");
    });
    roomNavArrows(direction);
  });

  // ======================================================== //

  scene(roomName + "Left", () => {
    const direction = "Left";
    let bookCaseX;
    onLoad(() => {
      add([sprite("background-tile"), scale(1), area()]);
    });
    if (!getGameState(roomName, "keyPickedUp")) {
      onLoad(() => {
        add([sprite("key"), pos(500, 300), scale(1), area(), "key"]);
      });
    }
    onLoad(() => {
      if (!getGameState(roomName, "bookCaseMoved")) {
        bookCaseX = 400;
      } else {
        bookCaseX = 180;
      }
      add([
        sprite("bookcase"),
        pos(bookCaseX, 150),
        scale(4),
        area(),
        "bookcase",
      ]);
    });
    onClick("bookcase", (bookcase) => {
      setGameState(roomName, "bookCaseMoved", true);
      bookcase.pos.x = 180;
      playSFX("bookcaseMoving");
    });
    onClick("key", (key) => {
      textBubble([["a key was added to your inventory"]]);
      addToInventory(cellarKey);
      setGameState(roomName, "keyPickedUp", true);
      key.destroy();
    });
    roomNavArrows(direction);
  });

  // ======================================================== //

  scene(roomName + "Right", () => {
    const direction = "Right";
    onLoad(() => {
      add([sprite("background-tile"), scale(1), area()]);
      add([
        sprite("woodenDoor"),
        pos(900, 100),
        scale(3),
        area(),
        "woodenDoor",
      ]);
      add([sprite("table"), pos(600, 240), scale(3), area()]);
      add([sprite("candle"), pos(600, 160), scale(3), area()]);
      add([sprite("cob-webs"), pos(640, 280), scale(2), area()]);
    });
    onClick("woodenDoor", (woodenDoor) => {
      playBGM("kidMusic");
      if (
        getGameState(roomName, "doorUnlocked") ||
        checkInventoryForItem(cellarKey)
      ) {
        setGameState(roomName, "doorUnlocked", true);
        removeFromInventory(cellarKey);
        go("basementRoomThreeUp");
      } else {
        textBubble([["it doesn't open, it seems like it needs a key"]]);
      }
    });
    roomNavArrows(direction);
  });

  // ======================================================== //
};
