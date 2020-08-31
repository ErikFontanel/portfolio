const body = document.body;
const wrapper = document.querySelector('main.wrapper');

export default class Modal {
  constructor(data) {
    this.template = document.importNode(document.querySelector('#modal'), true);
    this.slug = undefined;
    this.el = undefined;

    this.init(data);
  }

  init(data) {
    const frag = document.createElement('template');
    frag.innerHTML = data;

    this.slug = frag.content.querySelector('main').dataset.slug;
    const content = frag.content.querySelectorAll('*:scope > *:not(main)');

    [...content].map((el) => el.remove());

    this.template.content.querySelector('.modal--body').innerHTML =
      frag.innerHTML;

    this.pageDetails = this.template.content.querySelector('main').dataset;
  }

  show() {
    this.el = this.template.content.firstElementChild;

    wrapper.classList.add('animating', 'animation:scaleInDown');

    this.el.classList.add('animating', 'animation:slideInUp');
    this.el.dataset.visible = true;
    body.dataset.showingModal = true;

    this.el
      .querySelector('.button[data-close-modal]')
      .addEventListener('click', this.close.bind(this), {
        passive: false,
        once: true,
      });

    this.el.addEventListener(
      'animationend',
      () => {
        this.el.classList.remove('animating', 'animation:slideInUp');
        wrapper.classList.remove('animating', 'animation:scaleInDown');

        let event = new CustomEvent('modal:show', {
          detail: { ...this.pageDetails },
        });

        this.el.dispatchEvent(event);
      },
      {
        passive: true,
        once: true,
      }
    );

    body.append(this.el);
    body.dataset.showingModal = true;
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

        let event = new Event('modal:hide');
        this.el.dispatchEvent(event);
        this.destroy();
      },
      { passive: true, once: true }
    );
  }

  handleClick(event) {
    event.preventDefault();
  }

  destroy() {
    this.el.remove();
    delete this;
  }
}
