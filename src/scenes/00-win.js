export const winScene = () => {
  scene("win", () => {
    add([
      text("You escaped!"),
      color(255, 0, 0),
      origin("center"),
      pos(width() / 2, height() / 2),
    ]);
  });
}
