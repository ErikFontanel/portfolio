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
const projectNav = document.querySelector('.project-nav');

fitvids();

if (navMain) new Nav(navMain);

if (carousels) {
  import('./js/Carousel').then(({ default: Carousel }) => {
    [...carousels].map((el) => new Carousel({ el: el }));
  });
}

if (projectNav) {
  import('./js/ProjectNav').then(({ default: ProjectNav }) => {
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
    import('./js/intro.js').then(() => {});
  }
  if (threejs && isBlobs) {
    import('./js/blobs.js').then(() => {});
  }
}
loadThree();

const projectItems = document.querySelectorAll('.project-item');
if (projectItems.length > 0) {
  const items = [...projectItems];
  items.map((item) =>
    item.addEventListener(
      'mouseenter',
      () => {
        items
          .filter((p) => p !== item)
          .map((p) => p.classList.add('is-blurred'));
      },
      { passive: true }
    )
  );
  items.map((item) =>
    item.addEventListener(
      'mouseleave',
      () => {
        items
          .filter((p) => p !== item)
          .map((p) => p.classList.remove('is-blurred'));
      },
      { passive: true }
    )
  );
}
