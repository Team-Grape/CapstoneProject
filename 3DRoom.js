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
renderer.setClearColor(0xb7c3f3, 1);
const light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);

camera.position.z = 50

const loader = new THREE.GLTFLoader();

loader.load("./dist/assets/ghostModel/scene.gltf", (gltf) => {
  scene.add(gltf.scene);
  gltf.scene.scale.set(0.1, 0.1, 0.1);
  // gltf.scene.position.set(30, 20, 0);
});

function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize, false);

animate();
