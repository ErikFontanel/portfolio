const componentsDir = `./_includes/components`;

const pluginNav = require('@11ty/eleventy-navigation');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const pluginNetlifyRespImage = require('./src/js/eleventy-netlify-respimg');

const markdownIt = require('markdown-it');
const markdownItAttrs = require('markdown-it-attrs');
const markdownItLinkAttrs = require('markdown-it-link-attributes');
const markdownItAnchor = require('markdown-it-anchor');
const markdownItBlockEmbed = require('markdown-it-block-embed');
const markdownItImplicitFigures = require('markdown-it-implicit-figures');
const markdownItBlockEmbedLocalService = require('./src/js/markdown-it-local-embed');
const markdownItLazyImg = require('./src/js/markdown-it-lazy');
const markdownItContainer = require('markdown-it-container');

const Gallery = require('./src/js/Gallery.js');
const List = require(`${componentsDir}/List.js`);
const Canvas = require(`${componentsDir}/Canvas.js`);
const Button = require(`${componentsDir}/Button.js`);
const Label = require(`${componentsDir}/Label.js`);

const responsiveImagesConfig = {
  presets: [
    {
      default: {
        min_width: 320,
        max_width: 3320,
        fallback_max_width: 1280,
        steps: 5,
        sizes: '100vw',
        attributes: { class: 'img-full' },
      },
    },
    {
      full: {
        min_width: 320,
        max_width: 3320,
        fallback_max_width: 1280,
        steps: 5,
        sizes: '100vw',
        attributes: { class: 'img-full' },
      },
    },
    {
      thumb: {
        min_width: 320,
        max_width: 1660,
        fallback_max_width: 640,
        steps: 5,
        sizes: '(min-width: 64rem) 50vw, 100vw',
        attributes: { class: 'img-thumb' },
        fit: 'smartcrop',
      },
    },
  ],
};

module.exports = function (eleventyConfig) {
  eleventyConfig.dir = {
    input: 'content',
    includes: '../_includes',
    output: 'dist',
  };
  eleventyConfig.addPlugin(pluginNav);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginNetlifyRespImage, responsiveImagesConfig);

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

  eleventyConfig.addPassthroughCopy('content/work/**/*.mp4');

  eleventyConfig.addPassthroughCopy('content/work/matter/site');

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
      .use(markdownItContainer, 'section')
      .use(markdownItContainer, 'section-3col')
      .use(markdownItContainer, 'aside')
      .use(markdownItLinkAttrs, mdLinkAttrOptions)
      .use(markdownItAnchor)
      .use(markdownItLazyImg, responsiveImagesConfig)
      .use(markdownItImplicitFigures)
      .use(markdownItBlockEmbed, {
        containerClassName: 'block block-embed',
        filterUrl: (url, serviceName, videoID, options) => {
          if (!serviceName === 'youtube') {
            return url;
          }
          const ytOptions = {
            autoplay: 0,
            modestbranding: 1,
            controls: 0,
            disablekb: 1,
            enablejsapi: 0,
            nocookie: 1,
            iv_load_policy: 3,
            fs: 0,
            origin:
              process.env.NODE_ENV === 'production'
                ? 'https://erikgelderblom.com'
                : 'https://portfolio.test',
            playsinline: 1,
          };

          const queryparams = Object.keys(ytOptions)
            .map(
              (key) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(
                  ytOptions[key]
                )}`
            )
            .join('&');

          return url + '?' + queryparams;
        },
        services: {
          local: markdownItBlockEmbedLocalService,
        },
      })
  );

  // Layouts
  eleventyConfig.addLayoutAlias('base', 'layouts/base.njk');
  eleventyConfig.addLayoutAlias('home', 'layouts/home.njk');
  eleventyConfig.addLayoutAlias('page', 'layouts/page.njk');
  eleventyConfig.addLayoutAlias('single', 'layouts/single.njk');
  eleventyConfig.addLayoutAlias('projects', 'layouts/projects.njk');

  // Custom components
  eleventyConfig.addNunjucksShortcode('button', Button);
  eleventyConfig.addNunjucksShortcode('canvas', Canvas);
  eleventyConfig.addNunjucksShortcode('label', Label);
  eleventyConfig.addPairedNunjucksShortcode('list', List);

  eleventyConfig.addWatchTarget(componentsDir + '/');
  eleventyConfig.addWatchTarget('./src/js/eleventy-netlify-respimg.js');

  eleventyConfig.addNunjucksTag(
    'Gallery',
    (nunjucksEngine) =>
      new (function () {
        this.tags = ['gallery'];

        this.parse = (parser, nodes, lexer) => {
          const tok = parser.nextToken();
          const args = parser.parseSignature(null, true);
          parser.advanceAfterBlockEnd(tok.value);
          const body = parser.parseUntilBlocks('endgallery');

          parser.advanceAfterBlockEnd();

          return new nodes.CallExtensionAsync(this, 'run', args, [body]);
        };

        this.run = function (context, args, body, callback) {
          callback(null, Gallery(context, args, body, nunjucksEngine));
        };
      })()
  );

  // Filters
  eleventyConfig.addFilter('except', (array, item) => {
    return array.filter((i) => i !== item);
  });

  eleventyConfig.addFilter('taxonomy', (filePathStem) => {
    const path = filePathStem.startsWith('/') ? filePathStem.slice(1) : path;
    return path.split('/')[0];
  });

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
