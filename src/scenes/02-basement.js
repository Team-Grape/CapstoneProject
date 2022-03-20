import { addToInventory, checkInventoryForItem } from "../core.js";
import { cellarKey } from "../items.js";

export const basementSecondRoom = () => {
  scene("roomTwo", () => {
    onLoad(() => {
      add([sprite("room-two-background"), scale(1), area()]);
      add([sprite("right-arrow"), pos(1175, 250), scale(1), area(), "right-arrow",]);
      add([sprite("left-arrow"), pos(25, 250), scale(1), area(), "left-arrow",]);
      add([sprite("down-arrow"), pos(width() / 2, 480), scale(1), area(), "down-arrow",]);
      add([sprite("fruit-painting"), pos(500, 100), scale(4), area(), "fruit-painting",]);
    });
    onClick("down-arrow", () => {
      go("roomTwoDown");
    });
    onClick("left-arrow", () => {
      go("roomTwoLeft");
    });
    onClick("right-arrow", () => {
      go("roomTwoRight");
    });
  });

  scene("roomTwoDown", () => {
    onLoad(() => {
      add([sprite("room-two-background"), scale(1), area()]);
      add([sprite("up-arrow"), pos(width() / 2, 25), scale(1), area(), "up-arrow"]);
    });
    onClick("up-arrow", () => {
      go("roomTwo");
    });
  });

  scene("roomTwoLeft", () => {
    onLoad(() => {
      add([sprite("room-two-background-left"), scale(1), area()]);
      add([sprite("key"), pos(500, 300), scale(1), area(), "key"]);
      add([sprite("bookcase"), pos(400, 150), scale(4), area(), "bookcase"]);
      add([sprite("door"), pos(900, 150), scale(4), area(), "door"]);
      add([sprite("right-arrow"), pos(1175, 250), scale(1), area(), "right-arrow",]);
    });
    onClick("bookcase", (bookcase) => {
      bookcase.pos.x = 180;
    });
    onClick("key", (key) => {
      alert("a key was added to your inventory");
      addToInventory(cellarKey);
      key.destroy();
    });
    onClick("door", () => {
      go("room-1-wall-1")
    })
    onClick("right-arrow", () => {
      go("roomTwo");
    });
  });

  scene("roomTwoRight", () => {
    onLoad(() => {
      add([sprite("room-two-background-right"), scale(1), area()]);
      add([sprite("left-arrow"), pos(25, 250), scale(1), area(), "left-arrow"]);
      add([sprite("woodenDoor"), pos(900, 100), scale(0.75), area(), "woodenDoor"]);
      add([sprite("dresser-with-candle"), pos(400, 130), scale(0.60), area() ])
    });
    onClick("woodenDoor", (woodenDoor) => {
      if (checkInventoryForItem(cellarKey)) {
        go("roomThree");
      } else {
        /* add text box that says:
        'it doesn't open, it seems like it needs a key'
         or something like that
        */
      }
      localStorage.clear(); // we will need to change this to remove just the key
    });
    onClick("left-arrow", () => {
      go("roomTwo");
    });
  });
};
