import {
  getOption,
  setOption,
  setBackgroundMusicVolume,
  getBackgroundMusicVolume,
  getSoundEffectVolume,
  setSoundEffectVolume,
} from "../state";

export const entry = () => {
  scene("entry", () => {
    if (!getBackgroundMusicVolume()) {
      setBackgroundMusicVolume(1.5);
    }

    if (!getSoundEffectVolume()) {
      setSoundEffectVolume(1.5);
    }

    add([
      text("Click here to start"),
      color(255, 0, 0),
      pos(width() / 2, height() / 2),
      origin("center"),
    ]);

    add([rect(width(), height()), opacity(0), pos(0,0), area(), 'clickBox'])

    onClick('clickBox', () => {
      go("title");
    });
  });
};
