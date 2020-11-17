/* global THREE */
import debounce from 'lodash/debounce';
import EventBus from './EventBus';

const canvas = document.querySelector('canvas.intro');
const parent = canvas.parentElement.parentElement;
const canvasWidth = parent.clientWidth;
const canvasHeight = parent.clientHeight;

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });

const camera = new THREE.PerspectiveCamera(
  75,
  canvasWidth / canvasHeight,
  0.1,
  2000
);

renderer.setSize(canvasWidth, canvasHeight);
renderer.setPixelRatio(window.devicePixelRatio);
// renderer.setClearColor(0xffffff, 0);

let animation;

camera.aspect = canvasWidth / canvasHeight;
camera.updateProjectionMatrix();

renderer.render(scene, camera);

// orb material
const material = new THREE.MeshBasicMaterial({
  color: 0x313fff,
  wireframe: true,
});

// orb geometry
const geometry = new THREE.IcosahedronGeometry(2, 6);

// create orb
const orb = new THREE.Mesh(geometry, material);

orb.scale.set(3, 3, 3);
orb.position.set(8, -2, -10);

scene.add(orb);

let speed = 0.003;
let rotationSpeed = 0.0005;
let directionx = -1;
let directiony = 1;
let directionz = -1;

const animate = () => {
  animation = requestAnimationFrame(animate);

  orb.rotation.x -= rotationSpeed;
  orb.rotation.y -= rotationSpeed;

  if (orb.position.x > 10 || orb.position.x < -12) {
    directionx = directionx * -1;
  }
  if (orb.position.y > 2 || orb.position.y < -2) {
    directiony = directiony * -1;
  }

  if (orb.position.z > -12 || orb.position.z < -20) {
    directionz = directionz * -1;
  }

  orb.position.x += speed * directionx;
  orb.position.y += speed * directiony;
  orb.position.z += speed * directionz;

  renderer.render(scene, camera);
  geometry.dispose();
  material.dispose();
};

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

function pauseAnimation() {
  cancelAnimationFrame(animation);
  animation = undefined;
  console.log('intro paused');
}

function resumeAnimation() {
  animation = requestAnimationFrame(animate);
  console.log('intro resumed');
}

// Fade on scroll
function onScroll() {
  const scrollTotal = window.innerHeight;
  const scrollPos = window.scrollY;
  const opacity = 1 - scrollPos / scrollTotal;
  parent.style.setProperty('--opacity', opacity);
  if (opacity <= 0 && animation) {
    pauseAnimation();
  } else if (opacity >= 0 && !animation) {
    resumeAnimation();
  }
}
animation = requestAnimationFrame(animate);

window.addEventListener('scroll', () => requestAnimationFrame(onScroll), {
  passive: true,
});

EventBus.on('modal:show', pauseAnimation);
EventBus.on('modal:hide', resumeAnimation);
