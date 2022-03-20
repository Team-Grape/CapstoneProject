import {
  addToInventory,
  checkInventoryForItem,
  removeFromInventory,
  navArrows, 
  setGameState,
  getGameState,
  textBubble
} from "../core.js";
import { cellarKey } from "../items.js";

const roomName = "basementRoomOne"
const roomNavArrows = navArrows(roomName);

const introMessage = [
  ["when you woke up you found yourself in an strange room"],
  ["the door is locked and you are trapped in the room"],
  ["look around the room to see if you can find the key to open the door"],
];

export const createBasementRoomOne = () => {

  // ======================================================== //
  
  scene(roomName + "Up", () => {
  //scene("room-1-wall-1", () => {
    const direction = "Up"
    onLoad(() => {
      add([sprite("background-tile"), scale(1), area()]);
      add([sprite("door"), pos(900, 150), scale(4), area(), "door"]);
    });

    //Door click handler
    onClick("door", (door) => {
      if ((getGameState(roomName, "doorUnlocked")) || (checkInventoryForItem(cellarKey))) {
        setGameState(roomName, 'doorUnlocked', true)
        removeFromInventory(cellarKey)
        go("basementRoomTwoUp");
      } else {
        textBubble([["it doesn't open, it seems like it needs a key"]])
      }
    });

    if (!getGameState(roomName, 'introMessageRead')) {
      textBubble(introMessage, () => {
        setGameState(roomName, 'introMessageRead', true)
        roomNavArrows(direction)
      });
    } else {
      roomNavArrows(direction)
    }
  });

  // ======================================================== //

  scene(roomName + "Right", () => {
    const direction = "Right"

    onLoad(() => {
      add([sprite("background-tile"), scale(1), area()]);
      add([
        sprite("fruit-painting"),
        pos(500, 150),
        scale(4),
        area(),
        "fruit-painting",
      ]);
    });

    roomNavArrows(direction)

  });

  // ======================================================== //

  scene(roomName + "Down", () => {
    const direction = "Down"

    onLoad(() => {
      add([sprite("background-tile"), scale(1), area()]);
      add([
        sprite("basement-window"),
        pos(1000, 30),
        scale(4),
        area(),
        "basement-window",
      ]);

      add([
        sprite("basement-window"),
        pos(200, 30),
        scale(4),
        area(),
        "basement-window",
      ]);

      add([
        sprite("chained-skeleton"),
        pos(500, 150),
        scale(4),
        area(),
        "chained-skeleton",
      ]);
    });

    //Key click handler
    if (!getGameState(roomName, 'keyPickedUp')) {
      add([sprite("key"), pos(120, 400), scale(1), area(), "key"]);
      onClick("key", (key) => {
        textBubble([["a key was added to your inventory"]])

        addToInventory(cellarKey);
        setGameState(roomName, 'keyPickedUp', true)
        key.destroy();
      });
    };

    roomNavArrows(direction)

  });

  // ======================================================== //

  scene(roomName + "Left", () => {
    const direction = "Left"

    //Sprite Loaders
    onLoad(() => {
      add([sprite("background-tile"), scale(1), area()]);
      add([
        sprite("pile-of-bones"),
        pos(500, 350),
        scale(3),
        area(),
        "pile-of-bones",
      ]);
    });

    roomNavArrows(direction)

  });

  // ======================================================== //

};
