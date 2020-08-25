import Nav from './Nav';
const body = document.body;
const wrapper = document.querySelector('main.wrapper');

export default class Modal {
  constructor(modal, data) {
    this.el = modal.querySelector('.modal');
    this.data = data;
    this.slug = undefined;
    this.initialized = false;

    if (!this.initialized) this.init();
  }

  init() {
    this.navMain = document.querySelector('.site-header');
    if (this.navMain) new Nav(this.navMain);
    const frag = document.createElement('template');
    const content = frag.content.querySelectorAll('*:scope > *:not(main)');
    console.log(frag.content);
    frag.innerHTML = this.data;
    this.el.dataset.slug = frag.content.querySelector('main').dataset.slug;

    [...content].map((el) => el.remove());

    this.el.querySelector('.modal--body').innerHTML = frag.innerHTML;

    this.el
      .querySelector('.button[data-close-modal]')
      .addEventListener('click', this.close.bind(this));

    this.initialized = true;
  }

  show() {
    body.appendChild(this.el);
    body.dataset.showingModal = true;

    wrapper.classList.add('animating', 'animation:scaleInDown');

    this.el.classList.add('animating', 'animation:slideInUp');
    this.el.dataset.visible = true;

    this.el.addEventListener(
      'animationend',
      () => {
        this.el.classList.remove('animating', 'animation:slideInUp');
        wrapper.classList.remove('animating', 'animation:scaleInDown');
      },
      {
        passive: true,
        once: true,
      }
    );
  }

  close() {
    event.preventDefault();

    this.el.classList.add('animating', 'animation:slideOutDown');
    wrapper.classList.add('animating', 'animation:scaleOutUp');

    this.el.addEventListener(
      'animationend',
      () => {
        this.el.classList.remove('animating', 'animation:slideOutDown');
        this.el.dataset.visible = false;
        this.el.remove();

        wrapper.classList.remove('animating', 'animation:scaleOutUp');
        body.dataset.showingModal = false;
        this.navMain.querySelector(
          '[data-selected=true]'
        ).dataset.selected = false;
        this.destroy();
      },
      { passive: true, once: true }
    );
  }

  destroy() {
    delete this;
  }
}
