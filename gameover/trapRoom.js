const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 
    75,
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000 
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0xffffff, 0);
document.body.appendChild( renderer.domElement );

/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
//create controls for camera
// const controls = new THREE.OrbitControls(camera, renderer.domElement);
// camera.position.set(0, 10, 100);
// // controls.enableZoom = false;
// controls.update();

/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
//adds lighting to the scene
// const light = new THREE.AmbientLight(0xffffff); // soft white light
// scene.add(light);

/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
//loading textures to planes/ walls
const textureLoader = new THREE.TextureLoader();

textureLoader.load(
    "../dist/assets/room_backgrounds/purpleWall.jpeg",
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