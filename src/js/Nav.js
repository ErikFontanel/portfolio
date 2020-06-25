export default class Nav {
  constructor(el) {
    this.el = el;
    this.visible = false;

    this.el.addEventListener('click', this.toggleNav.bind(this));
  }

  toggleNav() {
    const nav = event.currentTarget;
    const btn = nav.querySelector('[aria-controls]');
    const popover = nav.querySelector(btn.getAttribute('aria-controls'));
    event.preventDefault();

    btn.setAttribute('aria-expanded', !this.visible);
    nav.setAttribute('data-showing-overlay', !this.visible);
    popover.setAttribute('aria-hidden', this.visible);
    this.visible = !this.visible;
  }
}
