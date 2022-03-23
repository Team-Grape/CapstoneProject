export const options = () => {
  scene("options", () => {
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
      area()
    ]);

    let currentBgVolume = volume()

    const currentBgVolumeDisplay = add([
        text(`${(currentBgVolume/ 3) * 100}%`,  {
            size: 42,
            width: width() - 230,
            font: "sink",
          
          }),
          pos(width() / 2, 270),
          color(249, 215, 57),
          origin("center"),
          area(),
          'currentBgVolumeDisplay'
    ])

    const increaseBgMusicButton = add([
        text(`+`,  {
            size: 30,
            font: "sink",
          }),
          area(),
          pos(width() / 2 + 305, 270),
        // pos(1200, 500),
          color(140, 140, 140),
        //   outline(width, 10, color(255, 255, 255)),
          origin("center"),
          'increaseBgMusicButton'
    ])

    const decreaseBgMusicButton = add([
        text(`-`,  {
            size: 30,
            width: width() - 230,
            font: "sink",
          }),
          pos(width() / 2 - 305, 270),
          color(140, 140, 140),
          origin("center"),
          area(),
          'decreaseBgMusicButton'
    ])

    onClick('decreaseBgMusicButton', () => {
        console.log('decrease')
        if (currentBgVolume > 0) {
            currentBgVolume -= .1;
            currentBgVolumeDisplay.text = `${((currentBgVolume/ 3) * 100)}%`
            volume(currentBgVolume)
            readd(currentBgVolumeDisplay)
        }
    });

    onClick('increaseBgMusicButton', () => {
        if (currentBgVolume < 3.00) {
            console.log('before',currentBgVolume)
            currentBgVolume += .1;
            console.log('after',currentBgVolume)
            currentBgVolumeDisplay.text = `${((currentBgVolume/ 3) * 100)}%`
            volume(currentBgVolume)
            readd(currentBgVolumeDisplay)
        }
    });

    


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

    onKeyPress("up", () => music.volume(music.volume() + 0.1));
    onKeyPress("down", () => music.volume(music.volume() - 0.1));
    onKeyPress("left", () => music.detune(music.detune() - 100));
    onKeyPress("right", () => music.detune(music.detune() + 100));
    onKeyPress("escape", () => music.stop());
  });
};
