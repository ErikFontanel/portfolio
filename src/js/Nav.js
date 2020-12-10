import Modal from './Modal';
import EventBus from './EventBus';
import fitvids from 'fitvids';
import throttle from 'lodash-es/throttle';

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

    this.registerListeners();
    this.el.addEventListener('click', this.onclick.bind(this));
    this.el.addEventListener('touchend', this.onclick.bind(this));

    // Disabled focus ring triggering in Chrome
    this.el.addEventListener(
      'touchstart',
      (event) => event.preventDefault(),
      false
    );
    this.el.addEventListener('mousedown', (event) => event.preventDefault());

    // fix for hiding address bar
    const setNavPosition = (event) => {
      document.documentElement.style.setProperty(
        '--app-height',
        `${window.innerHeight}px`
      );
    };
    setNavPosition();

    window.addEventListener('resize', throttle(setNavPosition, 16), {
      passive: true,
    });

    EventBus.on('modal:beforeShow', this['onmodal:beforeShow'].bind(this));
    EventBus.on('modal:show', this['onmodal:show'].bind(this));
    EventBus.on('modal:hide', this['onmodal:hide'].bind(this));
    EventBus.on('modal:disabled', this['onmodal:disabled'].bind(this));
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

  onmouseenterProjectItem(event) {
    this.projectItems
      .filter((i) => i !== event.target)
      .map((i) => i.classList.add('is-blurred'));
  }

  onmouseleaveProjectItem(event) {
    this.projectItems
      .filter((i) => i !== event.target)
      .map((i) => i.classList.remove('is-blurred'));
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
      })
      .catch((err) => console.error(err));
  }

  handleEvent(event) {
    this['on' + event.type](event);
  }

  ['onmodal:beforeShow'](event) {
    this.updateActiveLink(event);
    this.registerListeners();
    fitvids();
  }

  ['onmodal:show'](event) {}

  ['onmodal:hide'](event) {
    this.unsetActiveLink(event);
  }

  ['onmodal:disabled'](modal) {
    modal.destroy();
  }

  registerListeners() {
    const items = document.querySelectorAll('.project-item');

    if (items) {
      if (this.projectItems?.length) {
        const newItems = [...items].filter(
          (item) => !this.projectItems.includes(item)
        );

        if (newItems.length)
          this.projectItems = [...this.projectItems, ...newItems];
      } else {
        this.projectItems = [...items];
      }

      this.projectItems.forEach((item) => {
        item
          .querySelector('a')
          .addEventListener('click', this.onclickProjectItem.bind(this));
        item.addEventListener(
          'mouseenter',
          this.onmouseenterProjectItem.bind(this),
          { passive: true }
        );
        item.addEventListener(
          'mouseleave',
          this.onmouseleaveProjectItem.bind(this),
          { passive: true }
        );
      });
    }
  }

  unsetActiveLink(detail) {
    const buttons = [...this.el.querySelectorAll('.button')];
    const btnToggle = this.btnToggle;
    const toggleLabel = btnToggle.querySelector('.button--label');
    const payoff = document.querySelector('meta[name=title]').content;

    buttons.forEach((btn) => {
      delete btn.dataset.selected;
      btn.classList.remove('active');
      btn.removeAttribute('aria-current');
      btn.removeAttribute('data-selected');
    });

    toggleLabel.textContent = btnToggle.getAttribute('aria-label');
    toggleLabel.nextElementSibling.textContent = '';
    document.querySelector('title').innerText = payoff;
    history.pushState({}, '', '/');
  }

  updateActiveLink(detail) {
    const { slug, type, title } = detail;
    const toggleLabel = this.btnToggle.querySelector('.button--label');
    const activeButton = this.el.querySelector(`a[href$="${slug}/"]`);
    const doctitle = document.querySelector('title');
    const payoff = document.querySelector('meta[name=title]').content;

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

    // update doc title

    doctitle.innerText = `${title} | ${payoff}`;
  }
}
