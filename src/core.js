export const checkInventoryForItem = (item) => {
  if (!window.localStorage.getItem("inventory")) {
    // you dont even have an inventory yet!
    return false;
  }
  const currentInventory = JSON.parse(window.localStorage.getItem("inventory"));
  if (currentInventory.filter((i) => i.name === item.name).length > 0) {
    // item is in the inventory!
    return true;
  } else {
    // item is not in the inventory!
    return false;
  }
}

export const addToInventory = (item) => {
  if (!window.localStorage.getItem("inventory")) {
    window.localStorage.setItem("inventory", JSON.stringify([]));
  }
  let currentInventory = JSON.parse(window.localStorage.getItem("inventory"));
  if (currentInventory.filter((i) => i.name === item.name).length === 0) {
    // this item is not in the inventory. So add it to the inventory below:
    localStorage.setItem(
      "inventory",
      JSON.stringify([...currentInventory, item])
    );
  }
}


export function displayNavigationArrows() {
  add([
    sprite("right-arrow"),
    pos(1190, 250),
    scale(0.5),
    area(),
    "right-arrow",
  ]);
  add([
    sprite("left-arrow"),
    pos(7.5, 250),
    scale(0.5),
    area(),
    "left-arrow",
  ]);
  add([
    sprite("down-arrow"),
    pos(575, 475),
    scale(0.5),
    area(),
    "down-arrow",
  ]);
} 