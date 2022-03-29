export function saveCurrentRoom(currentRoom) {
  if (!window.localStorage.getItem("currentRoom")) {
    window.localStorage.setItem("currentRoom", "");
  }
  localStorage.setItem("currentRoom", currentRoom);
}

export function getCurrentRoom() {
  const currentRoom = localStorage.getItem("currentRoom");
  if (!currentRoom) {
    return null;
  }
  return currentRoom;
}

export function setPreviousRoom(previousRoom) {
  if (!window.localStorage.getItem("previousRoom")) {
    window.localStorage.setItem("previousRoom", "");
  }
  localStorage.setItem("previousRoom", previousRoom);
}

export function getPreviousRoom() {
  const previousRoom = localStorage.getItem("previousRoom");
  if (!previousRoom) {
    return null;
  }
  return previousRoom;
}

export function clearLocalStorage() {
  window.localStorage.setItem("inventory", JSON.stringify([]));
  window.localStorage.setItem("messageLog", JSON.stringify([]));
  window.localStorage.setItem("gameState", JSON.stringify({}));
  window.localStorage.setItem("currentRoom", "");
  window.localStorage.setItem('previousRoom', '')
}

const setOption = (option, value) => {
  if (!window.localStorage.getItem("options")) {
    window.localStorage.setItem("options", JSON.stringify({}));
  }
  let currentOptions = JSON.parse(window.localStorage.getItem("options"));
  currentOptions[option] = value;
  // save the updated options to local storage
  localStorage.setItem("options", JSON.stringify(currentOptions));
};

function getOption(option) {
  if (!window.localStorage.getItem("options")) {
    window.localStorage.setItem("options", JSON.stringify({}));
  }
  const currentOptions = JSON.parse(localStorage.getItem("options"));
  if (currentOptions) {
    return currentOptions[option];
  } else {
  }
}

export function setBackgroundMusicVolume(value) {
  setOption("backgroundMusicVolume", value);
}

export function getBackgroundMusicVolume() {
  return getOption("backgroundMusicVolume");
}

export function setSoundEffectVolume(value) {
  setOption("soundEffectVolume", value);
}

export function getSoundEffectVolume() {
  return getOption("soundEffectVolume");
}

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
