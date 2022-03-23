export const entry = () => {
  scene("entry", () => {
    add([
      text("Click me to start"),
      color(255, 0, 0),
      pos(width() / 2, height() / 2),
      origin("center"),
      area(),
      'goToTitleButton'
    ]);
  
    onClick('goToTitleButton', () => {
      go("title");
    });
  });
}
