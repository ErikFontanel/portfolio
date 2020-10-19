import './scss/app.scss';

import fitvids from 'fitvids';
import 'focus-visible';

import Nav from './js/Nav';
// import ProjectsList from './js/ProjectsList';

document.documentElement.classList.remove('no-js');

if (import.meta.hot) {
  import.meta.hot.accept(() => {
    // Accept the module, apply it to your application.
    console.log('hot reloading…');
  });

  import.meta.hot.dispose(() => {
    // Cleanup any side-effects. Optional.
  });
}

const navMain = document.querySelector('.site-header');
const carousels = document.querySelectorAll('.carousel');
const isHome = () => document.querySelector('.home');
// const projects = document.querySelectorAll('.projects');

fitvids();

if (navMain) new Nav(navMain);

if (carousels) {
  const Carousel = import('./js/carousel');
  [...carousels].map((el) => new Carousel({ el: el }));
}

if (isHome()) {
  import('./js/intro.js');
}
