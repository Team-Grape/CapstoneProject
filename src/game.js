
import kaboom from 'kaboom'
import { entry } from "./scenes/00-entry.js";
import { titleScene } from './scenes/00-title.js';
import { options } from './scenes/00-options.js'
import { winScene } from "./scenes/00-win.js";
import { createBasementRoomOne } from './scenes/01-basement.js';
import { createBasementRoomTwo } from './scenes/02-basement.js';
import { createBasementRoomThree } from './scenes/03-room.js';
import { createTestScene } from './scenes/00-test.js';

kaboom({
  global: true,
  width: 1246,
  height: 546,
  scale: 1,
  debug: true,
  background: [35, 35, 35],
});

//Nav Arrows
loadSprite('left-arrow', './assets/nav_arrows/leftArrow.png');
loadSprite('right-arrow', './assets/nav_arrows/rightArrow.png');
loadSprite('up-arrow', './assets/nav_arrows/upArrow.png');
loadSprite('down-arrow', './assets/nav_arrows/downArrow.png');

//Room Backgrounds
loadSprite(
  'room-two-background',
  './assets/room_backgrounds/basement/roomTwoBackground.png'
);
loadSprite(
  'room-two-background-right',
  './assets/room_backgrounds/basement/roomTwoRightLeft.png'
);
loadSprite(
  'room-two-background-left',
  './assets/room_backgrounds/basement/roomTwoRightLeft.png'
);
loadSprite(
  'background-tile',
  './assets/room_backgrounds/basement/basementTemplate.png'
);
loadSprite(
  'room-three-background',
  './assets/room_backgrounds/roomThreeBackground.png'
);
loadSprite(
  'room-three-background-side',
  './assets/room_backgrounds/roomThreeBackgroundSide.png'
);

//Decorations
loadSprite("fruit-painting", "./assets/decorations/fruitPainting.png");
loadSprite("bookcase", "./assets/decorations/bookcase.png");
loadSprite("pile-of-bones", "./assets/decorations/pileOfBones.png");
loadSprite("help-me", "./assets/decorations/helpMe.png");
loadSprite("cob-webs", "./assets/decorations/cobweb_down_right.png");
loadSprite("grandfather-clock", "./assets/decorations/grandfatherClock.png");
loadSprite("table", "./assets/decorations/longTable_dark_brown.png");
loadSprite("candle", "./assets/decorations/wallMountedCandleHolder_brown.png");

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
loadSound("bookcaseMoving", "./assets/sounds/bookcaseMoving.wav");
loadSound("spooky", "./assets/sounds/spookyBgMusic.mp3");
loadSound("kidMusic", "./assets/sounds/kidMusic.wav");




// set global volume
volume(1.5) // hardcoded to 50% based of Kaboom docs. 1.5 out of 3

//Buttons

loadSprite("menu-button", "./assets/buttons/menuButtonGray.png");
loadSprite("start-button", "./assets/buttons/startButton.png");

/////////////////////////////////////////////////////////////////////////////////
loadSprite('orange-carpet', './assets/decorations/orangecarpet.png');
loadSprite('flower-painting', './assets/decorations/flowerpainting.png');
loadSprite('little-drawer', './assets/decorations/littledrawer.png');
loadSprite('flower', './assets/decorations/flower.png');
loadSprite('books', './assets/decorations/books.png');
loadSprite('pink-bed', './assets/decorations/pinkbed.png');
loadSprite('red-carpet', './assets/decorations/redcarpet.png');
loadSprite('deng', './assets/decorations/deng.png');
loadSprite('clock', './assets/decorations/clock.png');
loadSprite('opened-book', './assets/decorations/openedbook.png');
loadSprite('cycle-chair', './assets/decorations/cyclechair.png');
loadSprite('bookshelve', './assets/decorations/bookshelve.png');
loadSprite('empty-picture', './assets/decorations/emptypicture.png');
loadSprite('books-on-chair', './assets/decorations/booksonchair.png');
loadSprite('makeup-table', './assets/decorations/makeuptable.png');
loadSprite('clothset', './assets/decorations/clothset.png');
loadSprite('land-scape-painting', './assets/decorations/landscapepainting.png');
loadSprite('red-flower', './assets/decorations/redflower.png');
loadSprite('orange-big-carpet', './assets/decorations/orangebigcarpet.png');
loadSprite('toy', './assets/decorations/toy.png');
loadSprite('ball', './assets/decorations/ball.png');
loadSprite('another-painting', './assets/decorations/anotherpainting.png');
loadSprite('white-flowers', './assets/decorations/whiteflowers.png');
loadSprite('seats', './assets/decorations/seats.png');
loadSprite('wood-door', './assets/decorations/wooddoor.png');

/////////////////////////////////////////////////////////////////////////////////

// initialize components
entry()
titleScene();
options()
winScene();

createBasementRoomOne();
createBasementRoomTwo();
createBasementRoomThree();
createTestScene();

//go("basementRoomTwoUp");

//go("entry");
go("test");

