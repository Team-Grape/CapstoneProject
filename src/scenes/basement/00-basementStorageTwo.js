import { navArrows, singleViewNavArrow } from "../../buttons";
import { textBubble, addToMessageLog } from "../../message";
import { setGameState, getGameState } from "../../state.js";
import { silverKey } from "../../items.js";
import { playSFX } from "../../sounds";

import {
  addToInventory,
  checkInventoryForItem,
  removeFromInventory,
} from "../../inventory.js";

const roomName = "basementStorageTwo";
const roomNavArrows = navArrows(roomName);

export const createBasementStorageTwo = async () => {
  scene(roomName + "Down", () => {
    window.roomName = roomName;
    window.viewDirection = "singleViewRoom";

    onLoad(() => {
      add([sprite("storage-room-two"), scale(1)]);
    });

    if (!getGameState(roomName, "silverKeyPickedUp")) {
      onLoad(() => {
        add([sprite("key-silver"), pos(200, 300), scale(.8), area(), "keySilver"]);
      });
    }

    onClick("keySilver", (keySilver) => {
      playSFX('keyNoise')
      textBubble([["A key was added to your inventory."]], () => {
        singleViewNavArrow("basementStorageTwoDown", "basementHallwayDown");
      });
      addToInventory(silverKey);
      setGameState(roomName, "silverKeyPickedUp", true);
  
      keySilver.destroy();
    });

    const monster = add([
      sprite("monster"),
      scale(1),
      pos(550, 130),
      area(),
      "monster",
    ]);

    onClick("monster", (monster) => {
      playSFX('cuteGhostSound')
      monster.play("move");
      textBubble([
        [`I dont't know where my face went. Please help me find it.`],
      ], () => {
        singleViewNavArrow("basementStorageTwoDown", "basementHallwayDown");
      });

    });

    singleViewNavArrow("basementStorageTwoDown", "basementHallwayDown");
  });
};
