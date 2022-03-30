import {
  addToInventory,
  checkInventoryForItem,
  removeFromInventory,
} from "../../inventory.js";

import { ragObj } from "../../items.js";

import { setGameState, getGameState } from "../../state";

import { textBubble, addToMessageLog } from "../../message";

import { playBGM, stopBGM } from "../../sounds";
import { navArrows } from "../../buttons";

const roomName = "kidRoom";
const roomNavArrows = navArrows(roomName);

export const createKidRoom = () => {
  // ======================================================== //
  scene(roomName + "Up", () => {
    window.roomName = roomName;
    window.viewDirection = "Up";
    onLoad(() => {
      add([sprite("room-three-background"), scale(1), area()]);
      add([sprite("seats"), scale(3), pos(20, 400)]);
      add([sprite("orange-carpet"), scale(3), pos(400, 420), area(), solid()]);
      add([sprite("little-drawer"), scale(6), pos(360, 270)]);
      add([sprite("flower-painting"), scale(4), pos(500, 120)]);
      add([sprite("flower-painting"), scale(4), pos(320, 90)]);
      add([sprite("flower"), scale(3), pos(360, 230)]);
      add([sprite("books"), scale(3), pos(475, 250), area(), "books"]);
      // playBGM('kidMusic');
    });

    if (!getGameState(roomName, "ragPickedUp")) {
      const rag = add([sprite("rag"), scale(1), pos(900, 380), area(), "rag"]);
      onClick("rag", (rag) => {
        textBubble([["An old rag was added to your inventory"]]);

        addToInventory(ragObj);
        setGameState(roomName, "ragPickedUp", true);
        rag.destroy();
      });
    }

    onClick("books", (books) => {
      books.destroy();
      const fallingBook = add([
        sprite("fallingBook"),
        scale(1.5),
        pos(510, 250),
        gravity(100),
        body(),
        area(),
        "fallingBook",
      ]);
      fallingBook.play("fall", {
        speed: 3,
        onEnd: () => {
          const bookFallingMessage = [
            "The books fell down and a piece of paper shows up.",
          ];
          textBubble([bookFallingMessage]);
          onClick("fallingBook", () => {
            const pieceMessage = ["HAHA just kidding!"];
            textBubble([pieceMessage]);
          });
        },
      });
    });
    roomNavArrows(viewDirection);
  });
  // ======================================================== //
  scene(roomName + "Right", () => {
    window.roomName = roomName;
    window.viewDirection = "Right";
    onLoad(() => {
      add([sprite("room-three-background-side"), scale(1), area()]);
      add([sprite("red-carpet"), scale(1.5), pos(100, 500)]);
      add([sprite("pink-bed"), scale(5), pos(90, 265)]);
      add([sprite("little-drawer"), scale(4.5), pos(350, 270)]);
      add([sprite("deng"), scale(2.5), pos(350, 230)]);
      add([sprite("clock"), scale(3), pos(400, 130)]);
      add([sprite("opened-book"), scale(2), pos(400, 275)]);
      add([sprite("cycle-chair"), scale(3.2), pos(385, 370)]);
      add([sprite("bookshelve"), scale(3.2), pos(520, 230)]);
      add([
        sprite("empty-picture"),
        scale(2.7),
        pos(850, 110),
        area(),
        "largeEmptyPicture",
      ]);
      add([
        sprite("empty-picture"),
        scale(2.4),
        pos(950, 140),
        area(),
        "smallEmptyPicture",
      ]);
      add([sprite("books-on-chair"), scale(2.2), pos(710, 370)]);
    });

    onClick('largeEmptyPicture', (largeEmptyPicture) => {
      textBubble([['There are so much dust on the picture']]);
      if (window.selectedItem == 'rag') {
        largeEmptyPicture.destroy();
        const pictureOneWithNumber = add([
          sprite('painting-one-with-number'),
          scale(2.7),
          pos(850, 110),
        ]);
        textBubble([['Something displayed on the picture']]);
      }
    });

    onClick('smallEmptyPicture', (smallEmptyPicture) => {
      textBubble([['There are so much dust on the picture']]);
      if (window.selectedItem == 'rag') {
        smallEmptyPicture.destroy();
        const pictureTwoWithNumber = add([
          sprite('painting-two-with-number'),
          scale(2.4),
          pos(950, 140),
        ]);
        textBubble([['Something displayed on the picture']]);
      }
    });
    roomNavArrows(viewDirection);
  });
  // ======================================================== //
  scene(roomName + "Down", () => {
    window.roomName = roomName;
    window.viewDirection = "Down";
    onLoad(() => {
      add([sprite("room-three-background-side"), scale(1), area()]);
      add([sprite("orange-carpet"), scale(3), pos(800, 400)]);
      add([sprite("makeup-table"), scale(6), pos(120, 230)]);
      add([sprite("clothset"), scale(6), pos(400, 200)]);
      add([sprite("cycle-chair"), scale(3.5), pos(165, 400)]);
      add([sprite("land-scape-painting"), scale(3), pos(600, 120)]);
      add([sprite("red-flower"), scale(3.5), pos(1200, 300)]);
    });
    roomNavArrows(viewDirection);
  });
  // ======================================================== //
  scene(roomName + "Left", () => {
    window.roomName = roomName;
    window.viewDirection = "Left";
    onLoad(() => {
      add([sprite("room-three-background-side"), scale(1), area()]);
      add([sprite("orange-big-carpet"), scale(3), pos(200, 350)]);
      add([sprite("toy"), scale(3.5), pos(220, 380)]);
      add([sprite("ball"), scale(3.5), pos(500, 480)]);
      add([sprite("another-painting"), scale(3), pos(600, 120)]);
      add([sprite("white-flowers"), scale(3), pos(650, 300)]);
      add([sprite("seats"), scale(3), pos(1200, 400)]);
      add([sprite("door2"), pos(875, 75), scale(1.3), area(), "door2"]);
      add([sprite("orange-passcode-button"), scale(0.17), pos(1050, 140)]);
    });

    const cuteGhost = add([
      sprite("cuteGhost"), 
      scale(5), 
      pos(60, 280), 
      area(),
      "cuteGhost"
    ]);
    onClick("cuteGhost", (cuteGhost) => {
      cuteGhost.play('move', { loop: true });
      setGameState(roomName, "ghostMoved", true)
      textBubble([['Hello, hurry up and find the passcode before you end up like me.']])
    })

    if (getGameState(roomName, "ghostMoved")) {
      cuteGhost.play('move', { loop: true });
    }
    
    onClick("door2", () => {
      textBubble([["The door locked behind you. Please enter a passcode to exit."]]);
      const input = add([
        pos(1057, 140),
        text("", {
          font: "apl386",
          size: 20,
          width: 200,
        }),
      ]);
      onCharInput((ch) => {
        input.text += ch;
      });
      onKeyPressRepeat("backspace", () => {
        input.text = input.text.substring(0, input.text.length - 1);
      });

      onKeyPressRepeat('enter', () => {
        if (input.text === '0815') {
          textBubble([['Passcode is correct, enter the next room']]);
          go('secondFloorHallwayDown');
        } else {
          input.text = "";
          textBubble([["Passcode is incorrect, try again"]]);
          // maybe the ghost show up
        }
      });
    });
    roomNavArrows(viewDirection);
  });
  // ======================================================== //
};
