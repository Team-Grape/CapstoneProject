import * as K from './lib/kaboom.js'
import { titleScene } from "./scenes/00-title.js"
import { winScene } from "./scenes/00-win.js"
import { basementFirstRoom } from "./scenes/01-basement.js"
import { basementSecondRoom } from "./scenes/02-basement.js"

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

loadSprite('drawer', '../assets/drawer.png');
loadSprite('background-tile', '../assets/basementTemplate.png');
loadSprite('door', '../assets/evilDoor.png');
loadSprite('key', '../assets/key_gold.png');
loadSprite('room-two-background', '../assets/roomTwoBackground.png');
loadSprite('room-two-background-right', '../assets/roomTwoRightLeft.png');
loadSprite('room-two-background-left', '../assets/roomTwoRightLeft.png');
loadSprite('right-arrow', '../assets/rightArrow.png');
loadSprite('left-arrow', '../assets/leftArrow.png');
loadSprite("up-arrow", "../assets/upArrow.png");
loadSprite("down-arrow", "../assets/downArrow.png");
loadSprite('fruit-painting', '../assets/fruitPainting.png');
loadSprite('bookcase', './assets/bookcase.png');
loadSprite('turn-right-arrow', '../assets/turn-right-arrow.png')
loadSprite('turn-left-arrow', '../assets/turn-left-arrow.png')
loadSprite('small-window', '../assets/small-window.png')
loadSprite('pile-of-bones', '../assets/pileOfBones.png')
loadSprite('chained-skeleton', '../assets/chainedSkeleton.png')


// initialize components
titleScene();
winScene();
basementFirstRoom();
basementSecondRoom();

go("title");
