import { addToInventory, checkInventoryForItem } from "../core.js";
import { cellarKey } from "../items.js";

export const thirdRoom = () => {
    scene("roomThree", () => {
        onLoad(() => {
            add([sprite('room-three-background', scale(1), area())]);
        })
    })
}