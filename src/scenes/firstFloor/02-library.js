import { navArrows, destroyNavArrows } from '../../buttons';
import { fadeOutOpacity, flickerOpacity } from '../../sprites';

import { textBubble, addToMessageLog } from '../../message';

import { setGameState, getGameState } from '../../state.js';

import { debugRectSize } from '../../debug';

import { playBGM, stopBGM, playSFX } from '../../sounds';

import { pryBarObj, number4 } from '../../items';

import {
  addToInventory,
  checkInventoryForItem,
  removeFromInventory,
} from '../../inventory.js';

import { fascinatingBook } from '../../items.js';

const roomName = 'library';
const roomNavArrows = navArrows(roomName);

const hauntedHousesBook = [
  [
    'You find a about haunted houses. It seems a little on the nose so you leave it.',
  ],
];

const chestOpen = [
  ['You look inside.'],
  ['Wow!'],
  ["You can't believe your eyes!"],
  ['Nothing!'],
  ['You wonder if whoever put you here has a twisted sense of humor.'],
];
const uninterestingBookText = [
  [
    'You pick out a book and are dissapointed to find it totally uninteresting.',
  ],
  ['You put it back.'],
];
const fascinatingBookText = [
  [
    "You find a fascinating book called 'The Aesthetics of Fire-Hydrant Design: Volume IX'.",
  ],
  [
    "This doesn't seem like the best time to read it, so you stash it away for later.",
  ],
];

