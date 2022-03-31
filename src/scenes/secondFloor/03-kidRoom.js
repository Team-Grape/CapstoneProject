import {
  addToInventory,
  checkInventoryForItem,
  removeFromInventory,
} from '../../inventory.js';

import { ragObj, diamondKey } from '../../items.js';

import { setGameState, getGameState } from '../../state';

import { textBubble, addToMessageLog } from '../../message';

import { playBGM, stopBGM, playSFX } from '../../sounds';
import { navArrows } from '../../buttons';

const roomName = 'kidRoom';
const roomNavArrows = navArrows(roomName);

export const createKidRoom = () => {
  // ======================================================== //
  scene(roomName + 'Up', () => {
    window.roomName = roomName;
    window.viewDirection = 'Up';
    onLoad(() => {
      add([sprite('room-three-background'), scale(1), area()]);
      add([sprite('seats'), scale(3), pos(20, 400)]);
      add([sprite('orange-carpet'), scale(3), pos(400, 420), area(), solid()]);
      add([sprite('little-drawer'), scale(6), pos(360, 270)]);
      add([sprite('flower-painting'), scale(4), pos(500, 120)]);
      add([sprite('flower-painting'), scale(4), pos(320, 90)]);
      add([sprite('white-flowers'), scale(3), pos(650, 300)]);
      add([sprite('white-flowers'), scale(3), pos(770, 300)]);
      add([sprite('flower'), scale(3), pos(360, 230)]);
      // playBGM('kidMusic');
    });


    if (!getGameState(roomName, "ragPickedUp")) {
      const rag = add([sprite("rag"), scale(1), pos(900, 380), area(), "rag"]);
      onClick("rag", (rag) => {
        playSFX('keyNoise')
        textBubble([["An old rag was added to your inventory."]]);
        addToInventory(ragObj);
        setGameState(roomName, 'ragPickedUp', true);
        rag.destroy();
      });
    }

    if (!getGameState(roomName, 'BookFell')) {
      add([sprite('books'), scale(3), pos(475, 250), area(), 'books']);
    } else {
      add([
        sprite('fallingBook', { anim: 'idle' }),
        scale(1.5),
        pos(510, 350),
        area(),
        'fallingBook',
      ]);
    }

    onClick('books', (books) => {
      setGameState(roomName, 'BookFell', true);
      books.destroy();
      const fallingBook = add([
        sprite('fallingBook'),
        scale(1.5),
        pos(510, 250),
        gravity(100),
        body(),
        area(),
        'fallingBook',
      ]);
      fallingBook.play('fall', {
        speed: 3,
        onEnd: () => {
          const bookFallingMessage = [
            'The books fell down and a piece of paper shows up.',
          ];
          textBubble([bookFallingMessage]);
          onClick('fallingBook', () => {
            const pieceMessage = ['HAHA just kidding!'];
            textBubble([pieceMessage]);
          });
        },
      });
    });
    roomNavArrows(viewDirection);
  });
  // ======================================================== //
  scene(roomName + 'Right', () => {
    window.roomName = roomName;
    window.viewDirection = 'Right';
    onLoad(() => {
      add([sprite('room-three-background-side'), scale(1), area()]);
      add([sprite('red-carpet'), scale(1.5), pos(100, 500)]);
      add([sprite('starts-on-wall'), scale(2), pos(0, 100)]);
      add([sprite('starts-on-wall'), scale(2), pos(110, 100)]);
      add([sprite('starts-on-wall'), scale(2), pos(220, 100)]);
      add([sprite('starts-on-wall'), scale(2), pos(55, 180)]);
      add([sprite('starts-on-wall'), scale(2), pos(165, 180)]);
      add([sprite('pink-bed'), scale(5), pos(90, 265)]);
      add([sprite('little-drawer'), scale(4.5), pos(350, 270)]);
      add([sprite('deng'), scale(2.5), pos(350, 230)]);
      add([sprite('clock'), scale(3), pos(400, 130)]);
      add([sprite('opened-book'), scale(2), pos(400, 275)]);
      add([sprite('cycle-chair'), scale(3.2), pos(385, 370)]);
      add([sprite('bookshelve'), scale(3.2), pos(520, 230)]);
      add([sprite('books-on-chair'), scale(2.2), pos(710, 370)]);
      add([sprite('rectangle-carpet'), scale(3), pos(800, 340)]);
    });

    if (!getGameState(roomName, 'largeEmptyPictureRemoveDust')) {
      add([
        sprite('empty-picture'),
        scale(2.7),
        pos(850, 110),
        area(),
        'largeEmptyPicture',
      ]);
    } else {
      add([sprite('painting-one-with-number'), scale(2.7), pos(850, 110)]);
    }

    if (!getGameState(roomName, 'smallEmptyPictureRemoveDust')) {
      add([
        sprite('empty-picture'),
        scale(2.4),
        pos(950, 140),
        area(),
        'smallEmptyPicture',
      ]);
    } else {
      add([sprite('painting-two-with-number'), scale(2.4), pos(950, 140)]);
    }

    onClick('largeEmptyPicture', (largeEmptyPicture) => {
      textBubble([['There are so much dust on the picture.']]);
      if (window.selectedItem == 'rag') {
        largeEmptyPicture.destroy();
        const pictureOneWithNumber = add([
          sprite('painting-one-with-number'),
          scale(2.7),
          pos(850, 110),
        ]);

        textBubble([['Something displayed on the picture']]);
        setGameState(roomName, 'largeEmptyPictureRemoveDust', true);
      }
    });

    onClick('smallEmptyPicture', (smallEmptyPicture) => {
      textBubble([['There are so much dust on the picture.']]);
      if (window.selectedItem == 'rag') {
        smallEmptyPicture.destroy();
        const pictureTwoWithNumber = add([
          sprite('painting-two-with-number'),
          scale(2.4),
          pos(950, 140),
        ]);

        textBubble([['Something displayed on the picture']]);
        setGameState(roomName, 'smallEmptyPictureRemoveDust', true);
      }
    });
    roomNavArrows(viewDirection);
  });
  // ======================================================== //
  scene(roomName + 'Down', () => {
    window.roomName = roomName;
    window.viewDirection = 'Down';
    onLoad(() => {
      add([sprite('room-three-background-side'), scale(1), area()]);
      add([sprite('orange-carpet'), scale(3), pos(800, 400), area(), solid()]);
      add([sprite('makeup-table'), scale(6), pos(120, 230)]);
      add([sprite('clothset'), scale(6), pos(400, 200)]);
      add([sprite('cycle-chair'), scale(3.5), pos(165, 400)]);
      add([sprite('land-scape-painting'), scale(3), pos(600, 120)]);
      add([sprite('red-flower'), scale(3.5), pos(1200, 300)]);
      add([
        sprite('paper-board'),
        scale(3),
        pos(800, 150),
        area(),
        'paperboard',
      ]);
      add([sprite('global'), scale(1.5), pos(900, 430), rotate(24)]);
      add([sprite('green-plant'), scale(2.5), pos(50, 300)]);
    });

    onClick('paperboard', (paperboard) => {
      if (paperboard.pos.x < 850) {
        paperboard.pos.x += 5;
      } else if ((paperboard.pos.x = 850)) {
        if (!getGameState(roomName, 'Number1ShowsUp')) {
          add([
            sprite('number1'),
            scale(3),
            pos(840, 170),
            area(),
            body(),
            gravity(200),
          ]);
          setGameState(roomName, 'Number1ShowsUp', true);
        }
      }
    });
    roomNavArrows(viewDirection);
  });
  // ======================================================== //
  scene(roomName + 'Left', () => {
    window.roomName = roomName;
    window.viewDirection = 'Left';
    onLoad(() => {
      add([sprite('room-three-background-side'), scale(1), area()]);
      add([sprite('orange-big-carpet'), scale(3), pos(200, 350)]);
      add([
        sprite('empty-picture'),
        scale(2.7),
        pos(250, 110),
        area(),
        'largeEmptyPicture',
      ]);
      add([
        sprite('empty-picture'),
        scale(2.5),
        pos(330, 120),
        area(),
        'largeEmptyPicture',
      ]);
      add([
        sprite('ball'),
        scale(3.5),
        pos(500, 480),
        rotate(0),
        area(),
        solid(),
        origin('center'),
        'ball',
      ]);
      add([
        sprite('toy'),
        scale(3.5),
        pos(920, 450),
        rotate(),
        area(),
        solid(),
        'toy',
      ]);
      add([sprite('another-painting'), scale(3), pos(600, 120)]);
      add([sprite('white-flowers'), scale(3), pos(650, 300)]);
      add([sprite('seats'), scale(3), pos(1200, 400)]);
      add([sprite('door2'), pos(875, 75), scale(1.3), area(), 'door2']);
      add([sprite('orangeBTN'), scale(0.17), pos(1051, 139)]);
      add([sprite('orangeBTN'), scale(0.17), pos(1071, 139)]);
      add([sprite('orangeBTN'), scale(0.17), pos(1091, 139)]);
      add([sprite('orangeBTN'), scale(0.17), pos(1111, 139)]);
    });

    onClick('ball', (ball) => {
      ball.onUpdate(() => {
        if (ball.pos.x < 920) {
          ball.pos.x += 2;
          ball.angle += 120 * dt();
        }
      });
      ball.onCollide('toy', (toy) => {
        toy.angle = 45 * dt();
      });
    });

    const cuteGhost = add([
      sprite('cuteGhost'),
      scale(5),
      pos(60, 280),
      area(),
      'cuteGhost',
    ]);
    onClick('cuteGhost', (cuteGhost) => {
      playSFX('cuteGhostSound')
      cuteGhost.play('move', { loop: true });
      setGameState(roomName, 'ghostMoved', true);
      textBubble([
        ['Hello, hurry up and find the passcode before you end up like me.'],
        ['Here is a special key to unlock a special door.']
      ]);
      if (!getGameState(roomName, 'diamondKeyPickedUp')) {
        add([
          sprite('diamond-key'), 
          scale(1), pos(120, 450), 
          area(), 
          'diamondKey'
        ])
        onClick('diamondKey', (diamondKey1) => {
          playSFX('keyNoise');
          textBubble([['A key was added to your inventory']])
          addToInventory(diamondKey);
          setGameState(roomName, 'diamondKeyPickedUp');
          diamondKey1.destroy()
        })
      } 
    });

    if (getGameState(roomName, 'ghostMoved')) {
      cuteGhost.play('move', { loop: true });
    }

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

    onClick('door2', () => {
      textBubble([
        ['The door locked behind you. Please enter a passcode to exit.'],
      ]);

      if (
        numberLabel1.text === 0 &&
        numberLabel2.text === 8 &&
        numberLabel3.text === 1 &&
        numberLabel4.text === 5
      ) {
        playSFX('doorClose')
        textBubble([['Passcode is correct, enter the next room']]);
        go('secondFloorHallwayDown');
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
        pos(1057, 140),
        area(),
        'numberLabel1',
      ]);
      return numberLabel1;
    }

    function createNumberLabel2() {
      let number2 = 0;
      const numberLabel2 = add([
        text(number2, { font: 'apl386', size: 20, width: 18 }),
        pos(1077, 140),
        area(),
        'numberLabel2',
      ]);
      return numberLabel2;
    }
    function createNumberLabel3() {
      let number3 = 0;
      const numberLabel3 = add([
        text(number3, { font: 'apl386', size: 20, width: 18 }),
        pos(1097, 140),
        area(),
        'numberLabel3',
      ]);
      return numberLabel3;
    }
    function createNumberLabel4() {
      let number4 = 0;
      const numberLabel4 = add([
        text(number4, { font: 'apl386', size: 20, width: 18 }),
        pos(1117, 140),
        area(),
        'numberLabel4',
      ]);
      return numberLabel4;
    }
    roomNavArrows(viewDirection);
  });
  // ======================================================== //
};
