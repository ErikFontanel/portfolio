/* global THREE */
import debounce from 'lodash/debounce';
import EventBus from './EventBus';

const canvas = document.querySelector('canvas.blobs');
const parent = canvas.parentElement;
const canvasWidth = parent.clientWidth;
const canvasHeight = parent.clientHeight;

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: false });

const camera = new THREE.PerspectiveCamera(
  75,
  canvasWidth / canvasHeight,
  0.1,
  100
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
const twistGeometry = new THREE.IcosahedronGeometry(4, 4);
const geometry = new THREE.IcosahedronGeometry(2, 4);

function buildTwistMaterial(amount) {
  const material = new THREE.MeshNormalMaterial();
  material.wireframe = false;
  material.onBeforeCompile = function (shader) {
    shader.uniforms.time = { value: 0 };

    shader.vertexShader = 'uniform float time;\n' + shader.vertexShader;
    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      [
        `float theta = sin( time + position.y ) / ${amount.toFixed(1)};`,
        'float c = cos( theta );',
        'float s = sin( theta );',
        'mat3 m = mat3( c, 0, s, 0, 1, 0, -s, 0, -c );',
        'vec3 transformed = vec3( position ) * m;',
        'vNormal = vNormal * m;',
      ].join('\n')
    );

    material.userData.shader = shader;
  };

  // Make sure WebGLRenderer doesnt reuse a single program

  material.customProgramCacheKey = function () {
    return amount;
  };

  return material;
}

// create orb
const orb = new THREE.Mesh(geometry, buildTwistMaterial(4.0));
const orb2 = new THREE.Mesh(twistGeometry, buildTwistMaterial(5.0));
const orb3 = new THREE.Mesh(geometry, buildTwistMaterial(2.4));

orb.name = 'top';
orb2.name = 'twist';
orb3.name = 'bottom';

orb.position.x = 14;
orb.position.y = 8;
orb.position.z = -12;

orb2.position.x = -7;
orb2.position.y = -1;
orb2.position.z = -8;
orb2.scale.set(1, 1, 1);

orb3.position.x = 12;
orb3.position.y = -7;
orb3.position.z = -16;

scene.add(orb);
scene.add(orb2);
scene.add(orb3);

function animateOrb(orb, props) {
  const { rotationSpeed, movementSpeed, direction } = props;
  orb.rotation.x += rotationSpeed;
  orb.rotation.y += rotationSpeed;

  if (orb.position.x > 14 || orb.position.x < -14) {
    direction.x = -1;
  }

  if (orb.position.y > 10 || orb.position.y < -10) {
    direction.y = -1;
  }

  orb.position.x += movementSpeed * direction.x;
  orb.position.y += movementSpeed * direction.y;
}

const animate = () => {
  animation = requestAnimationFrame(animate);

  animateOrb(orb, {
    movementSpeed: 0.002,
    rotationSpeed: 0.003,
    direction: { x: -1, y: -1 },
  });

  animateOrb(orb2, {
    movementSpeed: 0.0005,
    rotationSpeed: 0.0005,
    direction: { x: 1, y: 1 },
  });

  animateOrb(orb3, {
    movementSpeed: 0.003,
    rotationSpeed: 0.004,
    direction: { x: -1, y: 1 },
  });

  scene.traverse(function (child) {
    if (child.isMesh) {
      const shader = child.material.userData.shader;

      if (shader) {
        shader.uniforms.time.value = performance.now() / 1000;
      }
    }
  });

  renderer.render(scene, camera);
  geometry.dispose();
  material.dispose();
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

function pauseAnimation() {
  cancelAnimationFrame(animation);
  animation = undefined;
  console.log('blobs paused');
}

function resumeAnimation() {
  animation = requestAnimationFrame(animate);
  console.log('blobs resumed');
}

// Fade on scroll
function onScroll(entries) {
  entries.map((entry) => {
    // canvas.classList.toggle('is-hidden', entry.intersectionRatio < 0.5);
    let opacity;

    if (entry.intersectionRatio >= 0.5) {
      opacity = 1;
    } else if (entry.intersectionRatio <= 0.1) {
      opacity = 0;
    } else {
      opacity = entry.intersectionRatio;
    }

    if (opacity === 0 && animation) {
      pauseAnimation();
    } else if (opacity === 1 && !animation) {
      resumeAnimation();
    }

    parent.style.setProperty('--opacity', opacity);

    canvas.addEventListener(
      'transitionend',
      () => {
        if (canvas.classList.contains('is-hidden') && animation) {
          pauseAnimation();
        }
      },
      {
        passive: true,
        once: true,
      }
    );

    canvas.addEventListener(
      'transitionstart',
      () => {
        if (!canvas.classList.contains('is-hidden') && !animation) {
          resumeAnimation();
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
  threshold: [...Array(10).keys()].filter((n) => n > 0).map((i) => i * 0.1),
  rootMargin: `${window.innerHeight * 0.5}px 0px`,
});
observer.observe(parent);

EventBus.on('modal:show', pauseAnimation);
EventBus.on('modal:hide', resumeAnimation);
