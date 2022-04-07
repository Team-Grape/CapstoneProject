import {
  addToInventory,
  checkInventoryForItem,
  removeFromInventory,
} from "../../inventory";

import { cellarKey, meat, number2 } from "../../items.js";

import { setGameState, getGameState } from "../../state";

import { textBubble, addToMessageLog } from "../../message";

import { playBGM, stopBGM, playSFX } from "../../sounds";
import { navArrows } from "../../buttons";

const roomName = "kitchen";
const roomNavArrows = navArrows(roomName);

export const createKitchen = () => {
  // ======================================================== //
  scene(roomName + "Up", () => {
    window.roomName = roomName;
    window.viewDirection = "Up";
    onLoad(() => {
      add([sprite("kitchen-up"), scale(1)]);
      add([sprite("egg-box"), scale(2.5), pos(950, 380)]);
    });
    const potatoes = add([
      sprite("potatoes"),
      scale(2.5),
      pos(100, 400),
      area(),
      "SCENE",
      solid(),
      "potatoes",
    ]);
    const cabbage = add([
      sprite("cabbage"),
      scale(2.5),
      pos(600, 380),
      area(),
      "SCENE",
      solid(),
      rotate(),
      "cabbage",
    ]);

    onClick("cabbage", (cabbage) => {
      playSFX("cuteGhostSound");
      textBubble([["Bye"]]);
      cabbage.onUpdate(() => {
        cabbage.angle += 120 * dt();
        cabbage.pos.x -= 2;
      });
    });
    roomNavArrows(viewDirection);
  });
  // ======================================================== //
  scene(roomName + "Right", () => {
    window.roomName = roomName;
    window.viewDirection = "Right";
    onLoad(() => {
      add([sprite("room-three-background-side"), scale(1), area()]);
      add([sprite("dinning-table"), scale(4), pos(600, 290)]);
      add([sprite("basement-window"), scale(6), pos(1000, 120)]);
      add([
        sprite("milk-bottle"),
        scale(2),
        pos(750, 280),
        area(),
        "SCENE",
        "milkBottle",
      ]);
      add([sprite("apples"), scale(2.5), pos(800, 320)]);
      add([sprite("sausage"), scale(2.5), pos(100, 330)]);
      add([sprite("bread"), scale(2.5), pos(200, 320)]);

      if (!getGameState(roomName, "meatPickedUp")) {
        onLoad(() => {
          add([
            sprite("meat"),
            scale(2.5),
            pos(150, 400),
            area(),
            "SCENE",
            "meat",
          ]);
        });
      }
    });

    onClick("milkBottle", (milkBottle) => {
      textBubble([["It is expired, you probably don't want to take it."]]);
    });

    onClick("meat", (meat1) => {
      playSFX("keyNoise");
      textBubble([["The meat was added to your inventory"]]);
      addToInventory(meat);
      setGameState(roomName, "meatPickedUp", true);
      meat1.destroy();
    });

    roomNavArrows(viewDirection);
  });
  // ======================================================== //
  scene(roomName + "Down", () => {
    window.roomName = roomName;
    window.viewDirection = "Down";
    onLoad(() => {
      add([sprite("room-three-background-side"), scale(1), area()]);
      add([sprite("board"), pos(330, 150), scale(3.5)]);
      add([sprite("board"), pos(420, 210), scale(3.5)]);
      add([sprite("spatula-on-wall"), pos(30, 150), scale(4)]);
      add([sprite("cup-board"), pos(540, 140), scale(3.5)]);
      add([sprite("dish-board"), pos(720, 170), scale(3.5)]);
      add([
        sprite("woodenDoor"),
        pos(950, 57),
        scale(3.7),
        area(),
        "SCENE",
        "woodenDoor",
      ]);

      //first board
      if (getGameState(roomName, "Can1Fell")) {
        add([sprite("soft-drink-blue"), pos(345, 340), rotate(100)]);
      } else {
        add([
          sprite("soft-drink-blue"),
          pos(332, 117),
          scale(1.2),
          area(),
          "SCENE",
          "SFblue",
        ]);
      }

      if (getGameState(roomName, "Can2Fell")) {
        add([sprite("soft-drink-green"), pos(365, 375), rotate(120)]);
      } else {
        add([
          sprite("soft-drink-green"),
          pos(354, 117),
          scale(1.2),
          area(),
          "SCENE",
          "SFgreen",
        ]);
      }

      if (getGameState(roomName, "Can3Fell")) {
        add([sprite("soft-drink-red"), pos(395, 355), rotate(170)]);
      } else {
        add([
          sprite("soft-drink-red"),
          pos(376, 117),
          scale(1.2),
          area(),
          "SCENE",
          "SFred",
        ]);
      }

      if (getGameState(roomName, "Can4Fell")) {
        add([sprite("soft-drink-yellow"), pos(415, 405), rotate(120)]);
      } else {
        add([
          sprite("soft-drink-yellow"),
          pos(398, 117),
          scale(1.2),
          area(),
          "SCENE",
          "SFyellow",
        ]);
      }

      // second board
      add([sprite("water"), pos(452, 177), scale(1.2)]);
      add([sprite("orange-juice"), pos(482, 177), scale(1.2)]);

      if (!getGameState(roomName, "fridgeIsClosed")) {
        add([
          sprite("fridge-close"),
          scale(7.5),
          pos(150, 160),
          area(),
          "SCENE",
          "fridgeClose",
        ]);
      } else {
        add([
          sprite("fridge-open"),
          scale(7.5),
          pos(150, 160),
          area(),
          "SCENE",
          "fridgeOpen",
        ]);
      }

      if (!getGameState(roomName, "kitchenCarbinetIsClosed")) {
        add([
          sprite("kitchen-carbinet-closed"),
          pos(600, 280),
          scale(7),
          area(),
          "SCENE",
          "kitchenCarbinetClosed",
        ]);
      } else {
        add([
          sprite("kitchen-carbinet-opened"),
          scale(7),
          pos(593, 280),
          area(),
          "SCENE",
          "kitchenCarbinetOpened",
        ]);
      }
    });

    onClick("woodenDoor", (woodenDoor) => {
      if (getGameState(roomName, "doorUnlocked")) {
        playSFX("doorClose");
        go("firstFloorHallwayDown");
      } else if (
        checkInventoryForItem(cellarKey) &&
        window.selectedItem == "cellar key"
      ) {
        play("lockClick");
        setGameState(roomName, "doorUnlocked", true);
        removeFromInventory(cellarKey);
        textBubble([["The key unlocked the door!"]]);
      } else {
        textBubble([["It doesn't open, it seems like it needs a key"]]);
      }
    });

    onClick("key", (key) => {
      playSFX("keyNoise");
      textBubble([["A key was added to your inventory"]]);
      addToInventory(cellarKey);
      setGameState(roomName, "keyPickedUp", true);
      key.destroy();
    });

    onClick("SFblue", (SFblue) => {
      setGameState(roomName, "Can1Fell", true);
      SFblue.destroy();
      const SFblueFall = add([
        sprite("soft-drink-blue"),
        pos(345, 340),
        rotate(100),
      ]);
    });

    onClick("SFgreen", (SFgreen) => {
      setGameState(roomName, "Can2Fell", true);
      SFgreen.destroy();
      const SFgreenFall = add([
        sprite("soft-drink-green"),
        pos(365, 375),
        rotate(120),
      ]);
    });

    onClick("SFred", (SFred) => {
      setGameState(roomName, "Can3Fell", true);
      SFred.destroy();
      const SFredFall = add([
        sprite("soft-drink-red"),
        pos(395, 355),
        rotate(170),
      ]);
    });

    onClick("SFyellow", (SFyellow) => {
      setGameState(roomName, "Can4Fell", true);
      setTimeout(() => {
        if (!getGameState(roomName, "keyPickedUp")) {
          onLoad(() => {
            add([
              sprite("key"),
              pos(400, 118),
              scale(1),
              area(),
              "SCENE",
              "key",
            ]);
          });
        }
      }, 50);
      SFyellow.destroy();
      const SFyellowFall = add([
        sprite("soft-drink-yellow"),
        pos(415, 405),
        rotate(120),
      ]);
    });

    onClick("fridgeClose", (fridgeClose) => {
      setGameState(roomName, "fridgeIsClosed", true);
      fridgeClose.destroy();
      const fridgeOpen = add([
        sprite("fridge-open"),
        scale(7.5),
        pos(150, 160),
        area(),
        "SCENE",
        "fridgeOpen",
      ]);
    });

    onClick("fridgeOpen", (fridgeOpen) => {
      setGameState(roomName, "fridgeIsClosed", false);
      fridgeOpen.destroy();
      const fridgeClose = add([
        sprite("fridge-close"),
        scale(7.5),
        pos(150, 160),
        area(),
        "SCENE",
        "fridgeClose",
      ]);
    });

    onClick("kitchenCarbinetClosed", (kitchenCarbinetClosed) => {
      setGameState(roomName, "kitchenCarbinetIsClosed", true);
      kitchenCarbinetClosed.destroy();
      const kitchenCarbinetOpened = add([
        sprite("kitchen-carbinet-opened"),
        scale(7),
        pos(593, 280),
        area(),
        "SCENE",
        "kitchenCarbinetOpened",
      ]);
      const potatochipGreen = add([
        sprite("potatochip-green"),
        scale(0.9),
        pos(663, 329),
        rotate(70),
      ]);
    });

    onClick("kitchenCarbinetOpened", (kitchenCarbinetOpened) => {
      setGameState(roomName, "kitchenCarbinetIsClosed", false);
      kitchenCarbinetOpened.destroy();
      const kitchenCarbinetClosed = add([
        sprite("kitchen-carbinet-closed"),
        scale(7),
        pos(600, 280),
        area(),
        "SCENE",
        "kitchenCarbinetClosed",
      ]);
    });
    roomNavArrows(viewDirection);
  });
  // ======================================================== //
  scene(roomName + "Left", () => {
    window.roomName = roomName;
    window.viewDirection = "Left";
    onLoad(() => {
      add([sprite("kitchen-left"), scale(1)]);
    });
    if (!getGameState(roomName, "number2PickedUp")) {
      add([
        sprite("number2"),
        scale(2.5),
        pos(200, 500),
        area(),
        "SCENE",
        origin("center"),
        rotate(45),
        "number2",
      ]);
    }

    onClick("number2", (Number2) => {
      playSFX("keyNoise");
      setGameState(roomName, "number2PickedUp", true);
      textBubble([["A piece of number was added to your inventory"]]);
      addToInventory(number2);
      Number2.destroy();
    });
    roomNavArrows(viewDirection);
  });
  // ======================================================== //
};
