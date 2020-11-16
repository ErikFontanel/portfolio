const sizeOf = require('image-size');
const url = require('url');
const http = require('https');
const path = require('path');
const fs = require('fs');

let config;

const getDimensions = (img) => {
  if (!process.env.NETLIFY) {
    if (!fs.existsSync(img)) return { width: '100%', height: 'auto' };

    const { width, height } = sizeOf(img);
    return { width: width, height: height };
  }

  const imgurl = url.parse(`${process.env.URL}${img}`);

  const req = http.get(imgurl, (response) => {
    const chunks = [];
    response
      .on('data', (chunk) => {
        chunks.push(chunk);
      })
      .on('end', () => {
        if (chunks.length) {
          const buffer = Buffer.concat(chunks);

          if (buffer !== undefined && buffer.length) {
            const { width, height } = sizeOf(buffer);
            if (width && height) return { width: width, height: height };
          }
        }
      })
      .on('error', () => {
        return { width: '100%', height: 'auto' };
      });
  });

  req.on('error', (e) => {
    return { width: '100%', height: 'auto' };
  });

  return { width: '100%', height: 'auto' };
};

const getSrcset = (url, preset = 'default', args) => {
  if (args) config = args;
  preset = preset || 'default';

  let options =
    config.presets.find((p) => Object.keys(p)[0] === preset) ||
    config.presets.find((p) => {
      if (Object.keys(p)[0] === 'default') {
        return p.default;
      }
    });

  options = options[preset];

  let {
    min_width,
    max_width,
    fallback_max_width,
    steps,
    sizes,
    resize,
  } = options;

  resize = resize || 'fit';
  sizes = sizes || '100vw';

  const step_width = (max_width - min_width) / (steps - 1);
  const baseUrl = `${url}?nf_resize=${resize}`;
  let srcset = '';

  for (let i = 1; i < steps; i++) {
    let width = min_width + (i - 1) * step_width;
    srcset += `${baseUrl}&w=${width} ${width}w,`;
  }

  const src = `${baseUrl}&w=${fallback_max_width}`;

  return {
    src: src,
    srcset: srcset,
    sizes: sizes,
  };
};

function image(context, file, cssClasses, preset, loading = 'lazy', alt) {
  let dimensions = { width: '100%', height: 'auto' };
  let width = '100%';
  let height = 'auto';

  const imgUrl = file.startsWith('/') ? file : `${context.ctx.page.url}${file}`;

  // Can't resolve files on disk when using Netlify LFS
  if (!process.env.NETLIFY) {
    const { dir } = path.parse(context.ctx.page.inputPath);
    const imgFile = path.resolve(`${dir}/${file}`);
    dimensions = getDimensions(imgFile, preset);
  } else {
    // if file starts with / it's a valid path from site root, otherwise add the page path so it can be downloaded from Netlify LFS.
    dimensions = getDimensions(imgUrl, preset);
  }

  const { src, srcset, sizes } = getSrcset(imgUrl, preset);
  alt = alt ? `alt="${alt}"` : '';

  if (!dimensions) {
    width = '100%';
    height = 'auto';
  }

  return `<img src="${src}" srcset="${srcset}" sizes="${sizes}" width="${width}" height="${height}" class="content-image ${cssClasses}" loading="${loading}" ${alt}>`;
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
          cssClasses = '',
          preset = 'default',
          loading = 'lazy',
          alt = '',
          callback
        ) {
          if (typeof preset === 'function') {
            callback = preset;
            preset = 'default';
          }

          if (typeof cssClasses === 'function') {
            callback = cssClasses;
            cssClasses = '';
          }

          if (typeof loading === 'function') {
            callback = loading;
            loading = 'lazy';
          }

          if (typeof alt === 'function') {
            callback = alt;
            alt = '';
          }

          let ret = new nunjucksEngine.runtime.SafeString(
            image(context, file, cssClasses, preset, loading, alt)
          );

          callback(null, ret);
        };
      })();
    });
  },
};

module.exports.getDimensions = getDimensions;
module.exports.getSrcset = getSrcset;
