import kaboom from "kaboom";
import { loadAllSprites } from "./sprites";
import { loadAllSounds } from "./sounds";
import { entry } from "./scenes/00-entry";
import { titleScene } from "./scenes/00-title";
import { options } from "./scenes/00-options";
import { winScene } from "./scenes/00-win";
import { createBasementRoomOne } from "./scenes/01-basement";
import { createBasementRoomTwo } from "./scenes/02-basement";
import { createBasementRoomThree } from "./scenes/03-room";
import { createBasementHallway } from './scenes/03-basementHallway.js'


kaboom({
  global: true,
  width: 1246,
  height: 546,
  stretch: true,
  letterbox: true,
  scale: 1,
  debug: true,
  background: [35, 35, 35],
});


// initialize components
loadAllSprites();
loadAllSounds();

entry();
titleScene();
options();
winScene();

createBasementRoomOne();
createBasementRoomTwo();
createBasementRoomThree();
createBasementHallway();

go("entry");
