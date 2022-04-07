import { navArrows } from "../../buttons";
import { textBubble, addToMessageLog } from "../../message";
import { playBGM, stopBGM, playSFX } from "../../sounds";
import { setGameState, getGameState } from "../../state.js";
import { cellarKey } from "../../items.js";

import {
  addToInventory,
  checkInventoryForItem,
  removeFromInventory,
} from "../../inventory.js";

const roomName = "basementRoomTwo";
const roomNavArrows = navArrows(roomName);

const introMessage = [
  ["Seems to be a storage closet of some sort."],
  ["Look around and see what you can find."],
];

export const createBasementRoomTwo = async () => {
  // ======================================================== //

  let spookyMusic;

  scene(roomName + "Up", () => {
    window.roomName = roomName;
    window.viewDirection = "Up";
    let fruitPaintingY;
    onLoad(async () => {
      add([sprite("background-tile"), scale(1), area()]);
      add([sprite("help-me"), pos(300, 100), scale(0.2), area()]);
      add([
        sprite("grandfather-clock"),
        pos(680, 140),
        scale(4),
        area(),
        "SCENE",
        "grandfather-clock",
      ]);
      playBGM("spooky");
    });

    ///////////////////////////////////////////////////////////////////////////////////////////

    if (!getGameState(roomName, "introMessageRead")) {
      textBubble(introMessage, () => {
        setGameState(roomName, "introMessageRead", true);
        roomNavArrows(window.viewDirection);
        addToMessageLog(introMessage);
      });
    } else {
      roomNavArrows(window.viewDirection);
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
        pos(300, fruitPaintingY),
        scale(5),
        area(),
        "SCENE",
        "fruit-painting",
      ]);
    });
    onClick("grandfather-clock", () => {
      playSFX("gong");
    });

    onClick("fruit-painting", (fruitPainting) => {
      setGameState(roomName, "fruitPaintingMoved", true);
      fruitPainting.pos.y = 350;
      playSFX("falling");
      playBGM("horror");
    });
  });

  // ======================================================== //

  scene(roomName + "Down", async () => {
    window.roomName = roomName;
    window.viewDirection = "Down";
    onLoad(() => {
      add([sprite("background-tile"), scale(1), area()]);
      add([
        sprite("door2"),
        scale(1.2),
        pos(320, 85),
        area(),
        "SCENE",
        "door2",
      ]);
    });
    onClick("door2", (door2) => {
      if (getGameState(roomName, "doorUnlocked")) {
        playSFX("doorClose");
        go("basementHallwayDown");
      } else if (
        checkInventoryForItem(cellarKey) &&
        window.selectedItem == "cellar key"
      ) {
        playSFX("lockClick");
        setGameState(roomName, "doorUnlocked", true);
        removeFromInventory(cellarKey);
        textBubble([["The key unlocked the door!"]]);
      } else if (window.selectedItem == "pry bar") {
        textBubble([["It doesn't work"]]);
      } else {
        textBubble([["The door locked behind you. Find a key to open it."]]);
      }
    });
    roomNavArrows(window.viewDirection);
  });

  // ======================================================== //

  scene(roomName + "Left", () => {
    window.roomName = roomName;
    window.viewDirection = "Left";
    let bookCaseX;
    onLoad(() => {
      add([sprite("background-tile"), scale(1), area()]);
    });

    if (!getGameState(roomName, "barrelDrained")) {
      add([
        sprite("barrel2"),
        pos(1000, 270),
        scale(4.5),
        area(),
        "SCENE",
        "barrel2",
      ]);
    } else {
      add([sprite("barrel3"), pos(1000, 270), scale(4.5), area()]);
    }

    onClick("barrel2", (barrel) => {
      setGameState(roomName, "barrelDrained", true);
      barrel.destroy();
      add([sprite("barrel3"), pos(1000, 270), scale(4.5), area(), "SCENE"]);
      textBubble([["The water drained out of the barrel."]]);
    });

    if (!getGameState(roomName, "keyPickedUp")) {
      onLoad(() => {
        add([sprite("key"), pos(650, 300), scale(1), area(), "SCENE", "key"]);
      });
    }
    onLoad(() => {
      if (!getGameState(roomName, "bookCaseMoved")) {
        bookCaseX = 470;
      } else {
        bookCaseX = 350;
      }
      add([
        sprite("bookcase"),
        pos(bookCaseX, 150),
        scale(4),
        area(),
        "SCENE",
        "bookcase",
      ]);
    });

    onClick("bookcase", (bookcase) => {
      if (!getGameState(roomName, "bookCaseMoved")) {
        setGameState(roomName, "bookCaseMoved", true);
        bookcase.pos.x = 350;
        playSFX("bookcaseMoving");
      }
    });

    onClick("key", (key) => {
      playSFX("keyNoise");
      textBubble([["A key was added to your inventory"]]);
      addToInventory(cellarKey);
      setGameState(roomName, "keyPickedUp", true);
      key.destroy();
    });
    roomNavArrows(window.viewDirection);
  });

  // ======================================================== //

  scene(roomName + "Right", () => {
    window.roomName = roomName;
    window.viewDirection = "Right";
    const direction = "Right";
    onLoad(() => {
      add([sprite("background-tile"), scale(1)]);
      add([sprite("table"), pos(450, 240), scale(5)]);
      add([sprite("candle"), pos(450, 140), scale(4)]);
      add([sprite("cob-webs"), pos(520, 310), scale(2)]);
    });
    roomNavArrows(window.viewDirection);
  });

  // ======================================================== //
};
