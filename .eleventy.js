const componentsDir = `./src/_includes/components`;

const pluginNav = require('@11ty/eleventy-navigation');
const pluginRss = require('@11ty/eleventy-plugin-rss');

const Gallery = require(`${componentsDir}/Gallery.js`);
const List = require(`${componentsDir}/List.js`);

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginNav);
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addPassthroughCopy('./src/**/*.png');
  eleventyConfig.addPassthroughCopy('./src/**/*.gif');
  eleventyConfig.addPassthroughCopy('./src/**/*.jpg');

  // Gallery
  eleventyConfig.addNunjucksShortcode('gallery', Gallery);
  eleventyConfig.addPairedNunjucksShortcode('list', List);

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
