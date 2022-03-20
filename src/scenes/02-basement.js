import { 
  addToInventory, 
  checkInventoryForItem,
  removeFromInventory,
  navArrows,
  setGameState,
  getGameState,
  textBubble,
} from '../core.js'
import { cellarKey } from '../items.js'

const roomName = "basementRoomTwo"
const roomNavArrows = navArrows(roomName);


export const createBasementRoomTwo = () => {

  // ======================================================== //

  scene(roomName + "Up", () => {
    const direction = "Up"
    onLoad(() => {
      add([sprite("room-two-background"), scale(1), area()]);
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
  roomNavArrows(direction)
  });
  
  // ======================================================== //

  scene(roomName + "Down", () => {
    const direction = "Down"
    onLoad(() => {
      add([sprite("room-two-background"), scale(1), area()]);
    });
    roomNavArrows(direction)
  });
  
  // ======================================================== //

  scene(roomName + "Left", () => {
    const direction = "Left"
    let bookCaseX;
    onLoad(() => {
      add([sprite("room-two-background-left"), scale(1), area()]);
    });
    onLoad(() => {
      add([sprite("door"), pos(900, 150), scale(4), area(), "door"]);
    });
    if (!getGameState(roomName, 'keyPickedUp')) {
      onLoad(() => {
        add([sprite("key"), pos(500, 300), scale(1), area(), "key"]);
      });
    }
    onLoad(() => {
      if (!getGameState(roomName, 'bookCaseMoved')) {
        bookCaseX = 400;
      } else {
        bookCaseX = 180
      }
      add([sprite("bookcase"), pos(bookCaseX, 150), scale(4), area(), "bookcase"]);
    });
    onClick("bookcase", (bookcase) => {
      setGameState(roomName, 'bookCaseMoved', true)
      bookcase.pos.x = 180
        onClick("key", (key) => {
          textBubble([["a key was added to your inventory"]])
          addToInventory(cellarKey);
          setGameState(roomName, 'keyPickedUp', true)
          key.destroy();
        });
    });
    roomNavArrows(direction)
  });

  // ======================================================== //
  
  scene(roomName + "Right", () => {
    const direction = "Right"
    onLoad(() => {
      add([sprite("room-two-background-right"), scale(1), area()]);
    });
    roomNavArrows(direction)
  });

  // ======================================================== //

}
