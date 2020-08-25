import Modal from './Modal';

export default class Nav {
  constructor(el) {
    this.el = el;
    this.visible = false;
    this.modal = document.querySelector('#modal');
    this.modalActive = null;
    this.el.addEventListener('click', this.toggleNav.bind(this));
    this.el.addEventListener('touchend', this.toggleNav.bind(this));

    // Disabled focus ring triggering in Chrome
    this.el.addEventListener(
      'touchstart',
      (event) => event.preventDefault(),
      false
    );

    this.el.addEventListener('mousedown', (event) => event.preventDefault());
  }

  toggleNav() {
    const nav = event.currentTarget;
    const btn = event.target.parentElement.hasAttribute('href')
      ? event.target.parentElement
      : event.target;
    const toggle = nav.querySelector('[aria-controls]');
    const popover = nav.querySelector(toggle.getAttribute('aria-controls'));

    event.preventDefault();

    if (!btn.classList.contains('active') && btn !== toggle) {
      btn.classList.add('active');
      this.loadUrl(btn);
    } else {
      toggle.setAttribute('aria-expanded', !this.visible);
      nav.setAttribute('data-overlay', !this.visible);
      popover.setAttribute('aria-hidden', this.visible);
      document.body.setAttribute('data-showing-overlay', !this.visible);
      btn.classList.remove('active');
    }

    this.visible = !this.visible;
  }

  loadUrl(btn) {
    const url = btn.getAttribute('href');
    const modal = document.importNode(this.modal.content, true);

    event.preventDefault();
    btn.dataset.selected = true;

    if (!this.modalActive) {
      fetch(url)
        .then((resp) => resp.text())
        .then(
          (data) =>
            (this.modalActive = this.modalActive
              ? this.modalActive(modal, data)
              : new Modal(modal, data))
        )
        .then((modal) => {
          modal.show();
        })
        .then(btn.classList.remove('active'))
        .catch((err) => console.error(err));
    }
  }
}
