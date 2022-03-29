import kaboom from 'kaboom';
import { loadAllSprites } from './sprites';
import { loadAllSounds } from './sounds';
import { createCursorDiv } from './inventory';
import { entry } from './scenes/00-entry';
import { titleScene } from './scenes/00-title';
import { options } from './scenes/00-options';
import { winScene } from './scenes/00-win';
import { gameover } from './scenes/00-gameover';

import { createBasementRoomOne } from './scenes/basement/01-basement';
import { createBasementRoomTwo } from './scenes/basement/02-basement';
import { createBasementStorageOne } from './scenes/basement/00-basementStorage';
import { createBasementStorageTwo } from './scenes/basement/00-basementStorageTwo';
import { createBasementRoomThree } from './scenes/03-kidRoom';
import { createBedroom } from './scenes/04-bedroom';
import { createBasementHallway } from './scenes/basement/03-basementHallway.js'
import { createFirstFloorHallway } from './scenes/03-firstFloorHallway.js'
import { createSecondFloorHallway } from './scenes/03-secondFloorHallway.js'
import { createLivingRoom } from './scenes/05-livingRoom';
import { createLibrary } from './scenes/firstFloor/02-library'
import { createMainEntrance } from './scenes/firstFloor/03-mainEntrance'
import { createKitchen } from './scenes/firstFloor/03-kitchen';

//window.SETCURSORDIVTOPLEFT = true


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
createCursorDiv()

entry();
titleScene();
options();
winScene();
gameover();

createBasementRoomOne();
createBasementRoomTwo();
createBasementRoomThree();
createBasementStorageOne();
createBasementStorageTwo();
createBedroom();
createBasementHallway();
createFirstFloorHallway();
createSecondFloorHallway();
createLibrary();
createLivingRoom();
createMainEntrance();
createKitchen();

go('entry');

