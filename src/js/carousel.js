export default class Carousel {
  constructor(opts) {
    this.el = opts.el;
    this.imgs = [...this.el.querySelectorAll('img')];
    this.index = 0;
    this.current = this.imgs[this.index];
    this.counter = '';

    this.init();
  }

  init() {
    this.addCounter();
    this.imgs
      .filter((img) => img !== this.current)
      .map((img) => {
        img.classList.add('hidden');
        // img.style.display = 'none';
      });
    this.current.classList.add('visible');

    this.el.addEventListener('click', this);
  }

  handleEvent(event) {
    switch (event.type) {
      case 'click':
        this.next();
        break;
    }
  }

  next(event) {
    this.index = this.index < this.imgs.length - 1 ? ++this.index : 0;
    this.current = this.imgs[this.index];
    this.prev =
      this.index === 0
        ? this.imgs[this.imgs.length - 1]
        : this.imgs[this.index - 1];

    this.current.classList.remove('hidden');
    // this.current.style.display = 'block';
    this.current.classList.add('visible');

    this.prev.classList.remove('visible');
    // this.prev.style.display = 'none';
    this.prev.classList.add('hidden');

    this.current.addEventListener(
      'animationend',
      () => this.current.classLlist.remove('hidden'),
      { once: true }
    );

    this.updateCounter(this.index);
  }

  addCounter() {
    const caption = this.el.querySelector('figcaption');
    this.counter = document.createElement('span');

    this.counter.classList.add('counter');
    this.counter.innerHTML = `${this.index + 1} <span class="sep">/</span> ${
      this.imgs.length
    }`;
    caption.appendChild(this.counter);
  }

  updateCounter(index) {
    this.counter.innerHTML = `${index + 1} <span class="sep">/</span> ${
      this.imgs.length
    }`;
  }
}
