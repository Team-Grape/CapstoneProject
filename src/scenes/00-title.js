import { displayInventoryDiv } from "../inventory";
import { playBGM, stopBGM, playSFX } from "../sounds";
import {
  getCurrentRoom,
  clearLocalStorage,
  getOption,
  setOption,
} from "../state";

export const titleScene = () => {
  scene("title", () => {
    playBGM("title");
    window.onTitleScene = true;
    add([
      text("HAUNTED MANSION ESCAPE ROOM", { size: 55, font: 'sinko', letterSpacing: 4 }),
      color(255, 255, 255),
      outline(10, WHITE),
      pos(width() / 2, 100),
      origin("center"),
      'title'
    ]);

    const optionsButton = add([
      text("Options", { size: 45, font: 'sinko' }),
      color(255, 0, 0),
      pos(width() / 2, 400),
      origin("center"),
      area(),
      "options",
    ]);

    const startNewGameButton = add([
      text("Start New Game", { size: 45, font: 'sinko' }),
      color(255, 0, 0),
      pos(width() / 2, 300),
      origin("center"),
      area(),
      "startNewGame",
    ]);

    let continueButton;

    function startNewGame() {
      clearLocalStorage();
      delete window.onTitleScene;
      stopBGM();
      go("basementRoomOneUp");
    }

    if (getCurrentRoom()) {
      continueButton = add([
        text("Continue", { size: 45, font: 'sinko' }),
        color(255, 0, 0),
        pos(width() / 2, 200),
        origin("center"),
        area(),
        "continue",
      ]);

      onClick("continue", () => {
        delete window.onTitleScene;
        displayInventoryDiv();
        const room = getCurrentRoom();
        playSFX('click')
        stopBGM();
        go(room);
      });
    }

    onClick("startNewGame", () => {
      playSFX('click')
      if (getCurrentRoom()) {
        optionsButton.destroy();
        continueButton.destroy();
        startNewGameButton.destroy();

        const areYouSure = add([
          text(
            "Starting a new game will \n erase your old save. \n \nAre you sure you want to proceed?",
            { size: 45, font: 'sinko' }
          ),
          color(255, 0, 0),
          pos(width() / 2, 250),
          origin("center"),
          area(),
          "areYouSure",
        ]);
        const yes = add([
          text("Yes", { size: 50, font: 'sinko' }),
          pos(480, 400),
          area(),
          "yes",
        ]);
        const no = add([text("No", { size: 50, font: 'sinko'  }), pos(670, 400), area(), "no"]);

        onClick("no", () => {
          playSFX('click')
          go("title");
        });

        onClick("yes", () => {
          playSFX('click')
          startNewGame();
        });
      } else {
        startNewGame();
      }
    });

    onClick("options", () => {
      playSFX('click')
      go("options");
    });
  });
};
