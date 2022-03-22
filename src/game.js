import kaboom from "kaboom";
import { titleScene } from "./scenes/00-title.js";
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

// initializes or resets inventory in local storage
window.localStorage.setItem("inventory", JSON.stringify([]));

// initializes or resets gameState in local storage
window.localStorage.setItem("gameState", JSON.stringify({}));

// initializes or resets messageLog in local storage
window.localStorage.setItem("messageLog", JSON.stringify([]));

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

//Buttons
loadSprite("menu-button", "./assets/buttons/menuButtonGray.png");
loadSprite("start-button", "./assets/buttons/startButton.png");

// initialize components
// function unlockAudioContext(audioCtx) {
//     if (audioCtx.state !== "suspended") return;
//     const b = document.body;
//     const events = ["touchstart", "touchend", "mousedown", "keydown"];
//     events.forEach((e) => b.addEventListener(e, unlock, false));
//     function unlock() {
//       audioCtx.resume().then(clean);
//     }
//     function clean() {
//       events.forEach((e) => b.removeEventListener(e, unlock));
//     }
  
// }



// function unlockAudioContext(audioCtx) {
//   if (audioCtx.state === 'suspended') {
//     var events = ['touchstart', 'touchend', 'mousedown', 'keydown'];
//     var unlock = function unlock() {
//       events.forEach(function (event) {
//         document.body.removeEventListener(event, unlock)
//       });
//       audioCtx.resume();
//     };

//     events.forEach(function (event) {
//       document.body.addEventListener(event, unlock, false)
//     });
//   }
// }
// const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
// unlockAudioContext(audioCtx);

titleScene();
winScene();

createBasementRoomOne();
createBasementRoomTwo();
thirdRoom();

go("basementRoomTwoUp");
// go("title");
