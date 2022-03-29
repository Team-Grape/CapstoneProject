import { navArrows, singleViewNavArrow } from "../../buttons";

const roomName = 'basementStorageTwo';
const roomNavArrows = navArrows(roomName);


export const createBasementStorageTwo = async () => {
    scene(roomName + "Down", () => {
        window.roomName = roomName;
        window.viewDirection = "singleViewRoom";

        onLoad(() => {
            add([sprite('storage-room-two'), scale(1)])
        })

        singleViewNavArrow("basementStorageTwo", "basementHallwayDown")
    })
}