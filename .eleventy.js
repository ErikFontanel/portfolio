const pluginNav = require('@11ty/eleventy-navigation');
const pluginRss = require('@11ty/eleventy-plugin-rss');

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginNav);
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addPassthroughCopy('./src/**/*.png');
  eleventyConfig.addPassthroughCopy('./src/**/*.gif');
  eleventyConfig.addPassthroughCopy('./src/**/*.jpg');

  // You can return your Config object (optional).
  return {
    dir: {
      input: 'src',
      output: 'dist'
    },
    templateFormats: ['html', 'md', 'njk', '11ty.js'],
    passthroughFileCopy: true
  };
};
