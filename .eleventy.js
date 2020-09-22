const componentsDir = `./_includes/components`;

const pluginNav = require('@11ty/eleventy-navigation');
const pluginRss = require('@11ty/eleventy-plugin-rss');
// const pluginCloudinaryImage = require('eleventy-plugin-respimg');

const markdownIt = require('markdown-it');
const markdownItAttrs = require('markdown-it-attrs');
const markdownItLinkAttrs = require('markdown-it-link-attributes');
const markdownItAnchor = require('markdown-it-anchor');
const markdownItImsize = require('markdown-it-imsize');
const markdownItBlockEmbed = require('markdown-it-block-embed');
const markdownItImplicitFigures = require('markdown-it-implicit-figures');
const markdownItBlockEmbedLocalService = require('./src/js/markdown-it-local-embed');
const markdownItLazyImg = require('./src/js/markdown-it-lazy');

const Image = require(`${componentsDir}/Image.js`);
const Gallery = require('./src/js/Gallery.js');
const List = require(`${componentsDir}/List.js`);
const Button = require(`${componentsDir}/Button.js`);
const Label = require(`${componentsDir}/Label.js`);

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginNav);
  eleventyConfig.addPlugin(pluginRss);
  // eleventyConfig.addPlugin(pluginCloudinaryImage);

  eleventyConfig.cloudinaryCloudName = 'dcmhhju2e';
  eleventyConfig.srcsetWidths = [320, 640, 960, 1280, 1600, 1920, 2240, 2560];
  eleventyConfig.fallbackWidth = 640;

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
      .use(markdownItImsize, { autofill: true })
      .use(markdownItAnchor)
      // .use(markdownItLazyImg)
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
  eleventyConfig.addLayoutAlias('single', 'layouts/single.njk');
  eleventyConfig.addLayoutAlias('projects', 'layouts/projects.njk');

  // Custom components
  eleventyConfig.addNunjucksTag('image', function (nunjucksEngine) {
    return new (function () {
      this.tags = ['image'];
      this.parse = (parser, nodes, lexer) => {
        const tok = parser.nextToken();
        const args = parser.parseSignature(null, true);
        parser.advanceAfterBlockEnd(tok.value);
        return new nodes.CallExtensionAsync(this, 'run', args);
      };

      this.run = (context, args, callback) => {
        let ret = new nunjucksEngine.runtime.SafeString(
          Image({
            ...args,
            ...{ context: context.ctx.page.url },
          })
        );
        callback(null, ret);
      };
    })();
  });

  eleventyConfig.addNunjucksShortcode('button', Button);
  eleventyConfig.addNunjucksShortcode('label', Label);
  eleventyConfig.addPairedNunjucksShortcode('list', List);

  eleventyConfig.addWatchTarget(componentsDir + '/');

  eleventyConfig.addNunjucksTag(
    'Gallery',
    (nunjucksEngine) =>
      new (function () {
        this.tags = ['gallery'];

        this.parse = (parser, nodes, lexer) => {
          const tok = parser.nextToken();
          const args = parser.parseSignature(null, true);
          parser.advanceAfterBlockEnd(tok.value);

          return new nodes.CallExtensionAsync(this, 'run', args);
        };

        this.run = function (context, args, callback) {
          callback(null, Gallery(context, args, nunjucksEngine));
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
