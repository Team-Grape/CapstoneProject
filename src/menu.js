
// ==================== In Game Menu ====================================== //

export class InGameMenu {
  constructor() {
    this.backgroundMusicVolume = 0,
    this.soundEffectsVolume = 0
  }

  display() {
    add([
      sprite("menu-button"),
      pos(1150, 10),
      scale(1),
      area(),
      "menu-button",
    ]);
    onClick("menu-button", () => {
      this.open();
    });
  }

  open() {
    const gameMenu = add([
      pos(1070, 50),
      rect(160, 120),
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
    const restartButton = add([
      text("Restart", { size: 20, font: "sink" }),
      pos(1080, 140),
      area(),
      "restart",
    ]);

    onClick("continue", () => {
      this.close([gameMenu, continueButton, optionsButton, restartButton]);
    });

    onClick("restart", () => {
      this.close([gameMenu, continueButton, optionsButton, restartButton]);
      this.restart();
    });

    onClick("options", () => {
      go('options')
    });
  }

  close(arrayOfComponents) {
    arrayOfComponents.forEach(component => component.destroy())
  }

  restart() {
    const restartPrompt = add([
      pos(430, 100),
      rect(350, 100),
      color(0, 0, 255),
      outline(4),
      area(),
      color(100, 100, 100),
    ]);
    const areYouSure = add([
      text("Are You Sure?", { size: 40 }),
      pos(450, 105),
      area(),
      "are-you-sure",
    ]);
    const yes = add([text("Yes", { size: 30 }), pos(480, 150), area(), "yes"]);
    const no = add([text("No", { size: 30 }), pos(670, 150), area(), "no"]);

    onClick("no", () => {
      this.close([restartPrompt, areYouSure, yes, no])
    });

    onClick("yes", () => {
      // We do not want to reset the options key in our
      // local storage because we want options to persist
      window.localStorage.setItem("gameState", JSON.stringify({}));
      window.localStorage.setItem("inventory", JSON.stringify([]));
      go("title");
    });
  }
}

// ==================== Change Color ===============================//
/* Below is some basic functionality I wrote for changing 
the color of a component. I also have a 'onHover' function that 
is commented out below which calls that function. It works
but it does not revert the color when the mouse is no longer hovering
*/

export function changeComponentColor(componentName, red, green, blue) {
  componentName.color.r = red;
  componentName.color.g = green;
  componentName.color.b = blue;
}

// onHover("continue", () => {
//   changeComponentColor(continueButton, 246, 207, 27);
//   // maybe write some if logic so that color reverts
//   // return changeComponentColor(continueButton, 0, 0, 0)
// });