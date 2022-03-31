import { clearLocalStorage, setGameState, getGameState } from "./state";
import { removeInventoryDiv } from "./inventory";
import { changeComponentColor } from "./changeColor";
import { playSFX } from "./sounds";

// ==================== In Game Menu ====================================== //

export class InGameMenu {
  constructor() {
    this.continueButton = 0
  }

  createMenuButton() {
    add([
      sprite("menu-button"),
      pos(1150, 10),
      scale(1),
      area(),
      "menu-button",
    ]);
  }

  display() {
    this.createMenuButton()
    onClick("menu-button", (menuButton) => {
      const isMenuOpen = JSON.parse(window.localStorage.getItem('menuIsOpen'))
      if (!isMenuOpen) {
        window.localStorage.setItem('menuIsOpen', true)
        playSFX('click')
        this.open();
      }
     
   
      
      //  else {
      //   window.localStorage.setItem('menuIsOpen', false)
      //   this.close([
      //     continueButton,
      //     optionsButton,
      //     saveAndQuit,
      //   ]);
      // }
      //  console.log('clicked')
    });
  }

  // isOpen() {
  //  return window.localStorage.getItem('menuIsOpen')
  // }

  open() {
    let gameMenu = add([
      pos(1070, 50),
      rect(160, 180),
      outline(4),
      color(100, 100, 100),
      area(),
    ]);
    let continueButton = add([
      text("Continue", { size: 20, font: "sinko" }),
      pos(1080, 60),
      color(255, 255, 255),
      area(),
      "continue",
    ]);
    const optionsButton = add([

      text("Options", { size: 20, font: "sinko" }),
      pos(1080, 100),

      color(255, 255, 255),
      area(),
      "options",
    ]);
  
    // const restartButton = add([
    //   text("Restart", { size: 20, font: "sinko" }),
    //   pos(1080, 140),
    //   area(),
    //   "restart",
    // ]);

  const saveAsURL = add([
    text("Save Game\nas URL", { size: 20, font: "sinko" }),
    pos(1080, 130),
    area(),
    "saveAsURL",
  ]);

    const saveAndQuit = add([

      text("Save\nand Quit", { size: 20, font: "sinko" }),
      pos(1080, 180),

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
        saveAsURL,
        saveAndQuit,
      ]);
      window.localStorage.setItem('menuIsOpen', false)
    });

    onClick("restart", () => {
      playSFX('click')
      this.close([
        gameMenu,
        continueButton,
        // restartButton,
        optionsButton,
        saveAsURL,
        saveAndQuit,
      ]);
      this.restart();
      window.localStorage.setItem('menuIsOpen', false)
    });

    onClick("options", () => {
      playSFX('click')
      removeInventoryDiv();
      go("options");
      window.localStorage.setItem('menuIsOpen', false)
    });

    onClick("saveAndQuit", () => {
      playSFX('click')
      this.close([
        gameMenu,
        continueButton,
        // restartButton,
        optionsButton,
        saveAsURL,
        saveAndQuit,
      ]);
      this.saveAndQuit();
      window.localStorage.setItem('menuIsOpen', false)
    });

    onClick("saveAsURL", () => {
      playSFX('click')
      const shareURL = window.location.origin + '/?s=' + encodeURIComponent(JSON.stringify({ ...localStorage }));
      console.log("Save URL: ", shareURL)
      window.prompt("Copy to clipboard: Ctrl+C, Enter", shareURL);
      this.close([
        gameMenu,
        continueButton,
        // restartButton,
        optionsButton,
        saveAsURL,
        saveAndQuit,
      ]);
    });

  }


  close(arrayOfComponents) {
    console.log('close')
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
      window.localStorage.setItem('menuIsOpen', false)
    });

    onClick("yes", () => {
      window.localStorage.setItem('menuIsOpen', false)
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


// ================ Below is some test code to try to fix the clicking bug ========= //

function closeMenu(arrayOfComponents) {
  arrayOfComponents.forEach((component) => component.destroy());
}

function createMenuButtons() {
  console.log('menu buttons created')
  let gameMenu = add([
    pos(1070, 50),
    rect(160, 150),
    outline(4),
    color(100, 100, 100),
    area(),
  ]);
  let continueButton = add([
    text("Continue", { size: 20, font: "sinko" }),
    pos(1080, 60),
    color(255, 255, 255),
    area(),
    "continue",
  ]);
  const optionsButton = add([
    text("Options", { size: 20, font: "sinko" }),
    pos(1080, 100),
    color(255, 255, 255),
    area(),
    "options",
  ]);

  // const restartButton = add([
  //   text("Restart", { size: 20, font: "sinko" }),
  //   pos(1080, 140),
  //   area(),
  //   "restart",
  // ]);


  const saveAndQuit = add([
    text("Save\nand Quit", { size: 20, font: "sinko" }),
    pos(1080, 135),
    area(),
    "saveAndQuit",
  ]);

  onClick("continue", () => {
    playSFX('click')
    closeMenu([
      gameMenu,
      continueButton,
      // restartButton,
      optionsButton,
      saveAndQuit,
    ]);
    window.localStorage.setItem('menuIsOpen', false)
  });

  // onClick("restart", () => {
  //   playSFX('click')
  //   this.close([
  //     gameMenu,
  //     continueButton,
  //     // restartButton,
  //     optionsButton,
  //     saveAndQuit,
  //   ]);
  //   this.restart();
  //   window.localStorage.setItem('menuIsOpen', false)
  // });

  onClick("options", () => {
    playSFX('click')
    removeInventoryDiv();
    go("options");
    window.localStorage.setItem('menuIsOpen', false)
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
  })
}




export function createInGameMenu() {
  add([
    sprite("menu-button"),
    pos(1150, 10),
    scale(1),
    area(),
    "menu-button",
  ]);

  onClick('menu-button', () => {
    const isMenuOpen = JSON.parse(window.localStorage.getItem('menuIsOpen'))
      if (!isMenuOpen) {
        window.localStorage.setItem('menuIsOpen', true)
        playSFX('click')
        createMenuButtons()
      }
  })
}
