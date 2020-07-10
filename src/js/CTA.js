import { debounce } from 'lodash-es';

export default class CTA {
  constructor(el) {
    this.el = el;
    window.addEventListener('scroll', debounce(this.onScroll.bind(this)));
  }

  onScroll() {
    this.el.toggleAttribute('data-is-scrolling', window.scrollY);
  }
}
