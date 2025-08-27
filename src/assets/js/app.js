// import '../css/app.scss';

import fitvids from 'fitvids';
import 'focus-visible';

import Nav from './Nav.js';

document.documentElement.classList.remove('no-js');

const navMain = document.querySelector('.site-header');
const carousels = document.querySelectorAll('.carousel');
const isHome = document.querySelector('.home');
const isIntro = document.querySelector('canvas.intro');
const isBlobs = document.querySelector('canvas.blobs');
const projectNav = document.querySelector('.project-nav');

fitvids();

if (navMain) new Nav(navMain);

if (carousels) {
  import('./Carousel.js').then(({ default: Carousel }) => {
    [...carousels].map((el) => new Carousel({ el: el }));
  });
}

if (projectNav) {
  import('./ProjectNav.js').then(({ default: ProjectNav }) => {
    new ProjectNav(projectNav);
  });
}

let threejs;

async function loadThree() {
  if (isHome || isBlobs) {
    threejs = await import(
      'https://cdnjs.cloudflare.com/ajax/libs/three.js/r122/three.min.js'
    );
  }
  if (threejs && isIntro) {
    import('./intro.js').then(() => {});
  }
  if (threejs && isBlobs) {
    import('./blobs.js').then(() => {});
  }
}
loadThree();
