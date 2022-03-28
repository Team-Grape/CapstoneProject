// debug + design + developer tools not meant for actual gameplay


export const debugRectSize = () => {
  debug.inspect = true
  window.debugXYObj = {
    topLeft: {x: 0, y:0},
    bottomRight: {x: 0, y:0},
    area: {x: 0, y:0},
    firstClick: true
  }
  const hud = add([text("",  { size: 16, font: "sink"}) ,pos(1000, 40)], z(99))
  onUpdate(async () => {
    let mouseXY = mousePos();
    if ( (isMousePressed()) && (debugXYObj.firstClick === true) ) {
      debugXYObj.firstClick = false;
      debugXYObj.topLeft.x = Math.ceil(mouseXY.x);
      debugXYObj.topLeft.y = Math.ceil(mouseXY.y);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    if ( (isMousePressed()) && (debugXYObj.firstClick === false) ) {
      debugXYObj.firstClick = true;
      debugXYObj.bottomRight.x = Math.ceil(mouseXY.x);
      debugXYObj.bottomRight.y = Math.ceil(mouseXY.y);
      debugXYObj.area.x = debugXYObj.bottomRight.x - debugXYObj.topLeft.x
      debugXYObj.area.y = debugXYObj.bottomRight.y - debugXYObj.topLeft.y
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    let tmpText =  `POS:\n`
    tmpText += ` X:${debugXYObj.topLeft.x}  Y:${debugXYObj.topLeft.y}\n`
    tmpText += `---------------\n`
    tmpText += `RECT/AREA:\n`
    tmpText += ` X:${debugXYObj.area.x}  Y:${debugXYObj.area.y}`
    hud.text = tmpText;
  })
}



