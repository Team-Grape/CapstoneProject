import {
  getCurrentRoom,
  setOnTitleScene,
  clearLocalStorage,
  getOption,
  setOption,
} from "../core";

import { displayInventoryDiv } from "../inventory";

import MusicManager from "../MusicManager";

export const titleScene = () => {
  const music = MusicManager()
  scene("title", () => {
    music.stop()
    setOnTitleScene(true);
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
      setOnTitleScene(false);
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
        setOnTitleScene(false);
        displayInventoryDiv();
        const room = getCurrentRoom()
        go(room);
      });
    }

    onClick("startNewGame", () => {
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
          go('title')
        });

        onClick("yes", () => {
         startNewGame()
        });

      } else {
        startNewGame()
      }
    });

    onClick("options", () => {
      go("options");
    });
  });
};
