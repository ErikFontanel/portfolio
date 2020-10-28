/* global THREE */
import debounce from 'lodash/debounce';
const canvas = document.querySelector('canvas.blobs');
const parent = canvas.parentElement;
const canvasWidth = parent.clientWidth;
const canvasHeight = parent.clientHeight;

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ canvas: canvas });

const camera = new THREE.PerspectiveCamera(
  75,
  canvasWidth / canvasHeight,
  0.1,
  1000
);

scene.background = new THREE.Color('#000');
renderer.setSize(canvasWidth, canvasHeight);
renderer.setPixelRatio(window.devicePixelRatio);

let animation;
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

const animate = () => {
  animation = requestAnimationFrame(animate);

  orb.rotation.x += 0.01;
  orb.rotation.y += 0.01;
  orb2.rotation.x += 0.01;
  orb2.rotation.y += 0.01;

  renderer.render(scene, camera);
};

if (import.meta.hot) {
  import.meta.hot.accept(({ module }) => {
    renderer.render(scene, camera);
  });
  import.meta.hot.dispose(() => {
    // Cleanup any side-effects. Optional.
  });
}

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
function onScroll(entries) {
  entries.map((entry) => {
    entry.target.classList.toggle('is-hidden', entry.intersectionRatio < 0.5);

    entry.target.addEventListener(
      'transitionend',
      () => cancelAnimationFrame(animation),
      { passive: true, once: true }
    );
  });

  // target.addEventListener(
  //   'transitionstart',
  //   () => {
  //     if (!target.classList.contains('is-hidden')) {
  //       animation = requestAnimationFrame(animate);
  //     }
  //   },
  //   { passive: true, once: true }
  // );
}
// window.addEventListener('scroll', debounce(onScroll, 100), { passive: true });

const observer = new IntersectionObserver(onScroll, {
  threshold: [...Array(10).keys()].map((i) => i * 0.1),
});
observer.observe(parent);
