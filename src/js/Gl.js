import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import loadFont from 'load-bmfont';
// import { * as createGeometry} from 'three-bmfont-text';
const createGeometry = require('three-bmfont-text');
const MSDFShader = require('three-bmfont-text/shaders/msdf');

// Font assets
const fontFile = require('../img/Heebo-light.fnt');
const fontAtlas = require('../img/Heebo-light.png');

// Shaders
const shaders = require('./shaders.js');

export default class {
  constructor(targetElement) {
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000, 1);
    targetElement.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );

    this.camera.position.z = 3;

    this.scene = new THREE.Scene();

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.clock = new THREE.Clock();
  }

  init() {
    // Create geometry of packed glyphs
    loadFont(fontFile, (err, font) => {
      this.fontGeometry = createGeometry({
        font,
        text: 'ENDLESS',
      });

      // Load texture containing font glyps
      this.loader = new THREE.TextureLoader();
      this.loader.load(fontAtlas, (texture) => {
        this.fontMaterial = new THREE.RawShaderMaterial(
          MSDFShader({
            map: texture,
            side: THREE.DoubleSide,
            transparent: true,
            negate: false,
            color: 0xffffff,
          })
        );

        this.createRenderTarget();
        this.createMesh();
        this.animate();
        this.addEvents();
      });
    });
  }

  createRenderTarget() {
    // Render Target setup
    this.rt = new THREE.WebGLRenderTarget(
      window.innerWidth,
      window.innerHeight
    );

    this.rtCamera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    this.rtCamera.position.z = 2.5;

    this.rtScene = new THREE.Scene();
    this.rtScene.background = new THREE.Color('#000000');

    // Create text mesh with font geometry and material
    this.text = new THREE.Mesh(this.fontGeometry, this.fontMaterial);

    // Adjust dimensions
    this.text.position.set(-0.965, -0.275, 0);
    this.text.rotation.set(Math.PI, 0, 0);
    this.text.scale.set(0.008, 0.02, 1);

    // Add text mesh to buffer scene
    this.rtScene.add(this.text);
  }

  createMesh() {
    this.geometry = new THREE.SphereGeometry(0.5, 64, 64);

    this.material = new THREE.ShaderMaterial({
      vertexShader: shaders.vert,
      fragmentShader: shaders.frag,
      uniforms: {
        uTime: { value: 0 },
        uTexture: { value: this.rt.texture },
      },
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.scene.add(this.mesh);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    this.render();
  }

  render() {
    this.controls.update();

    // Rotate mesh
    this.mesh.rotation.y += 0.005;

    // Update time
    this.material.uniforms.uTime.value = this.clock.getElapsedTime();

    // Draw Render Target
    this.renderer.setRenderTarget(this.rt);
    this.renderer.render(this.rtScene, this.rtCamera);
    this.renderer.setRenderTarget(null);

    this.renderer.render(this.scene, this.camera);
  }

  addEvents() {
    window.addEventListener('resize', this.resize.bind(this));
  }

  resize() {
    let width = window.innerWidth;
    let height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
}
