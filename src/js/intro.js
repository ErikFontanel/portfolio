/* global THREE */
import debounce from 'lodash/debounce';
const canvas = document.querySelector('canvas.intro');
const parent = canvas.parentElement.parentElement;
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

orb.position.x = 1;
orb.position.y = 0;
orb.position.z = -6;

orb2.position.x = -3;
orb2.position.y = -1;
orb2.position.z = -12;

scene.add(orb);
scene.add(orb2);

const animate = () => {
  orb.rotation.x += 0.01;
  orb.rotation.y += 0.01;
  orb2.rotation.x += 0.01;
  orb2.rotation.y += 0.01;

  renderer.render(scene, camera);
  animation = requestAnimationFrame(animate);
};

if (import.meta.hot) {
  import.meta.hot.accept(() => {
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
  entries
    .filter((entry) => entry.isIntersecting)
    .map((entry) => {
      const projectsTop = entry.boundingClientRect.top;

      parent.classList.toggle(
        'is-hidden',
        projectsTop < window.innerHeight * 0.75
      );

      parent.addEventListener(
        'transitionend',
        () => {
          if (parent.classList.contains('is-hidden') && animation) {
            cancelAnimationFrame(animation);
            animation = undefined;
          }
        },
        {
          passive: true,
          once: true,
        }
      );

      parent.addEventListener(
        'transitionstart',
        () => {
          if (!parent.classList.contains('is-hidden') && !animation) {
            animation = requestAnimationFrame(animate);
          }
        },
        {
          passive: true,
          once: true,
        }
      );
    });
}

animation = requestAnimationFrame(animate);
const observer = new IntersectionObserver(onScroll, {
  threshold: [...Array(100).keys()].filter((n) => n > 0).map((i) => i * 0.01),
  rootMargin: '200px 0px',
});

observer.observe(document.querySelector('.projects-wrapper'));
