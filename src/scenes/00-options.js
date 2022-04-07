import { displayInventoryDiv } from "../inventory";
import { playBGM, playSFX, setCurrentlyPlayingBGMVolume } from "../sounds";
import {
  getCurrentRoom,
  setBackgroundMusicVolume,
  getBackgroundMusicVolume,
  getSoundEffectVolume,
  setSoundEffectVolume,
} from "../state";

export const options = () => {
  scene("options", () => {
    add([
      text("Game Options", { size: 54, width: width() - 230, font: "sinko" }),
      color(255, 0, 0),
      pos(width() / 2, 75),
      origin("center"),
    ]);

    add([
      text("Background Music Volume", { size: 32, font: "sinko" }),
      color(255, 255, 255),
      pos(width() / 2, 200),
      origin("center"),
    ]);

    // =============== Background Music =============== //

    let currentBackgroundMusicVolume = getBackgroundMusicVolume();
    const currentBgVolumeDisplay = add([
      text(`${((currentBackgroundMusicVolume / 3) * 100).toFixed(0)}%`, {
        size: 42,
        width: width() - 230,
        font: "sinko",
      }),
      pos(width() / 2, 270),
      color(249, 215, 57),
      origin("center"),
      "currentBgVolumeDisplay",
    ]);

    const increaseBgMusicButton = add([
      text(`+`, {
        size: 30,
        font: "sinko",
      }),
      area({ width: 40, height: 40 }),
      pos(width() / 2 + 100, 270),
      color(140, 140, 140),
      origin("center"),
      "increaseBgMusicButton",
    ]);

    const decreaseBgMusicButton = add([
      text(`-`, {
        size: 30,
        width: width() - 230,
        font: "sinko",
      }),
      pos(width() / 2 - 100, 270),
      color(140, 140, 140),
      origin("center"),
      area({ width: 40, height: 40 }),
      "decreaseBgMusicButton",
    ]);

    onClick("decreaseBgMusicButton", () => {
      playSFX("click");
      let currentBackgroundMusicVolume = Number(getBackgroundMusicVolume());
      if (currentBackgroundMusicVolume >= 0.1) {
        setBackgroundMusicVolume(
          (currentBackgroundMusicVolume -= 0.1).toFixed(1)
        );
        setCurrentlyPlayingBGMVolume();
        currentBgVolumeDisplay.text = `${(
          (currentBackgroundMusicVolume / 3) *
          100
        ).toFixed(0)}%`;
        readd(currentBgVolumeDisplay);
      }
    });

    onClick("increaseBgMusicButton", () => {
      playSFX("click");
      let currentBackgroundMusicVolume = Number(getBackgroundMusicVolume());
      if (currentBackgroundMusicVolume < 3.0) {
        setBackgroundMusicVolume(
          (currentBackgroundMusicVolume += 0.1).toFixed(1)
        );
        setCurrentlyPlayingBGMVolume();
        currentBgVolumeDisplay.text = `${(
          (currentBackgroundMusicVolume / 3) *
          100
        ).toFixed(0)}%`;
        readd(currentBgVolumeDisplay);
      }
    });

    // ================== Sound Effects ===================== //

    const soundEffectsVolume = add([
      text("Sound Effects Volume", {
        size: 32,
        width: width() - 230,
        font: "sinko",
      }),
      pos(width() / 2, 350),
      color(255, 255, 255),
      origin("center"),
      "soundEffects",
    ]);

    let currentSoundEffectVolume = getSoundEffectVolume();
    const currentSFXVolumeDisplay = add([
      text(`${((currentSoundEffectVolume / 3) * 100).toFixed(0)}%`, {
        size: 42,
        width: width() - 230,
        font: "sinko",
      }),
      pos(width() / 2, 440),
      color(249, 215, 57),
      origin("center"),
      "currentSFXVolumeDisplay",
    ]);

    const increaseSFXButton = add([
      text(`+`, {
        size: 30,
        font: "sinko",
      }),
      area({ width: 40, height: 40 }),
      pos(width() / 2 + 100, 440),
      color(140, 140, 140),
      origin("center"),
      "increaseSFXButton",
    ]);

    const decreaseSFXButton = add([
      text(`-`, {
        size: 30,
        width: width() - 230,
        font: "sinko",
      }),
      pos(width() / 2 - 100, 440),
      color(140, 140, 140),
      origin("center"),
      area({ width: 40, height: 40 }),
      "decreaseSFXButton",
    ]);

    onClick("decreaseSFXButton", () => {
      playSFX("click");
      let currentSoundEffectVolume = Number(getSoundEffectVolume());
      if (currentSoundEffectVolume >= 0.1) {
        setSoundEffectVolume((currentSoundEffectVolume -= 0.1).toFixed(1));
        currentSFXVolumeDisplay.text = `${(
          (currentSoundEffectVolume / 3) *
          100
        ).toFixed(0)}%`;

        readd(currentSFXVolumeDisplay);
      }
    });

    onClick("increaseSFXButton", () => {
      playSFX("click");
      let currentSoundEffectVolume = Number(getSoundEffectVolume());
      if (currentSoundEffectVolume < 3.0) {
        setSoundEffectVolume((currentSoundEffectVolume += 0.1).toFixed(1));
        currentSFXVolumeDisplay.text = `${(
          (currentSoundEffectVolume / 3) *
          100
        ).toFixed(0)}%`;
        readd(currentSFXVolumeDisplay);
      }
    });

    const returnButton = add([
      text("Return", {
        size: 32,
        width: width() - 230,
        font: "sinko",
      }),
      pos(1100, 75),
      color(255, 255, 255),
      origin("center"),
      area({ width: 160, height: 40 }),
      outline(100, (255, 255, 255)),
      "return",
    ]);

    onClick("return", () => {
      playSFX("click");
      if (window.onTitleScene) {
        go("title");
      } else {
        displayInventoryDiv();
        go(getCurrentRoom());
      }
    });
    playBGM("title");
  });
};
