import { InGameMenu } from './menu.js'

const inGameMenu = new InGameMenu()

export const checkInventoryForItem = (item) => {
  if (!window.localStorage.getItem('inventory')) {
    // you dont even have an inventory yet!
    return false;
  }
  const currentInventory = JSON.parse(window.localStorage.getItem('inventory'));
  if (currentInventory.filter((i) => i.name === item.name).length > 0) {
    // item is in the inventory!
    return true;
  } else {
    // item is not in the inventory!
    return false;
  }
};

export const addToInventory = (item) => {
  if (!window.localStorage.getItem('inventory')) {
    window.localStorage.setItem('inventory', JSON.stringify([]));
  }
  let currentInventory = JSON.parse(window.localStorage.getItem('inventory'));
  if (currentInventory.filter((i) => i.name === item.name).length === 0) {
    // this item is not in the inventory. So add it to the inventory below:
    localStorage.setItem(
      'inventory',
      JSON.stringify([...currentInventory, item])
    );
  }
};

export function saveCurrentRoom(currentRoom) {
  if (!window.localStorage.getItem('currentRoom')) {
    window.localStorage.setItem('currentRoom', '')
  }
  localStorage.setItem('currentRoom', currentRoom)
}

export function getCurrentRoom() {
  const currentRoom = localStorage.getItem('currentRoom')
  if (currentRoom === '') {
    return 'title'
  } return currentRoom 
}

export function setOnTitleScene(bool) {
  localStorage.setItem('onTitleScene', JSON.stringify(bool))
}

export function getOnTitleScene() {
  if (localStorage.getItem('onTitleScene')) {
    return JSON.parse(localStorage.getItem('onTitleScene'))
  }
}

export function clearLocalStorage() {
  // initializes or resets inventory in local storage
  window.localStorage.setItem("inventory", JSON.stringify([]));

  // initializes or resets gameState in local storage
  window.localStorage.setItem("gameState", JSON.stringify({}));

  // initializes or resets messageLog in local storage
  window.localStorage.setItem("messageLog", JSON.stringify([]));

  // resets the save state
  window.localStorage.setItem('currentRoom', '')
}

// ===================================================================================================

export const addToMessageLog = (msg) => {
  if (!window.localStorage.getItem('messageLog')) {
    window.localStorage.setItem('messageLog', JSON.stringify([]));
  }
  let currentMessageLog = JSON.parse(window.localStorage.getItem('messageLog'));

  currentMessageLog.push(msg);

  localStorage.setItem('messageLog', JSON.stringify(currentMessageLog));

  // const messag

  const viewPastMessage = add([
    text('Message Log', { size: 20 }),
    pos(1050, 475),
    area(),
  ]);

  viewPastMessage.onClick(() => {
    const messageBox = add([
      rect(width() / 2, height() - 200, { radius: 32 }),
      origin('center'),
      pos(center().x, center().y),
    ]);

    let msgY = height() / 2 - 160;
    msg.forEach((currentMessage) => {
      msgY = msgY + 20;
      add([text(currentMessage, { size: 12 }), pos(width() / 2 - 280, msgY)]);
    });

    // const messages = add([
    //   text('', { size: 16 }),
    //   pos(width() / 2 - 280, height() / 2 - 160),
    // ]);

    const closeButton = add([text('X', { size: 30 }), pos(890, 400), area()]);

    closeButton.onClick(() => {
      messageBox.destroy();
      closeButton.destroy();
      messages.destroy();
    });
  });
};

// ==============================================================================================

export const removeFromInventory = (item) => {
  if (!window.localStorage.getItem('inventory')) {
    window.localStorage.setItem('inventory', JSON.stringify([]));
  }

  let currentInventory = JSON.parse(window.localStorage.getItem('inventory'));

  // this does not care about quantity! just removes if exists
  currentInventory = currentInventory.filter((i) => i.name != item.name);
  localStorage.setItem("inventory", JSON.stringify(currentInventory));
};

export const setGameState = (roomName, gameEvent, value) => {
  if (!window.localStorage.getItem('gameState')) {
    window.localStorage.setItem('gameState', JSON.stringify({}));
  }
  let currentGameState = JSON.parse(window.localStorage.getItem('gameState'));

  // check if roomName has been created
  if (Object.entries(currentGameState).some((room) => room[0] == roomName)) {
    // room object already exists, so we can add & set keys/values on it!
    currentGameState[roomName][gameEvent] = value;
  } else {
    // room object does not exist.
    // we need to create it before we can add & set keys/values to it.
    currentGameState[roomName] = {};
    currentGameState[roomName][gameEvent] = value;
  }

  // save the updated gameState to local storage
  localStorage.setItem("gameState", JSON.stringify(currentGameState));
};

export const getGameState = (roomName, gameEvent) => {
  // if gameState does not exist
  if (!window.localStorage.getItem("gameState")) {
    return false;
  }

  let currentGameState = JSON.parse(window.localStorage.getItem('gameState'));

  // if roomName does not exist
  if (!Object.entries(currentGameState).some((room) => room[0] == roomName)) {
    return false;
  } else {
    // roomName does exist; but if gameEvent doesnt exist, it will return undefined;
    // which evaluates to false
    return currentGameState[roomName][gameEvent];
  }
};

export function displayNavArrows(arrayOfDirectionsStrings = []) {
  
  inGameMenu.display()

  for (let i = 0; i < arrayOfDirectionsStrings.length; i++) {
    let direction = arrayOfDirectionsStrings[i];
    if (direction === 'left') {
      add([
        sprite('left-arrow'),
        pos(7.5, 250),
        scale(1),
        area(),
        'left-arrow',
      ]);
    }
    if (direction === 'right') {
      add([
        sprite('right-arrow'),
        pos(1190, 250),
        scale(1),
        area(),
        'right-arrow',
      ]);
    }
    if (direction === 'up') {
      add([sprite('up-arrow'), pos(600, 15), scale(1), area(), 'up-arrow']);
    }
    if (direction === 'down') {
      add([
        sprite('down-arrow'),
        pos(575, 475),
        scale(1),
        area(),
        'down-arrow',
      ]);
    }
  }
}

export const navArrows = (roomName) => (d) => {
  saveCurrentRoom(roomName + d)
  if (d == "Up") {
    onClick("right-arrow", () => {
      go(roomName + "Right");
    });
    onClick('left-arrow', () => {
      go(roomName + 'Left');
    });
    onClick('down-arrow', () => {
      go(roomName + 'Down');
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
    displayNavArrows(['right']);
  }
};

export const textBubble = (dialogs, onFinish) => {
  // Current dialog
  let curDialog = 0;

  // Text bubble
  const textbox = add([
    rect(width() - 200, 120, { radius: 32 }),
    origin("center"),
    pos(center().x, height() - 100),
    outline(2),
    color(100, 100, 100)
  ]);

  // Text
  const txt = add([
    text("", { size: 32, width: width() - 230, font: 'sink' }),
    pos(textbox.pos),
    origin("center"),
  ]);

  //   console.log(txt)

  // NextButton
  const nextButton = add([text("Next", { size: 20, font: 'sink' }), pos(1050, 475), area()]);
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


