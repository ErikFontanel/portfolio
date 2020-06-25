import './css/app.css';
import Nav from './js/Nav';
import Carousel from './js/carousel';

document.documentElement.classList.remove('no-js');

if (import.meta.hot) {
  import.meta.hot.accept(({ module }) => {
    // Accept the module, apply it to your application.
    console.log('hot reloading…');
  });
  import.meta.hot.dispose(() => {
    // Cleanup any side-effects. Optional.
  });
}

const navMain = document.querySelector('.site-header');

new Nav(navMain);

[...document.querySelectorAll('.carousel')].map(
  (el) => new Carousel({ el: el })
);
