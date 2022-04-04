import { navArrows, singleViewNavArrow, destroyNavArrows } from '../../buttons';
import { fadeOutOpacity, flickerOpacity } from '../../sprites';

import { textBubble, addToMessageLog } from '../../message';

import { rustyKey, number2, number1, number4 } from '../../items';

import { setGameState, getGameState, saveCurrentRoom } from '../../state.js';

import { debugRectSize } from '../../debug';

import { playBGM, stopBGM, playSFX } from '../../sounds';

import { InGameMenu } from '../../menu';

import {
  addToInventory,
  checkInventoryForItem,
  removeFromInventory,
} from '../../inventory.js';

const roomName = 'mainEntrance';
const roomNavArrows = navArrows(roomName);

const mainEntranceMessage = [
  [
    'You feel your excitement swell when you see what looks like the front door to the house.',
  ],
  ['You pause for a moment.'],
  ["It would be too easy if the door was unlocked, wouldn't it?"],
];

const doorMessage = [
  ['You reach your trembling hand out to the doorknob.'],
  ['You grip it firmly in your hand.'],
  ['You give it a turn.'],
  ["it's locked."],
];

const prettyPainting = [
  ['Your eye is caught by the beauty of this painting'],
  ['You pause to gaze at it. This is a nice break.'],
];

const doorIsLocked = [["It's locked."]];

const checkPuzzle = (topLeft, topRight, bottomCenter) => {
  // https://puzzling.stackexchange.com/questions/1957/puzzle-of-putting-numbers-1-9-in-3x3-grid-to-add-up-to-15

  /*
                  |              |
       topLeft    |   topCenter  |   topRight
                  |              |
    --------------+--------------+----------------
                  |              |
       midLeft    |   midCenter  |   midRight
                  |              |
    --------------+--------------+----------------
                  |              |
      bottomLeft  | bottomCenter |  bottomRight
                  |              |
  */

  const topCenter = 9;
  const midLeft = 7;
  const midCenter = 5;
  const midRight = 3;
  const bottomLeft = 6;
  const bottomRight = 8;

  // rows
  if (
    topLeft + topCenter + topRight === 15 &&
    midLeft + midCenter + midRight === 15 &&
    bottomLeft + bottomCenter + bottomRight === 15 &&
    // columns
    topLeft + midLeft + bottomLeft === 15 &&
    topCenter + midCenter + bottomCenter === 15 &&
    topRight + midRight + bottomRight === 15 &&
    // diagonals
    topLeft + midCenter + bottomRight === 15 &&
    bottomLeft + midCenter + topRight === 15
  ) {
    //-------------------------------------------------
    return true;
  } else {
    return false;
  }
};

const solvePuzzle = () => {
  if (
    getGameState(roomName, 'topLeft') == 2 &&
    getGameState(roomName, 'topRight') == 4 &&
    getGameState(roomName, 'bottom') == 1
  ) {
    const solvedPuzzleMessage = [
      ['Congrats! You solve the puzzle!'],
      ['But the door is still locked.'],
      ['Please find another way to unlock the door!'],
    ];
    textBubble(solvedPuzzleMessage);
  }
  if (
    getGameState(roomName, 'topLeft') &&
    getGameState(roomName, 'topRight') &&
    getGameState(roomName, 'bottom') &&
    getGameState(roomName, 'topLeft') !== 2 &&
    getGameState(roomName, 'topRight') !== 4 &&
    getGameState(roomName, 'bottom') !== 1
  ) {
    textBubble([['Oops, you only have one chance.']]);
  }
};

