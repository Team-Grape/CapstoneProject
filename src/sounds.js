import { getBackgroundMusicVolume, getSoundEffectVolume } from "./state";

export const loadAllSounds = () => {
  //Background Music ============
  loadSound("horror", "./assets/sounds/horrorAmbiance.wav");
  loadSound("falling", "./assets/sounds/paintingFalling.wav");
  loadSound("kidMusic", "./assets/sounds/kidMusic.wav");

  // Sound Effects ================
  loadSound("gong", "./assets/sounds/clockGong.wav");
  loadSound("bookcaseMoving", "./assets/sounds/bookcaseMoving.wav");
  loadSound("spooky", "./assets/sounds/spookyBgMusic.mp3");
};

//  ================================================================= //

export const playSFX = (sndNameStr) => {
  play(sndNameStr, { volume: getSoundEffectVolume(), loop: false });
};

export const playBGM = (sndNameStr) => {
  // if something is already playing
  if (window.currentlyPlayingBGM) {
    if (window.currentlyPlayingBGM.name == sndNameStr) {
      // if you try to play the same thing that is currently playing,
      // leave it playing and dont do anything else
      return;
    } else {
      // if currently playing anything, STOP IT, then proceed
      window.currentlyPlayingBGM.stop();
    }
  }

  const playObj = play(sndNameStr, {
    volume: getBackgroundMusicVolume(),
    loop: true,
  });
  playObj.name = sndNameStr;
  window.currentlyPlayingBGM = playObj;
};

export const stopBGM = () => {
  if (window.currentlyPlayingBGM) {
    window.currentlyPlayingBGM.stop();
  }
  delete window.currentlyPlayingBGM;
};

export const setCurrentlyPlayingBGMVolume = () => {
  if (window.currentlyPlayingBGM) {
    window.currentlyPlayingBGM.volume(getBackgroundMusicVolume());
  }
};
