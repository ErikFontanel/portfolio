import './css/app.css';

import fitvids from 'fitvids';
import 'focus-visible';

import Nav from './js/Nav';
import Carousel from './js/carousel';
import CTA from './js/CTA';
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
const cta = document.querySelector('.cta');
const carousels = document.querySelectorAll('.carousel');
const isHome = () => document.querySelector('.home');
// const projects = document.querySelectorAll('.projects');

fitvids();

if (navMain) new Nav(navMain);
if (cta) new CTA(cta);
if (carousels) [...carousels].map((el) => new Carousel({ el: el }));

if (isHome()) {
  import('./js/intro.js');
}
