import {
  addToInventory,
  checkInventoryForItem,
  removeFromInventory,
} from '../../inventory';

import { hammerObj, silverKey } from '../../items.js';

import { setGameState, getGameState } from '../../state';

import { textBubble, addToMessageLog } from '../../message';

import { playBGM, stopBGM, playSFX } from '../../sounds';
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
        playSFX('keyNoise')
        textBubble([['A hammer was added to your inventory.']]);

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
    });

    if (!getGameState(roomName, 'RightWhiteCurtainsIsOpen')) {
      add([
        sprite('white-curtains-closed'),
        scale(1),
        pos(970, 80),
        area(),
        'rightWhiteCurtains',
      ]);
    } else {
      add([
        sprite('white-curtains-open'),
        scale(1),
        pos(970, 80),
        area(),
        'RightWhiteCurtainsOpen',
      ]);
    }

    if (!getGameState(roomName, 'leftWhiteCurtainsIsOpen')) {
      add([
        sprite('white-curtains-closed'),
        scale(1),
        pos(60, 80),
        area(),
        'leftWhiteCurtains',
      ]);
    } else {
      add([
        sprite('white-curtains-open'),
        scale(1),
        pos(60, 80),
        area(),
        'leftWhiteCurtainsOpen',
      ]);
    }

    onClick('leftWhiteCurtains', (leftWhiteCurtains) => {
      leftWhiteCurtains.destroy();
      const whiteCurtainsOpen = add([
        sprite('white-curtains-open'),
        scale(1),
        pos(60, 80),
        area(),
        'leftWhiteCurtainsOpen',
      ]);
      setGameState(roomName, 'leftWhiteCurtainsIsOpen', true);
    });

    onClick('leftWhiteCurtainsOpen', (leftWhiteCurtainsOpen) => {
      leftWhiteCurtainsOpen.destroy();
      const whiteCurtainsClose = add([
        sprite('white-curtains-closed'),
        scale(1),
        pos(60, 80),
        area(),
        'leftWhiteCurtains',
      ]);
      setGameState(roomName, 'leftWhiteCurtainsIsOpen', false);
    });

    onClick('rightWhiteCurtains', (rightWhiteCurtains) => {
      rightWhiteCurtains.destroy();
      const whiteCurtainsOpen = add([
        sprite('white-curtains-open'),
        scale(1),
        pos(970, 80),
        area(),
        'RightWhiteCurtainsOpen',
      ]);
      setGameState(roomName, 'RightWhiteCurtainsIsOpen', true);
    });

    onClick('rightWhiteCurtainsOpen', (rightWhiteCurtainsOpen) => {
      rightWhiteCurtainsOpen.destroy();
      const whiteCurtainsClose = add([
        sprite('white-curtains-closed'),
        scale(1),
        pos(970, 80),
        area(),
        'rightWhiteCurtains',
      ]);
      setGameState(roomName, 'RightWhiteCurtainsIsOpen', false);
    });

    roomNavArrows(viewDirection);
  });
  // ======================================================== //
  scene(roomName + 'Down', () => {
    window.roomName = roomName;
    window.viewDirection = 'Down';
    onLoad(() => {
      add([sprite('living-room-down'), scale(1), area()]);
      add([sprite('blueDot'), scale(0.17), pos(642, 140)]);
      add([sprite('redDot'), scale(0.17), pos(663, 140)]);
      add([sprite('greenDot'), scale(0.17), pos(684, 140)]);
      add([sprite('purpleDot'), scale(0.17), pos(705, 140)]);
      add([
        sprite('woodenDoor'),
        scale(3),
        pos(510, 110),
        area(),
        'woodenDoor',
      ]);
    });

    if (!getGameState(roomName, 'lampOff')) {
      add([
        sprite('lamp-turned-off'),
        scale(5),
        pos(200, 130),
        area(),
        'lampTurnedOff',
      ]);
    } else {
      add([sprite('lamp-turned-on'), scale(5), pos(200, 130), area(), 'lampTurnedOn']);
      add([sprite('greenBTN'), scale(0.1), pos(230, 180)]);
    }

    onClick('lampTurnedOff', (lampTurnedOff) => {
      playSFX('click')
      lampTurnedOff.destroy();
      setGameState(roomName, 'lampOff', true);
      const lampTurnedOn = add([
        sprite('lamp-turned-on'),
        scale(5),
        pos(200, 130),
        area(),
        'lampTurnedOn',
      ]);
      const greenBTN = add([sprite('greenBTN'), scale(0.1), pos(230, 180)]);
    });

    onClick('lampTurnedOn', (lampTurnedOn) => {
      playSFX('click')
      lampTurnedOn.destroy();
      setGameState(roomName, 'lampOff', false);
      const lampTurnedOff = add([
        sprite('lamp-turned-off'),
        scale(5),
        pos(200, 130),
        area(),
        'lampTurnedOff',
      ]);
    });

    const numberLabel1 = createNumberLabel1();
    const numberLabel2 = createNumberLabel2();
    const numberLabel3 = createNumberLabel3();
    const numberLabel4 = createNumberLabel4();
    numberLabel1.text = 0;
    numberLabel2.text = 0;
    numberLabel3.text = 0;
    numberLabel4.text = 0;
    let number1 = 0;
    let number2 = 0;
    let number3 = 0;
    let number4 = 0;

    onClick('numberLabel1', (numberLabel1) => {
      number1++;
      while (number1 > 9) {
        number1 = 0;
      }
      numberLabel1.text = number1;
    });

    onClick('numberLabel2', (numberLabel2) => {
      number2++;
      while (number2 > 9) {
        number2 = 0;
      }
      numberLabel2.text = number2;
    });

    onClick('numberLabel3', (numberLabel3) => {
      number3++;
      while (number3 > 9) {
        number3 = 0;
      }
      numberLabel3.text = number3;
    });

    onClick('numberLabel4', (numberLabel4) => {
      number4++;
      while (number4 > 9) {
        number4 = 0;
      }
      numberLabel4.text = number4;
    });

    onClick('woodenDoor', () => {
      textBubble([['Please enter the passcode to exit.']]);

      if (
        numberLabel1.text === 7 &&
        numberLabel2.text === 3 &&
        numberLabel3.text === 1 &&
        numberLabel4.text === 2
      ) {
        playSFX('doorClose')
        textBubble([['Passcode is correct, enter the next room']]);
        go('firstFloorHallwayDown');
      } else {
        numberLabel1.text = 0;
        numberLabel2.text = 0;
        numberLabel3.text = 0;
        numberLabel4.text = 0;
        let number1 = 0;
        let number2 = 0;
        let number3 = 0;
        let number4 = 0;
        textBubble([['Passcode is incorrect, try again']]);
      }
    });

    function createNumberLabel1() {
      let number1 = 0;
      const numberLabel1 = add([
        text(number1, { font: 'apl386', size: 20, width: 18 }),
        pos(650, 141),
        area(),
        'numberLabel1',
      ]);
      return numberLabel1;
    }

    function createNumberLabel2() {
      let number2 = 0;
      const numberLabel2 = add([
        text(number2, { font: 'apl386', size: 20, width: 18 }),
        pos(670, 141),
        area(),
        'numberLabel2',
      ]);
      return numberLabel2;
    }
    function createNumberLabel3() {
      let number3 = 0;
      const numberLabel3 = add([
        text(number3, { font: 'apl386', size: 20, width: 18 }),
        pos(690, 141),
        area(),
        'numberLabel3',
      ]);
      return numberLabel3;
    }
    function createNumberLabel4() {
      let number4 = 0;
      const numberLabel4 = add([
        text(number4, { font: 'apl386', size: 20, width: 18 }),
        pos(710, 141),
        area(),
        'numberLabel4',
      ]);
      return numberLabel4;
    }
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
      add([sprite('monster'), scale(1), area(), pos(80, 100), 'monster']);
    });

    onClick('monster', (monster) => {
      monster.play('move');
      playSFX('cuteGhostSound')
      if (!getGameState(roomName, 'silverKeyPickedUp')) {
        const keySilver = add([
          sprite('key-silver'),
          pos(130, 130),
          scale(0.8),
          area(),
          'keySilver',
        ]);
        textBubble([['This key is not my face. Would you like to have it?']]);
        onClick('keySilver', (keySilver) => {
          play('keyNoise')
          textBubble([['A key was added to your inventory']]);
          addToInventory(silverKey);
          setGameState(roomName, 'silverKeyPickedUp', true);
          keySilver.destroy();
        });
      }
    });

    if (!getGameState(roomName, 'paintingMoved')) {
      add([sprite('painting10'), scale(4), area(), pos(980, 80), 'painting10']);
    } else {
      add([
        sprite('painting10'),
        scale(4),
        area(),
        pos(980, 220),
        'painting10',
      ]);
    }

    onClick('painting10', (painting10) => {
      painting10.destroy();
      setGameState(roomName, 'paintingMoved', true);
      add([
        sprite('painting10'),
        scale(4),
        area(),
        pos(980, 220),
        'painting10',
      ]);
    });
    roomNavArrows(viewDirection);
  });
  // ======================================================== //
};
