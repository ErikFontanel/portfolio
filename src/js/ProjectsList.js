import ProjectItem from './ProjectItem.js';

export default class ProjectsList {
  constructor(el) {
    this.el = el;
    this.projects = el.querySelectorAll('.project-item');
    this.effect = document.querySelector('#turbulenceFilter');
    this.init();
  }

  init() {
    [...this.projects].map((project) => {
      new ProjectItem(project, this.effect);
    });
  }
}
