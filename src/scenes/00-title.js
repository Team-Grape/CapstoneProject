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
    stopBGM();
    playBGM("title");
    window.onTitleScene = true;
    add([
      text("Haunted House Adventure Game"),
      color(255, 255, 255),
      pos(width() / 2, 100),
      origin("center"),
    ]);

    const optionsButton = add([
      text("Options"),
      color(255, 0, 0),
      pos(width() / 2, 400),
      origin("center"),
      area(),
      "options",
    ]);

    const startNewGameButton = add([
      text("Start New Game"),
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
        text("Continue"),
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
            "Starting a new game will erase your old save. \n \n Are you sure you want to proceed?",
            { size: 40 }
          ),
          color(255, 0, 0),
          pos(width() / 2, 250),
          origin("center"),
          area(),
          "areYouSure",
        ]);
        const yes = add([
          text("Yes", { size: 50 }),
          pos(480, 370),
          area(),
          "yes",
        ]);
        const no = add([text("No", { size: 50 }), pos(670, 370), area(), "no"]);

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
      stopBGM();
      go("options");
    });
  });
};