export const createMainEntrance = async () => {
  scene(roomName + 'Down', () => {
    window.roomName = roomName;
    window.viewDirection = 'singleViewRoom';

    onLoad(() => {
      add([sprite('main-entrance'), scale(1)]);
      add([
        sprite('missingNumbers'),
        pos(450, 250),
        scale(1.5),
        area(1),
        'missingNumbers',
      ]);
      add([
        rect(18, 18),
        pos(450, 250),
        color(128, 128, 128),
        area(),
        'number2square',
      ]);
      add([
        rect(18, 18),
        pos(468, 290),
        color(128, 128, 128),
        area(),
        'number1square',
      ]);
      add([
        rect(18, 18),
        pos(485, 250),
        color(128, 128, 128),
        area(),
        'number4square',
      ]);
      add([rect(155, 240), opacity(0), pos(533, 110), area(), 'center-door']);
      add([rect(300, 75), pos(450, 30), opacity(0)]);
      add([
        text('Solve the number puzzle.', { size: 18, font: 'apl386o' }),
        pos(480, 33),
        color(255, 0, 0),
      ]);
      add([
        text('It may unlock the door.', { size: 18, font: 'apl386o' }),
        pos(480, 53),
        color(255, 0, 0),
      ]);
      add([
        text('Each column and row must', { size: 18, font: 'apl386o' }),
        pos(480, 73),
        color(255, 0, 0),
      ]);
      add([
        text('equal 15.', { size: 18, font: 'apl386o' }),
        pos(550, 91),
        color(255, 0, 0),
      ]);

      add([rect(240, 75), opacity(0), pos(25, 150), area(), 'prettyPainting']);

      add([
        rect(200, 280),
        opacity(0),
        pos(1040, 150),
        area(),
        'right-near-door',
      ]);
    });

    // onClick Events //////////////////////////////////////////////////////////////////////////////
    onClick('prettyPainting', () => {
      textBubble(prettyPainting, () => {
        singleViewNavArrow('mainEntranceDown', 'firstFloorHallwayDown');
      });
    });

    onClick('number2square', (number2square) => {
      if (!getGameState(roomName, 'textShowed2')) {
        textBubble([['Seems like a number can go here.']], () => {
          singleViewNavArrow('mainEntranceDown', 'firstFloorHallwayDown');
        });
        setGameState(roomName, 'textShowed2', true);
      } else if (
        checkInventoryForItem(number2) &&
        window.selectedItem == 'piece number2'
      ) {
        setGameState(roomName, 'topLeft', 2);
        removeFromInventory(number2);
        number2square.destroy();
        add([sprite('answer_number2'), pos(454, 253), scale(1.5)]);
        solvePuzzle();
      } else if (
        checkInventoryForItem(number1) &&
        window.selectedItem == 'piece number1'
      ) {
        setGameState(roomName, 'topLeft', 1);
        removeFromInventory(number1);
        number2square.destroy();
        add([sprite('answer_number1'), pos(454, 253), scale(1.5)]);
        solvePuzzle();
      } else if (
        checkInventoryForItem(number4) &&
        window.selectedItem == 'piece number4'
      ) {
        setGameState(roomName, 'topLeft', 4);
        removeFromInventory(number4);
        number2square.destroy();
        add([sprite('answer_number4'), pos(454, 253), scale(1.5)]);
        solvePuzzle();
      }
    });

    onClick('number1square', (number1square) => {
      if (!getGameState(roomName, 'textShowed1')) {
        textBubble([['Seems like a number can go here.']], () => {
          singleViewNavArrow('mainEntranceDown', 'firstFloorHallwayDown');
        });
        setGameState(roomName, 'textShowed1', true);
      } else if (
        checkInventoryForItem(number1) &&
        window.selectedItem == 'piece number1'
      ) {
        setGameState(roomName, 'bottom', 1);
        removeFromInventory(number1);
        number1square.destroy();
        add([sprite('answer_number1'), pos(470, 292), scale(1.5)]);
        solvePuzzle();
      } else if (
        checkInventoryForItem(number2) &&
        window.selectedItem == 'piece number2'
      ) {
        setGameState(roomName, 'bottom', 2);
        removeFromInventory(number2);
        number1square.destroy();
        add([sprite('answer_number2'), pos(470, 292), scale(1.5)]);
        solvePuzzle();
      } else if (
        checkInventoryForItem(number4) &&
        window.selectedItem == 'piece number4'
      ) {
        setGameState(roomName, 'bottom', 4);
        removeFromInventory(number4);
        number1square.destroy();
        add([sprite('answer_number4'), pos(470, 292), scale(1.5)]);
        solvePuzzle();
      }
    });

    onClick('number4square', (number4square) => {
      if (!getGameState(roomName, 'textShowed4')) {
        textBubble([['Seems like a number can go here.']], () => {
          singleViewNavArrow('mainEntranceDown', 'firstFloorHallwayDown');
        });
        setGameState(roomName, 'textShowed4', true);
      } else if (
        checkInventoryForItem(number4) &&
        window.selectedItem == 'piece number4'
      ) {
        setGameState(roomName, 'topRight', 4);
        removeFromInventory(number4);
        number4square.destroy();
        add([sprite('answer_number4'), pos(487, 253), scale(1.5)]);
        solvePuzzle();
      } else if (
        checkInventoryForItem(number1) &&
        window.selectedItem == 'piece number1'
      ) {
        setGameState(roomName, 'topRight', 1);
        removeFromInventory(number1);
        number4square.destroy();
        add([sprite('answer_number1'), pos(487, 253), scale(1.5)]);
        solvePuzzle();
      } else if (
        checkInventoryForItem(number2) &&
        window.selectedItem == 'piece number2'
      ) {
        setGameState(roomName, 'topRight', 2);
        removeFromInventory(number2);
        number4square.destroy();
        add([sprite('answer_number2'), pos(487, 253), scale(1.5)]);
        solvePuzzle();
      }
    });
    // } else {
    //   // const notSolvedPuzzleMessage = [['You do not solve the puzzle.']];
    //   textBubble([['You do not solve the puzzle.']]);
    //   console.log('You do not solve the puzzle.');
    // }

    playBGM('ambience');

    ///////////////////////////////////////////////////////////////////////////////////////////

    if (!getGameState(roomName, 'mainEntranceMessageRead')) {
      textBubble(mainEntranceMessage, () => {
        setGameState(roomName, 'mainEntranceMessageRead', true);
        addToMessageLog(mainEntranceMessage);
        singleViewNavArrow('mainEntranceDown', 'firstFloorHallwayDown');
      });
    } else {
      singleViewNavArrow('mainEntranceDown', 'firstFloorHallwayDown');
    }

    ///////////////////////////////////////////////////////////////////////////////////////////

    onClick('right-near-door', () => {
      playSFX('doorClose');
      go('libraryUp');
    });

    onClick('center-door', () => {
      if (getGameState(roomName, 'doorUnlocked')) {
        go('win');
      } else if (
        checkInventoryForItem(rustyKey) &&
        window.selectedItem == 'rusty key'
      ) {
        playSFX('lockClick');
        setGameState(roomName, 'doorUnlocked', true);
        removeFromInventory(rustyKey);
        textBubble([['The key unlocked the door!']], () => {
          singleViewNavArrow('mainEntranceDown', 'firstFloorHallwayDown');
        });
      } else if (window.selectedItem == 'pry bar') {
        textBubble([["It doesn't work"]], () => {
          singleViewNavArrow('mainEntranceDown', 'firstFloorHallwayDown');
        });
      } else if (!getGameState(roomName, 'centerDoorClicked')) {
        textBubble(doorMessage, () => {
          singleViewNavArrow('mainEntranceDown', 'firstFloorHallwayDown');
        });
        setGameState(roomName, 'centerDoorClicked', true);
      } else {
        textBubble(doorIsLocked, () => {
          singleViewNavArrow('mainEntranceDown', 'firstFloorHallwayDown');
        });
      }

      // if (!getGameState(roomName, "centerDoorClicked")) {
      //   textBubble(doorMessage, () => {
      //     singleViewNavArrow("mainEntranceDown", "firstFloorHallwayDown");
      //   });
      //   setGameState(roomName, "centerDoorClicked", true);
      // } else {
      //   textBubble(doorIsLocked, () => {
      //     singleViewNavArrow("mainEntranceDown", "firstFloorHallwayDown");
      //   });
      // }
    });

    // if (!InGameMenu.isOpen()) {
    //     onClick("right-near-door", () => {

    //         textBubble([["it won't open"]]);
    //       });
    // }

    //debugRectSize();
  });
};
