kaboom({
  global: true,
  width: 1246,
  height: 546,
  scale: 1,
  debug: true,
  background: [35, 35, 35],
});


cellarKey = {
  name: 'cellar key',
  description: 'an old rusty key to the cellar door',
  quantity: 1,
  image: 'key_gold.png',
};

//creates our inventory in our local storage
// window.localStorage.setItem("inventory", JSON.stringify([]));

function addToInventory(item) {
  if (!window.localStorage.getItem('inventory')) {
    window.localStorage.setItem('inventory', JSON.stringify([]));
  }
  let currentInventory = JSON.parse(window.localStorage.getItem('inventory'));
  if (currentInventory.filter((i) => i.name === item.name).length === 0) {
    // this item is not in the inventory. So add it to the inventory below:
    localStorage.setItem(
      'inventory',
      JSON.stringify([...currentInventory, item])
    );
  }
}


function checkInventoryForItem(item) {
  if (!window.localStorage.getItem('inventory')) {
    // you dont even have an inventory yet!
    return false
  }
  const currentInventory = JSON.parse(window.localStorage.getItem('inventory'));
  if (currentInventory.filter((i) => i.name === item.name).length > 0) {
    // item is in the inventory!
    return true
  } else {
    // item is not in the inventory!
    return false
  }
}


loadSprite('drawer', 'drawer.png');
loadSprite('background-tile', 'basementTemplate.png');
loadSprite('door', 'evilDoor.png');
loadSprite('key', 'key_gold.png');
loadSprite('room-two-background', 'roomTwoBackground.png');
loadSprite('room-two-background-right', 'roomTwoRightLeft.png');
loadSprite('room-two-background-left', 'roomTwoRightLeft.png');
loadSprite('right-arrow', 'rightArrow.png');
loadSprite('left-arrow', 'leftArrow.png');
loadSprite('fuit-painting', 'fruitPainting.png');
loadSprite('bookcase', 'bookcase.png');
loadSprite('turn-right-arrow', './assets/turn-right-arrow.png')
loadSprite('turn-left-arrow', './assets/turn-left-arrow.png')
loadSprite('small-window', './assets/small-window.png')


// Define the dialogue data
const dialogs = [
  ['when you woke up you found yourself in an strange room'],
  ['the door is locked and you are trapped in the room'],
  ['look around the room to see if you can find the key to open the door'],
];

scene('title', () => {
  add([
    text('Click anywhere to start'),
    color(255, 0, 0),
    pos(width() / 2, height() / 2),
    origin('center'),
  ]);

  onClick(() => {

    go('room-1-wall-1');
  });
});

scene('room-1-wall-1', () => {
  onLoad(() => {
    add([sprite('background-tile'), scale(1), area()]);
  });


  onLoad(() => {
    add([sprite('door'), pos(900, 150), scale(4), area(), 'door']);
  });


  onLoad(() => {
    add([sprite('turn-right-arrow'), pos(1200, 250), scale(.75), area(), 'turn-right-arrow']);
  });

  onLoad(() => {
    add([sprite('turn-left-arrow'), pos(0, 250), scale(.75), area(), 'turn-right-arrow']);
  });
  onClick('door', (door) => {

    if (checkInventoryForItem(cellarKey)) {
      go('roomTwo');
    } else {
      console.log('It does open, I think its locked.')
    }
  });

  onClick('turn-right-arrow', () => {
    go('room-1-wall-2');
  });
  onClick('turn-left-arrow', () => {
    go('room-1-wall-4');
  });

  // Current dialog
  let curDialog = 0;

  // Text bubble
  const textbox = add([
    rect(width() - 200, 120, { radius: 32 }),
    origin('center'),
    pos(center().x, height() - 100),
    outline(2),
  ]);

  // Text
  const txt = add([
    text('', { size: 32, width: width() - 230 }),
    pos(textbox.pos),
    origin('center'),
  ]);

  // NextButton
  const nextButton = add([
    text('Next', { size: 16 }),
    pos(textbox.pos, 'botright'),
    area(),
  ]);

  nextButton.onClick(() => {
    if (curDialog === dialogs.length - 1) {
      textbox.destroy();
      txt.destroy();
      nextButton.destroy();
      return;
    }
    curDialog = curDialog + 1;
    updateDialog();
  });

  // Update the on screen sprite & text
  function updateDialog() {
    const [dialog] = dialogs[curDialog];
    txt.text = dialog;
  }

  updateDialog();
});
scene('room-1-wall-2', () => {
  onLoad(() => {
    add([sprite('background-tile'), scale(1), area()]);
  });

  onLoad(() => {
    add([sprite('turn-right-arrow'), pos(1200, 250), scale(.75), area(), 'turn-right-arrow']);
  });

  onLoad(() => {
    add([sprite('turn-left-arrow'), pos(0, 250), scale(.75), area(), 'turn-right-arrow']);
  });

  onClick('turn-right-arrow', () => {
    go('room-1-wall-3');
  });
  onClick('turn-left-arrow', () => {
    go('room-1-wall-1');
  });
});

