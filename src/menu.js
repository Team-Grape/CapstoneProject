import { clearLocalStorage, setGameState, getGameState } from "./state";
import { removeInventoryDiv } from "./inventory";
import { changeComponentColor } from "./changeColor";
import { playSFX } from "./sounds";
import { navArrows, destroyNavArrows } from "./buttons"
import { debugRectSize } from "./debug"
import { makeSceneClickable, makeSceneUnclickable } from "./bubbling"
import { fadeOutOpacity } from "./sprites"
import _J from 'json-url';
const codec = _J('lzstring');


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
      const isMenuOpen = JSON.parse(window.localStorage.getItem("menuIsOpen"));
      if (!isMenuOpen) {
        window.localStorage.setItem("menuIsOpen", true);
        playSFX("click");
        this.open();
      }
    });
  }


  open() {
    makeSceneUnclickable();

    // invisible box to the left of menu
    add([
      rect(width() - (width() - 1070), height()),
      pos(0,0),
      opacity(0),
      area(),
      "continue",
      "gameMenuBox"
    ])
    // invisible box above menu
    add([
      rect(width() - 1070, 50),
      pos(1070,0),
      opacity(0),
      area(),
      "continue",
      "gameMenuBox"
    ])
    // invisible box below menu
    add([
      rect(width() - 1070, height() - 260),
      pos(1070,260),
      opacity(0),
      area(),
      "continue",
      "gameMenuBox"
    ])

    let gameMenu = add([
      pos(1070, 50),
      rect(160, 210),
      outline(4),
      color(100, 100, 100),
      "gameMenuBox"
    ]);
    let continueButton = add([
      text("Continue", { size: 20, font: "sinko" }),
      pos(1080, 60),
      color(255, 255, 255),
      area(),
      "continue",
      "gameMenuBox"
    ]);
    const optionsButton = add([
      text("Options", { size: 20, font: "sinko" }),
      pos(1080, 90),
      color(255, 255, 255),
      area(),
      "options",
      "gameMenuBox"
    ]);

    const saveAsURL = add([
      text("Save Game\nas URL", { size: 20, font: "sinko" }),
      pos(1080, 120),
      area(),
      "saveAsURL",
      "gameMenuBox"
    ]);

    const saveAndQuit = add([
      text("Save\nand Quit", { size: 20, font: "sinko" }),
      pos(1080, 170),
      area(),
      "saveAndQuit",
      "gameMenuBox",
    ]);

    const githubLink = add([
      text("GitHub", { size: 20, font: "sinko" }),
      pos(1120, 225),
      "github",
      "gameMenuBox"
    ])

    const githubLogo = add([
      sprite("github"),
      scale(.07),
      pos(1030, 195),
      "githubLogo",
      "gameMenuBox"
    ])

    const githubLogoBox = add([
      rect(135,30),
      pos(1080, 220),
      opacity(0),
      area(),
      "githubLogoBox",
      "gameMenuBox"
    ])

    onClick("continue", () => {
      playSFX("click");
      every("gameMenuBox", destroy);
      window.localStorage.setItem("menuIsOpen", false);
      makeSceneClickable();
    });

    onClick("restart", () => {
      playSFX("click");
      every("gameMenuBox", destroy);
      this.restart();
      window.localStorage.setItem("menuIsOpen", false);
    });

    onClick("options", () => {
      playSFX("click");
      removeInventoryDiv();
      every("gameMenuBox", destroy);
      window.localStorage.setItem("menuIsOpen", false);
      go("options");
    });

    onClick("saveAndQuit", () => {
      playSFX("click");
      every("gameMenuBox", destroy);
      window.localStorage.setItem("menuIsOpen", false);
      this.saveAndQuit();
    });

    onClick("saveAsURL", async () => {
      playSFX("click");
      window.localStorage.setItem("menuIsOpen", false);
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
      //const decompressedLS = await codec.decompress(compressedLS)
      const shareURL = window.location.origin + window.location.pathname + "?s=" + compressedLS;
      //window.prompt("Copy to clipboard: Ctrl+C, Enter", shareURL);
      navigator.clipboard.writeText(shareURL)
      const copiedMessage = add([
        text("Copied URL\nto Clipboard ", { size: 45, font: 'sinko', letterSpacing: 4 }),
        pos(width()/2, 130),
        origin("center"),
      ]);
      fadeOutOpacity(copiedMessage, .125)
      every("gameMenuBox", destroy);
      makeSceneClickable();
    });
    
    onClick("githubLogoBox", () => {
      playSFX("click");
      window.open("https://github.com/Team-Grape/CapstoneProject")
      window.localStorage.setItem("menuIsOpen", false);
      every("gameMenuBox", destroy);
      makeSceneClickable();
    })
  }

  restart() {
    this.areYouSure("restart");
  }

  close(arrayOfComponents) {
    arrayOfComponents.forEach((component) => component.destroy());
    makeSceneClickable();
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
