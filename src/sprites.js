export const loadAllSprites = () => {
  //Items =================

  loadSprite("key", "./assets/items/key_gold.png");
  //Pry-Bar
  loadSprite("pryBar", "/assets/items/pry-bar.png");

  // ==================== BUTTONS =============================//

  loadSprite("menu-button", "./assets/buttons/menuButtonGray.png");
  loadSprite("start-button", "./assets/buttons/startButton.png");

  // ==================== NAV ARROWS ==========================//

  loadSprite("left-arrow", "./assets/nav_arrows/leftArrow.png");
  loadSprite("right-arrow", "./assets/nav_arrows/rightArrow.png");
  loadSprite("up-arrow", "./assets/nav_arrows/upArrow.png");
  loadSprite("down-arrow", "./assets/nav_arrows/downArrow.png");

  // ==================== ROOM BACKGROUNDS =====================//

  loadSprite(
    "basementRoomOneUp",
    "./assets/room_backgrounds/basement/basementRoomOneUp.png"
  );
  loadSprite(
    "basementRoomOneLeft",
    "./assets/room_backgrounds/basement/basementRoomOneLeft.png"
  );
  loadSprite(
    "basementRoomOneRight",
    "./assets/room_backgrounds/basement/basementRoomOneRight.png"
  );
  loadSprite(
    "basementRoomOneDown",
    "./assets/room_backgrounds/basement/basementRoomOneDown.png"
  );

  loadSprite(
    "background-tile",
    "./assets/room_backgrounds/basement/basementTemplate.png"
  );

  loadSprite(
    "room-two-background",
    "./assets/room_backgrounds/basement/roomTwoBackground.png"
  );
  loadSprite(
    "room-two-background-right",
    "./assets/room_backgrounds/basement/roomTwoRightLeft.png"
  );
  loadSprite(
    "room-two-background-left",
    "./assets/room_backgrounds/basement/roomTwoRightLeft.png"
  );

  loadSprite(
    "room-three-background",
    "./assets/room_backgrounds/roomThreeBackground.png"
  );
  loadSprite(
    "room-three-background-side",
    "./assets/room_backgrounds/roomThreeBackgroundSide.png"
  );

  // ===================== ANIMATIONS ==========================//

  loadSprite("ghost1", "./assets/ghost/ghost.png", {
    sliceX: 4,
    sliceY: 1,
    anims: {
      idle: {
        from: 0,
        to: 3,
      },
    },
  });

  loadSprite("poof", "./assets/poof/poof.png", {
    sliceX: 6,
    sliceY: 1,
    anims: {
      main: {
        from: 0,
        to: 5,
      },
    },
  });

  // ===================== DECORATIONS ==========================//

  //Barrels
  loadSprite("barrel1", "./assets/decorations/barrels/Barrels1.png");
  loadSprite("barrel3", "./assets/decorations/barrels/Barrels3.png");

  //Blankets ===============
  loadSprite(
    "blanket-cream",
    "./assets/decorations/blankets/blanketCream1.png"
  );

  //Bookcases =================
  loadSprite("bookcase", "./assets/decorations/bookcases/bookcase.png");
  loadSprite("bookshelve", "./assets/decorations/bookcases/bookshelve.png");

  //Books =================
  loadSprite("books", "./assets/decorations/books/books.png");
  loadSprite("opened-book", "./assets/decorations/books/openedbook.png");
  loadSprite("books-on-chair", "./assets/decorations/books/booksonchair.png");

  //Beds =================
  loadSprite("pink-bed", "./assets/decorations/furniture/beds/pinkbed.png");

  //Benches ==============
  loadSprite(
    "wooden-bench1",
    "./assets/decorations/furniture/benches/woodenBench1.png"
  );

  //Candles =================
  loadSprite(
    "candle",
    "./assets/decorations/candles/wallMountedCandleHolder_brown.png"
  );

  //Chairs =================
  loadSprite(
    "cycle-chair",
    "./assets/decorations/furniture/chairs/cyclechair.png"
  );
  loadSprite(
    "wooden-chair",
    "/assets/decorations/furniture/chairs/whiteCrudeWoodenChair.png"
  );
  //Doors =================
  loadSprite("door", "./assets/decorations/doors/evilDoor.png");
  loadSprite("wood-door", "./assets/decorations/doors/wooddoor.png");
  loadSprite("woodenDoor", "./assets/decorations/doors/woodenDoor.png");

  //Drawers =================
  loadSprite("drawer", "./assets/decorations/bookcases/drawer.png");
  loadSprite(
    "little-drawer",
    "./assets/decorations/furniture/drawers/littledrawer.png"
  );

  //Dresser =================
  loadSprite(
    "clothset",
    "./assets/decorations/furniture/dressers/clothset.png"
  );

  // Clocks =================
  loadSprite(
    "grandfather-clock",
    "./assets/decorations/clocks/grandfatherClock.png"
  );
  loadSprite("clock", "./assets/decorations/clocks/clock.png");

  //Flowers and Plants =================
  loadSprite("flower", "./assets/decorations/flowers-plants/flower.png");
  loadSprite("red-flower", "./assets/decorations/flowers-plants/redflower.png");
  loadSprite(
    "white-flowers",
    "./assets/decorations/flowers-plants/whiteflowers.png"
  );

  //Lamps =================
  loadSprite("deng", "./assets/decorations/lamps/deng.png");

  //Misc =================
  loadSprite("pile-of-bones", "./assets/decorations/misc/pileOfBones.png");
  loadSprite("help-me", "./assets/decorations/misc/helpMe.png");
  loadSprite("cob-webs", "./assets/decorations/misc/cobweb_down_right.png");
  loadSprite(
    "chained-skeleton",
    "./assets/decorations/misc/chainedSkeleton.png"
  );
  loadSprite("wall-crack", "assets/decorations/misc/wallCrack.png");
  loadSprite("dirt", "assets/decorations/misc/dirt.png");
  loadSprite("puddle", "assets/decorations/misc/greenPuddle.png");
  loadSprite("paper", "assets/decorations/misc/paper.png");
  loadSprite("paper2", "assets/decorations/misc/paper2.png");

  //Paintings ================
  loadSprite(
    "fruit-painting",
    "./assets/decorations/paintings/fruitPainting.png"
  );
  loadSprite(
    "empty-picture",
    "./assets/decorations/paintings/emptypicture.png"
  );
  loadSprite(
    "land-scape-painting",
    "./assets/decorations/paintings/landscapepainting.png"
  );
  loadSprite(
    "another-painting",
    "./assets/decorations/paintings/anotherpainting.png"
  );
  loadSprite(
    "flower-painting",
    "./assets/decorations/paintings/flowerpainting.png"
  );

  //Rugs =================
  loadSprite("orange-carpet", "./assets/decorations/rugs/orangecarpet.png");
  loadSprite("red-carpet", "./assets/decorations/rugs/redcarpet.png");
  loadSprite(
    "orange-big-carpet",
    "./assets/decorations/rugs/orangebigcarpet.png"
  );

  //Seats
  loadSprite("seats", "./assets/decorations/furniture/seats/seats.png");

  // Tables =================
  loadSprite(
    "table",
    "./assets/decorations/furniture/tables/longTable_dark_brown.png"
  );
  loadSprite(
    "makeup-table",
    "./assets/decorations/furniture/tables/makeuptable.png"
  );

  //Toys =================
  loadSprite("toy", "./assets/decorations/toys/toy.png");
  loadSprite("ball", "./assets/decorations/toys/ball.png");

  //Windows =================
  loadSprite(
    "basement-window",
    "./assets/decorations/windows/basementWindow.png"
  );
};


export const fadeOutOpacity = async (GameObj) => {
  let i = 1.0
  while ( i > 0 ) {
    GameObj.opacity = i;
    i -= .05
    await new Promise(resolve => setTimeout(resolve, (.1 * 1000)));
  }
  GameObj.destroy()
}

export const flickerOpacity = (GameObj) => {
  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
  let counter = 0;
  onUpdate(() => {
    //    if (counter === 1) {
    if (counter++ % (60 / 3) === 1) {
      // only update 3x per second{
      if (Math.random() < 0.5) {
        // randomly choose
        if (GameObj.opacity < 0.7)
          GameObj.opacity += getRandomArbitrary(0.01, 0.1);
      } else {
        if (GameObj.opacity > 0.4)
          GameObj.opacity -= getRandomArbitrary(0.01, 0.1);
      }
    }
  });
};
