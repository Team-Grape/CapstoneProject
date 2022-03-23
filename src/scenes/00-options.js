import { getCurrentRoom, getOnTitleScene } from "../core";

export const options = () => {
  scene("options", () => {
    add([
      text("Game Options", { size: 54, width: width() - 230, font: "sink" }),
      color(255, 0, 0),
      pos(width() / 2, 75),
      origin("center"),
    ]);

    // const backgroundMusicVolume = add([
    //   text("Background Music Volume", {
    //     size: 32,
    //     font: "sink",
    //   }),
    //   pos(width() / 2, 200),
    //   color(255, 255, 255),
    //   origin("center"),
    //   area()
    // ]);

    // let currentBgVolume = volume()

    // const currentBgVolumeDisplay = add([
    //     text(`${(currentBgVolume/ 3) * 100}%`,  {
    //         size: 42,
    //         width: width() - 230,
    //         font: "sink",
          
    //       }),
    //       pos(width() / 2, 270),
    //       color(249, 215, 57),
    //       origin("center"),
    //       area(),
    //       'currentBgVolumeDisplay'
    // ])

    // const increaseBgMusicButton = add([
    //     text(`+`,  {
    //         size: 30,
    //         font: "sink",
    //       }),
    //       area(),
    //       pos(width() / 2 + 305, 270),
    //     // pos(1200, 500),
    //       color(140, 140, 140),
    //     //   outline(width, 10, color(255, 255, 255)),
    //       origin("center"),
    //       'increaseBgMusicButton'
    // ])

    // const decreaseBgMusicButton = add([
    //     text(`-`,  {
    //         size: 30,
    //         width: width() - 230,
    //         font: "sink",
    //       }),
    //       pos(width() / 2 - 305, 270),
    //       color(140, 140, 140),
    //       origin("center"),
    //       area(),
    //       'decreaseBgMusicButton'
    // ])

    // onClick('decreaseBgMusicButton', () => {
    //     console.log('decrease')
    //     if (currentBgVolume > 0) {
    //         currentBgVolume -= .1;
    //         console.log('after',currentBgVolume)
    //         currentBgVolumeDisplay.text = `${((currentBgVolume/ 3) * 100).toFixed(0)}%`
    //         volume((currentBgVolume).toFixed(0))
    //         readd(currentBgVolumeDisplay)
    //     }
    // });

    // onClick('increaseBgMusicButton', () => {
    //     if (currentBgVolume < 3.00) {
    //         console.log('before',currentBgVolume)
    //         currentBgVolume += .1;
    //         console.log('after',currentBgVolume)
    //         currentBgVolumeDisplay.text = `${((currentBgVolume/ 3) * 100).toFixed(0)}%`
    //         volume((currentBgVolume).toFixed(0))
    //         readd(currentBgVolumeDisplay)
    //     }
    // });

    


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
      "options",
    ]);


    let currentSeVolume = volume()

    const currentSeVolumeDisplay = add([
        text(`${(currentSeVolume/ 3) * 100}%`,  {
            size: 42,
            width: width() - 230,
            font: "sink",
          
          }),
          pos(width() / 2, 440),
          color(249, 215, 57),
          origin("center"),
          area(),
          'currentSeVolumeDisplay'
    ])

    const increaseSeMusicButton = add([
        text(`+`,  {
            size: 30,
            font: "sink",
          }),
          area(),
          pos(width() / 2 + 305, 440),
        // pos(1200, 500),
          color(140, 140, 140),
        //   outline(width, 10, color(255, 255, 255)),
          origin("center"),
          'increaseSeMusicButton'
    ])

    const decreaseSeMusicButton = add([
        text(`-`,  {
            size: 30,
            width: width() - 230,
            font: "sink",
          }),
          pos(width() / 2 - 305, 440),
          color(140, 140, 140),
          origin("center"),
          area(),
          'decreaseSeMusicButton'
    ])

    onClick('decreaseSeMusicButton', () => {
        console.log('decrease')
        if (currentSeVolume > 0) {
            currentSeVolume -= .1;
            console.log('after',currentSeVolume)
            currentSeVolumeDisplay.text = `${((currentSeVolume/ 3) * 100).toFixed(0)}%`
            volume((currentSeVolume).toFixed(0))
            readd(currentSeVolumeDisplay)
        }
    });

    onClick('increaseSeMusicButton', () => {
        if (currentSeVolume < 3.00) {
            console.log('before',currentSeVolume)
            currentSeVolume += .1;
            console.log('after',currentSeVolume)
            currentSeVolumeDisplay.text = `${((currentSeVolume/ 3) * 100).toFixed(0)}%`
            volume((currentSeVolume).toFixed(0))
            readd(currentSeVolumeDisplay)
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

    onClick('return', () => {
        if (getOnTitleScene()) {
            go('title')
        } else {
            go(getCurrentRoom())
        }
    })

    onKeyPress("up", () => music.volume(music.volume() + 0.1));
    onKeyPress("down", () => music.volume(music.volume() - 0.1));
    onKeyPress("left", () => music.detune(music.detune() - 100));
    onKeyPress("right", () => music.detune(music.detune() + 100));
    onKeyPress("escape", () => music.stop());
  });
};
