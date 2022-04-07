import {
  addToInventory,
  checkInventoryForItem,
  removeFromInventory,
} from "../../inventory";

import { rustyKey } from "../../items";

import { navArrows, singleViewNavArrow } from "../../buttons";
import { textBubble, addToMessageLog } from "../../message";
import { playBGM, stopBGM, playSFX } from "../../sounds";
import { setGameState, getGameState } from "../../state.js";

const roomName = "basementStorageOne";
const roomNavArrows = navArrows(roomName);

export const createBasementStorageOne = async () => {

  scene(roomName + "Down", () => {
    window.roomName = roomName;
    window.viewDirection = "singleViewRoom";

    onLoad(() => {
      add([sprite("storage-room-one"), scale(1)]);
    });

    if (!getGameState(roomName, "rustyKeyPickedUp")) {
      onLoad(() => {
        add([sprite('key-rusty'), pos(1200, 340), scale(.8), area(), "SCENE", 'rustyKey'])
      })
    }

    onClick('rustyKey', (rustyKey1) => {
      playSFX('keyNoise')
      textBubble([["A rusty key was added to your inventory."]], () => {
        singleViewNavArrow("basementStorageOneDown", "basementHallwayDown");
      })
      addToInventory(rustyKey);
      setGameState(roomName, "rustyKeyPickedUp", true);
      rustyKey1.destroy()
    })

    const cuteGhost = add([
      sprite("cuteGhost"),
      scale(5),
      pos(400, 280),
      area(), "SCENE",
      "cuteGhost",
    ]);

    onClick("cuteGhost", (cuteGhost) => {
      playSFX('cuteGhostSound')
      cuteGhost.play("move", { loop: true });
      setGameState(roomName, "ghostMoved", true);
      textBubble(
        [
          [
            "What are you doing hanging around this closet? Hurry and get out of here before the evil Ghost finds you.",
          ],
        ],
        () => {
          singleViewNavArrow("basementStorageOneDown", "basementHallwayDown");
        }
      );
    });

    if (getGameState(roomName, "ghostMoved")) {
      cuteGhost.play("move", { loop: true });
    }
    singleViewNavArrow("basementStorageOneDown", "basementHallwayDown");
  });
};
