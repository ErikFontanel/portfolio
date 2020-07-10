import './css/app.css';
import Nav from './js/Nav';
import Carousel from './js/carousel';
import CTA from './js/CTA';

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

if (navMain) new Nav(navMain);
if (cta) new CTA(cta);

[...document.querySelectorAll('.carousel')].map(
  (el) => new Carousel({ el: el })
);
