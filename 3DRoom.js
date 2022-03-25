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

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
//create controls for camera
const controls = new THREE.OrbitControls( camera, renderer.domElement );

camera.position.set( 0, 20, 100 );
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
    plane.position.z = -200
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
    plane.rotation.y = (Math.PI / 2)
    plane.position.x = -200
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
    plane.rotation.y = -(Math.PI / 2)
    plane.position.x = 200
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
    plane.rotation.y = (Math.PI)
    // plane.position.x = 200
    plane.position.z = 200
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
    plane.rotation.x = -1.57
    plane.position.y = -112
  }
);

///*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
// camera.position.z = 200;
// camera.rotation.x = -(Math.PI / 10);
// camera.position.y = 10;

const loader = new THREE.GLTFLoader();

class Ghost {
  constructor() {
    loader.load("./dist/assets/ghostModel/scene.gltf", (gltf) => {
      scene.add(gltf.scene);
      const scale = .5
      gltf.scene.scale.set(scale, scale, scale);
      gltf.scene.position.set(30, 20, -200);
      this.ghost = gltf.scene;
    });
  }
}
loader.load("./dist/assets/gasStove/scene.gltf", (gltf) => {
  scene.add(gltf.scene);
  const scale = 0.7;
  gltf.scene.scale.set(scale, scale, scale);
  gltf.scene.position.set(-100, -110, -180);
});
loader.load("./dist/assets/kitchenCounter/scene.gltf", (gltf) => {
  scene.add(gltf.scene);
  const scale = 50;
  gltf.scene.scale.set(scale, scale, scale);
  gltf.scene.position.set(10, -60, -180);
  gltf.scene.rotation.y = -1.6
});
loader.load("./dist/assets/oldFridge/scene.gltf", (gltf) => {
  scene.add(gltf.scene);
  const scale = 70;
  gltf.scene.scale.set(scale, scale, scale);
  gltf.scene.position.set(80, -110, -150);
  gltf.scene.rotation.y = (Math.PI)
});
loader.load("./dist/assets/purpleDoor/scene.gltf", (gltf) => {
  scene.add(gltf.scene);
  const scale = .8;
  gltf.scene.scale.set(scale, scale, scale);
  // gltf.scene.rotation.y = (Math.PI / 2)
  gltf.scene.position.set(-50, -30, 0);
});
const ghost = new Ghost();

function animate() {
  renderer.render(scene, camera);
  // ghost.position.y += 0.01;
  // setTimeout(function(){
  //   ghost.position.y += -0.02
  // }, 1000);
  controls.update();
  requestAnimationFrame(animate);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize, false);

animate();
