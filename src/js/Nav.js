import { template } from 'lodash-es';

export default class Nav {
  constructor(el) {
    this.el = el;
    this.visible = false;
    this.modal = document.querySelector('.modal');
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
      this.loadUrl(btn.getAttribute('href'));
    }
    btn.classList.remove('active');
    toggle.setAttribute('aria-expanded', !this.visible);
    nav.setAttribute('data-overlay', !this.visible);
    popover.setAttribute('aria-hidden', this.visible);
    document.body.setAttribute('data-showing-overlay', !this.visible);

    this.visible = !this.visible;
  }

  loadUrl(url) {
    event.preventDefault();
    fetch(url)
      .then((resp) => resp.text())
      .then((data) => {
        this.modal.content.querySelector('.modal--body').innerHTML = data;
        document.body.appendChild(this.modal);
        return this.modal.content;
      })
      // .then((main) => {
      //   const container = this.modal.content.querySelector('.modal--body');
      //   container.appendChild(main.querySelector('main.wrapper'));
      //   return this.modal;
      // })
      .then((modal) => {
        // modal.dataset.visible = true;
        document.body.setAttribute('data-showing-modal', true);
      })
      .catch((err) => console.error(err));
  }
}
