const componentsDir = `./src/_includes/components`;

const markdownIt = require('markdown-it');
const pluginNav = require('@11ty/eleventy-navigation');
const pluginRss = require('@11ty/eleventy-plugin-rss');

const Gallery = require(`${componentsDir}/Gallery.js`);
const List = require(`${componentsDir}/List.js`);
const Button = require(`${componentsDir}/Button.js`);

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginNav);
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addPassthroughCopy('./src/**/*.png');
  eleventyConfig.addPassthroughCopy('./src/**/*.gif');
  eleventyConfig.addPassthroughCopy('./src/**/*.jpg');

  let mdOptions = {
    html: true,
    breaks: true,
    linkify: true,
    code: false
  };
  eleventyConfig.setLibrary('md', markdownIt(mdOptions));

  // Gallery
  eleventyConfig.addNunjucksShortcode('gallery', Gallery);
  eleventyConfig.addNunjucksShortcode('button', Button);
  eleventyConfig.addPairedNunjucksShortcode('list', List);

  eleventyConfig.addWatchTarget('./src/_includes/components/');

  // You can return your Config object (optional).
  return {
    dir: {
      input: 'src',
      output: 'dist'
    },
    templateFormats: ['html', 'md', 'njk', '11ty.js'],
    markdownTemplateEngine: 'njk',
    passthroughFileCopy: true
  };
};
