import './css/app.css';
import Nav from './js/Nav';
import Carousel from './js/carousel';
import CTA from './js/CTA';
import ProjectsList from './js/ProjectsList';

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
const projects = document.querySelectorAll('.projects');
const carousels = document.querySelectorAll('.carousel');

if (navMain) new Nav(navMain);
if (cta) new CTA(cta);

[...projects].map((el) => new ProjectsList(el));

[...carousels].map((el) => new Carousel({ el: el }));
