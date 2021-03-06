import { textBubble } from "./message";

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

export const createCursorDiv = (imgURL) => {
  const cursorItem = document.createElement("img");
  cursorItem.id = "cursorItem";
  cursorItem.classList.add("cursor");
  document.body.appendChild(cursorItem);
  canvas.addEventListener("mousemove", (e) => {
    if (window.selectedItem) {
      cursorItem.style["display"] = "block";

      cursorItem.style["image-rendering"] = "pixelated";
      cursorItem.style["width"] = "auto";
      cursorItem.style["height"] = "64px";
      cursorItem.style["user-select"] = "none";
      cursorItem.style["user-drag"] = "none";
      cursorItem.style.left = e.clientX - 32 + "px";
      cursorItem.style.top = e.clientY - 32 + "px";
    }
  });
  canvas.addEventListener("mouseleave", (e) => {
    cursorItem.style["display"] = "none";
  });
};

export const setCursorDivCenter = async (imgURL) => {
  const cursorItem = document.getElementById("cursorItem");
  cursorItem.src = imgURL;

  const canvas = document.getElementsByTagName("canvas")[0];
  canvas.style["cursor"] = "none";

  let aaaimg = new Image();
  aaaimg.src = imgURL;

  while (aaaimg.width == 0) {
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
  window.selectedItemOffset = {
    x: Math.ceil(aaaimg.width / 2),
    y: Math.ceil(aaaimg.height / 2),
  };
};

export const setCursorDivTopLeft = async (imgURL) => {
  const cursorItem = document.getElementById("cursorItem");
  cursorItem.src = imgURL;
  window.selectedItemOffset = { x: 0, y: 0 };
};

export const resetCursorDiv = () => {
  const cursorItem = document.getElementById("cursorItem");
  cursorItem.src = "";
  delete window.selectedItemOffset;
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
  inventoryContainerDiv.style["display"] = "flex";
  inventoryContainerDiv.style["position"] = "absolute";
  inventoryContainerDiv.style["bottom"] = "0";
  inventoryContainerDiv.id = "inventoryPanel";

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
    tmpItemImg.title = `${item.name}: \n  ${item.description}`;
    tmpItemImg.style["border"] = "3px solid grey";
    tmpItemImg.style["width"] = "auto";
    tmpItemImg.style["height"] = "64px";
    tmpItemImg.style["image-rendering"] = "pixelated";
    tmpItemImg.style["user-select"] = "none";
    tmpItemImg.style["user-drag"] = "none";
    tmpItemImg.classList.add("inventoryItem");
    if (item.name === "None") {
      tmpItemImg.onclick = () => {
        const canvas = document.getElementsByTagName("canvas")[0];
        canvas.style["cursor"] = "auto";
        delete window.selectedItem;
      };
    } else if (
      item.name === "'The Aesthetics of Fire-Hydrant Design: Volume IX'"
    ) {
      let fascinatingBookMessage = [
        [
          "This book sure does look fascinating but this doesn't seem the like right time to read it.",
        ],
      ];
      tmpItemImg.onclick = () => {
        textBubble(fascinatingBookMessage, () => {});
      };
    } else {
      tmpItemImg.onclick = () => {
        if (window.SETCURSORDIVTOPLEFT) {
          setCursorDivTopLeft(tmpItemImg.src);
        } else {
          setCursorDivCenter(tmpItemImg.src);
        }
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
  resetCursorDiv();
};
