export default class Nav {
  constructor(el) {
    this.el = el;

    [...this.el.querySelectorAll('[aria-controls]')].map((btn) =>
      btn.addEventListener('click', this.toggleNav.bind(this))
    );
  }

  toggleNav() {
    const btn = event.currentTarget;
    const target = this.el.querySelector(btn.getAttribute('aria-controls'));
    event.preventDefault();

    btn.toggleAttribute('aria-expanded');
    this.el.toggleAttribute('data-showing-overlay');
    target.toggleAttribute('aria-hidden');
    this.visible = !this.visible;
  }
}
