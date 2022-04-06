import { clearLocalStorage, setGameState, getGameState } from "./state";
import { removeInventoryDiv } from "./inventory";
import { changeComponentColor } from "./changeColor";
import { playSFX } from "./sounds";
import { navArrows, destroyNavArrows } from "./buttons"
import { debugRectSize } from "./debug"
import _J from 'json-url';
const codec = _J('lzstring');
//import * as J from 'json-url/dist/browser/json-url.js'
//import J from 'json-url/dist/browser/json-url.js'
//import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


// ==================== In Game Menu ====================================== //

export class InGameMenu {
  constructor() {
    this.continueButton = 0;
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
    this.createMenuButton();
    onClick("menu-button", (menuButton) => {
      //debugRectSize();
      const isMenuOpen = JSON.parse(window.localStorage.getItem("menuIsOpen"));
      if (!isMenuOpen) {
        window.localStorage.setItem("menuIsOpen", true);
        playSFX("click");
        this.open();
      }
    });
  }

  open() {
//    destroyNavArrows()
    let gameMenu = add([
      pos(1070, 50),
      rect(160, 220),
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

    const githubLink = add([
      text("GitHub", { size: 20, font: "sinko" }),
      pos(1120, 235),
      "github"
    ])

    const githubLogo = add([
      sprite("github"),
      scale(.07),
      pos(1030, 205),
      "githubLogo"
    ])

    const githubLogoBox = add([
      rect(135,30),
      pos(1080, 230),
      opacity(0),
      area(),
      "githubLogoBox"
    ])

    onClick("continue", () => {
      playSFX("click");
      this.close([
        gameMenu,
        continueButton,
        optionsButton,
        saveAsURL,
        saveAndQuit,
        githubLink,
        githubLogo,
        githubLogoBox
      ]);
      window.localStorage.setItem("menuIsOpen", false);
//      if (window.viewDirection === 'singleViewRoom') {
//        navArrows()
//      }
       
    });

    onClick("restart", () => {
      playSFX("click");
      this.close([
        gameMenu,
        continueButton,
        optionsButton,
        saveAsURL,
        saveAndQuit,
        githubLink,
        githubLogo,
        githubLogoBox
      ]);
      this.restart();
      window.localStorage.setItem("menuIsOpen", false);
    });

    onClick("options", () => {
      playSFX("click");
      removeInventoryDiv();
      go("options");
      window.localStorage.setItem("menuIsOpen", false);
    });

    onClick("saveAndQuit", () => {
      playSFX("click");
      this.close([
        gameMenu,
        continueButton,
        optionsButton,
        saveAsURL,
        saveAndQuit,
        githubLink,
        githubLogo,
        githubLogoBox
      ]);
      this.saveAndQuit();
      window.localStorage.setItem("menuIsOpen", false);
    });

    onClick("saveAsURL", async () => {
      playSFX("click");
      let tmpObj = {}
      const LS = {...localStorage}

      Object.keys(LS).map((keyStr, idx) => {
        try {
          tmpObj[keyStr] = JSON.parse(LS[keyStr])
        } catch (e) {
          tmpObj[keyStr] = LS[keyStr]
        } finally {
        }
      })
 
      const compressedLS = await codec.compress(tmpObj)
      const decompressedLS = await codec.decompress(compressedLS)


      const shareURL = window.location.origin + window.location.pathname + "?s=" + compressedLS;
      window.prompt("Copy to clipboard: Ctrl+C, Enter", shareURL);
      this.close([
        gameMenu,
        continueButton,
        optionsButton,
        saveAsURL,
        saveAndQuit,
        githubLink,
        githubLogo,
        githubLogoBox
      ]);
    });
    
    onClick("githubLogoBox", () => {
      playSFX("click");
      window.open("https://github.com/Team-Grape/CapstoneProject")
      this.close([
        gameMenu,
        continueButton,
        optionsButton,
        saveAsURL,
        saveAndQuit,
        githubLink,
        githubLogo,
        githubLogoBox
      ]);
      window.localStorage.setItem("menuIsOpen", false);
    })
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
      playSFX("click");
      this.close([areYouSurePrompt, areYouSureText, yes, no]);
      window.localStorage.setItem("menuIsOpen", false);
    });

    onClick("yes", () => {
      window.localStorage.setItem("menuIsOpen", false);
      playSFX("click");
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

  const saveAndQuit = add([
    text("Save\nand Quit", { size: 20, font: "sinko" }),
    pos(1080, 135),
    area(),
    "saveAndQuit",
  ]);

  onClick("continue", () => {
    playSFX("click");
    closeMenu([
      gameMenu,
      continueButton,
      optionsButton,
      saveAndQuit,
    ]);
    window.localStorage.setItem("menuIsOpen", false);
  });

  onClick("options", () => {
    playSFX("click");
    removeInventoryDiv();
    go("options");
    window.localStorage.setItem("menuIsOpen", false);
  });

  onClick("saveAndQuit", () => {
    playSFX("click");
    this.close([
      gameMenu,
      continueButton,
      optionsButton,
      saveAndQuit,
    ]);
  });
}

export function createInGameMenu() {
  add([sprite("menu-button"), pos(1150, 10), scale(1), area(), "menu-button"]);

  onClick("menu-button", () => {
    const isMenuOpen = JSON.parse(window.localStorage.getItem("menuIsOpen"));
    if (!isMenuOpen) {
      window.localStorage.setItem("menuIsOpen", true);
      playSFX("click");
      createMenuButtons();
    }
  });
}
