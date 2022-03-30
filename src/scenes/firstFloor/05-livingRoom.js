import {
  addToInventory,
  checkInventoryForItem,
  removeFromInventory,
} from '../../inventory';

import { hammerObj } from '../../items.js';

import { setGameState, getGameState } from '../../state';

import { textBubble, addToMessageLog } from '../../message';

import { playBGM, stopBGM } from '../../sounds';
import { navArrows } from '../../buttons';

const roomName = 'livingRoom';
const roomNavArrows = navArrows(roomName);

export const createLivingRoom = () => {
  // ======================================================== //
  scene(roomName + 'Up', () => {
    window.roomName = roomName;
    window.viewDirection = 'Up';
    onLoad(() => {
      add([sprite('living-room-up'), scale(1)]);
      add([sprite('notebook'), scale(3.5), pos(600, 340), rotate(60)]);
      add([sprite('purpleBTN'), scale(0.08), pos(600, 350), rotate(60)]);
      add([sprite('purpleBTN'), scale(0.08), pos(580, 360), rotate(60)]);
    });

    if (!getGameState(roomName, 'hammerPickedUp')) {
      const hammer = add([
        sprite('hammer'),
        scale(2.7),
        pos(350, 420),
        area(),
        'hammer',
      ]);
      onClick('hammer', (hammer) => {
        textBubble([['a hammer was added to your inventory.']]);

        addToInventory(hammerObj);
        setGameState(roomName, 'hammerPickedUp', true);
        hammer.destroy();
      });
    }

    roomNavArrows(viewDirection);
  });
  // ======================================================== //
  scene(roomName + 'Right', () => {
    window.roomName = roomName;
    window.viewDirection = 'Right';
    onLoad(() => {
      add([sprite('living-room-right'), scale(1), area()]);
      add([sprite('window'), scale(1), area(), pos(100, 90)]);
      add([sprite('blueBTN'), scale(0.1), pos(150, 170)]);
      add([sprite('blueBTN'), scale(0.1), pos(170, 190)]);
      add([sprite('blueBTN'), scale(0.1), pos(180, 160)]);
      add([sprite('window'), scale(1), area(), pos(1000, 90)]);
      add([sprite('blueBTN'), scale(0.1), pos(1060, 160)]);
      add([sprite('blueBTN'), scale(0.1), pos(1040, 195)]);
      add([sprite('blueBTN'), scale(0.1), pos(1070, 180)]);
      add([sprite('blueBTN'), scale(0.1), pos(1080, 210)]);
      add([
        sprite('white-curtains-closed'),
        scale(1),
        pos(60, 80),
        area(),
        'leftWhiteCurtains',
      ]);
      add([
        sprite('white-curtains-closed'),
        scale(1),
        pos(970, 80),
        area(),
        'rightWhiteCurtains',
      ]);
    });

    onClick('leftWhiteCurtains', (leftWhiteCurtains) => {
      leftWhiteCurtains.destroy();
      const whiteCurtainsOpen = add([
        sprite('white-curtains-open'),
        scale(1),
        pos(60, 80),
      ]);
    });

    onClick('rightWhiteCurtains', (rightWhiteCurtains) => {
      rightWhiteCurtains.destroy();
      const whiteCurtainsOpen = add([
        sprite('white-curtains-open'),
        scale(1),
        pos(970, 80),
      ]);
    });
    roomNavArrows(viewDirection);
  });
  // ======================================================== //
  scene(roomName + 'Down', () => {
    window.roomName = roomName;
    window.viewDirection = 'Down';
    onLoad(() => {
      add([sprite('living-room-down'), scale(1), area()]);
      add([sprite('orange-passcode-button'), scale(0.17), pos(640, 160)]);
      add([sprite('blueBTN'), scale(0.06), pos(642, 140)]);
      add([sprite('redBTN'), scale(0.06), pos(662, 140)]);
      add([sprite('greenBTN'), scale(0.06), pos(682, 140)]);
      add([sprite('purpleBTN'), scale(0.06), pos(702, 140)]);
      add([
        sprite('lamp-turned-off'),
        scale(5),
        pos(200, 130),
        area(),
        'lampTurnedOff',
      ]);

      add([
        sprite('woodenDoor'),
        scale(3),
        pos(510, 110),
        area(),
        'woodenDoor',
      ]);
    });

    onClick('lampTurnedOff', (lampTurnedOff) => {
      lampTurnedOff.destroy();
      const lampTurnedOn = add([
        sprite('lamp-turned-on'),
        scale(5),
        pos(200, 130),
      ]);
      const greenBTN = add([sprite('greenBTN'), scale(0.1), pos(230, 180)]);
    });

    onClick('woodenDoor', () => {
      textBubble([['Please enter the passcode to exit.']]);
      const input = add([
        pos(650, 160),
        text('', {
          font: 'apl386',
          size: 20,
          width: 200,
        }),
      ]);
      onCharInput((ch) => {
        input.text += ch;
      });
      onKeyPressRepeat('backspace', () => {
        input.text = input.text.substring(0, input.text.length - 1);
      });
      onKeyPressRepeat('enter', () => {
        if (input.text === '7312') {
          textBubble([['Passcode is correct, enter the next room.']]);
          // go('bedroomUp');
        } else {
          input.text = '';
          textBubble([['Passcode is incorrect, try again.']]);
        }
      });
    });
    roomNavArrows(viewDirection);
  });
  // ======================================================== //
  scene(roomName + 'Left', () => {
    window.roomName = roomName;
    window.viewDirection = 'Left';
    onLoad(() => {
      add([sprite('living-room-left'), scale(1), area()]);
      add([sprite('painting5'), scale(4), area(), pos(180, 80)]);
      add([sprite('redBTN'), scale(0.1), pos(980, 90)]);
      add([sprite('redBTN'), scale(0.1), pos(1020, 90)]);
      add([sprite('redBTN'), scale(0.1), pos(980, 120)]);
      add([sprite('painting10'), scale(4), area(), pos(980, 80), 'painting10']);
    });
    onClick('painting10', (painting10) => {
      setGameState(roomName, 'paintingMoved', true);
      painting10.pos.y = 220;
    });
    roomNavArrows(viewDirection);
  });
  // ======================================================== //
};