export const createLibrary = () => {
  // ======================================================== //

  scene(roomName + 'Down', () => {
    playBGM('ambience');
    window.roomName = roomName;
    window.viewDirection = 'Down';

    onLoad(() => {
      add([sprite('library-down'), scale(1), area()]);
      add([sprite('door2'), pos(537, 65), scale(1.37), area(), 'door']);
      add([
        rect(15, 20),
        opacity(0),
        pos(30, 185),
        area(),
        'uninterestingBook',
      ]);
      add([
        rect(15, 20),
        opacity(0),
        pos(400, 306),
        area(),
        'uninterestingBook',
      ]);
      add([
        rect(15, 20),
        opacity(0),
        pos(950, 103),
        area(),
        'uninterestingBook',
      ]);
    });

    if (!getGameState(roomName, 'pickedUpFascinatingBook', true)) {
      add([
        sprite('fascinatingBook'),
        pos(852, 223),
        scale(1.35),
        area(),
        'fascinatingBook',
      ]);
    }

    onClick('door', () => {
      playSFX('doorClose');
      go('mainEntranceDown');
    });

    onClick('fascinatingBook', (libraryBook) => {
      console.log('door clicked');
      textBubble(fascinatingBookText);
      setGameState(roomName, 'pickedUpFascinatingBook', true);
      addToInventory(fascinatingBook);
      addToMessageLog(fascinatingBookText);
      libraryBook.destroy();
    });

    onClick('uninterestingBook', () => {
      textBubble(uninterestingBookText);
    });

    roomNavArrows(window.viewDirection);

    //  debugRectSize();
  });

  // ======================================================== //

  scene(roomName + 'Right', () => {
    playBGM('ambience');
    window.roomName = roomName;
    window.viewDirection = 'Right';

    onLoad(() => {
      add([sprite('library-right'), scale(1), area()]);
    });

    const deskDrawer1 = add([
      sprite('deskDrawer'),
      scale(1.05),
      pos(471, 402),
      area(),
      'deskDrawer1',
    ]);
    const deskDrawer2 = add([
      sprite('deskDrawer'),
      scale(1.05),
      pos(471, 452),
      area(),
      'deskDrawer2',
    ]);

    onClick('deskDrawer1', () => {
      if (!getGameState(roomName, 'deskDrawer1Opened')) {
        playSFX('drawerOpening');
        deskDrawer1.pos.y += 20;

        setGameState(roomName, 'deskDrawer1Opened', true);
      } else {
        playSFX('drawerClosing');
        deskDrawer1.pos.y -= 20;

        setGameState(roomName, 'deskDrawer1Opened', false);
      }
    });

    onClick('deskDrawer2', () => {
      if (!getGameState(roomName, 'deskDrawer2Opened')) {
        playSFX('drawerOpening');
        deskDrawer2.pos.y += 20;
        setGameState(roomName, 'deskDrawer2Opened', true);

        if (!getGameState(roomName, 'Number4ShowsUp')) {
          if (!getGameState(roomName, 'Number4PickedUp')) {
            add([
              sprite('number4'),
              scale(2),
              pos(490, 450),
              area(),
              'number4',
            ]);
          }
        }
        setGameState(roomName, 'Number4PickedUp', false);
      } else {
        playSFX('drawerClosing');
        deskDrawer2.pos.y -= 20;
        every('number4', destroy);
        setGameState(roomName, 'deskDrawer2Opened', false);
      }
    });

    onClick('number4', (Number4) => {
      playSFX('keyNoise');
      textBubble([['A piece of number was added to your inventory']]);
      addToInventory(number4);
      setGameState(roomName, 'Number4PickedUp', true);
      Number4.destroy();
    });

    roomNavArrows(window.viewDirection);
  });

  // ======================================================== //

  scene(roomName + 'Up', () => {
    playBGM('ambience');
    window.roomName = roomName;
    window.viewDirection = 'Up';

    onLoad(() => {
      add([sprite('library-up'), scale(1), area()]);
    });
    add([rect(15, 20), opacity(0), pos(280, 185), area(), 'uninterestingBook']);
    add([rect(15, 20), opacity(0), pos(400, 106), area(), 'uninterestingBook']);
    add([rect(15, 20), opacity(0), pos(880, 103), area(), 'uninterestingBook']);
    onClick('uninterestingBook', () => {
      console.log('clicked');
      textBubble(uninterestingBookText);
    });

    if (getGameState(roomName, 'openedLibraryGlassDoor', true)) {
      add([
        sprite('openGlassDoors'),
        scale(1.008),
        area(),
        pos(545, 89),
        'glassDoorOpen',
      ]);
    } else {
      add([
        sprite('closedGlassDoors'),
        scale(1.008),
        area(),
        pos(545, 89),
        'glassDoorClosed',
      ]);
    }

    onClick('glassDoorClosed', (door) => {
      playSFX('glassDoorOpening');
      setGameState(roomName, 'openedLibraryGlassDoor', true);
      door.destroy();
      add([
        sprite('openGlassDoors'),
        scale(1.008),
        area(),
        pos(545, 89),
        'glassDoorOpen',
      ]);
    });

    onClick('glassDoorOpen', (door) => {
      playSFX('glassDoorClosing');
      setGameState(roomName, 'openedLibraryGlassDoor', false);
      door.destroy();
      add([
        sprite('closedGlassDoors'),
        scale(1.008),
        area(),
        pos(545, 89),
        'glassDoorClosed',
      ]);
    });

    roomNavArrows(window.viewDirection);
    // debugRectSize()
  });

  // ======================================================== //

  scene(roomName + 'Left', () => {
    window.roomName = roomName;
    window.viewDirection = 'Left';
    playBGM('ambience');
    //Sprite Loaders
    onLoad(() => {
      add([sprite('library-left'), scale(1), area()]);

      if (!getGameState(roomName, 'lampOff')) {
        add([
          sprite('lamp-turned-off'),
          scale(5),
          pos(558, 190),
          area(),
          'lampTurnedOff',
        ]);
      } else {
        add([
          sprite('lamp-turned-on'),
          scale(5),
          pos(558, 190),
          area(),
          'lampTurnedOn',
        ]);
      }
    });

    if (!getGameState(roomName, 'chestOpen')) {
      add([sprite('chestClosed'), scale(5), pos(160, 280), area(), 'chest']);
      onClick('chest', (chest) => {
        if (
          checkInventoryForItem(pryBarObj) &&
          window.selectedItem == 'pry bar'
        ) {
          chest.destroy();
          playSFX('chestOpen');
          textBubble(chestOpen);
          setGameState(roomName, 'chestOpen', true);
          add([
            sprite('chestOpen'),
            scale(5),
            pos(160, 280),
            area(),
            'chestOpen',
          ]);
        } else {
          playSFX('click');
        }
      });
    } else {
      add([sprite('chestOpen'), scale(5), pos(160, 280), area(), 'chestOpen']);
    }

    onClick('lampTurnedOff', (lampTurnedOff) => {
      playSFX('click');
      lampTurnedOff.destroy();
      setGameState(roomName, 'lampOff', true);
      const lampTurnedOn = add([
        sprite('lamp-turned-on'),
        scale(5),
        pos(558, 190),
        area(),
        'lampTurnedOn',
      ]);
    });

    onClick('lampTurnedOn', (lampTurnedOn) => {
      playSFX('click');
      lampTurnedOn.destroy();
      setGameState(roomName, 'lampOff', false);
      const lampTurnedOff = add([
        sprite('lamp-turned-off'),
        scale(5),
        pos(558, 190),
        area(),
        'lampTurnedOff',
      ]);
    });
    roomNavArrows(window.viewDirection);
  });
};

// ======================================================== //
