import fitvids from 'fitvids';

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
// const projects = document.querySelectorAll('.projects');

fitvids();

if (navMain) new Nav(navMain);
if (cta) new CTA(cta);
if (carousels) [...carousels].map((el) => new Carousel({ el: el }));
// [...projects].map((el) => new ProjectsList(el));

// window.addEventListener(
//   'DOMContentLoaded',
//   (event) => {
//     document.body.classList.add('animating', 'animation:fadeInUp');
//     document.body.style = '';
//     document.documentElement.addEventListener(
//       'animationend',
//       (event) => {
//         document.documentElement.classList.remove(
//           'animating',
//           'animation:fadeInUp'
//         );
//       },
//       {
//         passive: true,
//         once: true,
//       }
//     );
//   },
//   { passive: true, once: true }
// );

// window.addEventListener(
//   'unload',
//   (event) => {
//     document.body.classList.add('animating', 'animation:fadeOutDown');
//   },
//   { passive: true, once: true }
// );
