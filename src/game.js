import kaboom from 'kaboom';
import { loadAllSprites } from './sprites';
import { loadAllSounds } from './sounds';
import { entry } from './scenes/00-entry';
import { titleScene } from './scenes/00-title';
import { options } from './scenes/00-options';
import { winScene } from './scenes/00-win';
import { gameover } from "./scenes/00-gameover"
import { createBasementRoomOne } from './scenes/01-basement';
import { createBasementRoomTwo } from './scenes/02-basement';
import { createBasementRoomThree } from './scenes/03-room';
import { createBedroom } from './scenes/04-bedroom';
import { createBasementHallway } from './scenes/03-basementHallway.js'
import { createLibrary } from './scenes/firstFloor/02-library'


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
gameover();

createBasementRoomOne();
createBasementRoomTwo();
createBasementRoomThree();
createBedroom();
createBasementHallway();
createLibrary()

go('entry');
