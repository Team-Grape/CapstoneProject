kaboom({
  global: true,
  fullscreen: true,
  scale: 1,
  debug: true,
});

loadSprite("drawer", "https://i.imgur.com/FchYMKv.png");

onLoad(() => {
  add([sprite("drawer"), pos(80, 100), area()]);
});

// scene('game', () => {
//     sprite('drawer')
// })

// start('game')

// const map = [
//     '',
//     '',
//     '',
//     '',
//     '',
//     '',
// ]
