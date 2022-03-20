export const titleScene = () => {
  scene("title", () => {
    add([
      text("Click anywhere to start"),
      color(255, 0, 0),
      pos(width() / 2, height() / 2),
      origin("center"),
    ]);
  
    onClick(() => {
      go("basementRoomOneUp");
    });
  });
}
