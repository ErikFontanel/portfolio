// import Gl from './Gl';
import { debounce } from 'lodash-es';

export default class CTA {
  constructor(el) {
    this.el = el;
    window.addEventListener('scroll', debounce(this.onScroll.bind(this)));

    // const gl = new Gl(this.el);
    // gl.init();
  }

  onScroll() {
    this.el.toggleAttribute('data-is-scrolling', window.scrollY);
  }
}
