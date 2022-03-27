import { getSoundEffectVolume } from "./state";

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

export const playSFX = (sndNameStr) => {
  play(sndNameStr, { volume: getSoundEffectVolume(), loop: false });
};
