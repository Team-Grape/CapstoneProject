export const makeSceneUnclickable = () => {
  const allScene = get("SCENE")
//  console.log("UNCLICKABLE", allScene)
  allScene.forEach((item) => {
    item.area.scale.x = 0
    item.area.scale.y = 0
  })
}

export const makeSceneClickable = () => {
  const allScene = get("SCENE")
//  console.log("CLICKABLE", allScene)
  allScene.forEach((item) => {
    item.area.scale.x = 1
    item.area.scale.y = 1
  })
}

