import { addToInventory, checkInventoryForItem } from '../core.js'
import { cellarKey } from '../items.js'

export const basementSecondRoom = () => {
  scene("roomTwo", () => {
  
    onLoad(() => {
      add([sprite("room-two-background"), scale(1), area()]);
    });
    onLoad(() => {
      add([
        sprite("right-arrow"),
        pos(1175, 250),
        scale(0.5),
        area(),
        "right-arrow",
      ]);
    });
    onLoad(() => {
      add([sprite("left-arrow"), pos(25, 250), scale(0.5), area(), "left-arrow"]);
    });
    onLoad(() => {
      add([
        sprite("down-arrow"),
        pos(width() / 2, 480),
        scale(0.5),
        area(),
        "down-arrow",
      ]);
    });
    onLoad(() => {
      add([
        sprite("fruit-painting"),
        pos(500, 100),
        scale(4),
        area(),
        "fruit-painting",
      ]);
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
    });
    onLoad(() => {
      add([
        sprite("up-arrow"),
        pos(width() / 2, 25),
        scale(0.5),
        area(),
        "up-arrow",
      ]);
    });
  
    onClick("up-arrow", () => {
      go("roomTwo");
    });
  });
  
  scene("roomTwoLeft", () => {
    onLoad(() => {
      add([sprite("room-two-background-left"), scale(1), area()]);
    });
    onLoad(() => {
      add([sprite("door"), pos(900, 150), scale(4), area(), "door"]);
    });
    onLoad(() => {
      add([sprite("key"), pos(500, 300), scale(1), area(), "key"]);
    });
    onLoad(() => {
      add([sprite("bookcase"), pos(400, 150), scale(4), area(), "bookcase"]);
    });
    onLoad(() => {
      add([
        sprite("right-arrow"),
        pos(1175, 250),
        scale(0.5),
        area(),
        "right-arrow",
      ]);
    });
    onClick("bookcase", (bookcase) => {
      bookcase.pos.x = 180
    });
    onClick("key", (key) => {
      alert("a key was added to your inventory");
      addToInventory(cellarKey);
      key.destroy();
    });
    onClick("right-arrow", () => {
      go("roomTwo");
    });
  });
  
  scene("roomTwoRight", () => {
    onLoad(() => {
      add([sprite("room-two-background-right"), scale(1), area()]);
    });
    onLoad(() => {
      add([sprite("left-arrow"), pos(25, 250), scale(0.5), area(), "left-arrow"]);
    });
    onClick("left-arrow", () => {
      go("roomTwo");
    });
  });
}
