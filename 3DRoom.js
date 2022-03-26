const scene = new THREE.Scene();

// creates axes to help with x, y and z placements
const axesHelper = new THREE.AxesHelper(1000);
scene.add(axesHelper);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.4,
  1000
);

// create raycasting for mouse to keep track of it
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff);
document.body.appendChild(renderer.domElement);

/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
//create controls for camera
const controls = new THREE.OrbitControls(camera, renderer.domElement);
camera.position.set(0, 10, 100);
// controls.enableZoom = false;
controls.update();

/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
//adds lighting to the scene
const light = new THREE.AmbientLight(0xffffff); // soft white light
scene.add(light);

/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
//loading textures to planes/ walls
const textureLoader = new THREE.TextureLoader();

//loading first wall
textureLoader.load(
  "./dist/assets/room_backgrounds/brick.jpeg",
  function (texture) {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.x = 4;
    texture.repeat.y = 4;
    const geometry = new THREE.PlaneGeometry(400, 225);
    const material = new THREE.MeshLambertMaterial({ map: texture });
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);
    plane.position.z = -200;
  }
);

//loading second wall
textureLoader.load(
  "./dist/assets/room_backgrounds/brick.jpeg",
  function (texture) {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.x = 4;
    texture.repeat.y = 4;
    const geometry = new THREE.PlaneGeometry(400, 225);
    const material = new THREE.MeshLambertMaterial({ map: texture });
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);
    plane.rotation.y = Math.PI / 2;
    plane.position.x = -200;
  }
);

// loading third wall
textureLoader.load(
  "./dist/assets/room_backgrounds/brick.jpeg",
  function (texture) {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.x = 4;
    texture.repeat.y = 4;
    const geometry = new THREE.PlaneGeometry(400, 225);
    const material = new THREE.MeshLambertMaterial({ map: texture });
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);
    plane.rotation.y = -(Math.PI / 2);
    plane.position.x = 200;
  }
);

// loading fourth wall
textureLoader.load(
  "./dist/assets/room_backgrounds/brick.jpeg",
  function (texture) {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.x = 4;
    texture.repeat.y = 4;
    const geometry = new THREE.PlaneGeometry(400, 225);
    const material = new THREE.MeshLambertMaterial({ map: texture });
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);
    plane.rotation.y = Math.PI;
    // plane.position.x = 200
    plane.position.z = 200;
  }
);

//loading floor
textureLoader.load(
  "./dist/assets/room_backgrounds/floor.jpeg",
  function (texture) {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.x = 1;
    texture.repeat.y = 1;
    // const geometry = new THREE.PlaneGeometry(400, 225);
    const geometry = new THREE.PlaneGeometry(400, 400);
    const material = new THREE.MeshLambertMaterial({ map: texture });
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);
    plane.rotation.x = -1.57;
    plane.position.y = -112;
  }
);

///*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
// camera.position.z = 200;
// camera.rotation.x = -(Math.PI / 10);
// camera.position.y = 10;

const loader = new THREE.GLTFLoader();


loader.load("./dist/assets/3DModels/ghostModel/scene.gltf", (gltf) => {
  scene.add(gltf.scene);
  const scale = 0.5;
  gltf.scene.scale.set(scale, scale, scale);
  gltf.scene.position.set(0, -60, -160);
});

loader.load("./dist/assets/3DModels/ghostModel/scene.gltf", (gltf) => {
  scene.add(gltf.scene);
  const scale = 0.25;
  gltf.scene.scale.set(scale, scale, scale);
  gltf.scene.position.set(60, -60, -110);
  gltf.scene.rotation.y = -Math.PI / 2;
});

loader.load("./dist/assets/3DModels/gasStove/scene.gltf", (gltf) => {
  scene.add(gltf.scene);
  const scale = 0.8;
  gltf.scene.scale.set(scale, scale, scale);
  gltf.scene.position.set(0, -110, 160);
  gltf.scene.rotation.y = -Math.PI;
});

loader.load("./dist/assets/3DModels/kitchenCounter/scene.gltf", (gltf) => {
  scene.add(gltf.scene);
  const scale = 52;
  gltf.scene.scale.set(scale, scale, scale);
  gltf.scene.position.set(170, -60, -10);
  // gltf.scene.rotation.y = -1.6;
  gltf.scene.rotation.y = Math.PI;
});

loader.load(
  "./dist/assets/3DModels/RefrigeratorWithCrate/scene.gltf",
  (gltf) => {
    scene.add(gltf.scene);
    const scale = 1.8;
    gltf.scene.scale.set(scale, scale, scale);
    gltf.scene.position.set(150, -110, -113);
    // gltf.scene.rotation.y = Math.PI;
  }
);

loader.load("./dist/assets/3DModels/diningTableSet/scene.gltf", (gltf) => {
  scene.add(gltf.scene);
  const scale = 0.25;
  gltf.scene.scale.set(scale, scale, scale);
  gltf.scene.position.set(-50, -110, -113);
  gltf.scene.rotation.y = Math.PI / 2;
});

