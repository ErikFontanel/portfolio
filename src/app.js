import './scss/app.scss';

import fitvids from 'fitvids';
import 'focus-visible';

import Nav from './js/Nav';

document.documentElement.classList.remove('no-js');

const navMain = document.querySelector('.site-header');
const carousels = document.querySelectorAll('.carousel');
const isHome = document.querySelector('.home');
const isIntro = document.querySelector('canvas.intro');
const isBlobs = document.querySelector('canvas.blobs');

fitvids();

if (navMain) new Nav(navMain);

if (carousels) {
  const Carousel = import('./js/carousel');
  [...carousels].map((el) => new Carousel({ el: el }));
}

let threejs;

async function loadThree() {
  if (isHome || isBlobs) {
    threejs = await import(
      'https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js'
    );
  }
  if (threejs && isIntro) {
    import('./js/intro.js').then(() => {});
  }
  if (threejs && isBlobs) {
    // import('./js/blobs.js').then(() => {});
  }
}
loadThree();
