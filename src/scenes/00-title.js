import { 
  getCurrentRoom,
  setOnTitleScene,
  clearLocalStorage,
  getOption,
  setOption,
  displayInventoryDiv
} from "../core";

export const titleScene = () => {
  scene("title", () => {
    setOnTitleScene(true);
    add([
      text("Haunted House Adventure Game"),
      color(255, 255, 255),
      pos(width() / 2, 100),
      origin("center"),
    ]);

    add([
      text("Options"),
      color(255, 0, 0),
      pos(width() / 2, 400),
      origin("center"),
      area(),
      "options",
    ]);

    add([
      text("Start New Game"),
      color(255, 0, 0),
      pos(width() / 2, 300),
      origin("center"),
      area(),
      "startNewGame",
    ]);
 
    if (getCurrentRoom()) {
      add([
        text("Continue"),
        color(255, 0, 0),
        pos(width() / 2, 200),
        origin("center"),
        area(),
        "continue",
      ]);

      onClick("continue", () => {
        setOnTitleScene(false);
        displayInventoryDiv()
        go(getCurrentRoom());
      });
    }

    onClick("startNewGame", () => {
      clearLocalStorage();
      setOnTitleScene(false);
      go("basementRoomOneUp");
    });

    onClick("options", () => {
      go("options");
    });

 

  });
};
