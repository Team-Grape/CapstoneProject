import {
  addToInventory,
  checkInventoryForItem,
  removeFromInventory,
} from '../../inventory';

import { cellarKey, meat } from '../../items.js';

import { setGameState, getGameState } from '../../state';

import { textBubble, addToMessageLog } from '../../message';

import { playBGM, stopBGM } from '../../sounds';
import { navArrows } from '../../buttons';

const roomName = 'kitchen';
const roomNavArrows = navArrows(roomName);

export const createKitchen = () => {
  // ======================================================== //
  scene(roomName + 'Up', () => {
    window.roomName = roomName;
    window.viewDirection = 'Up';
    onLoad(() => {
      add([sprite('kitchen-up'), scale(1)]);
      add([sprite('egg-box'), scale(2.5), pos(950, 380)]);
      add([sprite('potatoes'), scale(2.5), pos(100, 400)]);
    });
    roomNavArrows(viewDirection);
  });
  // ======================================================== //
  scene(roomName + 'Right', () => {
    window.roomName = roomName;
    window.viewDirection = 'Right';
    onLoad(() => {
      add([sprite('room-three-background-side'), scale(1), area()]);
      add([sprite('dinning-table'), scale(4), pos(600, 290)]);
      add([sprite('basement-window'), scale(6), pos(1000, 120)]);
      add([
        sprite('milk-bottle'),
        scale(2),
        pos(750, 280),
        area(),
        'milkBottle',
      ]);
      add([sprite('apples'), scale(2.5), pos(800, 320)]);
      add([sprite('sausage'), scale(2.5), pos(100, 330)]);
      add([sprite('bread'), scale(2.5), pos(200, 320)]);

      if (!getGameState(roomName, 'meatPickedUp')) {
        onLoad(() => {
          add([sprite('meat'), scale(2.5), pos(150, 400), area(), 'meat']);
        });
      }
    });

    onClick('milkBottle', (milkBottle) => {
      textBubble([["It was expired, you probably don'n want to take it."]]);
    });

    onClick('meat', (meat1) => {
      textBubble([['the meat was added to your inventory']]);
      addToInventory(meat);
      setGameState(roomName, 'meatPickedUp', true);
      meat1.destroy();
    });

    roomNavArrows(viewDirection);
  });
  // ======================================================== //
  scene(roomName + 'Down', () => {
    window.roomName = roomName;
    window.viewDirection = 'Down';
    onLoad(() => {
      add([sprite('room-three-background-side'), scale(1), area()]);
      add([sprite('board'), pos(330, 150), scale(3.5)]);
      add([sprite('board'), pos(420, 210), scale(3.5)]);
      add([sprite('spatula-on-wall'), pos(30, 150), scale(4)]);
      add([sprite('cup-board'), pos(540, 140), scale(3.5)]);
      add([sprite('dish-board'), pos(720, 170), scale(3.5)]);
      add([
        sprite('woodenDoor'),
        pos(950, 57),
        scale(3.7),
        area(),
        'woodenDoor',
      ]);

      if (!getGameState(roomName, 'keyPickedUp')) {
        onLoad(() => {
          add([sprite('key'), pos(400, 117), scale(0.8), area(), 'key']);
        });
      }

      // first board
      if (getGameState(roomName, 'Can1Fell')) {
        add([sprite('soft-drink-blue'), pos(345, 340), rotate(100)]);
      } else {
        add([
          sprite('soft-drink-blue'),
          pos(332, 117),
          scale(1.2),
          area(),
          'SFblue',
        ]);
      }

      if (getGameState(roomName, 'Can2Fell')) {
        add([sprite('soft-drink-green'), pos(365, 375), rotate(120)]);
      } else {
        add([
          sprite('soft-drink-green'),
          pos(354, 117),
          scale(1.2),
          area(),
          'SFgreen',
        ]);
      }

      if (getGameState(roomName, 'Can3Fell')) {
        add([sprite('soft-drink-red'), pos(395, 355), rotate(170)]);
      } else {
        add([
          sprite('soft-drink-red'),
          pos(376, 117),
          scale(1.2),
          area(),
          'SFred',
        ]);
      }

      if (getGameState(roomName, 'Can4Fell')) {
        add([sprite('soft-drink-yellow'), pos(415, 405), rotate(120)]);
      } else {
        add([
          sprite('soft-drink-yellow'),
          pos(398, 117),
          scale(1.2),
          area(),
          'SFyellow',
        ]);
      }

      // second board
      add([sprite('water'), pos(452, 177), scale(1.2)]);
      add([sprite('orange-juice'), pos(482, 177), scale(1.2)]);

      if (!getGameState(roomName, 'fridgeIsClosed')) {
        add([
          sprite('fridge-close'),
          scale(7.5),
          pos(150, 160),
          area(),
          'fridgeClose',
        ]);
      } else {
        add([
          sprite('fridge-open'),
          scale(7.5),
          pos(150, 160),
          area(),
          'fridgeOpen',
        ]);
      }

      if (!getGameState(roomName, 'kitchenCarbinetIsClosed')) {
        add([
          sprite('kitchen-carbinet-closed'),
          pos(600, 280),
          scale(7),
          area(),
          'kitchenCarbinetClosed',
        ]);
      } else {
        add([
          sprite('kitchen-carbinet-opened'),
          scale(7),
          pos(593, 280),
          area(),
          'kitchenCarbinetOpened',
        ]);
      }
    });

    onClick('woodenDoor', (woodenDoor) => {
      playBGM('kidMusic');
      if (
        getGameState(roomName, 'doorUnlocked') ||
        checkInventoryForItem(cellarKey)
      ) {
        setGameState(roomName, 'doorUnlocked', true);
        removeFromInventory(cellarKey);
        go('basementRoomThreeUp');
      } else {
        textBubble([["it doesn't open, it seems like it needs a key"]]);
      }
    });

    onClick('key', (key) => {
      textBubble([['a key was added to your inventory']]);
      addToInventory(cellarKey);
      setGameState(roomName, 'keyPickedUp', true);
      key.destroy();
    });

    onClick('SFblue', (SFblue) => {
      setGameState(roomName, 'Can1Fell', true);
      SFblue.destroy();
      const SFblueFall = add([
        sprite('soft-drink-blue'),
        pos(345, 340),
        rotate(100),
      ]);
    });

    onClick('SFgreen', (SFgreen) => {
      setGameState(roomName, 'Can2Fell', true);
      SFgreen.destroy();
      const SFgreenFall = add([
        sprite('soft-drink-green'),
        pos(365, 375),
        rotate(120),
      ]);
    });

    onClick('SFred', (SFred) => {
      setGameState(roomName, 'Can3Fell', true);
      SFred.destroy();
      const SFredFall = add([
        sprite('soft-drink-red'),
        pos(395, 355),
        rotate(170),
      ]);
    });

    onClick('SFyellow', (SFyellow) => {
      setGameState(roomName, 'Can4Fell', true);
      SFyellow.destroy();
      const SFyellowFall = add([
        sprite('soft-drink-yellow'),
        pos(415, 405),
        rotate(120),
      ]);
    });

    onClick('fridgeClose', (fridgeClose) => {
      setGameState(roomName, 'fridgeIsClosed', true);
      fridgeClose.destroy();
      const fridgeOpen = add([
        sprite('fridge-open'),
        scale(7.5),
        pos(150, 160),
        area(),
        'fridgeOpen',
      ]);
    });

    onClick('fridgeOpen', (fridgeOpen) => {
      setGameState(roomName, 'fridgeIsClosed', false);
      fridgeOpen.destroy();
      const fridgeClose = add([
        sprite('fridge-close'),
        scale(7.5),
        pos(150, 160),
        area(),
        'fridgeClose',
      ]);
    });

    onClick('kitchenCarbinetClosed', (kitchenCarbinetClosed) => {
      setGameState(roomName, 'kitchenCarbinetIsClosed', true);
      kitchenCarbinetClosed.destroy();
      const kitchenCarbinetOpened = add([
        sprite('kitchen-carbinet-opened'),
        scale(7),
        pos(593, 280),
        area(),
        'kitchenCarbinetOpened',
      ]);
      const potatochipGreen = add([
        sprite('potatochip-green'),
        scale(0.9),
        pos(663, 329),
        rotate(70),
      ]);
    });

    onClick('kitchenCarbinetOpened', (kitchenCarbinetOpened) => {
      setGameState(roomName, 'kitchenCarbinetIsClosed', false);
      kitchenCarbinetOpened.destroy();
      const kitchenCarbinetClosed = add([
        sprite('kitchen-carbinet-closed'),
        scale(7),
        pos(600, 280),
        area(),
        'kitchenCarbinetClosed',
      ]);
    });
    roomNavArrows(viewDirection);
  });
  // ======================================================== //
  scene(roomName + 'Left', () => {
    window.roomName = roomName;
    window.viewDirection = 'Left';
    onLoad(() => {
      add([sprite('kitchen-left'), scale(1)]);
    });
    roomNavArrows(viewDirection);
  });
  // ======================================================== //
};