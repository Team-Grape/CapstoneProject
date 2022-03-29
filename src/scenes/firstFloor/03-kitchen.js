import {
  addToInventory,
  checkInventoryForItem,
  removeFromInventory,
} from '../../inventory';

// import { ragObj } from '../../items.js';

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
    });

    // if (!getGameState(roomName, 'ragPickedUp')) {
    //   const rag = add([sprite('rag'), scale(1), pos(900, 380), area(), 'rag']);
    //   onClick('rag', (rag) => {
    //     textBubble([['an old rag was added to your inventory']]);

    //     addToInventory(ragObj);
    //     setGameState(roomName, 'ragPickedUp', true);
    //     rag.destroy();
    //   });
    // }

    roomNavArrows(viewDirection);
  });
  // ======================================================== //
  scene(roomName + 'Right', () => {
    window.roomName = roomName;
    window.viewDirection = 'Right';
    onLoad(() => {
      add([sprite('room-three-background-side'), scale(1), area()]);
    });
    roomNavArrows(viewDirection);
  });
  // ======================================================== //
  scene(roomName + 'Down', () => {
    window.roomName = roomName;
    window.viewDirection = 'Down';
    onLoad(() => {
      add([sprite('room-three-background-side'), scale(1), area()]);
      add([sprite('board'), pos(250, 100), scale(1)]);
      add([
        sprite('fridge-close'),
        scale(7),
        pos(160, 170),
        area(),
        'fridgeClose',
      ]);
    });
    onClick('fridgeClose', (fridgeClose) => {
      fridgeClose.destroy();
      const fridgeOpen = add([
        sprite('fridge-open'),
        scale(7),
        pos(160, 170),
        area(),
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
