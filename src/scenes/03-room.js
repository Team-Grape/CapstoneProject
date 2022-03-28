import {
  addToInventory,
  checkInventoryForItem,
  removeFromInventory,
} from '../inventory';

import { ragObj } from '../items.js';

import { setGameState, getGameState } from '../state';

import { textBubble, addToMessageLog } from '../message';

import { playBGM, stopBGM } from '../sounds';
import { navArrows } from '../buttons';

const roomName = 'basementRoomThree';
const roomNavArrows = navArrows(roomName);

export const createBasementRoomThree = () => {
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
      add([sprite('flower'), scale(3), pos(360, 230)]);
      add([sprite('books'), scale(3), pos(475, 250), area(), 'books']);
      // playBGM('kidMusic');
    });

    if (!getGameState(roomName, 'ragPickedUp')) {
      const rag = add([sprite('rag'), scale(1), pos(900, 380), area(), 'rag']);
      onClick('rag', (rag) => {
        textBubble([['an old rag was added to your inventory']]);

        addToInventory(ragObj);
        setGameState(roomName, 'ragPickedUp', true);
        rag.destroy();
      });
    }

    onClick('books', (books) => {
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
            'The books fall down and a piece of paper shows up.',
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
      add([sprite('pink-bed'), scale(5), pos(90, 265)]);
      add([sprite('little-drawer'), scale(4.5), pos(350, 270)]);
      add([sprite('deng'), scale(2.5), pos(350, 230)]);
      add([sprite('clock'), scale(3), pos(400, 130)]);
      add([sprite('opened-book'), scale(2), pos(400, 275)]);
      add([sprite('cycle-chair'), scale(3.2), pos(385, 370)]);
      add([sprite('bookshelve'), scale(3.2), pos(520, 230)]);
      add([
        sprite('empty-picture'),
        scale(2.7),
        pos(850, 110),
        area(),
        'largeEmptyPicture',
      ]);
      add([
        sprite('empty-picture'),
        scale(2.4),
        pos(950, 140),
        area(),
        'smallEmptyPicture',
      ]);
      add([sprite('books-on-chair'), scale(2.2), pos(710, 370)]);
    });

    onClick('largeEmptyPicture', (largeEmptyPicture) => {
      textBubble([['There are so much dust on the picture']]);
    });

    onClick('smallEmptyPicture', (smallEmptyPicture) => {
      textBubble([['There are so much dust on the picture']]);
    });
    roomNavArrows(viewDirection);
  });
  // ======================================================== //
  scene(roomName + 'Down', () => {
    window.roomName = roomName;
    window.viewDirection = 'Down';
    onLoad(() => {
      add([sprite('room-three-background-side'), scale(1), area()]);
      add([sprite('orange-carpet'), scale(3), pos(800, 400)]);
      add([sprite('makeup-table'), scale(6), pos(120, 230)]);
      add([sprite('clothset'), scale(6), pos(400, 200)]);
      add([sprite('cycle-chair'), scale(3.5), pos(165, 400)]);
      add([sprite('land-scape-painting'), scale(3), pos(600, 120)]);
      add([sprite('red-flower'), scale(3.5), pos(1200, 300)]);
      add([
        sprite('woodenDoor', { flipX: true }),
        pos(900, 106),
        scale(3),
        area(),
        'woodenDoor',
      ]);
    });
    onClick('woodenDoor', () => {
      go('basementRoomTwoLeft');
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
      add([sprite('toy'), scale(3.5), pos(220, 380)]);
      add([sprite('ball'), scale(3.5), pos(500, 480)]);
      add([sprite('another-painting'), scale(3), pos(600, 120)]);
      add([sprite('white-flowers'), scale(3), pos(650, 300)]);
      add([sprite('seats'), scale(3), pos(1200, 400)]);
      add([sprite('wood-door'), scale(4), pos(880, 185), area(), 'wood-door']);
      add([sprite('orange-passcode-button'), scale(0.17), pos(1050, 240)]);
      add([
        sprite('skeleton-stand'),
        scale(7),
        pos(60, 280),
        area(),
        'skeletonStand',
      ]);
    });

    onClick('skeletonStand', (skeletonStand) => {
      skeletonStand.destroy();
      const skeletonAttack = add([
        sprite('skeleton-attack'),
        scale(7),
        pos(60, 280),
        area(),
        'skeletonAttack',
      ]);
      skeletonAttack.play('attack', { speed: 5, loop: true });
      const skeletonMessage = [
        [
          'Oh no, the skeleton is awake, must find the way to destroy this skeleton!',
        ],
      ];
      textBubble([skeletonMessage]);

      onClick('skeletonAttack', (skeletonAttack) => {
        //if (getGameState(roomName, "pryBarPickedUp")) {
        if (window.selectedItem == 'pry bar') {
          skeletonAttack.destroy();
          const skeletonDead = add([
            sprite('skeleton-dead'),
            scale(7),
            pos(60, 280),
            'skeletonDead',
          ]);
          skeletonDead.play('dead', { speed: 20 });
          textBubble([['......']]);
        }
      });
    });

    onClick('wood-door', () => {
      textBubble([['Please enter the passcode to exit.']]);
      const input = add([
        pos(1057, 240),
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
        if (input.text === '1234') {
          textBubble([['Passcode is correct, enter the next room']]);
          go('bedroomUp');
        } else {
          input.text = '';
          textBubble([['Passcode is incorrect, try again']]);
          // maybe the ghost show up
        }
      });
    });
    roomNavArrows(viewDirection);
  });
  // ======================================================== //
};
