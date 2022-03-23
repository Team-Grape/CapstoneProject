import {
  addToInventory,
  checkInventoryForItem,
  removeFromInventory,
  navArrows,
  setGameState,
  getGameState,
  textBubble,

} from "../core.js";
import { cellarKey } from "../items.js";
import getMusicManager from "../MusicManager.js";


const roomName = 'basementRoomTwo';
const roomNavArrows = navArrows(roomName);

const introMessage = [
  ['Now you are in the second room'],
  ['The challanges will increase  '],
  ["If you can't escape from the room, then stay here in my tummy forever~~~ "],
];

export const createBasementRoomTwo = () => {
  // ======================================================== //
  const bgMusic = getMusicManager();

  scene(roomName + 'Up', () => {
    const direction = 'Up';
    let fruitPaintingY;
    onLoad(() => {
      add([sprite("room-two-background"), scale(1), area()]);
      add([sprite("help-me"), pos(500, 100), scale(0.2), area()]);
      add([
        sprite("grandfather-clock"),
        pos(900, 100),
        scale(4),
        area(),
        "grandfather-clock",
      ]);
    });

    ///////////////////////////////////////////////////////////////////////////////////////////

    if (!getGameState(roomName, 'introMessageRead')) {
      textBubble(introMessage, () => {
        setGameState(roomName, 'introMessageRead', true);
        roomNavArrows(direction);
        addToMessageLog(introMessage);
      });
    } else {
      roomNavArrows(direction);
    }

    ///////////////////////////////////////////////////////////////////////////////////////////

    onLoad(() => {
      if (!getGameState(roomName, 'fruitPaintingMoved')) {
        fruitPaintingY = 100;
      } else {
        fruitPaintingY = 300;
      }
      add([
        sprite('fruit-painting'),
        pos(500, fruitPaintingY),
        scale(5),
        area(),
        'fruit-painting',
      ]);
    });
    onClick('grandfather-clock', () => {
      play('gong');
    });
    bgMusic.play("spooky");
    onClick("fruit-painting", (fruitPainting) => {
      setGameState(roomName, "fruitPaintingMoved", true);
      fruitPainting.pos.y = 350;
      play("falling");
      bgMusic.play("horror");
    });
    roomNavArrows(direction);
  });

  // ======================================================== //

  scene(roomName + 'Down', () => {
    const direction = 'Down';
    onLoad(() => {
      add([sprite('room-two-background'), scale(1), area()]);
      add([sprite('door'), pos(440, 150), scale(4), area(), 'door']);
    });
    onClick('door', () => {
      go('basementRoomOneUp');
    });
    roomNavArrows(direction);
  });

  // ======================================================== //

  scene(roomName + 'Left', () => {
    const direction = 'Left';
    let bookCaseX;
    onLoad(() => {
      add([sprite('room-two-background-left'), scale(1), area()]);
    });
    if (!getGameState(roomName, 'keyPickedUp')) {
      onLoad(() => {
        add([sprite('key'), pos(500, 300), scale(1), area(), 'key']);
      });
    }
    onLoad(() => {
      if (!getGameState(roomName, 'bookCaseMoved')) {
        bookCaseX = 400;
      } else {
        bookCaseX = 180;
      }
      add([
        sprite('bookcase'),
        pos(bookCaseX, 150),
        scale(4),
        area(),
        'bookcase',
      ]);
    });
    onClick('bookcase', (bookcase) => {
      setGameState(roomName, 'bookCaseMoved', true);
      bookcase.pos.x = 180;
      play("bookcaseMoving");
    });
    onClick('key', (key) => {
      textBubble([['a key was added to your inventory']]);
      addToInventory(cellarKey);
      setGameState(roomName, 'keyPickedUp', true);
      key.destroy();
    });
    roomNavArrows(direction);
  });

  // ======================================================== //

  scene(roomName + 'Right', () => {
    const direction = 'Right';
    onLoad(() => {
      add([sprite('room-two-background-right'), scale(1), area()]);
      add([
        sprite('woodenDoor'),
        pos(900, 100),
        scale(3),
        area(),
        'woodenDoor',
      ]);
      add([sprite("table"), pos(600, 240), scale(3), area()]);
      add([sprite("candle"), pos(600, 160), scale(3), area()]);
      add([sprite("cob-webs"), pos(640, 280), scale(2), area()]);
    });
    onClick("woodenDoor", (woodenDoor) => {
      bgMusic.play("kidMusic")
      if (
        getGameState(roomName, 'doorUnlocked') ||
        checkInventoryForItem(cellarKey)
      ) {
        setGameState(roomName, 'doorUnlocked', true);
        removeFromInventory(cellarKey);
        go("basementRoomThreeUp");
      } else {
        textBubble([["it doesn't open, it seems like it needs a key"]]);
      }
    });
    roomNavArrows(direction);
  });

  // ======================================================== //
};
