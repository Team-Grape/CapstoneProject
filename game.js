kaboom({
  global: true,
  width: 1248,
  height: 546,
  scale: 1,
  debug: true,
  background: [35, 35, 35],
});

loadSprite('drawer', 'drawer.png');
loadSprite('background-tile', 'basementTemplate.png');
loadSprite('door', 'evilDoor.png');
loadSprite('key', 'key_gold.png');
loadSprite('start', 'start.png');

scene('title', () => {
  add([
    text('Click anywhere to start'),
    color(255, 0, 0),
    pos(width() / 2, height() / 2),
    origin('center'),
  ]);
  // onLoad(() => {
  //   add([sprite('start'), scale(1), area(), 'start']);
  // });
  // can change to onClick when we have the start asset.
  onClick(() => {
    go('game');
  });
});

scene('game', () => {
  onLoad(() => {
    add([sprite('background-tile'), scale(1), area()]);
  });

  onLoad(() => {
    add([sprite('drawer'), pos(80, 200), scale(2), area(), 'drawer']);
  });

  onLoad(() => {
    add([sprite('door'), pos(900, 150), scale(4), area(), 'door']);
  });

  onLoad(() => {
    add([sprite('key'), pos(90, 250), scale(1), area(), 'key']);
  });

  onClick('key', (key) => {
    console.log('a click happened');
    alert('a key was added to your inventory');
    key.destroy();
  });

  onClick('door', (door) => {
    go('win');
  });
});

scene('win', () => {
  add([
    text('You escape!'),
    color(255, 0, 0),
    origin('center'),
    pos(width() / 2, height() / 2),
  ]);
});

go('title');
