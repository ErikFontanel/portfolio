import slugify from "slugify";
import projects from "~/content/projects";
import "./src/intro";

const nav = document.createRange().createContextualFragment("<ol></ol>");
const $ = selector => document.querySelector(selector);

const renderNavItem = node => {
  const html = `
    <li><a href="#${slugify(node.title)}">${node.title}</a></li>
  `;

  return document.createRange().createContextualFragment(html);
};

if (projects !== undefined) {
  projects.forEach(project => {
    const navItem = renderNavItem(project);

    nav.querySelector("ol").appendChild(navItem);
  });

  $("#selected-work").appendChild(nav);
}
