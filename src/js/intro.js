import * as THREE from 'three/build/three.module.js';
import { debounce } from 'lodash-es';
const canvas = document.querySelector('canvas');
const canvasWidth = canvas.parentElement.clientWidth;
const canvasHeight = canvas.parentElement.clientHeight;

const scene = new THREE.Scene();
scene.background = new THREE.Color('#000');

const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(canvasWidth, canvasHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const camera = new THREE.PerspectiveCamera(
  75,
  canvasWidth / canvasHeight,
  0.1,
  1000
);

camera.position.set(0, 0, 5);
camera.lookAt(scene.position);

camera.aspect = canvasWidth / canvasHeight;
camera.updateProjectionMatrix();

renderer.render(scene, camera);

// orb material
const material = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true,
});

// orb geometry
// const geometry = new THREE.BoxGeometry(3, 4, 8, 2, 3, 4);
const geometry = new THREE.IcosahedronGeometry(2, 1);

// create orb
const orb = new THREE.Mesh(geometry, material);
const orb2 = new THREE.Mesh(geometry, material);

orb.position.x = 5;
orb.position.y = 3;

orb2.position.x = -3;
orb2.position.y = -1;
orb2.position.z = -12;

scene.add(orb);
scene.add(orb2);

function animate() {
  requestAnimationFrame(animate);

  orb.rotation.x += 0.01;
  orb.rotation.y += 0.01;
  orb2.rotation.x += 0.01;
  orb2.rotation.y += 0.01;

  orb2.position.x += 0.01;
  orb2.position.y += 0.01;
  orb2.position.z += 0.01;

  renderer.render(scene, camera);
}

animate();

function onWindowResize() {
  requestAnimationFrame(() => {
    let width = canvas.parentElement.clientWidth;
    let height = canvas.parentElement.clientHeight;
    camera.aspect = width / height;
    camera.lookAt(scene.position);

    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
    renderer.render(scene, camera);
  });
}

window.addEventListener('resize', debounce(onWindowResize), false);

// Fade on scroll
const intro = document.querySelector('.intro');
function onScroll() {
  intro.classList.toggle('is-hidden', window.scrollY);
}

window.addEventListener('scroll', debounce(onScroll), { passive: true });
