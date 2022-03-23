import { getOption, getBackgroundMusicVolume } from "./core";

class Music {
  static PLAY_SOUND = true;
  static SOUNDS = ["gong", "bookcaseMoving", "horror", "falling", "spooky", "kidMusic"];

  constructor() {
    this.soundEffectVolume = 1.5;
    this.backgroundMusicVolume = 1.5
    this.sound = {
      spooky: {
        url: "spookyBgMusic.mp3",
        vol: this.backgroundMusicVolume,
        // loadInitally: true,
      },
      gong: {
        url: "clockGong.wav",
        vol: this.soundEffectVolume,
        loadInitally: false,
      },
      bookcaseMoving: {
        url: "bookcaseMoving.wav",
        vol: this.soundEffectVolume,
        loadInitally: false,
      },
      horror: {
        url: "horrorAmbiance.wav",
        vol: this.soundEffectVolume,
        loadInitally: false,
      },
      falling: {
        url: "paintingFalling.wav",
        vol: this.soundEffectVolume,
        loadInitally: false,
      },
      kidMusic: {
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
      return;
    }
    if (Music.PLAY_SOUND === false) {
      return;
    }
    this.stopCurrentlyPlaying();
    if (!Music.SOUNDS.includes(soundName)) {
      throw new Error(`Unknown sound effect name: ${soundName}`);
    }
    const soundFile = this.sound[soundName];
    console.log('Sound File.vol before -->',soundFile.vol)
    try {
      this.currentlyPlayingName = soundName;
      await this.loadSoundEffect(soundName, soundFile);
      if (this.currentlyPlayingName !== soundName) {
        stop(soundName);
      } else {
        this.currentlyPlaying = play(soundName, {
          volume: getBackgroundMusicVolume(),
          loop: soundFile.loop === false ? false : true,
        });
        console.log('SoundFile.vol after -->',this)
        return this.currentlyPlaying;
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
      console.log('old background music level ->',this.backgroundMusicVolume)
      this.backgroundMusicVolume = soundLevel
      console.log('new background music level ->',this.backgroundMusicVolume)
    } else {
      this.soundEffectVolume = soundLevel
      console.log(this.soundEffectVolume)
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
