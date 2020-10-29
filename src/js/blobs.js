/* global THREE */
import debounce from 'lodash/debounce';
const canvas = document.querySelector('canvas.blobs');
const parent = canvas.parentElement;
const canvasWidth = parent.clientWidth;
const canvasHeight = parent.clientHeight;

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });

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
// const geometry = new THREE.BoxGeometry(3, 4, 8, 2, 3, 4);
const geometry = new THREE.IcosahedronGeometry(2, 1);

function buildTwistMaterial(amount) {
  const material = new THREE.MeshNormalMaterial();
  material.wireframe = true;
  material.onBeforeCompile = function (shader) {
    shader.uniforms.time = { value: 0 };

    shader.vertexShader = 'uniform float time;\n' + shader.vertexShader;
    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      [
        `float theta = sin( time + position.y ) / ${amount.toFixed(1)};`,
        'float c = cos( theta );',
        'float s = sin( theta );',
        'mat3 m = mat3( c, 0, s, 0, 1, 0, -s, 0, c );',
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
const orb = new THREE.Mesh(geometry, material);
const orb2 = new THREE.Mesh(geometry, buildTwistMaterial(2.0));

orb2.name = 'twist';

orb.position.x = -8;
orb.position.y = 3;
orb.position.z = -4;

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

  scene.traverse(function (child) {
    if (child.isMesh) {
      const shader = child.material.userData.shader;

      if (shader) {
        shader.uniforms.time.value = performance.now() / 1000;
      }
    }
  });

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
    canvas.classList.toggle('is-hidden', entry.intersectionRatio < 0.5);

    canvas.addEventListener(
      'transitionend',
      () => {
        if (canvas.classList.contains('is-hidden') && animation) {
          cancelAnimationFrame(animation);
          animation = undefined;
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
  threshold: [...Array(10).keys()].filter((n) => n > 0).map((i) => i * 0.1),
  rootMargin: `${window.innerHeight * 0.5}px 0px`,
});
observer.observe(parent);
