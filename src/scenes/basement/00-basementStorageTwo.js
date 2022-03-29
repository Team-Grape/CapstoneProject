import { navArrows, singleViewNavArrow } from "../../buttons";
import { textBubble, addToMessageLog } from "../../message";

const roomName = "basementStorageTwo";
const roomNavArrows = navArrows(roomName);

export const createBasementStorageTwo = async () => {
  scene(roomName + "Down", () => {
    window.roomName = roomName;
    window.viewDirection = "singleViewRoom";

    onLoad(() => {
      add([sprite("storage-room-two"), scale(1)]);
    });

    const monster = add([
      sprite("monster"),
      scale(1),
      pos(550, 130),
      area(),
      "monster",
    ]);

    onClick("monster", (monster) => {
      monster.play("move");
      textBubble([
        [`I dont't know where my face went. Please help me find it.`],
      ]);
    });

    singleViewNavArrow("basementStorageTwo", "basementHallwayDown");
  });
};
