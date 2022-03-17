kaboom({
  global: true,
  width: 1248,
  height: 546,
  scale: 1,
  debug: true,
});

loadSprite("drawer", "drawer.png");
loadSprite("background-tile", "basementTemplate.png");
loadSprite("door", "evilDoor.png");
loadSprite("key", "key_gold.png");

onLoad(() => {
  add([sprite("background-tile"), scale(1), area()]);
});


onLoad(() => {
  add([sprite("drawer"), pos(80, 200), scale(2), area()]);
});

onLoad(() => {
    add([sprite("door"), pos(500, 150), scale(4), area()]);
  });

  onLoad(() => {
    add([sprite("key"), pos(90, 250), scale(1), area()]);
  });