scene('room-1-wall-3', () => {
  onLoad(() => {
    add([sprite('background-tile'), scale(1), area()]);
  });
  onLoad(() => {
    add([sprite('small-window'), pos(900, 30), scale(4), area(), 'small-window']);
  });
  onLoad(() => {
    add([sprite('small-window'), pos(300, 30), scale(4), area(), 'small-window']);
  });

  onLoad(() => {
    add([sprite('turn-right-arrow'), pos(1200, 250), scale(.75), area(), 'turn-right-arrow']);
  });

  onLoad(() => {
    add([sprite('turn-left-arrow'), pos(0, 250), scale(.75), area(), 'turn-right-arrow']);
  });

  onLoad(() => {
    add([sprite('key'), pos(90, 250), scale(1), area(), 'key']);
  });

  onClick('key', (key) => {
    console.log('a click happened');
    alert('a key was added to your inventory');
    cellarKey = {
      name: 'cellar key',
      description: 'an old rusty key to the cellar door',
      quantity: 1,
    };
    addToInventory(cellarKey);
    key.destroy();
  });

  onClick('turn-right-arrow', () => {
    go('room-1-wall-4');
  });
  onClick('turn-left-arrow', () => {
    go('room-1-wall-2');
  });


});

scene('room-1-wall-4', () => {
  onLoad(() => {
    add([sprite('background-tile'), scale(1), area()]);
  });

  onLoad(() => {
    add([sprite('turn-right-arrow'), pos(1200, 250), scale(.75), area(), 'turn-right-arrow']);
  });

  onLoad(() => {
    add([sprite('turn-left-arrow'), pos(0, 250), scale(.75), area(), 'turn-right-arrow']);
  });

  onClick('turn-right-arrow', () => {
    go('room-1-wall-1');
  });
  onClick('turn-left-arrow', () => {
    go('room-1-wall-3');
  });
});

scene('roomTwo', () => {
  onLoad(() => {
    add([sprite('room-two-background'), scale(1), area()]);
  })
  onLoad(() => {
    add([sprite('right-arrow'), pos(1175, 250), scale(0.5), area(), 'right-arrow'])
  })
  onLoad(() => {
    add([sprite('left-arrow'), pos(25, 250), scale(0.5), area(), 'left-arrow'])
  })
  onClick('left-arrow', () => {
    go("roomTwoLeft")
  })
  onClick('right-arrow', () => {
    go('roomTwoRight')
  })
})

scene('roomTwoLeft', () => {
  onLoad(() => {
    add([sprite('room-two-background-left'), scale(1), area()])
  })
  onLoad(() => {
    add([sprite('door'), pos(900, 150), scale(4), area(), 'door']);
  })
  onLoad(() => {
    add([sprite('right-arrow'), pos(1175, 250), scale(0.5), area(), 'right-arrow'])
  })
  onClick('right-arrow', () => {
    go('roomTwo')
  })
})

scene('roomTwoRight', () => {
  onLoad(() => {
    add([sprite('room-two-background-right'), scale(1), area()])
  })
  onLoad(() => {
    add([sprite('left-arrow'), pos(25, 250), scale(0.5), area(), 'left-arrow'])
  })
  onClick('left-arrow', () => {
    go("roomTwo")
  })
})

scene('win', () => {
  add([
    text('You escape!'),
    color(255, 0, 0),
    origin('center'),
    pos(width() / 2, height() / 2),
  ]);
});

go('title');
