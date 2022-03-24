export const createTestScene = () => {

loadSprite("ghost1", "./assets/ghost-1");
loadSprite("ghost2", "./assets/ghost-2");
loadSprite("ghost3", "./assets/ghost-3");
loadSprite("ghost4", "./assets/ghost-4");
  scene('test', () => {

    onLoad(() => {
      drawSprite({
      sprite: "ghost",
      pos: vec2(100, 200),
    })
//      add([sprite('background-tile'), scale(1), area()]);
//      add([
//        sprite('fruit-painting'),
//        pos(500, 150),
//        scale(4),
//        area(),
//        'fruit-painting',
//      ]);
    });

  });
}
