import { 
  getCurrentRoom, 
  getOnTitleScene, 
  getOption, 
  setOption, 
  setBackgroundMusicVolume, 
  getBackgroundMusicVolume, 
  getSoundEffectVolume,
  setSoundEffectVolume,
  playSFX,
  displayInventoryDiv
 } from "../core";
import MusicManager from "../MusicManager";



export const options = () => {
const music = MusicManager();
//const soundEffects = MusicManager()

  scene("options", () => {
   

    console.log("Music Manager ==>", music);

    add([
      text("Game Options", { size: 54, width: width() - 230, font: "sink" }),
      color(255, 0, 0),
      pos(width() / 2, 75),
      origin("center"),
    ]);

    const backgroundMusicVolume = add([
      text("Background Music Volume", {
        size: 32,
        font: "sink",
      }),
      pos(width() / 2, 200),
      color(255, 255, 255),
      origin("center"),
      area(),
    ]);

    // =============== Background Music =============== //
    // let currentBgVolume = music.backgroundMusicVolume;

    let currentBackgroundMusicVolume = getBackgroundMusicVolume();
    const currentBgVolumeDisplay = add([
      text(`${((currentBackgroundMusicVolume / 3) * 100).toFixed(0)}%`, {
        size: 42,
        width: width() - 230,
        font: "sink",
      }),
      pos(width() / 2, 270),
      color(249, 215, 57),
      origin("center"),
      area(),
      "currentBgVolumeDisplay",
    ]);

    const increaseBgMusicButton = add([
      text(`+`, {
        size: 30,
        font: "sink",
      }),
      area(),
      pos(width() / 2 + 305, 270),
      // pos(1200, 500),
      color(140, 140, 140),
      //   outline(width, 10, color(255, 255, 255)),
      origin("center"),
      "increaseBgMusicButton",
    ]);

    const decreaseBgMusicButton = add([
      text(`-`, {
        size: 30,
        width: width() - 230,
        font: "sink",
      }),
      pos(width() / 2 - 305, 270),
      color(140, 140, 140),
      origin("center"),
      area(),
      "decreaseBgMusicButton",
    ]);

    onClick("decreaseBgMusicButton", () => {
      let currentBackgroundMusicVolume = getBackgroundMusicVolume();
      console.log('Current BgMusic Volume',currentBackgroundMusicVolume)
      if (currentBackgroundMusicVolume > 0) {
        // currentBgVolume -= 0.1;
        currentBgVolumeDisplay.text = `${((currentBackgroundMusicVolume / 3) * 100).toFixed(
          0
        )}%`;
        // sets volume on local storage 'options' key
        console.log(typeof currentBackgroundMusicVolume)
        setBackgroundMusicVolume(currentBackgroundMusicVolume -= 0.1);

        music.changeVolume("backgroundMusic", currentBackgroundMusicVolume);
        if (music.currentlyPlaying) {
          music.currentlyPlaying.volume(currentBackgroundMusicVolume);
        }
        readd(currentBgVolumeDisplay);
      }
    });

    onClick("increaseBgMusicButton", () => {
      let currentBackgroundMusicVolume = getBackgroundMusicVolume();
      console.log('current level in increase on click',currentBackgroundMusicVolume);
      if (currentBackgroundMusicVolume < 3.0) {
  
        currentBgVolumeDisplay.text = `${((currentBackgroundMusicVolume / 3) * 100).toFixed(
          0
        )}%`;
                
        // sets volume on local storage 'options' key
        console.log(typeof currentBackgroundMusicVolume)
        setBackgroundMusicVolume(currentBackgroundMusicVolume += 0.1);

        music.changeVolume("backgroundMusic", currentBackgroundMusicVolume);

        if (music.currentlyPlaying) {
          music.currentlyPlaying.volume(currentBackgroundMusicVolume);
        }
        readd(currentBgVolumeDisplay);
      }
    });

    // ================== Sound Effects ===================== //

    const soundEffectsVolume = add([
      text("Sound Effects Volume", {
        size: 32,
        width: width() - 230,
        font: "sink",
      }),
      pos(width() / 2, 350),
      color(255, 255, 255),
      origin("center"),
      area(),
      "soundEffects",
    ]);

    // let currentSeVolume = music.soundEffectsVolume;
    let currentSoundEffectVolume = getSoundEffectVolume();
    const currentSFXVolumeDisplay = add([
      text(`${((currentSoundEffectVolume / 3) * 100).toFixed(0)}%`, {
        size: 42,
        width: width() - 230,
        font: "sink",
      }),
      pos(width() / 2, 440),
      color(249, 215, 57),
      origin("center"),
      area(),
      "currentSFXVolumeDisplay",
    ]);

    const increaseSFXButton = add([
      text(`+`, {
        size: 30,
        font: "sink",
      }),
      area(),
      pos(width() / 2 + 305, 440),
      // pos(1200, 500),
      color(140, 140, 140),
      //   outline(width, 10, color(255, 255, 255)),
      origin("center"),
      "increaseSFXButton",
    ]);

    const decreaseSFXButton = add([
      text(`-`, {
        size: 30,
        width: width() - 230,
        font: "sink",
      }),
      pos(width() / 2 - 305, 440),
      color(140, 140, 140),
      origin("center"),
      area(),
      "decreaseSFXButton",
    ]);

    onClick("decreaseSFXButton", () => {
      let currentSoundEffectVolume = getSoundEffectVolume();
      if (currentSoundEffectVolume > 0.1) {
        // currentSeVolume -= 0.1;
        setSoundEffectVolume(currentSoundEffectVolume -= 0.1);
        currentSFXVolumeDisplay.text = `${((currentSoundEffectVolume / 3) * 100).toFixed(
          0
        )}%`;

        //if (soundEffects.currentlyPlaying) {
        //  soundEffects.currentlyPlaying.volume(currentSoundEffectVolume);
        //}
   
        readd(currentSFXVolumeDisplay);
      }
    });

    onClick("increaseSFXButton", () => {
      let currentSoundEffectVolume = getSoundEffectVolume();
      if (currentSoundEffectVolume < 3.0) {
        console.log('current sound effect volume ->',currentSoundEffectVolume)
        setSoundEffectVolume(currentSoundEffectVolume += 0.1);
        currentSFXVolumeDisplay.text = `${((currentSoundEffectVolume / 3) * 100).toFixed(
          0
        )}%`;

        //if (soundEffects.currentlyPlaying) {
        //  soundEffects.currentlyPlaying.volume(currentSoundEffectVolume);
        //}
        readd(currentSFXVolumeDisplay);
      }
    });

    const returnButton = add([
      text("Return", {
        size: 32,
        width: width() - 230,
        font: "sink",
      }),
      pos(1100, 75),
      color(255, 255, 255),
      origin("center"),
      area(),
      "return",
    ]);

    onClick("return", () => {
      if (getOnTitleScene()) {
        go("title");
      } else {
        displayInventoryDiv()
        go(getCurrentRoom());
      }
    });

    add([
      text(`Play Music`, {
        size: 30,
        font: "sink",
      }),
      area(),
      pos(50, 50),
      // pos(1200, 500),
      color(140, 140, 140),
      //   outline(width, 10, color(255, 255, 255)),
      "playMusic",
    ]);

    add([
      text(`Stop Music`, {
        size: 30,
        font: "sink",
      }),
      area(),
      pos(50, 200),
      // pos(1200, 500),
      color(140, 140, 140),
      //   outline(width, 10, color(255, 255, 255)),
      "stopMusic",
    ]);

    onClick("playMusic", () => {
      console.dir(music, { depth: null });
      music.play("kidMusic");
    });

    onClick("stopMusic", () => {
      console.dir(music, { depth: null });
      music.stop();
    });

    // ============== Sound Effect Test Buttons =========================


    add([
      text(`Play Sound Effect`, {
        size: 30,
        font: "sink",
      }),
      area(),
      pos(1050, 250),
      // pos(1200, 500),
      color(140, 140, 140),
      //   outline(width, 10, color(255, 255, 255)),
      "playSoundEffect",
    ]);

    onClick("playSoundEffect", () => {
      console.log('SoundEffects instance')
      //console.dir(soundEffects, { depth: null });
      //soundEffects.play("falling");
      playSFX("falling")
    });

    // add([
    //   text(`Stop Sound Effect`, {
    //     size: 30,
    //     font: "sink",
    //   }),
    //   area(),
    //   pos(1050, 350),
    //   // pos(1200, 500),
    //   color(140, 140, 140),
    //   //   outline(width, 10, color(255, 255, 255)),
    //   "stopSoundEffect",
    // ]);

    

    // onClick("stopMusic", () => {
    //   console.dir(music, { depth: null });
    //   music.stop();
    // });
  });
};
