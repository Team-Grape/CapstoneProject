import { addToInventory, checkInventoryForItem } from '../core.js'
import { cellarKey } from '../items.js'

const dialogs = [
  ["when you woke up you found yourself in an strange room"],
  ["the door is locked and you are trapped in the room"],
  ["look around the room to see if you can find the key to open the door"],
];

//Room One
// 1-1
export const basementFirstRoom = () => {
  scene('room-1-wall-1', () => {
  
    onLoad(() => {
      add([sprite('background-tile'), scale(1), area()]);
      add([sprite('door'), pos(900, 150), scale(4), area(), 'door']);
      add([sprite('turn-right-arrow'), pos(1200, 250), scale(.75), area(), 'turn-right-arrow']);
      add([sprite('turn-left-arrow'), pos(0, 250), scale(.75), area(), 'turn-left-arrow']);
    });
  
    //Door click handler
    onClick('door', (door) => {
  
      if (checkInventoryForItem(cellarKey)) {
        go("roomTwo");
      } else {
  
  // add text box that says'it doesn't open, it seems like it needs a key' or something
      } 
      localStorage.clear() 
      // we will need to change this to remove just the key
    });
    //Navigation click handlers (1-1)
  
    onClick("turn-right-arrow", () => {
      go("room-1-wall-2");
    });
    onClick("turn-left-arrow", () => {
      go("room-1-wall-4");
  
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
  scene('room-1-wall-2', () => {
    onLoad(() => {
      add([sprite('background-tile'), scale(1), area()]);
      add([sprite('turn-right-arrow'), pos(1200, 250), scale(.75), area(), 'turn-right-arrow']);
      add([sprite('turn-left-arrow'), pos(0, 250), scale(.75), area(), 'turn-left-arrow']);
      add([sprite('fruit-painting'), pos(500, 150), scale(1), area(), 'fruit-painting']);
    });
  
    //Navigation click handlers (1-2)
    onClick('turn-right-arrow', () => {
      go('room-1-wall-3');
    });
  
    onClick('turn-left-arrow', () => {
      go('room-1-wall-1');
    });
  });
  
  
  // 1-3
  scene('room-1-wall-3', () => {
    onLoad(() => {
      add([sprite('background-tile'), scale(1), area()]);
      add([sprite('small-window'), pos(900, 30), scale(4), area(), 'small-window']);
      add([sprite('small-window'), pos(300, 30), scale(4), area(), 'small-window']);
      add([sprite('turn-right-arrow'), pos(1200, 250), scale(.75), area(), 'turn-right-arrow']);
      add([sprite('turn-left-arrow'), pos(0, 250), scale(.75), area(), 'turn-left-arrow']);
      add([sprite('key'), pos(120, 400), scale(1), area(), 'key']);
      add([sprite('chained-skeleton'), pos(500, 150), scale(4), area(), 'chained-skeleton']);
    });
   
    //Key click handler
    onClick('key', (key) => {
      alert('a key was added to your inventory');
  
      addToInventory(cellarKey);
      key.destroy();
    });
  
    // Navigation click handlers (1-3)
    onClick('turn-right-arrow', () => {
      go('room-1-wall-4');
      
    });
    onClick("turn-left-arrow", () => {
      go("room-1-wall-2");
    });
  });
  
  
  // 1-4
  scene('room-1-wall-4', () => {
    //Sprite Loaders
    onLoad(() => {
      add([sprite('background-tile'), scale(1), area()]);
      add([sprite('turn-right-arrow'), pos(1200, 250), scale(.75), area(), 'turn-right-arrow']);
      add([sprite('turn-left-arrow'), pos(0, 250), scale(.75), area(), 'turn-left-arrow']);
      add([sprite('pile-of-bones'), pos(500, 350), scale(3), area(), 'pile-of-bones']);
    });
  
    //Navigation Click Handlers
    onClick('turn-right-arrow', () => {
      go('room-1-wall-1');
  
    });
    onClick("turn-left-arrow", () => {
      go("room-1-wall-3");
    });
  });

}
