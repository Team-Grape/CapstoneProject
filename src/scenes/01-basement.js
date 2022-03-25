import {
  addToInventory,
  checkInventoryForItem,
  removeFromInventory,
  navArrows,
  setGameState,
  getGameState,
  textBubble,
  addToMessageLog,
} from "../core.js";
import { cellarKey, pryBarObj } from "../items.js";
import getMusicManager from "../MusicManager.js";

const roomName = "basementRoomOne";
const roomNavArrows = navArrows(roomName);

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

const introMessage = [
  ["when you woke up you found yourself in an strange room"],
  ["the door is locked and you are trapped in the room"],
  ["look around the room to see if you can find the key to open the door"],
];

export const createBasementRoomOne = () => {
  // ======================================================== //

  scene(roomName + "Up", () => {
    //scene("room-1-wall-1", () => {
    const direction = "Up";
    onLoad(() => {
      add([sprite("basementRoomOneUp"), scale(1), area()]);
    });

    if (!getGameState(roomName, "introMessageRead")) {
      textBubble(introMessage, () => {
        setGameState(roomName, "introMessageRead", true);
        roomNavArrows(direction);
        addToMessageLog(introMessage);
      });
    } else {
      roomNavArrows(direction);
    }

    // ======================================================== //

    scene(roomName + "Right", () => {
      const direction = "Right";

      onLoad(() => {
        add([sprite("basementRoomOneRight"), scale(1), area()]);
        add([sprite("barrel1"), scale(4), pos(1150, 300), area(), "barrel1"]);
      });

      onClick("barrel1", (barrel) => {
        if (getGameState(roomName, "pryBarPickedUp")) {
          barrel.destroy();
          add([sprite("barrel3"), scale(4), pos(1150, 300), area(), "barrel3"]);
          textBubble([["a key was added to your inventory"]]);
          addToInventory(cellarKey);
          setGameState(roomName, "keyPickedUp", true);
        }
      });

      roomNavArrows(direction);
    });

    // ======================================================== //

    scene(roomName + "Down", () => {
      const direction = "Down";

      onLoad(() => {
        add([sprite("basementRoomOneDown"), scale(1), area()]);
        add([
          sprite("chained-skeleton"),
          pos(400, 150),
          scale(4),
          area(),
          "chained-skeleton",
        ]);
        if (getGameState(roomName, "skeleton1Clicked")) {
          let ghost1 = add([
            sprite("ghost1", {anim: 'idle'}),
            opacity(0.8),
            pos(500, 150),
            scale(4),
            area(),
            'ghost1'
          ]);
          ghost1.play("idle", { loop: true, pingpong: true, speed: 4 });
          ghost1.opacity = 0.2;
          let counter = 0;
          onUpdate(() => {
            //    if (counter === 1) {
            if (counter++ % (60 / 3) === 1) {
              // only update 3x per second{
              if (Math.random() < 0.5) {
                // randomly choose
                if (ghost1.opacity < 0.7)
                  ghost1.opacity += getRandomArbitrary(0.01, 0.1);
              } else {
                if (ghost1.opacity > 0.4)
                  ghost1.opacity -= getRandomArbitrary(0.01, 0.1);
              }
            }
          });
        }

        onClick("chained-skeleton", () => {
          if (!getGameState(roomName, "skeleton1Clicked")) {
            
            setGameState(roomName, "skeleton1Clicked", true);
            const poof = add([
              sprite("poof"),
              opacity(0.6),
              pos(470, 180),
              scale(4),
            ]);
            poof.play("main", {
              speed: 4,
              onEnd: () => {
                poof.destroy();
                const beginMessage = ["Oh no. Not another one. I was trapped here just like you and never made it out."];
            textBubble([beginMessage])
                let ghost1 = add([
                  sprite("ghost1"),
                  opacity(0.0),
                  pos(500, 150),
                  scale(4),
                  area(),
                  'ghost1'
                ]);
               
                ghost1.play("idle", { loop: true, pingpong: true, speed: 4 });
                ghost1.opacity = 0.2;
                let counter = 0;
                onUpdate(() => {
                  //    if (counter === 1) {
                  if (counter++ % (60 / 3) === 1) {
                    // only update 3x per second{
                    if (Math.random() < 0.5) {
                      // randomly choose
                      if (ghost1.opacity < 0.7)
                        ghost1.opacity += getRandomArbitrary(0.01, 0.1);
                    } else {
                      if (ghost1.opacity > 0.4)
                        ghost1.opacity -= getRandomArbitrary(0.01, 0.1);
                    }
                  }
                });
              },
            });
          }
        });
      });

      //Key click handler
      // if (!getGameState(roomName, "keyPickedUp")) {
      //   add([sprite("key"), pos(120, 400), scale(1), area(), "key"]);
      //   onClick("key", (key) => {
      //     textBubble([["a key was added to your inventory"]]);

      //     addToInventory(cellarKey);
      //     setGameState(roomName, "keyPickedUp", true);
      //     key.destroy();
      //   });
      // }
      onClick("ghost1", () => {
        console.log("ghost clicked");
        const keyMessage = ["Oh good! You found a key. See if you can open that door."]
        const noKeyMessage = ["There must be a way to open that door"]
        let message = []
        if (getGameState(roomName, "keyPickedUp")) {
          message = keyMessage
        textBubble([message]);
        } else {
          message = noKeyMessage
          textBubble([message]);
        }
      });
      roomNavArrows(direction);
    });

    // ======================================================== //

    scene(roomName + "Left", () => {
      const direction = "Left";

      //Sprite Loaders
      onLoad(() => {
        add([sprite("basementRoomOneLeft"), scale(1), area()]);
        add([sprite("woodenDoor"), pos(500, 14), scale(4), area(), "door"]);
      });

      if (!getGameState(roomName, "pryBarPickedUp")) {
        const pryBar = add([
          sprite("pryBar"),
          scale(4),
          pos(100, 400),
          area(),
          "pryBar",
        ]);
        onClick("pryBar", (pryBar) => {
          console.log("pry bar clicked");
          textBubble([["a Pry Bar was added to your inventory"]]);

          addToInventory(pryBarObj);
          setGameState(roomName, "pryBarPickedUp", true);
          pryBar.destroy();
        });
      }

      //Door click handler
      onClick("door", (door) => {
        const bgMusic = getMusicManager();
        bgMusic.play("spooky");
        if (
          getGameState(roomName, "doorUnlocked") ||
          checkInventoryForItem(cellarKey)
        ) {
          setGameState(roomName, "doorUnlocked", true);
          removeFromInventory(cellarKey);
          go("basementRoomTwoUp");
        } else {
          textBubble([["it doesn't open, it seems like it needs a key"]]);
        }
      });
      roomNavArrows(direction);
    });
  });

  // ======================================================== //
};
