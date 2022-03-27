import { 
  getBackgroundMusicVolume,
  getSoundEffectVolume
 } from "./state";

class Music {
  static PLAY_SOUND = true;
  static SOUNDS = ["gong", "bookcaseMoving", "horror", "falling", "spooky", "kidMusic"];

  constructor() {
    this.soundEffectVolume = 1.5;
    this.backgroundMusicVolume = 1.5
    this.sound = {
      spooky: {
        type: 'background',
        url: "spookyBgMusic.mp3",
        vol: this.backgroundMusicVolume,
        // loadInitally: true,
      },
      gong: {
        type: 'soundEffect',
        url: "clockGong.wav",
        vol: this.soundEffectVolume,
        loadInitally: false,
      },
      bookcaseMoving: {
        type: 'soundEffect',
        url: "bookcaseMoving.wav",
        vol: this.soundEffectVolume,
        loadInitally: false,
      },
      horror: {
        type: 'background',
        url: "horrorAmbiance.wav",
        vol: this.soundEffectVolume,
        loadInitally: false,
      },
      falling: {
        type: 'soundEffect',
        url: "paintingFalling.wav",
        vol: this.soundEffectVolume,
        loadInitally: false,
      },
      kidMusic: {
        type: 'background',
        url: "kidMusic.wav",
        vol: this.backgroundMusicVolume,
        loadInitally: true
      }
    };
    this.currentlyPlaying = null;
    this.currentlyPlayingName = null;
  }

  stopCurrentlyPlaying() {
    if (this.currentlyPlaying) {
      this.currentlyPlaying.stop();
      this.currentlyPlaying = null;
      this.currentlyPlayingName = null;

    }
  }

  loadSoundEffect(soundName, soundFile) {
    return loadSound(soundName, `/assets/sounds/${soundFile.url}`);
  }

  async play(soundName) {

    if (this.currentlyPlayingName === soundName) {
      // if you try to play the same thing that is currently playing, bail
      return;
    } else if (this.currentlyPlayingName) {
      // if currently playing anything, STOP IT, then proceed
      this.stop()
    }


    if (Music.PLAY_SOUND === false) {
      return;
    }
    this.stopCurrentlyPlaying();
    if (!Music.SOUNDS.includes(soundName)) {
      throw new Error(`Unknown sound effect name: ${soundName}`);
    }
    const soundFile = this.sound[soundName];
 
    try {
      this.currentlyPlayingName = soundName;
      await this.loadSoundEffect(soundName, soundFile);
      if (this.currentlyPlayingName !== soundName) {
        this.stop(soundName);
      } else {
        if (soundFile.type === 'background') {
          this.currentlyPlaying = await play(soundName, {
            volume: getBackgroundMusicVolume(),
            loop: soundFile.loop === false ? false : true,
          });
          
          return this.currentlyPlaying;
        } else if (soundFile.type === 'soundEffect') {
          this.currentlyPlaying = play(soundName, {
            volume: getSoundEffectVolume(),
            loop: soundFile.loop === false
          });
          return this.currentlyPlaying;
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  stop(soundName = null) {
    if (soundName !== null) {
      if (this.currentlyPlayingName === soundName) {
        this.stopCurrentlyPlaying();
      }
    } else {
      this.stopCurrentlyPlaying();
    }
  }

  changeVolume(soundType, soundLevel) {
    if (soundType === 'backgroundMusic') {

      this.backgroundMusicVolume = soundLevel

    } else {
      this.soundEffectVolume = soundLevel

    }
  }
}

let soundEffect = null;

export default () => {
  if (typeof loadSound === "undefined") {
    throw new Error("Music initialized before kaboom global");
  }
  if (soundEffect === null) {
    soundEffect = new Music();

  }
  return soundEffect;
};
