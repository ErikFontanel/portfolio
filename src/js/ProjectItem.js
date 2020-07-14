const gsap = window.gsap;

export default class ProjectItem {
  constructor(el, effect) {
    this.el = el;
    this.effect = effect.querySelector('feTurbulence');
    this.turbVal = { val: 0.000001 };
    this.el.addEventListener('click', this.transitionOut.bind(this));

    // requestAnimationFrame(() => this.render());
  }

  transitionOut(event) {
    event.preventDefault();
    gsap.to(this.turbVal, {
      val: 0.3,
      onUpdate: (val) => {
        console.log(val);
        this.effect.setAttribute('baseFrequency', this.turbVal.val);
      },
    });
  }

  // render() {
  //   // this.transitionOut();
  //   // requestAnimationFrame(() => this.render());
  // }
}
