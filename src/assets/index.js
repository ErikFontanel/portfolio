import './css/app.scss';
import Carousel from './js/carousel';

if (module.hot) {
  module.hot.accept();
  console.log('Hot reloading…');
}

document.documentElement.classList.remove('no-js');
const modal = document.querySelector('.overlay');
const modalBody = modal?.querySelector('.overlay--body');

let visible = false;

const toggleModal = event => {
  event.preventDefault();
  document.documentElement.classList.toggle('overlay-visible', !visible);
  modal.classList.toggle('is-visible', !visible);

  modalBody.classList.toggle('scale-down', !visible);
  modalBody.classList.toggle('scale-up', visible);
  modalBody.classList.toggle('blur-in', !visible);
  modalBody.classList.toggle('blur-out', visible);

  modal.addEventListener('animationend', function(event) {
    modalBody.classList.remove('scale-down', !visible);
    modalBody.classList.remove('scale-up', visible);
    modalBody.classList.remove('blur-in', !visible);
    modalBody.classList.remove('blur-out', visible);
  });
  visible = !visible;
};

document
  .querySelectorAll('.info a, button.close')
  ?.forEach(el => el.addEventListener('click', toggleModal));

[...document.querySelectorAll('.carousel')].map(i => new Carousel({ el: i }));

// if (carousels.length) {
//   carousels.map(i => new Carousel());
// }
