import { addToInventory, checkInventoryForItem, displayNavigationArrows } from "../core.js";
import { cellarKey } from "../items.js";

const dialogs = [
  ["when you woke up you found yourself in an strange room"],
  ["the door is locked and you are trapped in the room"],
  ["look around the room to see if you can find the key to open the door"],
];

//Room One
// 1-1
export const basementFirstRoom = () => {
  scene("room-1-wall-1", () => {
    onLoad(() => {
      add([sprite("background-tile"), scale(1), area()]);
      add([sprite("door"), pos(900, 150), scale(4), area(), "door"]);
    });

    //Door click handler
    onClick("door", (door) => {
      if (checkInventoryForItem(cellarKey)) {
        go("roomTwo");
      } else {
        // add text box that says'it doesn't open, it seems like it needs a key' or something
      }
      localStorage.clear();
      // we will need to change this to remove just the key
    });

    //Navigation click handlers (1-1)
    onClick("right-arrow", () => {
      go("room-1-wall-2");
    });
    onClick("left-arrow", () => {
      go("room-1-wall-4");
    });
    onClick("down-arrow", () => {
      go("room-1-wall-3");
    });

    // Current dialog
    let curDialog = 0;

    // Text bubble
    const textbox = add([
      rect(width() - 200, 120, { radius: 32 }),
      origin("center"),
      pos(center().x, height() - 100),
      outline(2),
    ]);

    // Text
    const txt = add([
      text("", { size: 32, width: width() - 230 }),
      pos(textbox.pos),
      origin("center"),
    ]);

    // NextButton
    const nextButton = add([
      text("Next", { size: 20 }),
      pos(1050, 475),
      area(),
    ]);

    nextButton.onClick(() => {
      if (curDialog === dialogs.length - 1) {
        textbox.destroy();
        txt.destroy();
        nextButton.destroy();
        displayNavigationArrows()
        curDialog = 0
        return;
      }
      curDialog = curDialog + 1;
      updateDialog();
    });

    // Update the on screen sprite & text
    function updateDialog() {
      const [dialog] = dialogs[curDialog];
      txt.text = dialog;
    }

    updateDialog();
  });

  // 1-2
  scene("room-1-wall-2", () => {
    onLoad(() => {
      add([sprite("background-tile"), scale(1), area()]);
      add([
        sprite("left-arrow"),
        pos(7.5, 250),
        scale(0.5),
        area(),
        "left-arrow",
      ]);
      add([
        sprite("fruit-painting"),
        pos(500, 150),
        scale(1),
        area(),
        "fruit-painting",
      ]);
    });

    //Navigation click handlers (1-2)
    onClick("left-arrow", () => {
      go("room-1-wall-1");
    });
  });

  // 1-3
  scene("room-1-wall-3", () => {
    onLoad(() => {
      add([sprite("background-tile"), scale(1), area()]);
      add([
        sprite("small-window"),
        pos(900, 30),
        scale(4),
        area(),
        "small-window",
      ]);
      add([
        sprite("small-window"),
        pos(300, 30),
        scale(4),
        area(),
        "small-window",
      ]);
      add([sprite("key"), pos(120, 400), scale(1), area(), "key"]);
      add([
        sprite("chained-skeleton"),
        pos(500, 150),
        scale(4),
        area(),
        "chained-skeleton",
      ]);
      add([
        sprite("up-arrow"),
        pos(600, 15),
        scale(0.5),
        area(),
        "up-arrow",
      ]);
    });

    //Key click handler
    onClick("key", (key) => {
      alert("a key was added to your inventory");

      addToInventory(cellarKey);
      key.destroy();
    });

    // Navigation click handlers (1-3)
    onClick("up-arrow", () => {
      console.log('clicked')
      go("room-1-wall-1");
    });
  });


  // 1-4
  scene("room-1-wall-4", () => {
    //Sprite Loaders
    onLoad(() => {
      add([sprite("background-tile"), scale(1), area()]);
      add([
        sprite("right-arrow"),
        pos(1190, 250),
        scale(0.5),
        area(),
        "right-arrow",
      ]);
      add([
        sprite("pile-of-bones"),
        pos(500, 350),
        scale(3),
        area(),
        "pile-of-bones",
      ]);
    });

    //Navigation Click Handlers
    onClick("right-arrow", () => {
      go("room-1-wall-1");
    });
  });
};
