export const makeSceneUnclickable = () => {
  const allScene = get("SCENE");
  //  console.log("UNCLICKABLE", allScene)
  allScene.forEach((item) => {
    item.area.scale.x = 0;
    item.area.scale.y = 0;
  });
};

export const makeSceneClickable = async () => {

  await new Promise(resolve => setTimeout(resolve, .1 * 1000));
  
  const allScene = get("SCENE");
  //  console.log("CLICKABLE", allScene)
  allScene.forEach((item) => {
    item.area.scale.x = 1;
    item.area.scale.y = 1;
  });
};
