const body = document.body;
const wrapper = document.querySelector('main.wrapper');

export default class Modal {
  constructor(data, options = { animateParent: true }) {
    this.template = document.importNode(document.querySelector('#modal'), true);
    this.slug = undefined;
    this.url = undefined;
    this.el = undefined;
    this.animateParent = options.animateParent;

    this.init(data);
  }

  init(data) {
    const frag = document.createElement('template');
    frag.innerHTML = data;

    const unneededElements = frag.content.querySelectorAll(
      '*:scope > *:not(main)'
    );
    const assets = frag.content.querySelectorAll('img[src], img[srcset]');

    this.slug = frag.content.querySelector('main').dataset.slug;
    this.url = frag.content.querySelector('main').dataset.url;

    [...unneededElements].map((el) => el.remove());
    [...assets].map((el) => {
      if (el.src) {
        el.src = `${this.url}/${el.getAttribute('src')}`;
      }
      if (el.srcset) {
        el.srcset = el.srcset.replace(/([\S]+\.\w{3,})/gi, this.url + '$1');
      }
    });

    this.template.content.querySelector('.modal--body').innerHTML =
      frag.innerHTML;

    this.pageDetails = this.template.content.querySelector('main').dataset;
  }

  show() {
    this.el = this.template.content.firstElementChild;

    if (this.animateParent)
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

    if (this.animateParent) {
      wrapper.addEventListener(
        'animationend',
        () => {
          wrapper.classList.remove('animating', 'animation:scaleInDown');
        },
        { passive: true, once: true }
      );
    }
    body.append(this.el);
    body.dataset.showingModal = true;
  }

  close(event) {
    event.preventDefault();
    this.el.classList.add('animating', 'animation:slideOutDown');

    if (this.animateParent)
      wrapper.classList.add('animating', 'animation:scaleOutUp');

    this.el.addEventListener(
      'animationend',
      () => {
        this.el.classList.remove('animating', 'animation:slideOutDown');
        this.el.dataset.visible = false;
        this.el.remove();

        body.dataset.showingModal = false;

        let event = new CustomEvent('modal:hide', {
          detail: { ...this.pageDetails },
        });
        this.el.dispatchEvent(event);
        this.destroy();
      },
      { passive: true, once: true }
    );

    wrapper.addEventListener(
      'animationend',
      () => {
        wrapper.classList.remove('animating', 'animation:scaleOutUp');
      },
      { passive: true, once: true }
    );
  }

  scaleDown() {
    this.el.classList.add('animating', 'animation:scaleInDown');
    this.el.style.transformOrigin = 'bottom';
    this.el.addEventListener(
      'animationend',
      () => {
        let event = new CustomEvent('modal:disabled', {
          detail: this,
        });

        this.el.dispatchEvent(event);
      },
      {
        passive: true,
        once: true,
      }
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
