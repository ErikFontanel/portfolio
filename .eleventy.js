const componentsDir = `./_includes/components`;

const pluginNav = require('@11ty/eleventy-navigation');
const pluginRss = require('@11ty/eleventy-plugin-rss');

const markdownIt = require('markdown-it');
const markdownItAttrs = require('markdown-it-attrs');
const markdownItLinkAttrs = require('markdown-it-link-attributes');

const Gallery = require(`${componentsDir}/Gallery.js`);
const List = require(`${componentsDir}/List.js`);
const Button = require(`${componentsDir}/Button.js`);
const Label = require(`${componentsDir}/Label.js`);

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginNav);
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.setTemplateFormats([
    // Templates:
    'html',
    'njk',
    'md',
    '11ty.js',
    // Static Assets:
    'css',
    'svg',
    'png',
    'jpg',
    'jpeg',
  ]);

  eleventyConfig.addPassthroughCopy('static');

  const mdOptions = {
    html: true,
    breaks: true,
    linkify: true,
    code: false,
  };

  const mdLinkAttrOptions = {
    pattern: /^(http|https):/,
    attrs: {
      target: '_blank',
      rel: 'noopener noreferrer',
    },
  };

  eleventyConfig.setLibrary(
    'md',
    markdownIt(mdOptions)
      .use(markdownItAttrs)
      .use(markdownItLinkAttrs, mdLinkAttrOptions)
  );

  // Gallery
  eleventyConfig.addNunjucksShortcode('gallery', Gallery);
  eleventyConfig.addNunjucksShortcode('button', Button);
  eleventyConfig.addNunjucksShortcode('label', Label);
  eleventyConfig.addPairedNunjucksShortcode('list', List);

  eleventyConfig.addWatchTarget(componentsDir + '/');

  // You can return your Config object (optional).
  return {
    dir: {
      input: 'content',
      includes: '../_includes',
      output: 'dist',
    },
    markdownTemplateEngine: 'njk',
    passthroughFileCopy: true,
  };
};
