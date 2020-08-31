import Modal from './Modal';

export default class Nav {
  constructor(el) {
    this.el = el;
    this.navMain = this.el.querySelector('.nav-main');
    this.navProjects = this.el.querySelector('.nav-projects');

    this.visible = false;
    this.modal = null;
    this.btnToggle = this.navMain.querySelector('[aria-controls]');
    this.popover = this.el.querySelector(
      this.btnToggle.getAttribute('aria-controls')
    );

    this.el.addEventListener('click', this.handleClick.bind(this));
    this.el.addEventListener('touchend', this.handleClick.bind(this));

    // Disabled focus ring triggering in Chrome
    this.el.addEventListener(
      'touchstart',
      (event) => event.preventDefault(),
      false
    );

    this.el.addEventListener('mousedown', (event) => event.preventDefault());
  }

  toggle() {
    if (this.visible) this.hide();
    if (!this.visible) this.show();
  }

  show() {
    this.navMain
      .querySelector('[aria-controls]')
      .setAttribute('aria-expanded', true);
    this.navMain.setAttribute('data-overlay', true);
    document.body.setAttribute('data-showing-overlay', true);
    this.popover.setAttribute('aria-hidden', false);
    this.visible = true;
  }

  hide() {
    this.navMain
      .querySelector('[aria-controls]')
      .setAttribute('aria-expanded', false);
    this.navMain.setAttribute('data-overlay', false);
    document.body.setAttribute('data-showing-overlay', false);
    this.popover.setAttribute('aria-hidden', true);
    this.visible = false;
  }

  handleClick(event) {
    event.preventDefault();

    const btn = event.target.classList.contains('button')
      ? event.target
      : event.target.parentElement.classList.contains('button')
      ? event.target.parentElement
      : false;

    // close when clicked outside of nav
    if (btn === this.btnToggle) {
      this.toggle();
    } else if (
      btn &&
      !btn.classList.contains('active') &&
      !btn.dataset.selected
    ) {
      this.loadUrl(btn);
    } else if (this.visible && event.target !== btn) {
      this.hide();
    }
  }

  loadUrl(btn) {
    const url = btn.getAttribute('href');

    event.preventDefault();

    if (this.modal) this.modal.destroy();

    fetch(url)
      .then((resp) => resp.text())
      .then((data) => {
        this.modal = new Modal(data);

        return this.modal;
      })
      .then((modal) => {
        this.hide();
        modal.show();

        modal.el.addEventListener('modal:show', (event) => {
          this.updateActiveLink(url);
        });

        modal.el.addEventListener('modal:hide', (event) => {
          this.updateActiveLink();
        });
      })
      .catch((err) => console.error(err));
  }

  updateActiveLink(url) {
    const buttons = [...this.el.querySelectorAll('.button')];

    buttons.forEach((btn) => {
      delete btn.dataset.selected;
      btn.classList.remove('active');
    });

    const activeButton = this.el.querySelector(`a[href$="${url}"]`);
    if (url && activeButton) activeButton.dataset.selected = true;
  }
}
