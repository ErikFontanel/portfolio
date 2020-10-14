import * as THREE from 'three/build/three.module.js';

const canvas = document.querySelector('canvas');
const canvasWidth = canvas.parentElement.clientWidth;
const canvasHeight = canvas.parentElement.clientHeight;

const getAspect = (w, h) => Math.min(w, h) / Math.max(w, h);

const scene = new THREE.Scene();
scene.background = new THREE.Color(
  window.getComputedStyle(document.body).backgroundColor
);

const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(canvasWidth, canvasHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const camera = new THREE.PerspectiveCamera(
  75,
  canvasWidth / canvasHeight,
  0.1,
  1000
);

camera.position.set(0, 0, 15);
camera.lookAt(scene.position);

camera.aspect = getAspect(canvasWidth, canvasHeight);
camera.updateProjectionMatrix();

renderer.render(scene, camera);

// orb material
const material = new THREE.MeshBasicMaterial({
  color: 0xff00ff,
  wireframe: true,
});
// orb material
const material2 = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  wireframe: true,
});

// orb geometry
const geometry = new THREE.BoxGeometry(3, 4, 8, 2, 3, 4);
const geometry2 = new THREE.IcosahedronGeometry(2, 1);

// create orb
const orb = new THREE.Mesh(geometry, material);
const orb2 = new THREE.Mesh(geometry2, material2);
orb2.position.y = 6;
orb2.position.x = 2;
orb2.position.y = -6;

scene.add(orb);
scene.add(orb2);

function animate() {
  requestAnimationFrame(animate);

  orb.rotation.x += 0.01;
  orb.rotation.y += 0.01;

  orb2.rotation.x += 0.01;
  orb2.rotation.y += 0.01;
  orb2.rotation.z += 0.01;

  renderer.render(scene, camera);
}

animate();

function onWindowResize() {
  requestAnimationFrame(() => {
    const isTwoCol = window.matchMedia('(min-width: 96ch)').matches;
    const wrapperWidth = isTwoCol
      ? canvas.parentElement.clientWidth
      : canvas.parentElement.clientWidth;
    const parentHeight = isTwoCol
      ? window.innerHeight
      : canvas.parentElement.clientHeight;
    console.log(canvas.parentElement.clientWidth);
    camera.aspect = getAspect(wrapperWidth, parentHeight);

    camera.updateProjectionMatrix();
    camera.lookAt(scene.position);

    renderer.setSize(wrapperWidth, parentHeight);
    renderer.render(scene, camera);
  });
}

window.addEventListener('resize', onWindowResize, false);
