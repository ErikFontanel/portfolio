const sizeOf = require('image-size');
const path = require('path');
const fs = require('fs');
let config;

const getAttrs = (attrs) =>
  Object.keys(attrs)
    .filter((key) => !key.startsWith('__'))
    .reduce((previous, current, idx) => {
      return previous + ` ${current}="${Object.values(attrs)[idx]}"`;
    }, []);

const getDimensions = (img) => {
  const { width, height } = sizeOf(img);
  if (width && height) return `width=${width} height=${height}`;
};

const getSrcSet = (url, preset) => {
  const options = config.presets.find((p) => Object.keys(p)[0] === preset);

  let {
    min_width,
    max_width,
    fallback_max_width,
    steps,
    sizes,
    resize,
  } = options[preset];
  let srcset = '';

  resize = resize || 'fit';
  sizes = sizes || '100vw';
  const step_width = (max_width - min_width) / (steps - 1);
  const baseUrl = `${url}?nf_resize=${resize}`;

  for (let i = 1; i < steps; i++) {
    let width = min_width + (i - 1) * step_width;
    srcset += `${baseUrl}&w=${width} ${width}w,`;
  }

  return `src="${baseUrl}&w=${fallback_max_width}" srcset="${srcset}" sizes="${sizes}"`;
};

function image(context, file, preset, preload) {
  // const { dir } = path.parse(context.ctx.page.inputPath);
  // const img = path.resolve(`${dir}/${file}`);
  // const fileExists = fs.existsSync(`./${img}`);

  // if (!fileExists) {
  //   return '';
  // }
  const img = `${process.env.URL}/${context.ctx.page.url}/${file}`;
  const dimensions = getDimensions(img);
  const srcset = getSrcSet(img, preset);
  // attributes = getAttrs(attributes);
  return `<img ${srcset} ${dimensions} preload="${preload}">`;
}

module.exports = {
  configFunction: (eleventyConfig, options = {}) => {
    config = {
      presets: [
        /**
         * This preset will generate five images 320 to 1600 pixels wide in the srcset and define sizes as "(min-width: 64rem) 32rem, 100vw". The fallback image defined in the src will have a width of 1280 pixels.
         */
        {
          default: {
            min_width: 320,
            max_width: 3320,
            fallback_max_width: 1280,
            steps: 5,
            sizes: '(min-width: 64rem) 32rem, 100vw',
            resize: 'fit',
          },
        },
      ],
      ...options,
    };

    eleventyConfig.addNunjucksTag('image', (nunjucksEngine) => {
      return new (function () {
        this.tags = ['image'];
        this.parse = function (parser, nodes, lexer) {
          const tok = parser.nextToken();

          const args = parser.parseSignature(null, true);
          parser.advanceAfterBlockEnd(tok.value);

          return new nodes.CallExtensionAsync(this, 'run', args);
        };

        this.run = function (
          context,
          file,
          preset = 'default',
          preload = 'preload',
          callback
        ) {
          if (typeof preset === 'function') {
            callback = preset;
            preset = 'default';
          }

          if (typeof preload === 'function') {
            callback = preload;
            preload = 'lazy';
          }

          let ret = new nunjucksEngine.runtime.SafeString(
            image(context, file, preset, preload)
          );
          callback(null, ret);
        };
      })();
    });
  },
};
