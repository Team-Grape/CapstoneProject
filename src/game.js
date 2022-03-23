import kaboom from 'kaboom'
import { entry } from "./scenes/00-entry.js";
import { titleScene } from './scenes/00-title.js';
import { options } from './scenes/00-options.js'
import { winScene } from "./scenes/00-win.js";

import { createBasementRoomOne } from "./scenes/01-basement.js";
import { createBasementRoomTwo } from "./scenes/02-basement.js";
import { thirdRoom } from "./scenes/03-room.js";

kaboom({
  global: true,
  width: 1246,
  height: 546,
  scale: 1,
  debug: true,
  background: [35, 35, 35],
});



//Nav Arrows
loadSprite("left-arrow", "./assets/nav_arrows/leftArrow.png");
loadSprite("right-arrow", "./assets/nav_arrows/rightArrow.png");
loadSprite("up-arrow", "./assets/nav_arrows/upArrow.png");
loadSprite("down-arrow", "./assets/nav_arrows/downArrow.png");

//Room Backgrounds
loadSprite(
  "room-two-background",
  "./assets/room_backgrounds/basement/roomTwoBackground.png"
);
loadSprite(
  "room-two-background-right",
  "./assets/room_backgrounds/basement/roomTwoRightLeft.png"
);
loadSprite(
  "room-two-background-left",
  "./assets/room_backgrounds/basement/roomTwoRightLeft.png"
);
loadSprite(
  "background-tile",
  "./assets/room_backgrounds/basement/basementTemplate.png"
);
loadSprite(
  "room-three-background",
  "./assets/room_backgrounds/roomThreeBackground.png"
);

//Decorations
loadSprite("fruit-painting", "./assets/decorations/fruitPainting.png");
loadSprite("bookcase", "./assets/decorations/bookcase.png");
loadSprite("pile-of-bones", "./assets/decorations/pileOfBones.png");
loadSprite("dresser-with-candle", "./assets/decorations/dresserWithCandle.png");
loadSprite("help-me", "./assets/decorations/helpMe.png");
loadSprite("cob-webs", "./assets/decorations/cobWebs.png");
loadSprite("grandfather-clock", "./assets/decorations/grandfatherClock.png");

//Misc. Objects/Items
loadSprite("drawer", "./assets/drawer.png");
loadSprite("door", "./assets/evilDoor.png");
loadSprite("key", "./assets/key_gold.png");
loadSprite("basement-window", "./assets/basementWindow.png");
loadSprite("chained-skeleton", "./assets/chainedSkeleton.png");
loadSprite("woodenDoor", "./assets/woodenDoor.png");


//sounds
loadSound("falling", "./assets/sounds/paintingFalling.wav");
loadSound("horror", "./assets/sounds/horrorAmbiance.wav");
loadSound("gong", "./assets/sounds/clockGong.wav");

//Buttons
loadSprite('menu-button', './assets/buttons/menuButtonGray.png')
loadSprite('start-button', './assets/buttons/startButton.png')

// set global volume
volume(1.5) // hardcoded to 50% based of Kaboom docs. 1.5 out of 3

// initialize components

entry()
titleScene();
options()
winScene();

createBasementRoomOne();
createBasementRoomTwo();
thirdRoom();

//go("basementRoomTwoUp");
go("entry");
