export const checkInventoryForItem = (item) => {
  if (!window.localStorage.getItem("inventory")) {
    // you dont even have an inventory yet!
    return false;
  }
  const currentInventory = JSON.parse(window.localStorage.getItem("inventory"));
  if (currentInventory.filter((i) => i.name === item.name).length > 0) {
    // item is in the inventory!
    return true;
  } else {
    // item is not in the inventory!
    return false;
  }
};

export const addToInventory = (item) => {
  if (!window.localStorage.getItem("inventory")) {
    window.localStorage.setItem("inventory", JSON.stringify([]));
  }
  let currentInventory = JSON.parse(window.localStorage.getItem("inventory"));
  if (currentInventory.filter((i) => i.name === item.name).length === 0) {
    // this item is not in the inventory. So add it to the inventory below:
    localStorage.setItem(
      "inventory",
      JSON.stringify([...currentInventory, item])
    );
  }
};

export const removeFromInventory = (item) => {
  if (!window.localStorage.getItem("inventory")) {
    window.localStorage.setItem("inventory", JSON.stringify([]));
  }

  let currentInventory = JSON.parse(window.localStorage.getItem("inventory"));

  // this does not care about quantity! just removes if exists
  currentInventory = currentInventory.filter((i) => i.name != item.name);
  localStorage.setItem("inventory", JSON.stringify(currentInventory));
};

export const setGameState = (roomName, gameEvent, value) => {
  if (!window.localStorage.getItem("gameState")) {
    window.localStorage.setItem("gameState", JSON.stringify({}));
  }
  let currentGameState = JSON.parse(window.localStorage.getItem("gameState"));

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

  let currentGameState = JSON.parse(window.localStorage.getItem("gameState"));

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
  displayMenu()
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


// ==================== Change Color ===============================//
export function changeComponentColor(componentName, red, green, blue ) {
  componentName.color.r = red
  componentName.color.g = green
  componentName.color.b = blue
}
// ==================== MENU ====================================== //

// class Menu {
//   constructor() {}
//   displayMenu() {
//     add([
//       sprite("menu-button"),
//       pos(1150, 10),
//       scale(1),
//       area(),
//       "menu-button",
//     ]);
//     onClick("menu-button", () => {
//       openMenu();
//     });
//   }

  // closeMenu() {

  // }
// }


export function displayMenu() {
  add([sprite("menu-button"), pos(1150, 10), scale(1), area(), "menu-button"]);
  onClick("menu-button", () => {
    openMenu();
  });
}

function restart() {
  const restartPrompt = add([pos(430, 100), rect(350, 100), color(0, 0, 255), outline(4), area(), color(100, 100, 100)]);
  const areYouSure = add([
    text("Are You Sure?", { size: 40 }),
    pos(450, 105),
    area(),
    "are-you-sure",
  ]);
  const yes = add([
    text("Yes", { size: 30 }),
    pos(480, 150),
    area(),
    "yes",
  ]);
  const no = add([
    text("No", { size: 30 }),
    pos(670, 150),
    area(),
    "no",
  ]);

  onClick('no', () => {
    restartPrompt.destroy()
    areYouSure.destroy()
    yes.destroy()
    no.destroy()
  })

  onClick('yes', () => {
    window.localStorage.setItem("gameState", JSON.stringify({}));
    window.localStorage.setItem("inventory", JSON.stringify([]));
    go('title')
  })
}

export function openMenu() {
  const gameMenu = add([pos(1070, 50), rect(160, 120), outline(4),  color(100, 100, 100), area()]);
  const continueButton = add([
    text("Continue", { size: 20, font: 'sink'}),
    pos(1080, 60),
    color(255, 255, 255), 
    area(),
    "continue",
  ]);
  const optionsButton = add([
    text("Options", { size: 20, font: 'sink' }),
    pos(1080, 100),
    color(255, 255, 255), 
    area(),
    "options",
  ]);
  const restartButton = add([
    text("Restart", { size: 20, font: 'sink' }),
    pos(1080, 140),
    area(),
    "restart",
  ]);

  onHover('continue', () => {
    changeComponentColor(continueButton, 246, 207, 27)
    // maybe write some if logic so that color reverts
    // return changeComponentColor(continueButton, 0, 0, 0)
  })

  onClick("continue", () => {
    gameMenu.destroy();
    continueButton.destroy();
    optionsButton.destroy();
    restartButton.destroy();
  });

  onClick('restart', () => {
    gameMenu.destroy();
    continueButton.destroy();
    optionsButton.destroy();
    restartButton.destroy();
    restart()
  })

  onClick('options', () => {
  })
}
