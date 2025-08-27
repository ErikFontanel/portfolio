import pluginRss from '@11ty/eleventy-plugin-rss';
import EleventyVitePlugin from '@11ty/eleventy-plugin-vite';
import rollupPluginCritical from 'rollup-plugin-critical';
import rollupPluginImages from './src/assets/js/rollup-plugin-images.js';

import pluginNetlifyRespImage from './src/assets/js/eleventy-netlify-respimg.js';

import markdownIt from 'markdown-it';
import markdownItAttrs from 'markdown-it-attrs';
import markdownItLinkAttrs from 'markdown-it-link-attributes';
import markdownItAnchor from 'markdown-it-anchor';
import markdownItBlockEmbed from 'markdown-it-block-embed';
import markdownItImplicitFigures from 'markdown-it-implicit-figures';
import markdownItContainer from 'markdown-it-container';
import markdownItBlockEmbedLocalService from './src/assets/js/markdown-it-local-embed.js';
import markdownItLazyImg from './src/assets/js/markdown-it-lazy.js';

const componentsDir = './src/_includes/components';

import Gallery from './src/assets/js/Gallery.js';
import List from './src/_includes/components/List.js';
import Canvas from './src/_includes/components/Canvas.js';
import Button from './src/_includes/components/Button.js';
import Label from './src/_includes/components/Label.js';

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
    {
      carousel: {
        min_width: 320,
        max_width: 1170,
        fallback_max_width: 640,
        steps: 3,
        sizes: '(min-width: 64rem) 20vw, 85vw',
        attributes: { class: 'img-carousel' },
        fit: 'smartcrop',
      },
    },
  ],
};

export default function (eleventyConfig) {
  eleventyConfig.setServerPassthroughCopyBehavior('copy');
  eleventyConfig.addPassthroughCopy({ public: 'public' });

  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginNetlifyRespImage, responsiveImagesConfig);

  eleventyConfig.addPlugin(EleventyVitePlugin, {
    tempFolderName: '.11ty-vite', // Default name of the temp folder

    serverOptions: {
      module: '@11ty/eleventy-dev-server',
      domDiff: false,
      allowedHosts: ['localhost', 'portfolio.test'],
      watch: ['dist/**/*.css'],
    },

    // Vite options (equal to vite.config.js inside project root)
    viteOptions: {
      publicDir: 'public',
      clearScreen: false,
      server: {
        mode: 'development',
        middlewareMode: true,
      },
      appType: 'custom',
      assetsInclude: ['**/*.xml', '**/*.txt'],
      css: {
        devSourcemap: process.env.NODE_ENV === 'production' ? false : true,
      },
      build: {
        mode:
          process.env.NODE_ENV === 'production' ? 'production' : 'development',
        sourcemap: 'true',
        manifest: true,
        // This puts CSS and JS in subfolders – remove if you want all of it to be in /assets instead
        rollupOptions: {
          output: {
            assetFileNames: 'assets/css/app.[hash].css',
            chunkFileNames: 'assets/js/[name].[hash].js',
            entryFileNames: 'assets/js/[name].[hash].js',
            assetFileNames: (assetInfo) => {
              let extType = assetInfo.name.split('.').at(1);
              if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
                extType = 'img';
              } else if (/mp4|webm|ogg|mp3|wav|flac|aac/i.test(extType)) {
                extType = 'media';
              } else if (/woff2?|ttf|otf|eot/i.test(extType)) {
                extType = 'fonts';
              }
              return `assets/${extType}/[name][extname]`;
            },
          },
          plugins: [
            rollupPluginCritical({
              criticalUrl: './dist/',
              criticalBase: './dist/',
              criticalPages: [
                { uri: 'index.html', template: 'index' },
                // { uri: 'about/index.html', template: 'about/index' },
                // { uri: '404.html', template: '404' },
              ],
              criticalConfig: {
                inlineImages: false,
                maxImageFileSize: 10240 * 1024, // 1024kb
                dimensions: [
                  {
                    height: 900,
                    width: 375,
                  },
                  {
                    height: 720,
                    width: 1280,
                  },
                  {
                    height: 1080,
                    width: 1920,
                  },
                ],
              },
            }),
            rollupPluginImages(),
          ],
        },
      },
    },
  });

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
          if (!serviceName === 'youtube' || serviceName === 'vimeo') {
            return url;
          }

          if (serviceName === 'vimeo') {
            return `<iframe src="https://player.vimeo.com/video/${videoID}?color=313fff&byline=0&portrait=0" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
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

  eleventyConfig.addPassthroughCopy('src/assets/css');
  eleventyConfig.addPassthroughCopy('src/assets/js');
  eleventyConfig.addPassthroughCopy({ 'src/fonts': 'public/fonts' });
  eleventyConfig.addPassthroughCopy('src/work/**/*.mp4');
  eleventyConfig.addPassthroughCopy('src/work/**/*.png');
  eleventyConfig.addPassthroughCopy('src/work/**/*.jpg');
  eleventyConfig.addPassthroughCopy('src/work/**/*.jpeg');

  // You can return your Config object (optional).
  return {
    templateFormats: [
      // Templates:
      'njk',
      'md',
      '11ty.js',
      // Static Assets:
      'css',
      'svg',
      'png',
      'jpg',
      'jpeg',
    ],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    passthroughFileCopy: true,
    dir: {
      input: 'src',
      // better not use "public" as the name of the output folder (see above...)
      output: 'dist',
      includes: '_includes',
      layouts: 'layouts',
      data: '_data',
    },
  };
}
