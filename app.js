import slugify from 'slugify';
import projects from '~/content/projects';
import './src/intro';

const projectsContainer = document.createDocumentFragment();
const nav = document.createRange().createContextualFragment('<ol></ol>');
const $ = selector => document.querySelector(selector);

const getGallery = urls => {
  if (urls.length > 0) {
    const htmlstring = urls.map(url => {
      return `<img src="/${url}"/>`;
    });
    return htmlstring.join('');
  }
};

const renderProject = node => {
  const {
    title,
    description,
    images,
    collaboration,
    services,
    date,
    url
  } = node;

  const id = slugify(title);
  const web = url ? `<br><a href="${url}">Visit</a>` : '';
  const year = date ? `Year: ${date}<br>` : '';
  const collab = collaboration ? `With: ${collaboration}<br>` : '';
  const service = services ? `Services: ${services.join(', ')}<br>` : '';

  const gallery = getGallery(images);

  const html = `
  <article id="${id}" class="project">
    <div class="project-info">
      <h1 class="project-title listheader">${title}</h1>
      <p>${description}</p>
      <p class="project-meta">
      ${service}
      ${collab}
      ${year}
      ${web}
      </p>
    </div>

    <div class="project-gallery">
      ${gallery}
    </div>
  </article>
  `;

  return document.createRange().createContextualFragment(html);
};

const renderNavItem = node => {
  const html = `
    <li><a href="#${slugify(node.title)}">${node.title}</a></li>
  `;

  return document.createRange().createContextualFragment(html);
};

if (projects !== undefined) {
  projects.forEach(project => {
    const node = renderProject(project);
    const navItem = renderNavItem(project);

    nav.querySelector('ol').appendChild(navItem);
    projectsContainer.appendChild(node);
  });

  $('#selected-work').appendChild(nav);
  $('.projects').appendChild(projectsContainer);
}
