export const createTestScene = () => {

//loadSprite("ghost1", "./assets/ghost-1");
//loadSprite("ghost2", "./assets/ghost-2");
//loadSprite("ghost3", "./assets/ghost-3");
loadSprite("candle", "./assets/candle1.png");

//loadSprite("bat", "./assets/bat.32x32.gif");


loadSprite("froggy", "./assets/ghost.png", {
    sliceX: 4,
    sliceY: 1,
    anims: {
        idle: {
            from: 0,
            to: 3,
        },
    },
})


loadSprite("smoke", "./assets/SmokeAndFire.png", {
    sliceX: 4,
    sliceY: 4,
    anims: {
        main: {
            from: 0,
            to: 7,
        },
    },
})


loadSprite("poof", "./assets/death.png", {
    sliceX: 6,
    sliceY: 1,
    anims: {
        main: {
            from: 0,
            to: 5,
        },
    },
})

loadSprite("bomb", "./assets/BombExploding.png", {
    sliceX: 13,
    sliceY: 1,
    anims: {
        main: {
            from: 0,
            to: 6,
        },
    },
})

loadSprite("explosion", "./assets/Explosion.png", {
    sliceX: 12,
    sliceY: 1,
    anims: {
        main: {
            from: 0,
            to: 11,
        },
    },
})

loadSprite("flame", "./assets/Fire16px.png", {
    sliceX: 3,
    sliceY: 3,
    anims: {
        main: {
            from: 1,
            to: 8,
        },
    },
})


  scene('test', () => {

    onLoad(() => {
//    add([
//      sprite("froggy"),
//    ]);


    // with options

//      add([sprite('background-tile'), scale(1), area()]);
//      add([
//        sprite('fruit-painting'),
//        pos(500, 150),
//        scale(4),
//        area(),
//        'fruit-painting',
//      ]);
    });

    const ps = async () => { 
    for(let x = 1100; x > 100; x -= 20) {
    const smoke = add([
      sprite("smoke"),
      opacity(0.6),
      pos(x, 100),
      scale(3),
    ])
    smoke.play('main',  {loop: false, speed: 8, onEnd: () => {smoke.destroy()}})
    await new Promise(resolve => setTimeout(resolve, (.1 * 1000)));
    }}

    ps()
//    const smoke = add([
//      sprite("smoke"),
//      opacity(0.6),
//      pos(200, 100),
//      scale(1),
//    ])
//    smoke.play('main',  {loop: false, speed: 8, onEnd: () => {smoke.destroy()}})


        const bookcase =  add([
        sprite("bookcase"),
        pos(500, 150),
        scale(4),
        area(),
        "bookcase",
      ]);

    const poof = add([
      sprite("poof"),
      opacity(0.6),
      pos(470, 180),
      scale(4),
    ])

    const bomb = add([
      sprite("bomb"),
      opacity(1),
      pos(865, 190),
      scale(2),
    ])

    const flame = add([
      sprite("flame"),
      opacity(0.6),
      pos(482, 165),
      scale(1),
    ])

    const candle = add([
      sprite("candle"),
      opacity(0.6),
      pos(470, 180),
      scale(4),
    ])


   bomb.play("main", {speed: 1, onEnd: () => {
     bomb.destroy()
    const explosion = add([
      sprite("explosion"),
      opacity(0.6),
      pos(800, 180),
      scale(2),
    ])
   explosion.play('main',  {loop: false, speed: 8, onEnd: () => {explosion.destroy()}})
     
   }})

    //console.dir(froggy, {depth: null})
    //froggy.opacity = .1
   flame.play('main',  {loop: true, speed: 4})
   poof.play('main', {speed: 4, onEnd: () => {
      poof.destroy();
    const froggy = add([
      sprite("froggy"),
      opacity(0.0),
      pos(500, 150),
      scale(4),
    ])
    froggy.play("idle", {loop: true, pingpong: true, speed: 4})
      froggy.opacity = .2
  let counter = 0;
  onUpdate(() => {
//    if (counter === 1) {
    if (counter++ % (60 / 3) === 1) { // only update 3x per second{
      if (Math.random() < 0.5) { // randomly choose
        if (froggy.opacity < .7) froggy.opacity += getRandomArbitrary(.01, .1);
      } else {
        if (froggy.opacity > .4) froggy.opacity -= getRandomArbitrary(.01, .1);
      }
    }
//    if (counter > 30) {counter = 0;}
//    counter++
  })
     }})

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}




  });
}
