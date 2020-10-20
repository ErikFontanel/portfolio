import './scss/app.scss';

import fitvids from 'fitvids';
import 'focus-visible';

import Nav from './js/Nav';

document.documentElement.classList.remove('no-js');

if (module.hot) {
  module.hot.accept(() => {
    // Accept the module, apply it to your application.
    console.log('hot reloading…');
  });

  module.hot.dispose(() => {
    // Cleanup any side-effects. Optional.
  });
}

const navMain = document.querySelector('.site-header');
const carousels = document.querySelectorAll('.carousel');
const isHome = document.querySelector('.home');

fitvids();

if (navMain) new Nav(navMain);

if (carousels) {
  const Carousel = import('./js/carousel');
  [...carousels].map((el) => new Carousel({ el: el }));
}

if (isHome) {
  import(
    'https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js'
  ).then(() => {
    import('./js/intro.js').then(() => {});
  });
}
