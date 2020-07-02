export default class Nav {
  constructor(el) {
    this.el = el;
    this.visible = false;

    this.el.addEventListener('click', this.toggleNav.bind(this));
    this.el.addEventListener('mousedown', (event) => event.preventDefault());
    window.scrollTo(0, 1);
  }

  toggleNav() {
    const nav = event.currentTarget;
    const btn = nav.querySelector('[aria-controls]');
    const popover = nav.querySelector(btn.getAttribute('aria-controls'));

    event.stopPropagation();
    if (!event.target.hasAttribute('href') || event.target === btn)
      event.preventDefault();

    btn.setAttribute('aria-expanded', !this.visible);
    nav.setAttribute('data-showing-overlay', !this.visible);
    popover.setAttribute('aria-hidden', this.visible);
    document.body.setAttribute('data-showing-overlay', !this.visible);

    this.visible = !this.visible;
  }
}
