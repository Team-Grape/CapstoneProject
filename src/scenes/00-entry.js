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

import _J from 'json-url';
const codec = _J('lzstring');


export const entry = () => {
  scene("entry", () => {
    if (!getBackgroundMusicVolume()) {
      setBackgroundMusicVolume(1.5);
    }

    if (!getSoundEffectVolume()) {
      setSoundEffectVolume(1.5);
    }

    add([
      text("Click to start", {size: 60, font: 'sinko'}),

      color(255, 0, 0),
      pos(width() / 2, height() / 2),
      origin("center"),
    ]);

    add([rect(width(), height()), opacity(0), pos(0,0), area(), 'clickBox'])

    onClick('clickBox', async () => {
      if (window.location.search) {
        // load game state
        try {
          let searchParams = new URLSearchParams(window.location.search);
          const decoded = await codec.decompress(searchParams.get('s'))
          console.dir(decoded, { depth: null })
          Object.keys(decoded).map((keyStr, idx) => {
            localStorage.setItem(keyStr, decoded[keyStr])
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
