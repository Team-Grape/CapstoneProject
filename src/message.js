import { navArrows, destroyNavArrows } from "./buttons";

export const addToMessageLog = (msg) => {
  if (!window.localStorage.getItem("messageLog")) {
    window.localStorage.setItem("messageLog", JSON.stringify([]));
  }
  let currentMessageLog = JSON.parse(window.localStorage.getItem("messageLog"));

  currentMessageLog.push(msg);

  localStorage.setItem("messageLog", JSON.stringify(currentMessageLog));
};

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

export const textBubble = (dialogs, onFinish) => {
  const roomNavArrows = navArrows(window.roomName);

  destroyNavArrows();

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

      if (window.viewDirection !== 'singleViewRoom') {
        roomNavArrows(window.viewDirection);
      }
    
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
