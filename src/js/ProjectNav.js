import debounce from 'lodash/debounce';

export default class ProjectNav {
  constructor(el) {
    this.el = el;
    this.pageHeader =
      document.querySelector('.project-header') ||
      document.querySelector('.page-header') ||
      document.querySelector('.page-header--title');
    if (this.pageHeader)
      window.addEventListener('scroll', debounce(this.onScroll.bind(this), 50));
  }

  onScroll() {
    this.el.toggleAttribute(
      'data-is-scrolling',
      window.scrollY > this.pageHeader.offsetHeight / 2
    );
  }
}
