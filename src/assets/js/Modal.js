import EventBus from './EventBus';

const body = document.body;
const wrapper = document.querySelector('main.wrapper');

const isRelative = (url) => !url.startsWith('/') && !url.startsWith('http');

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
      '*:scope > *:not(main):not(.site-footer)'
    );
    const assets = frag.content.querySelectorAll(
      'img[src], img[srcset], video'
    );
    const dataset = frag.content.querySelector('main').dataset;

    this.slug = dataset.slug;
    this.url = dataset.url;

    [...unneededElements].map((el) => el.remove());
    [...assets].map((el) => {
      if (el.src) {
        el.src = isRelative(el.src)
          ? `${this.url}/${el.getAttribute('src')}`
          : el.src;
      }
      if (el.srcset) {
        el.srcset = isRelative(el.srcset)
          ? el.srcset.replace(/([\S]+\.\w{3,})/gi, this.url + '$1')
          : el.srcset;
      }
      if (el.poster) {
        el.poster = isRelative(el.poster)
          ? `${this.url}/${el.getAttribute('poster')}`
          : el.poster;
      }
    });

    this.template.content.querySelector('.modal--body').innerHTML =
      frag.innerHTML;

    this.pageDetails = { ...dataset, bodyclass: dataset.bodyclass.split(' ') };
  }

  show() {
    this.el = this.template.content.firstElementChild;
    this.el.dataset.slug = this.pageDetails.slug;
    this.el.classList.add(...this.pageDetails.bodyclass);
    this.carousels = this.el.querySelectorAll('.carousel');

    if (this.carousels) {
      import('./Carousel.js').then(({ default: Carousel }) => {
        [...this.carousels].map((el) => new Carousel({ el: el }));
      });
    }

    if (this.animateParent)
      wrapper.classList.add('animating', 'animation:scaleInDown');
    this.el.classList.add('animating', 'animation:slideInUp');

    this.el.dataset.visible = true;
    body.dataset.showingModal = true;

    this.el
      .querySelector('.button[data-close-modal]')
      ?.addEventListener('click', this.close.bind(this), {
        passive: false,
        once: true,
      });

    this.el.addEventListener('animationstart', () =>
      EventBus.emit('modal:beforeShow', { ...this.pageDetails })
    );

    this.el.addEventListener(
      'animationend',
      () => {
        this.el.classList.remove('animating', 'animation:slideInUp');

        EventBus.emit('modal:show', { ...this.pageDetails });
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

    // parse images again because safari sucks
    // @see https://stackoverflow.com/a/48122384
    const imgs = this.el.querySelectorAll('img');
    if (imgs) {
      [...imgs].forEach((img) => (img.outerHTML = img.outerHTML));
    }

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

        EventBus.emit('modal:hide', { ...this.pageDetails });

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
        EventBus.emit('modal:disabled', this);
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
