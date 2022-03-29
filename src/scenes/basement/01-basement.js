import { navArrows, destroyNavArrows } from "../../buttons";
import { fadeOutOpacity, flickerOpacity } from "../../sprites";

import { textBubble, addToMessageLog } from "../../message";

import { setGameState, getGameState } from "../../state.js";

import { playBGM, stopBGM, playSFX } from "../../sounds";

import {
  addToInventory,
  checkInventoryForItem,
  removeFromInventory,
} from "../../inventory.js";

import { cellarKey, pryBarObj } from "../../items.js";

const roomName = "basementRoomOne";
const roomNavArrows = navArrows(roomName);

const introMessage = [
  ["when you woke up you found yourself in an strange room"],
  ["the door is locked and you are trapped in the room"],
  ["look around the room to see if you can find the key to open the door"],
];

export const createBasementRoomOne = () => {
  // ======================================================== //

  scene(roomName + "Up", () => {
    window.roomName = roomName;
    window.viewDirection = "Up";
    playBGM("ambience");
    onLoad(() => {
      add([sprite("basementRoomOneUp"), scale(1), area()]);
    });
    if (!getGameState(roomName, "introMessageRead")) {
      textBubble(introMessage, () => {
        setGameState(roomName, "introMessageRead", true);
        addToMessageLog(introMessage);
      });
    } else {
      roomNavArrows(window.viewDirection);
    }
  });

  // ======================================================== //

  scene(roomName + "Right", () => {
    window.roomName = roomName;
    window.viewDirection = "Right";
    playBGM("ambience");
    onLoad(() => {
      add([sprite("basementRoomOneRight"), scale(1), area()]);
      add([sprite("barrel3"), scale(4), pos(1150, 300), area(), "barrel3"]);

      if (!getGameState(roomName, "keyPickedUp")) {
        add([sprite("barrel1"), scale(4), pos(1150, 300), area(), "barrel1"]);
      }
    });
    onClick("barrel1", (barrel) => {
      //if (getGameState(roomName, "pryBarPickedUp")) {
      if (window.selectedItem == "pry bar") {
        (async () => {
          await fadeOutOpacity(barrel);
          textBubble([["a key was added to your inventory"]]);
          addToInventory(cellarKey);
          setGameState(roomName, "keyPickedUp", true);
        })();
      }
    });
    roomNavArrows(window.viewDirection);
  });

  // ======================================================== //

  scene(roomName + "Down", () => {
    window.roomName = roomName;
    window.viewDirection = "Down";
    playBGM("ambience");
    onLoad(() => {
      add([sprite("basementRoomOneDown"), scale(1), area()]);
      add([
        sprite("chained-skeleton"),
        pos(400, 150),
        scale(4),
        area(),
        "chained-skeleton",
      ]);
      if (getGameState(roomName, "skeleton1Clicked")) {
        let ghost1 = add([
          sprite("ghost1", { anim: "idle" }),
          opacity(0.6),
          pos(500, 150),
          scale(4),
          area(),
          "ghost1",
        ]);
        ghost1.play("idle", { loop: true, pingpong: true, speed: 4 });
        flickerOpacity(ghost1);
      }
      onClick("chained-skeleton", () => {
        if (!getGameState(roomName, "skeleton1Clicked")) {
          destroyNavArrows();
          setGameState(roomName, "skeleton1Clicked", true);
          const poof = add([
            sprite("poof"),
            opacity(0.6),
            pos(470, 180),
            scale(4),
          ]);
          poof.play("main", {
            speed: 4,
            onEnd: () => {
              poof.destroy();
              const beginMessage = [
                "Oh no. Not another one. I was trapped here just like you and never made it out.",
              ];
              textBubble([beginMessage]);
              let ghost1 = add([
                sprite("ghost1"),
                opacity(0.2),
                pos(500, 150),
                scale(4),
                area(),
                "ghost1",
              ]);

              ghost1.play("idle", { loop: true, pingpong: true, speed: 4 });
              flickerOpacity(ghost1);
            },
          });
        }
      });
    });

    onClick("ghost1", () => {
      const keyMessage = [
        "Oh good! You found a key. See if you can open that door.",
      ];
      const noKeyMessage = ["There must be a way to open that door"];
      let message = [];
      if (getGameState(roomName, "keyPickedUp")) {
        message = keyMessage;
        textBubble([message]);
      } else {
        message = noKeyMessage;
        textBubble([message]);
      }
    });
    roomNavArrows(window.viewDirection);
  });

  // ======================================================== //

  scene(roomName + "Left", () => {
    window.roomName = roomName;
    window.viewDirection = "Left";
    playBGM("ambience");
    //Sprite Loaders
    onLoad(() => {
      add([sprite("basementRoomOneLeft"), scale(1), area()]);
      add([sprite("door2"), pos(520, 50), scale(1.37), area(), "door"]);
    });

    if (!getGameState(roomName, "pryBarPickedUp")) {
      const pryBar = add([
        sprite("pryBar"),
        scale(4),
        pos(100, 400),
        area(),
        "pryBar",
      ]);
      onClick("pryBar", (pryBar) => {
        textBubble([["a Pry Bar was added to your inventory"]]);

        addToInventory(pryBarObj);
        setGameState(roomName, "pryBarPickedUp", true);
        pryBar.destroy();
      });
    }

    onClick("door", (door) => {
      if (getGameState(roomName, "doorUnlocked")) {
        go("basementHallwayDown");
      } else if (
        checkInventoryForItem(cellarKey) &&
        window.selectedItem == "cellar key"
      ) {
        setGameState(roomName, "doorUnlocked", true);
        removeFromInventory(cellarKey);
        textBubble([["The key unlocked the door!"]]);
      } else if (window.selectedItem == "pry bar") {
        textBubble([["It doesn't work"]]);
      } else {
        textBubble([["It doesn't open, it seems like it needs a key"]]);
      }
    });
    roomNavArrows(window.viewDirection);
  });

  // ======================================================== //
};
