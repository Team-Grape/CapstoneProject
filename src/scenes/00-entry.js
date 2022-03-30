import {
  getOption,
  setOption,
  setBackgroundMusicVolume,
  getBackgroundMusicVolume,
  getSoundEffectVolume,
  setSoundEffectVolume,
  getCurrentRoom
} from "../state";


import { displayInventoryDiv } from "../inventory"


export const entry = () => {
  scene("entry", () => {
    if (!getBackgroundMusicVolume()) {
      setBackgroundMusicVolume(1.5);
    }

    if (!getSoundEffectVolume()) {
      setSoundEffectVolume(1.5);
    }

    add([
      text("Click to start!"),
      color(255, 0, 0),
      pos(width() / 2, height() / 2),
      origin("center"),
    ]);

    add([rect(width(), height()), opacity(0), pos(0,0), area(), 'clickBox'])

    onClick('clickBox', () => {
      if (window.location.search) {
        // load game state
        try {
          const jsonLocalStorageObjFromURL = JSON.parse(decodeURIComponent(window.location.search).replace(/^\?s=/, ''))
          Object.keys(jsonLocalStorageObjFromURL).map((keyStr, idx) => {
            localStorage.setItem(keyStr, jsonLocalStorageObjFromURL[keyStr])
          })

          history.replaceState("", "", "/")
          displayInventoryDiv();
          const room = getCurrentRoom();
          go(room);
        } catch (e) {
          console.log(e)
        }
      } else {
        window.localStorage.setItem('menuIsOpen', false)
        go("title");
      }
    });
  });
};
