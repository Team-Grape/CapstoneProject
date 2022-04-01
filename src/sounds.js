import { getBackgroundMusicVolume, getSoundEffectVolume } from "./state";

export const loadAllSounds = () => {
  //Background Music ============
  loadSound("horror", "./assets/sounds/horrorAmbiance.wav");
  loadSound("falling", "./assets/sounds/paintingFalling.wav");
  loadSound("kidMusic", "./assets/sounds/kidMusic.wav");
  loadSound('ambience', './assets/sounds/ambience/houseAmbience.wav')
  loadSound('title', './assets/sounds/titleTrack/titleTrack.wav')
  loadSound('dundundun', './assets/sounds/dundundun.wav')
  // Sound Effects ================
  loadSound("gong", "./assets/sounds/clockGong.wav");
  loadSound("bookcaseMoving", "./assets/sounds/bookcaseMoving.wav");
  loadSound("spooky", "./assets/sounds/spookyBgMusic.mp3");
  loadSound('click', './assets/sounds/click.wav')
  loadSound('poof', './assets/sounds/poof.wav')
  loadSound('sparkle', './assets/sounds/sparkle.wav')
  loadSound('footSteps', './assets/sounds/stairs.wav')
  loadSound('doorClose', './assets/sounds/doorClosingNoise.wav')
  loadSound('fireSound', './assets/sounds/fireSound.wav')
  loadSound('swordSound', './assets/sounds/swordSound.wav')
  loadSound('keyNoise', './assets/sounds/keyNoise.wav')
  loadSound('crumble', "./assets/sounds/crumble.wav")
  loadSound('cabbage', './assets/sounds/openChestSound.wav')
  loadSound('glassDoorOpening', './assets/sounds/glassDoorOpening.wav')
  loadSound('glassDoorClosing', './assets/sounds/glassDoorsClosed.wav')
  loadSound('drawerOpening', './assets/sounds/drawerOpening.wav')
  loadSound('drawerClosing', './assets/sounds/drawerClosing.wav')
  loadSound('chestOpen', './assets/sounds/openChestSound.wav')
  loadSound('cuteGhostSound', './assets/sounds/cuteGhostSound.wav')
  loadSound('lockClick', './assets/sounds/lockClick.wav')
};

//  ================================================================= //

export const playSFX2 = (sndNameStr) => {
  if (window.currentlyPlayingSFX) {
    
  }
  console.log('playingSFX')
  play(sndNameStr, { volume: getSoundEffectVolume(), loop: false });
};




export const playSFX = (sndNameStr) => {
  // if something is already playing
  if (window.currentlyPlayingSFX) {
    if (window.currentlyPlayingSFX.time() - 1 > window.currentlyPlayingSFX.duration() || 
    window.currentlyPlayingSFX.name == sndNameStr){
      window.currentlyPlayingSFX.stop();
      delete window.currentlyPlayingSFX;
    }
  }
  
  //   if (window.currentlyPlayingSFX.name == sndNameStr) {
  //     // if you try to play the same thing that is currently playing,
  //     // leave it playing and dont do anything else
  //     return;
  //   } else {
  //     // if currently playing anything, STOP IT, then proceed
  //     window.currentlyPlayingSFX.stop();
  //   }
  // }

  const playObj = play(sndNameStr, {
    volume: getSoundEffectVolume(),
    loop: false,
  });
  playObj.name = sndNameStr;
  window.currentlyPlayingSFX = playObj;
};

export const stopSFX = () => {
  if (window.currentlyPlayingSFX) {
    window.currentlyPlayingSFX.stop();
  }
  delete window.currentlyPlayingBGM;
};

export const setCurrentlyPlayingSFXVolume = () => {
  if (window.currentlyPlayingSFX) {
    window.currentlyPlayingSFX.volume(getSoundEffectVolume());
  }
};




























export const playBGM = (sndNameStr) => {
  // if something is already playing
  if (window.currentlyPlayingBGM) {
    console.log(currentlyPlayingBGM)
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
