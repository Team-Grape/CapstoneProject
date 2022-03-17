kaboom({
  global: true,
  fullscreen: true,
  scale: 1,
  debug: true,
});

loadSprite('drawer', 'drawer.png');

onLoad(() => {
  add([sprite('drawer'), pos(80, 100), area(), 'drawer']);
});

onClick('drawer', (drawer) => {
  alert('something is hidden inside the drawer, find the way to open it');
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
