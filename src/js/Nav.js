export default class Nav {
  constructor(el) {
    this.el = el;
    this.visible = false;
    [...this.el.querySelectorAll('[aria-controls]')].map((btn) =>
      btn.addEventListener('click', this.toggleNav.bind(this))
    );
  }

  toggleNav() {
    const btn = event.currentTarget;
    const target = this.el.querySelector(btn.getAttribute('aria-controls'));
    event.preventDefault();

    btn.setAttribute('aria-expanded', !this.visible);
    this.el.setAttribute('data-showing-overlay', !this.visible);
    target.setAttribute('aria-hidden', this.visible);
    this.visible = !this.visible;
  }
}
