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
};

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
  displayInventoryDiv();
};

export const removeFromInventory = (item) => {
  if (!window.localStorage.getItem("inventory")) {
    window.localStorage.setItem("inventory", JSON.stringify([]));
  }

  let currentInventory = JSON.parse(window.localStorage.getItem("inventory"));

  // this does not care about quantity! just removes if exists
  currentInventory = currentInventory.filter((i) => i.name != item.name);
  localStorage.setItem("inventory", JSON.stringify(currentInventory));
  displayInventoryDiv();
};

export const setCursor = (imgUrl) => {
  const canvas = document.getElementsByTagName("canvas")[0];
  canvas.style["cursor"] = `url('${imgUrl}') 16 16, auto`;
};

export const resetCursor = () => {
  const canvas = document.getElementsByTagName("canvas")[0];
  canvas.style["cursor"] = "auto";
};

export const displayInventoryDiv = () => {
  if (!window.localStorage.getItem("inventory")) {
    window.localStorage.setItem("inventory", JSON.stringify([]));
  }
  const currentInventory = JSON.parse(window.localStorage.getItem("inventory"));

  removeInventoryDiv();

  if (currentInventory.length <= 0) {
    return;
  }
  const inventoryContainerDiv = document.createElement("div");
  //  inventoryContainer.style['border'] = '2px solid blue'
  inventoryContainerDiv.style["display"] = "flex";
  inventoryContainerDiv.style["position"] = "absolute";
  inventoryContainerDiv.style["bottom"] = "0";
  inventoryContainerDiv.id = "inventoryPanel";

  /*
  const headingTextNode = document.createTextNode('Inventory:');
  const headingContainer = document.createElement("div");
  headingContainer.appendChild(headingTextNode);
  headingContainer.style['-webkit-text-stroke'] = '1px white'
  headingContainer.style['color'] = 'black'
  headingContainer.style['font-size'] = 'xxx-large'
  inventoryContainerDiv.appendChild(headingContainer);
*/

  const cancelButton = {
    name: "None",
    description: "Deselect Item",
    image: "buttons/cancel.png",
    clickFunction: () => {
      resetCursor;
    },
  };

  currentInventory.unshift(cancelButton);

  currentInventory.map((item) => {
    const tmpItemImg = document.createElement("img");
    tmpItemImg.src = "./assets/" + item.image;
    //tmpItemImg.alt = `${item.name}: ${item.description}`
    tmpItemImg.title = `${item.name}: \n  ${item.description}`;
    tmpItemImg.style["border"] = "3px solid grey";
    tmpItemImg.style["width"] = "64px";
    tmpItemImg.style["height"] = "64px";
    tmpItemImg.style["user-select"] = "none";
    tmpItemImg.style["user-drag"] = "none";
    tmpItemImg.style["cursor"] = "pointer";
    tmpItemImg.classList.add("inventoryItem");
    if (item.name === "None") {
      tmpItemImg.onclick = () => {
        const canvas = document.getElementsByTagName("canvas")[0];
        canvas.style["cursor"] = "auto";
        delete window.selectedItem;
      };
    } else {
      tmpItemImg.onclick = () => {
        setCursor(tmpItemImg.src);
        window.selectedItem = item.name;
      };
    }

    inventoryContainerDiv.appendChild(tmpItemImg);
  });
  document.body.appendChild(inventoryContainerDiv);
};

export const removeInventoryDiv = () => {
  if (document.getElementById("inventoryPanel")) {
    document.getElementById("inventoryPanel").remove();
  }
  const canvas = document.getElementsByTagName("canvas")[0];
  canvas.style["cursor"] = "auto";
  delete window.selectedItem;
};