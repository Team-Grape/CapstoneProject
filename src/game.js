import * as K from './lib/kaboom.js'
import { titleScene } from "./scenes/00-title.js"
import { winScene } from "./scenes/00-win.js"
import { createBasementRoomOne } from "./scenes/01-basement.js"
import { createBasementRoomTwo } from "./scenes/02-basement.js"

kaboom({
  global: true,
  width: 1246,
  height: 546,
  scale: 1,
  debug: true,
  background: [35, 35, 35],
});

// initializes or resets inventory in local storage
window.localStorage.setItem("inventory", JSON.stringify([]));

// initializes or resets gameState in local storage
window.localStorage.setItem("gameState", JSON.stringify({}));

//Nav Arrows
loadSprite('left-arrow', './assets/nav_arrows/leftArrow.png');
loadSprite('right-arrow', './assets/nav_arrows/rightArrow.png');
loadSprite("up-arrow", "./assets/nav_arrows/upArrow.png");
loadSprite("down-arrow", "./assets/nav_arrows/downArrow.png");

//Room Backgrounds
loadSprite('room-two-background', './assets/room_backgrounds/basement/roomTwoBackground.png');
loadSprite('room-two-background-right', './assets/room_backgrounds/basement/roomTwoRightLeft.png');
loadSprite('room-two-background-left', './assets/room_backgrounds/basement/roomTwoRightLeft.png');
loadSprite('background-tile', './assets/room_backgrounds/basement/basementTemplate.png');

//Decorations
loadSprite('fruit-painting', './assets/decorations/fruitPainting.png');
loadSprite('bookcase', './assets/decorations/bookcase.png');
loadSprite('pile-of-bones', './assets/decorations/pileOfBones.png')

//Misc. Objects/Items
loadSprite('drawer', './assets/drawer.png');
loadSprite('door', './assets/evilDoor.png');
loadSprite('key', './assets/key_gold.png');
loadSprite('basement-window', './assets/basementWindow.png')
loadSprite('chained-skeleton', './assets/chainedSkeleton.png')


// initialize components
titleScene();
winScene();
createBasementRoomOne();
createBasementRoomTwo();

go("title");
