import { getBackgroundMusicVolume } from "./state";

export const playBGM = (sndNameStr) => {
  // if something is already playing
  if (window.currentlyPlayingBGM) {
    if (window.currentlyPlayingBGM.name == sndNameStr) {
      // if you try to play the same thing that is currently playing, 
      // leave it playing and dont do anything else
      return
    } else {
      // if currently playing anything, STOP IT, then proceed
      window.currentlyPlayingBGM.stop()
    }
  }

  const playObj = play(sndNameStr, { volume: getBackgroundMusicVolume(), loop: true });
  playObj.name = sndNameStr;
  window.currentlyPlayingBGM = playObj
}

export const stopBGM = () => {
  window.currentlyPlayingBGM.stop();
  delete window.currentlyPlayingBGM;
}

export const setCurrentlyPlayingBGMVolume = () => {
  if (window.currentlyPlayingBGM) {
    window.currentlyPlayingBGM.volume(getBackgroundMusicVolume());
  }
}






