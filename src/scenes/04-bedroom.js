import {
  addToInventory,
  checkInventoryForItem,
  removeFromInventory,
} from '../inventory';

import { setGameState, getGameState } from '../state';
import { textBubble, addToMessageLog } from '../message';
import { playBGM, stopBGM } from '../sounds';
import { navArrows } from '../buttons';

const roomName = 'bedroom';
const roomNavArrows = navArrows(roomName);

export const createBedroom = () => {
  // ======================================================== //
  scene(roomName + 'Up', () => {
    window.roomName = roomName;
    window.viewDirection = 'Up';
    onLoad(() => {
      add([sprite('bedroom-one-up'), scale(1)]);
    });
    roomNavArrows(viewDirection);
  });
  // ======================================================== //
  scene(roomName + 'Right', () => {
    window.roomName = roomName;
    window.viewDirection = 'Right';
    onLoad(() => {
      add([sprite('bedroom-one-right'), scale(1)]);
    });
    roomNavArrows(viewDirection);
  });
  // ======================================================== //
  scene(roomName + 'Down', () => {
    window.roomName = roomName;
    window.viewDirection = 'Down';
    onLoad(() => {
      add([sprite('bedroom-one-down'), scale(1)]);
    });
    roomNavArrows(viewDirection);
  });
  // ======================================================== //
  scene(roomName + 'Left', () => {
    window.roomName = roomName;
    window.viewDirection = 'Left';
    onLoad(() => {
      add([sprite('bedroom-one-left'), scale(1)]);
    });
    roomNavArrows(viewDirection);
  });
  // ======================================================== //
};
