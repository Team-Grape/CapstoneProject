import {
  addToInventory,
  checkInventoryForItem,
  removeFromInventory,
} from '../../inventory';

import { cellarKey, lighterObj, lockPick } from '../../items';

import { setGameState, getGameState } from '../../state';
import { textBubble, addToMessageLog } from '../../message';
import { playBGM, stopBGM, playSFX } from '../../sounds';
import { navArrows } from '../../buttons';

const roomName = 'bedroom';
const roomNavArrows = navArrows(roomName);

const introMessage = [
  [
    'Spiders have blocked the door with their webs. Find a way to get rid of it.',
  ],
];

export const createBedroom = () => {
  // ======================================================== //
  scene(roomName + 'Up', () => {
    window.roomName = roomName;
    window.viewDirection = 'Up';
    onLoad(() => {
      add([sprite('bedroom-one-up'), scale(1)]);
    });
    if (!getGameState(roomName, 'lampOff')) {
      add([
        sprite('lamp-turned-off'),
        scale(6),
        pos(970, 98),
        area(),
        'lampTurnedOff',
      ]);
    } else {
      add([
        sprite('lamp-turned-on'),
        scale(6),
        pos(970, 98),
        area(),
        'lampTurnedOn',
      ]);
    }

    onClick('lampTurnedOff', (lampTurnedOff) => {
      playSFX('click');
      lampTurnedOff.destroy();
      setGameState(roomName, 'lampOff', true);
      const lampTurnedOn = add([
        sprite('lamp-turned-on'),
        scale(6),
        pos(970, 98),
        area(),
        'lampTurnedOn',
      ]);
    });

    onClick('lampTurnedOn', (lampTurnedOn) => {
      playSFX('click');
      lampTurnedOn.destroy();
      setGameState(roomName, 'lampOff', false);
      const lampTurnedOff = add([
        sprite('lamp-turned-off'),
        scale(6),
        pos(970, 98),
        area(),
        'lampTurnedOff',
      ]);
    });
    roomNavArrows(viewDirection);
  });

  // ======================================================== //
  scene(roomName + 'Right', () => {
    window.roomName = roomName;
    window.viewDirection = 'Right';
    onLoad(() => {
      add([sprite('bedroom-one-right'), scale(1)]);
      add([
        sprite('skeleton-stand'),
        pos(180, 320),
        scale(5),
        area(),
        'skeletonStand',
      ]);
    });

    if (!getGameState(roomName, 'lock-pickPickedUp')) {
      onLoad(() => {
        add([sprite('lock-pick'), pos(730, 350), scale(1), area(), 'lockPick']);
      });
    }

    onClick('lockPick', (lockPick2) => {
      playSFX('keyNoise');
      textBubble([['A lock pick was added to your inventory']]);
      addToInventory(lockPick);
      setGameState(roomName, 'lock-pickPickedUp', true);
      lockPick2.destroy();
    });

    onClick('skeletonStand', (skeletonStand) => {
      skeletonStand.destroy();
      const skeletonAttack = add([
        sprite('skeleton-attack'),
        scale(5),
        pos(180, 320),
        area(),
        'skeletonAttack',
      ]);
      skeletonAttack.play('attack', { speed: 5, loop: true });
      playSFX('swordSound');
      const skeletonMessage = [
        [
          'Oh no, the skeleton is awake, must find a way to destroy this skeleton!',
        ],
      ];
      textBubble([skeletonMessage]);

      onClick('skeletonAttack', (skeletonAttack) => {
        if (window.selectedItem == 'pry bar') {
          playSFX('crumble');
          skeletonAttack.destroy();

          const skeletonDead = add([
            sprite('skeleton-dead'),
            scale(5),
            pos(180, 320),
            'skeletonDead',
          ]);
          skeletonDead.play('dead', { speed: 20 });
          textBubble([['......']]);
          if (!getGameState(roomName, 'keyPickedUp')) {
            if (skeletonDead) {
              setInterval(() => {
                if (!getGameState(roomName, 'keyPickedUp')) {
                  const key = add([
                    sprite('key'),
                    scale(1),
                    pos(300, 400),
                    area(),
                    'key',
                  ]);
                }
              }, 2000);

              onClick('key', (key) => {
                playSFX('keyNoise');
                textBubble([['A key was added to your inventory.']]);
                addToInventory(cellarKey);
                setGameState(roomName, 'keyPickedUp', true);
                key.destroy();
              });
            }
          }
        }
      });
    });

    roomNavArrows(viewDirection);
  });

  // ======================================================== //
  scene(roomName + 'Down', () => {
    window.roomName = roomName;
    window.viewDirection = 'Down';
    onLoad(() => {
      add([sprite('bedroom-one-down'), scale(1)]);
      add([
        pos(540, 150),
        text('Nothing here~', {
          font: 'sinko',
          size: 12,
        }),
      ]);
    });
    if (!getGameState(roomName, 'lighterPickedUp')) {
      const lighter = add([
        sprite('lighter'),
        pos(900, 100),
        scale(0.3),
        area(),
        'lighter',
      ]);
      onClick('lighter', (lighter) => {
        playSFX('keyNoise');
        textBubble([['A lighter was added to your inventory']]);

        addToInventory(lighterObj);
        setGameState(roomName, 'lighterPickedUp', true);
        lighter.destroy();
      });
    }
    if (!getGameState(roomName, 'paintingMoved')) {
      add([
        sprite('painting12'),
        scale(5),
        pos(700, 100),
        area(),
        rotate(),
        origin('topright'),
        'painting12',
      ]);
    } else {
      add([
        sprite('painting12'),
        scale(5),
        pos(700, 100),
        area(),
        rotate(-45),
        origin('topright'),
      ]);
    }
    onClick('painting12', (painting12) => {
      setGameState(roomName, 'paintingMoved', true);
      painting12.destroy();
      add([
        sprite('painting12'),
        scale(5),
        pos(700, 100),
        area(),
        rotate(-45),
        origin('topright'),
      ]);
    });
    roomNavArrows(viewDirection);
  });

  // ======================================================== //
  scene(roomName + 'Left', () => {
    window.roomName = roomName;
    window.viewDirection = 'Left';

    const door2CallBack = (door2) => {
      if (getGameState(roomName, 'doorUnlocked')) {
        go('secondFloorHallwayDown');
      } else if (
        checkInventoryForItem(cellarKey) &&
        window.selectedItem == 'cellar key'
      ) {
        playSFX('lockClick');
        setGameState(roomName, 'doorUnlocked', true);
        removeFromInventory(cellarKey);
        textBubble([['The key unlocked the door!']]);
      } else if (window.selectedItem == 'pry bar') {
        textBubble([["It doesnt't work"]]);
      } else {
        textBubble([['This door seems to be locked.']]);
      }
    };

    onLoad(() => {
      add([sprite('bedroom-one-left'), scale(1)]);
      add([sprite('door2'), pos(295, 75), scale(1.3), area(), 'door2']);
      if (!getGameState(roomName, 'webBurned')) {
        add([sprite('whole-web'), pos(220, 50), scale(8), area(), 'wholeWeb']);
      } else {
        onClick('door2', door2CallBack);
      }
    });

    if (!getGameState(roomName, 'introMessageRead')) {
      textBubble(introMessage, () => {
        setGameState(roomName, 'introMessageRead', true);
        addToMessageLog(introMessage);
      });
    }

    onClick('wholeWeb', (wholeWeb) => {
      if (window.selectedItem == 'lighter') {
        const flame = add([
          sprite('flame'),
          pos(250, 50),
          scale(15),
          area(),
          'flame',
        ]);
        flame.play('fire', { loop: true });
        playSFX('fireSound');
        setInterval(() => {
          wholeWeb.destroy();
          setGameState(roomName, 'webBurned', true);
          onClick('door2', door2CallBack);
        }, 3000);
        setInterval(() => {
          flame.destroy();
        }, 4000);
      } else {
        const webMessage = [
          [
            'Looks like a spider web is blocking the door. Find something to get rid of it.',
          ],
        ];
        textBubble([webMessage]);
      }
    });
    roomNavArrows(viewDirection);
  });
  // ======================================================== //
};
