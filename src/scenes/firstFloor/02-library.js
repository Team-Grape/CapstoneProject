import { navArrows, destroyNavArrows } from "../../buttons";
import { fadeOutOpacity, flickerOpacity } from "../../sprites";

import { textBubble, addToMessageLog } from "../../message";

import { setGameState, getGameState } from "../../state.js";

import { debugRectSize } from "../../debug";

import {
  addToInventory,
  checkInventoryForItem,
  removeFromInventory,
} from "../../inventory.js";

import { fascinatingBook } from "../../items.js";

const roomName = "library";
const roomNavArrows = navArrows(roomName);

const hauntedHousesBook = [
  ['You find a about haunted houses. It seems a little on the nose so you leave it.']
]
const uninterestingBookText = [
  ['You pick out a book and are dissapointed to find it totally uninteresting.'],
  ['You put it back']
]
const fascinatingBookText = [
  ['You find a fascinating book called \'The Aesthetics of Fire-Hydrant Design: Volume IX\'.'],
  ['This doesn\'t seem like the best time to read it, so you stash it away for later.']
]

export const createLibrary = () => {
  // ======================================================== //

  scene(roomName + "Down", () => {
    window.roomName = roomName;
    window.viewDirection = "Down";

    onLoad(() => {
      add([sprite("library-down"), scale(1), area()]);
      add([sprite("door2"), pos(537, 65), scale(1.37), area(), "door"]);
      add([rect(15, 20), opacity(0), pos(30, 185), area(), "hauntedHousesBook"]);
      add([rect(15, 20), opacity(0), pos(400, 306), area(), "uninterestingBook"]);
      add([rect(15, 20), opacity(0), pos(950, 103), area(), "uninterestingBook"]);
    });
   
    if (!getGameState(roomName, "pickedUpFascinatingBook", true)) {
      add([sprite("fascinatingBook"), pos(852, 223), scale(1.35), area(), "fascinatingBook"]);
    }

    onClick('door', () => {
        console.log('door clicked')
    })

    onClick('fascinatingBook', (libraryBook) => {
      console.log('door clicked')
      textBubble(fascinatingBookText)
      setGameState(roomName, "pickedUpFascinatingBook", true);
      addToInventory(fascinatingBook)
      addToMessageLog(fascinatingBookText);
      libraryBook.destroy()
  })

  onClick('uninterestingBook', () => {
    textBubble(uninterestingBookText)
  })

  roomNavArrows(window.viewDirection)

       debugRectSize();
  });

  // ======================================================== //

  scene(roomName + "Right", () => {
    window.roomName = roomName;
    window.viewDirection = "Right";

    onLoad(() => {
      add([sprite("library-right"), scale(1), area()]);
    });
    roomNavArrows(window.viewDirection);
  });

  // ======================================================== //

  scene(roomName + "Up", () => {
    window.roomName = roomName;
    window.viewDirection = "Up";

    onLoad(() => {
      add([sprite("library-up"), scale(1), area()]);
    });

    roomNavArrows(window.viewDirection);
  });

  // ======================================================== //

  scene(roomName + "Left", () => {
    window.roomName = roomName;
    window.viewDirection = "Left";

    //Sprite Loaders
    onLoad(() => {
      add([sprite("library-left"), scale(1), area()]);

      roomNavArrows(window.viewDirection);
    });
  });

  // ======================================================== //
};
