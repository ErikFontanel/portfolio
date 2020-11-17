import Modal from './Modal';
import EventBus from './EventBus';

export default class Nav {
  constructor(el) {
    this.el = el;
    this.navMain = this.el.querySelector('.nav-main');
    this.navProjects = this.el.querySelector('.nav-projects');
    this.projectItems = document.querySelectorAll('.project-item a');

    this.visible = false;
    this.modal = null;
    this.btnToggle = this.navMain.querySelector('[aria-controls]');
    this.popover = this.el.querySelector(
      this.btnToggle.getAttribute('aria-controls')
    );

    this.el.addEventListener('click', this.onclick.bind(this));
    this.el.addEventListener('touchend', this.onclick.bind(this));

    [...this.projectItems].map((link) => {
      link.addEventListener('click', this.onclickProjectItem.bind(this));
      link.addEventListener('touchend', this.onclickProjectItem.bind(this));
    });

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
    else if (!this.visible) this.show();
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

  onclick(event) {
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

  onclickProjectItem(event) {
    event.preventDefault();

    this.loadUrl(event.currentTarget);
  }

  loadUrl(btn) {
    const url = btn.getAttribute('href');

    fetch(url)
      .then((resp) => resp.text())
      .then((data) => {
        if (this.modal) {
          this.modal.scaleDown();
        }

        this.modal = new Modal(data);
        return this.modal;
      })
      .then((modal) => {
        this.hide();
        modal.show();

        EventBus.on('modal:beforeShow', this['onmodal:beforeShow'].bind(this));
        EventBus.on('modal:show', this['onmodal:show'].bind(this));
        EventBus.on('modal:hide', this['onmodal:hide'].bind(this));
        EventBus.on('modal:disabled', this['onmodal:disabled'].bind(this));
      })
      .catch((err) => console.error(err));
  }

  handleEvent(event) {
    this['on' + event.type](event);
  }

  ['onmodal:beforeShow'](event) {
    this.updateActiveLink(event);
  }

  ['onmodal:show'](event) {
    // this.updateActiveLink(event);
  }

  ['onmodal:hide'](event) {
    this.unsetActiveLink(event);
  }

  ['onmodal:disabled'](event) {
    event.destroy();
  }

  unsetActiveLink(detail) {
    const buttons = [...this.el.querySelectorAll('.button')];
    const btnToggle = this.btnToggle;
    const toggleLabel = btnToggle.querySelector('.button--label');

    buttons.forEach((btn) => {
      delete btn.dataset.selected;
      btn.classList.remove('active');
      btn.removeAttribute('aria-current');
      btn.removeAttribute('data-selected');
    });

    toggleLabel.textContent = btnToggle.getAttribute('aria-label');
    toggleLabel.nextElementSibling.textContent = '';
    history.pushState({}, '', '/');
  }

  updateActiveLink(detail) {
    const { slug, type, title } = detail;
    const toggleLabel = this.btnToggle.querySelector('.button--label');
    const activeButton = this.el.querySelector(`a[href$="${slug}/"]`);

    this.unsetActiveLink();

    if (slug) {
      history.pushState(
        {},
        title,
        type === 'work' ? `${type}/${slug}/` : `${slug}/`
      );
    }

    if (slug && activeButton) {
      activeButton.dataset.selected = true;
      activeButton.setAttribute('aria-current', 'page');
    }

    // add sublabel to work
    if (type === 'work') {
      toggleLabel.textContent = 'work:';
      toggleLabel.nextElementSibling.textContent = title;
      this.btnToggle.dataset.selected = true;
    } else {
      toggleLabel.textContent = toggleLabel.textContent.replace(':', '');
      toggleLabel.nextElementSibling.textContent = '';
    }
  }
}
