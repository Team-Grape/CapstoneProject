const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.4,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setClearColor(0xffffff);
document.body.appendChild(renderer.domElement);

/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
// create controls for camera
const controls = new THREE.OrbitControls(camera, renderer.domElement);
camera.position.set(0, 10, 250);
// controls.enableZoom = false;
controls.update();

/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
// adds lighting to the scene
const light = new THREE.AmbientLight(0xffffff); // soft white light
scene.add(light);

/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
//loading textures to planes/ walls
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
    plane.position.z = -200;
  }
);

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

/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
//load gltf models
const loader = new GLTFLoader();

loader.load("scaryGhost")

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

window.addEventListener("resize", onWindowResize, false);

animate();
