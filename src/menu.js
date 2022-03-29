import { clearLocalStorage } from "./state";
import { removeInventoryDiv } from "./inventory";
import { changeComponentColor } from "./changeColor";
import { playSFX } from "./sounds";

// ==================== In Game Menu ====================================== //

export class InGameMenu {
  display() {
    add([
      sprite("menu-button"),
      pos(1150, 10),
      scale(1),
      area(),
      "menu-button",
    ]);
    onClick("menu-button", () => {
      playSFX('click')
      this.open();
    });
  }

  open() {
    const gameMenu = add([
      pos(1070, 50),
      rect(160, 150),
      outline(4),
      color(100, 100, 100),
      area(),
    ]);
    const continueButton = add([
      text("Continue", { size: 20, font: "sink" }),
      pos(1080, 60),
      color(255, 255, 255),
      area(),
      "continue",
    ]);
    const optionsButton = add([
      text("Options", { size: 20, font: "sink" }),
      pos(1080, 100),
      color(255, 255, 255),
      area(),
      "options",
    ]);
    // const restartButton = add([
    //   text("Restart", { size: 20, font: "sink" }),
    //   pos(1080, 140),
    //   area(),
    //   "restart",
    // ]);

    const saveAndQuit = add([
      text("Save\nand Quit", { size: 20, font: "sink" }),
      pos(1080, 135),
      area(),
      "saveAndQuit",
    ]);

    onClick("continue", () => {
      playSFX('click')
      this.close([
        gameMenu,
        continueButton,
        // restartButton,
        optionsButton,
        saveAndQuit,
      ]);
    });

    onClick("restart", () => {
      playSFX('click')
      this.close([
        gameMenu,
        continueButton,
        // restartButton,
        optionsButton,
        saveAndQuit,
      ]);
      this.restart();
    });

    onClick("options", () => {
      playSFX('click')
      removeInventoryDiv();
      go("options");
    });

    onClick("saveAndQuit", () => {
      playSFX('click')
      this.close([
        gameMenu,
        continueButton,
        // restartButton,
        optionsButton,
        saveAndQuit,
      ]);
      this.saveAndQuit();
    });
  }

  close(arrayOfComponents) {
    arrayOfComponents.forEach((component) => component.destroy());
  }

  restart() {
    this.areYouSure("restart");
  }

  saveAndQuit() {
    this.areYouSure("saveAndQuit");
  }

  areYouSure(actionType) {
    const areYouSurePrompt = add([
      pos(430, 100),
      rect(350, 100),
      color(0, 0, 255),
      outline(4),
      area(),
      color(100, 100, 100),
    ]);
    const areYouSureText = add([
      text("Are You Sure?", { size: 40 }),
      pos(450, 105),
      area(),
      "are-you-sure",
    ]);
    const yes = add([text("Yes", { size: 30 }), pos(480, 150), area(), "yes"]);
    const no = add([text("No", { size: 30 }), pos(670, 150), area(), "no"]);

    onClick("no", () => {
      playSFX('click')
      this.close([areYouSurePrompt, areYouSureText, yes, no]);
    });

    onClick("yes", () => {
      playSFX('click')
      if (actionType === "restart") {
        clearLocalStorage();
        removeInventoryDiv();
        go("basementRoomOneUp");
      } else {
        removeInventoryDiv();
        go("title");
      }
    });
  }
}
