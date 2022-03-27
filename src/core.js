import { InGameMenu } from "./menu.js";

const inGameMenu = new InGameMenu();


export const flickerOpacity = (GameObj) => {
  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
  let counter = 0;
  onUpdate(() => {
    //    if (counter === 1) {
    if (counter++ % (60 / 3) === 1) {
      // only update 3x per second{
      if (Math.random() < 0.5) {
        // randomly choose
        if (GameObj.opacity < 0.7)
          GameObj.opacity += getRandomArbitrary(0.01, 0.1);
      } else {
        if (GameObj.opacity > 0.4)
          GameObj.opacity -= getRandomArbitrary(0.01, 0.1);
      }
    }
  });
}



export const playSFX = (sndNameStr) => {
  play(sndNameStr, { volume: getSoundEffectVolume(), loop: false });
};

export const addToMessageLog = (msg) => {
  if (!window.localStorage.getItem("messageLog")) {
    window.localStorage.setItem("messageLog", JSON.stringify([]));
  }
  let currentMessageLog = JSON.parse(window.localStorage.getItem("messageLog"));

  currentMessageLog.push(msg);

  localStorage.setItem("messageLog", JSON.stringify(currentMessageLog));
};

export function displayMessageLog() {
  const viewPastMessage = add([
    text("Message Log", { size: 20 }),
    pos(1100, 500),
    area(),
  ]);
  viewPastMessage.onClick(() => {
    openMessageLog();
  });
}

export function openMessageLog() {
  const messageBox = add([
    rect(width() / 2, height() - 200, { radius: 32 }),
    origin("center"),
    pos(center().x, center().y),
  ]);

  const closeButton = add([text("X", { size: 30 }), pos(890, 400), area()]);
  closeButton.onClick(() => {
    messageBox.destroy();
    closeButton.destroy();
  });

  let msgY = height() / 2 - 160;
  let currentMessageLog = JSON.parse(window.localStorage.getItem("messageLog"));
  currentMessageLog.forEach((message) => {
    message.forEach((currentMessage) => {
      msgY = msgY + 20;
      const cm = add([
        text(currentMessage, { size: 12 }),
        pos(width() / 2 - 280, msgY),
      ]);

      closeButton.onClick(() => {
        cm.destroy();
      });
    });
  });
}

export function displayNavArrows(arrayOfDirectionsStrings = []) {
  inGameMenu.display();
  displayMessageLog();

  for (let i = 0; i < arrayOfDirectionsStrings.length; i++) {
    let direction = arrayOfDirectionsStrings[i];
    if (direction === "left") {
      add([
        sprite("left-arrow"),
        pos(7.5, 250),
        scale(1),
        area(),
        "left-arrow",
      ]);
    }
    if (direction === "right") {
      add([
        sprite("right-arrow"),
        pos(1190, 250),
        scale(1),
        area(),
        "right-arrow",
      ]);
    }
    if (direction === "up") {
      add([sprite("up-arrow"), pos(600, 15), scale(1), area(), "up-arrow"]);
    }
    if (direction === "down") {
      add([
        sprite("down-arrow"),
        pos(575, 475),
        scale(1),
        area(),
        "down-arrow",
      ]);
    }
  }
}

export const navArrows = (roomName) => (d) => {
  saveCurrentRoom(roomName + d);
  if (d == "Up") {
    onClick("right-arrow", () => {
      go(roomName + "Right");
    });
    onClick("left-arrow", () => {
      go(roomName + "Left");
    });
    onClick("down-arrow", () => {
      go(roomName + "Down");
    });
    displayNavArrows(["left", "right", "down"]);
  } else if (d == "Right") {
    onClick("left-arrow", () => {
      go(roomName + "Up");
    });
    displayNavArrows(["left"]);
  } else if (d == "Down") {
    onClick("up-arrow", () => {
      go(roomName + "Up");
    });
    displayNavArrows(["up"]);
  } else if (d == "Left") {
    onClick("right-arrow", () => {
      go(roomName + "Up");
    });
    displayNavArrows(["right"]);
  }
};

export const destroyNavArrows = () => {
  every("up-arrow", destroy)
  every("down-arrow", destroy)
  every("left-arrow", destroy)
  every("right-arrow", destroy)
}

export const textBubble = (dialogs, onFinish) => {
  // Current dialog
  let curDialog = 0;

  // Text bubble
  const textbox = add([
    rect(width() - 200, 120, { radius: 32 }),
    origin("center"),
    pos(center().x, height() - 100),
    outline(2),
    color(100, 100, 100),
  ]);

  // Text
  const txt = add([
    text("", { size: 32, width: width() - 230, font: "sink" }),
    pos(textbox.pos),
    origin("center"),
  ]);

  //   console.log(txt)

  // NextButton
  const nextButton = add([
    text("Next", { size: 20, font: "sink" }),
    pos(1050, 475),
    area(),
  ]);
  if (dialogs.length === 1) {
    nextButton.text = "Close";
  }
  nextButton.onClick(() => {
    /*  if (curDialog === dialogs.length - 2) {
        nextButton.text = "Close"
      } else */ if (curDialog === dialogs.length - 1) {
      textbox.destroy();
      txt.destroy();
      nextButton.destroy();
      curDialog = 0;
      if (onFinish) {
        onFinish();
      }
      return;
    }
    curDialog = curDialog + 1;
    updateDialog();
  });

  // Update the on screen sprite & text
  function updateDialog() {
    const [dialog] = dialogs[curDialog];
    txt.text = dialog;
  }

  updateDialog();
};
