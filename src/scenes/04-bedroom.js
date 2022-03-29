import {
  addToInventory,
  checkInventoryForItem,
  removeFromInventory,
} from "../inventory";

import { cellarKey, lighterObj } from "../items";

import { setGameState, getGameState } from "../state";
import { textBubble, addToMessageLog } from "../message";
import { playBGM, stopBGM } from "../sounds";
import { navArrows } from "../buttons";

const roomName = "bedroom";
const roomNavArrows = navArrows(roomName);

export const createBedroom = () => {
  // ======================================================== //
  scene(roomName + "Up", () => {
    window.roomName = roomName;
    window.viewDirection = "Up";
    onLoad(() => {
      add([sprite("bedroom-one-up"), scale(1)]);
    });
    roomNavArrows(viewDirection);
  });
  // ======================================================== //
  scene(roomName + "Right", () => {
    window.roomName = roomName;
    window.viewDirection = "Right";
    onLoad(() => {
      add([sprite("bedroom-one-right"), scale(1)]);
    });
    roomNavArrows(viewDirection);
  });
  // ======================================================== //
  scene(roomName + "Down", () => {
    window.roomName = roomName;
    window.viewDirection = "Down";
    onLoad(() => {
      add([sprite("bedroom-one-down"), scale(1)]);
      add([sprite("skeleton-stand"), pos(250, 250),scale(5), area(), 'skeletonStand'])
    });
    if (!getGameState(roomName, "lighterPickedUp")) {
      const lighter = add([
        sprite("lighter"),
        pos(900, 100),
        scale(0.3),
        area(),
        "lighter",
      ]);
      onClick("lighter", (lighter) => {
        textBubble([["A lighter was added to your inventory"]]);

        addToInventory(lighterObj);
        setGameState(roomName, "lighterPickedUp", true);
        lighter.destroy();
      });
    }

    onClick("skeletonStand", (skeletonStand) => {
      skeletonStand.destroy();
      const skeletonAttack = add([
        sprite("skeleton-attack"),
        scale(5),
        pos(250, 250),
        area(),
        "skeletonAttack",
      ]);
      skeletonAttack.play("attack", { speed: 5, loop: true });
      const skeletonMessage = [
        [
          "Oh no, the skeleton is awake, must find a way to destroy this skeleton!",
        ],
      ];
      textBubble([skeletonMessage]);

      onClick("skeletonAttack", (skeletonAttack) => {
        //if (getGameState(roomName, "pryBarPickedUp")) {
        if (window.selectedItem == "pry bar") {
          skeletonAttack.destroy();
        
          const skeletonDead = add([
            sprite("skeleton-dead"),
            scale(5),
            pos(250, 250),
            "skeletonDead",
          ]);
          skeletonDead.play("dead", { speed: 20 });
          textBubble([["......"]]);
          if (!getGameState(roomName, "keyPickedUp")) {
            if (skeletonDead) {
           
              setInterval(() => {
                if (!getGameState(roomName, "keyPickedUp")) {
                const key = add([
                  sprite('key'),
                  scale(1),
                  pos(300, 400),
                  area(),
                  'key'
                ])}
              }, 2000)
            
              onClick('key', (key) => {
                textBubble([['A key was added to your inventory.']])

                addToInventory(cellarKey);
                setGameState(roomName, "keyPickedUp", true);
                key.destroy()
              })
          }

          }
        }
      });
    });

    roomNavArrows(viewDirection);
  });
  // ======================================================== //
  scene(roomName + "Left", () => {
    window.roomName = roomName;
    window.viewDirection = "Left";
    onLoad(() => {
      add([sprite("bedroom-one-left"), scale(1)]);
      add([sprite("door2"), pos(295, 75), scale(1.3), area(), "door2"]);
      if (!getGameState(roomName, "webBurned")) {
        add([sprite("whole-web"), pos(220, 50), scale(8), area(), "wholeWeb"]);
      } else {
        onClick("door2", (door2) => {
          textBubble([["This door seems to be locked."]]);
        });
      }
    });

    onClick("wholeWeb", (wholeWeb) => {
      if (window.selectedItem == "lighter") {
        const flame = add([
          sprite("flame"),
          pos(250, 50),
          scale(15),
          area(),
          "flame",
        ]);
        flame.play("fire", { loop: true });
        setInterval(() => {
          wholeWeb.destroy();
          setGameState(roomName, "webBurned", true);
          onClick("door2", (door2) => {
            textBubble([["This door seems to be locked."]]);
          });
        }, 3000);
        setInterval(() => {
          flame.destroy();
        }, 4000);
      } else {
        const webMessage = [
          [
            "Looks like a spider web is blocking the door. Find something to get rid of it.",
          ],
        ];
        textBubble([webMessage]);
      }
    });
    roomNavArrows(viewDirection);
  });
  // ======================================================== //
};
