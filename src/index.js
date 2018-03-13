/* globals THREE */

const canvas = document.querySelector('canvas');
const canvasWidth = canvas.getBoundingClientRect().width;
const canvasHeight = canvas.getBoundingClientRect().height;

const wrapper = document.querySelector('.wrapper');

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

renderer.setSize(canvasWidth, canvasHeight);

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
  const isMobile = window.matchMedia('(max-width: 80ch)').matches;
  const wrapperWidth = wrapper.getBoundingClientRect().width;
  camera.aspect = window.aspect = window.innerWidth / window.innerHeight;
  camera.fov =
    360 / Math.PI * Math.atan(tanFOV * (window.innerHeight / windowHeight));

  camera.updateProjectionMatrix();
  camera.lookAt(scene.position);

  console.log(isMobile);
  const rWidth = isMobile
    ? window.innerWidth
    : window.innerWidth - wrapperWidth;
  const rHeight = isMobile ? window.innerHeight / 2 : window.innerHeight;

  renderer.setSize(rWidth, rHeight);

  renderer.render(scene, camera);
}

window.addEventListener('resize', onWindowResize);

/**
 * Minimal Keyboard navigation
 */
const contactNav = document.querySelectorAll('.contact a');

function navigate(el) {
  window.location = el.href;
}

const getFocusIndex = () => {
  const index = [...contactNav].indexOf(document.activeElement);
  return index >= 0 ? index : 0;
};

const isInContactNav = el => [...contactNav].includes(el);

function setFocus(keyCode) {
  const totalItems = contactNav.length - 1;
  const currFocus = isInContactNav(document.activeElement)
    ? getFocusIndex()
    : -1;
  let nextFocus;
  let shouldRepeat;

  if (keyCode === 37) {
    shouldRepeat = currFocus <= 0;
    nextFocus = shouldRepeat ? totalItems : currFocus - 1;
  }

  if (keyCode === 39) {
    console.log(currFocus);
    shouldRepeat = currFocus >= totalItems;
    nextFocus = shouldRepeat ? 0 : currFocus + 1;
  }

  console.log(currFocus);
  return contactNav[nextFocus];
}

window.addEventListener('keydown', e => {
  let target = contactNav;

  switch (e.keyCode) {
    // 1
    case 49:
      contactNav[0].focus();
      break;

    // 2
    case 50:
      contactNav[1].focus();
      break;

    // 3
    case 51:
      contactNav[2].focus();
      break;

    // 4
    case 52:
      contactNav[3].focus();
      break;

    // Left arrow
    case 37:
      target = setFocus(e.keyCode);
      target.focus();
      break;

    // Right arrow
    case 39:
      console.log(contactNav[1]);
      target = setFocus(e.keyCode);
      target.focus();
      break;

    // Enter
    case 13:
      navigate(document.activeElement);
      break;

    default:
  }
});
