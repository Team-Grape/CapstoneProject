import { navArrows, destroyNavArrows } from "../../buttons";
import { fadeOutOpacity, flickerOpacity } from "../../sprites";

import { textBubble, addToMessageLog } from "../../message";

import { setGameState, getGameState } from "../../state.js";

import { debugRectSize } from "../../debug";

import { playBGM, stopBGM, playSFX } from "../../sounds";

import {
  addToInventory,
  checkInventoryForItem,
  removeFromInventory,
} from "../../inventory.js";

import { fascinatingBook } from "../../items.js";

const roomName = "library";
const roomNavArrows = navArrows(roomName);

const hauntedHousesBook = [
  [
    "You find a about haunted houses. It seems a little on the nose so you leave it.",
  ],
];
const uninterestingBookText = [
  [
    "You pick out a book and are dissapointed to find it totally uninteresting.",
  ],
  ["You put it back."],
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

  scene(roomName + "Down", () => {
    playBGM("ambience");
    window.roomName = roomName;
    window.viewDirection = "Down";

    onLoad(() => {
      add([sprite("library-down"), scale(1), area()]);
      add([sprite("door2"), pos(537, 65), scale(1.37), area(), "door"]);
      add([
        rect(15, 20),
        opacity(0),
        pos(30, 185),
        area(),
        "uninterestingBook",
      ]);
      add([
        rect(15, 20),
        opacity(0),
        pos(400, 306),
        area(),
        "uninterestingBook",
      ]);
      add([
        rect(15, 20),
        opacity(0),
        pos(950, 103),
        area(),
        "uninterestingBook",
      ]);
    });

    if (!getGameState(roomName, "pickedUpFascinatingBook", true)) {
      add([
        sprite("fascinatingBook"),
        pos(852, 223),
        scale(1.35),
        area(),
        "fascinatingBook",
      ]);
    }

    onClick("door", () => {
      playSFX('doorClose')
      go("mainEntranceDown");
    });

    onClick("fascinatingBook", (libraryBook) => {
      console.log("door clicked");
      textBubble(fascinatingBookText);
      setGameState(roomName, "pickedUpFascinatingBook", true);
      addToInventory(fascinatingBook);
      addToMessageLog(fascinatingBookText);
      libraryBook.destroy();
    });

    onClick("uninterestingBook", () => {
      console.log("clicked");
      textBubble(uninterestingBookText);
    });

    roomNavArrows(window.viewDirection);

    //  debugRectSize();
  });

  // ======================================================== //

  scene(roomName + "Right", () => {
    playBGM("ambience");
    window.roomName = roomName;
    window.viewDirection = "Right";

    onLoad(() => {
      add([sprite("library-right"), scale(1), area()]);
    });

   

  
    roomNavArrows(window.viewDirection);
  });

  // ======================================================== //

  scene(roomName + "Up", () => {
    playBGM("ambience");
    window.roomName = roomName;
    window.viewDirection = "Up";

    onLoad(() => {
      add([sprite("library-up"), scale(1), area()]);
    });

    if (getGameState(roomName, "openedLibraryGlassDoor", true)) {
      add([
        sprite("openGlassDoors"),
        scale(1.008),
        area(),
        pos(545, 89),
        "glassDoorOpen",
      ]);
    } else {
      add([
        sprite("closedGlassDoors"),
        scale(1.008),
        area(),
        pos(545, 89),
        "glassDoorClosed",
      ]);
    }

    onClick("glassDoorClosed", (door) => {
      playSFX('glassDoorOpening')
      setGameState(roomName, "openedLibraryGlassDoor", true);
      door.destroy();
      add([
        sprite("openGlassDoors"),
        scale(1.008),
        area(),
        pos(545, 89),
        "glassDoorOpen",
      ]);
    });

    onClick("glassDoorOpen", (door) => {
      playSFX('glassDoorClosing')
      setGameState(roomName, "openedLibraryGlassDoor", false);
      door.destroy();
      add([
        sprite("closedGlassDoors"),
        scale(1.008),
        area(),
        pos(545, 89),
        "glassDoorClosed",
      ]);
    });

    roomNavArrows(window.viewDirection);
    // debugRectSize()
  });

  // ======================================================== //

  scene(roomName + "Left", () => {
    window.roomName = roomName;
    window.viewDirection = "Left";
    playBGM("ambience");
    //Sprite Loaders
    onLoad(() => {
      add([sprite("library-left"), scale(1), area()]);

      if (!getGameState(roomName, 'lampOff')) {
        add([
          sprite('lamp-turned-off'),
          scale(5),
          pos(558, 190),
          area(),
          'lampTurnedOff',
        ]);
      } else {
        add([sprite('lamp-turned-on'), scale(5), pos(558, 190), area(), 'lampTurnedOn']);
      }
    });

    onClick('lampTurnedOff', (lampTurnedOff) => {
      playSFX('click')
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
      playSFX('click')
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

  // ======================================================== //
};
