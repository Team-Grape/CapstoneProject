const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.4,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const light = new THREE.AmbientLight(0xffffff); // soft white light
scene.add(light);

const textureLoader = new THREE.TextureLoader();
textureLoader.load(
  "./dist/assets/room_backgrounds/room5Background.png",
  function (texture) {
    scene.background = texture;
  }
);

camera.position.z = 70;

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
  gltf.scene.scale.set(.3, .3, .3);
  gltf.scene.position.set(-50, -20, -10);
  gltf.scene.rotation.y = .55
})
loader.load("./dist/assets/kitchenCounter/scene.gltf", (gltf) => {
  scene.add(gltf.scene);
  gltf.scene.scale.set(20, 20, 20);
  gltf.scene.position.set(50, -20, -10);
  gltf.scene.rotation.y = -2
})
loader.load("./dist/assets/oldFridge/scene.gltf", (gltf) => {
  scene.add(gltf.scene);
  gltf.scene.scale.set(3, 3, 3);
  gltf.scene.position.set(5, -20, -10);
  // gltf.scene.rotation.y = 1.45
})
loader.load("./dist/assets/dirtyToilet/scene.gltf", (gltf) => {
  scene.add(gltf.scene);
  gltf.scene.scale.set(3, 3, 3);
  gltf.scene.position.set(10, -20, -10);
  gltf.scene.rotation.y = 1.45
})

const ghost = new Ghost();

function animate() {
  renderer.render(scene, camera);
  // ghost.position.y += 0.01;
  // setTimeout(function(){
  //   ghost.position.y += -0.02
  // }, 1000);
  requestAnimationFrame(animate);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize, false);

animate();
