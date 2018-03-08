/* globals THREE */

const canvas = document.querySelector('canvas');
const canvasWidth = canvas.getBoundingClientRect().width;
const canvasHeight = canvas.getBoundingClientRect().height;

const scene = new THREE.Scene();
scene.background = new THREE.Color(
  window.getComputedStyle(document.body).backgroundColor
);

const camera = new THREE.PerspectiveCamera(
  30,
  canvasWidth / canvasHeight,
  1,
  1000
);

camera.position.set(20, 0, 5);
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer({ canvas: canvas });

renderer.setSize(canvasWidth, canvas.getBoundingClientRect().height);

/* Set up scene */
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);

// material
const material = new THREE.MeshBasicMaterial({
  color: 0xff00ff,
  wireframe: true
});

// geometry
const geometry = new THREE.BoxGeometry(3, 4, 8, 2, 3, 4);

// create orb
const orb = new THREE.Mesh(geometry, material);

scene.add(orb);

function animate() {
  requestAnimationFrame(animate);

  orb.rotation.x += 0.01;
  orb.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();

const tanFOV = Math.tan(Math.PI / 180 * camera.fov / 2);
const windowHeight = window.innerHeight;

function onWindowResize(event) {
  camera.aspect = window.aspect = window.innerWidth / window.innerHeight;
  camera.fov =
    360 / Math.PI * Math.atan(tanFOV * (window.innerHeight / windowHeight));

  camera.updateProjectionMatrix();
  camera.lookAt(scene.position);

  renderer.setSize(canvasWidth, canvasHeight);
  renderer.render(scene, camera);
}

window.addEventListener('resize', onWindowResize);