loader.load("./dist/assets/3DModels/purpleDoor/scene.gltf", (gltf) => {
  scene.add(gltf.scene);
  const scale = 0.8;
  gltf.scene.scale.set(scale, scale, scale);
  gltf.scene.position.set(-196, -30, 0);
});

loader.load("./dist/assets/3DModels/kitchenCabinet/scene.gltf", (gltf) => {
  scene.add(gltf.scene);
  const scale = 0.09;
  gltf.scene.scale.set(scale, scale, scale);
  gltf.scene.position.set(100, -45, 150);
  gltf.scene.rotation.y = -Math.PI / 2;
});

loader.load("./dist/assets/3DModels/kitchenCabinet/scene.gltf", (gltf) => {
  scene.add(gltf.scene);
  const scale = 0.09;
  gltf.scene.scale.set(scale, scale, scale);
  gltf.scene.position.set(-125, -45, 150);
  gltf.scene.rotation.y = -Math.PI / 2;
});

loader.load("./dist/assets/3DModels/kitchenShelf/scene.gltf", (gltf) => {
  scene.add(gltf.scene);
  const scale = 0.15;
  gltf.scene.scale.set(scale, scale, scale);
  gltf.scene.position.set(-120, 40, 185);
  gltf.scene.rotation.y = -Math.PI;
});

loader.load("./dist/assets/3DModels/kitchenKnife/scene.gltf", (gltf) => {
  scene.add(gltf.scene);
  const scale = 0.2;
  gltf.scene.scale.set(scale, scale, scale);
  gltf.scene.rotation.x = Math.PI / 2;
  gltf.scene.rotation.y = Math.PI / 2;
  gltf.scene.position.set(100, -110, 20);
});

loader.load("./dist/assets/3DModels/brokenDish3/scene.gltf", (gltf) => {
  scene.add(gltf.scene);
  const scale = 70;
  gltf.scene.scale.set(scale, scale, scale);
  gltf.scene.position.set(40, 40, -140);
  // gltf.scene.rotation.y = -1.6;
  gltf.scene.rotation.x = -Math.PI / 2;
});

loader.load("./dist/assets/3DModels/dirtyPlate/scene.gltf", (gltf) => {
  scene.add(gltf.scene);
  const scale = 5;
  gltf.scene.scale.set(scale, scale, scale);
  gltf.scene.position.set(-60, -45, 180);
});

loader.load(
  "./dist/assets/3DModels/hangingKitchenCupboards/scene.gltf",
  (gltf) => {
    scene.add(gltf.scene);
    const scale = 2500;
    gltf.scene.scale.set(scale, scale, scale);
    gltf.scene.position.set(120, 40, 170);
    gltf.scene.rotation.y = Math.PI / 2;
  }
);

loader.load("./dist/assets/3DModels/copperCoffeePot/scene.gltf", (gltf) => {
  scene.add(gltf.scene);
  const scale = 6;
  gltf.scene.scale.set(scale, scale, scale);
  gltf.scene.position.set(-15, -30, 150);
  gltf.scene.rotation.y = -Math.PI / 4;
});

loader.load("./dist/assets/3DModels/lantern/scene.gltf", (gltf) => {
  scene.add(gltf.scene);
  const scale = 0.5;
  gltf.scene.scale.set(scale, scale, scale);
  gltf.scene.position.set(-100, -47, 130);
  gltf.scene.rotation.y = -Math.PI / 4;
});

function resetMaterials() {
  for (let i = 0; i < scene.children.length; i++) {
    if (scene.children[i].material) {
      scene.children[i].material.opacity = 1.0;
    }
  }
}



// let intersects = raycaster.intersectObjects(scene, true);
// if (intersects.length > 0) {
//   container = getContainerObjByChild(intersects[0].objects);
// }

// function getContainerObjByChild(child) {
//   if (scene.userData.isContainer) return scene
//   else if(scene.parent != null) return this.getContainerObjByChild(obj.parent)
//   else return null
// }

function hoverPieces() {
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children);
  for (let i = 0; i < intersects.length; i++) {
    intersects[i].object.material.transparent = true;
    intersects[i].object.material.opacity = 0.5;
  }
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

// function onClick(event) {
//   raycaster.setFromCamera(mouse, camera);
//   let intersects = raycaster.intersectObjects(scene.children, true);
//   if (intersects > 0) {
//     selectedPiece = intersects[0].object.userData.currentSquare;
//   }
// }

function animate() {
  renderer.render(scene, camera);
  controls.update();
  resetMaterials();
  hoverPieces();
  requestAnimationFrame(animate);
}

window.addEventListener("resize", onWindowResize, false);

window.addEventListener("mousemove", onMouseMove, false);

animate();
