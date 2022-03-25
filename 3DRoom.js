const scene = new THREE.Scene();
const axesHelper = new THREE.AxesHelper(1000);
scene.add(axesHelper);
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.4,
  1000
);

// setInterval(() => {
//   camera.setFocalLength(camera.fov + 1);
// }, 300)



const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls( camera, renderer.domElement );

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set( 0, 20, 100 );
controls.update();

const light = new THREE.AmbientLight(0xffffff); // soft white light
scene.add(light);

const textureLoader = new THREE.TextureLoader();
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
  }
);

textureLoader.load(
  "./dist/assets/room_backgrounds/floor.jpeg",
  function (texture) {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.x = 1;
    texture.repeat.y = 1;
    const geometry = new THREE.PlaneGeometry(400, 225);
    const material = new THREE.MeshLambertMaterial({ map: texture });
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);
    plane.rotation.x = -.7
    plane.position.y = -115
    plane.position.z = 50
  //  setInterval(() => {
  //   plane.rotation.x = plane.rotation.x + -.1
  //   console.log(plane.rotation.x)
  //  }, 1000)
  }
);

camera.position.z = 200;
camera.rotation.x = -(Math.PI / 10);
camera.position.y = 10;
// setInterval(() => {
//   camera.position.x = camera.position.x + 1;
// }, 30)

const loader = new THREE.GLTFLoader();

class Ghost {
  constructor() {
    loader.load("./dist/assets/ghostModel/scene.gltf", (gltf) => {
      scene.add(gltf.scene);
      gltf.scene.scale.set(0.1, 0.1, 0.1);
      // gltf.scene.position.set(30, 20, 0);
      this.ghost = gltf.scene;
    });
  }
}
loader.load("./dist/assets/gasStove/scene.gltf", (gltf) => {
  scene.add(gltf.scene);
  const scale = 0.5;
  gltf.scene.scale.set(scale, scale, scale);
  gltf.scene.position.set(-50, -20, 20);
  // setInterval(() => {
  //   gltf.scene.position.z = gltf.scene.position.z + 1
  //   console.log(gltf.scene.position.z)
  // }, 1000)
  // gltf.scene.rotation.y = .55
});
loader.load("./dist/assets/kitchenCounter/scene.gltf", (gltf) => {
  scene.add(gltf.scene);
  gltf.scene.scale.set(20, 20, 20);
  gltf.scene.position.set(50, -20, -10);
  // gltf.scene.rotation.y = -2
});
loader.load("./dist/assets/oldFridge/scene.gltf", (gltf) => {
  scene.add(gltf.scene);
  gltf.scene.scale.set(3, 3, 3);
  gltf.scene.position.set(5, -20, -10);
  // gltf.scene.rotation.y = 1.45
});
loader.load("./dist/assets/dirtyToilet/scene.gltf", (gltf) => {
  scene.add(gltf.scene);
  gltf.scene.scale.set(3, 3, 3);
  gltf.scene.position.set(10, -20, -10);
  // gltf.scene.rotation.y = 1.45
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
