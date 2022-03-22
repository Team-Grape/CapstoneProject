class Music {
  static PLAY_SOUND = true;
  static SOUNDS = ["gong", "bookcaseMoving", "horror", "falling", "spooky"];

  constructor() {
    this.sound = {
      spooky: {
        url: "spookyBgMusic.mp3",
        vol: 0.5,
        loadInitally: true,
      },
      gong: {
        url: "clockGong.wav",
        vol: 0.5,
        loadInitally: false,
      },
      bookcaseMoving: {
        url: "bookcaseMoving.wav",
        vol: 0.5,
        loadInitally: false,
      },
      horror: {
        url: "horrorAmbiance.wav",
        vol: 0.5,
        loadInitally: false,
      },
      falling: {
        url: "paintingFalling.wav",
        vol: 0.5,
        loadInitally: false,
      },
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
    const soundFile = this.sounds[soundName];
    console.log("what is this????",this)
    console.log("what is this sound??????",soundFile)
    try {
      this.currentlyPlayingName = soundName;
      await this.loadSoundEffect(soundName, soundFile);
      if (this.currentlyPlayingName !== soundName) {
        stop(soundName);
      } else {
        this.currentlyPlaying = play(soundName, {
          volume: soundFile.vol,
          loop: soundFile.loop === false ? false : true,
        });
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
