const sizeOf = require('image-size');
const path = require('path');
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

    eleventyConfig.addShortcode(
      'image',
      (preset = 'default', file, attributes) => {
        const img = path.resolve(`./${eleventyConfig.dir.input}/${file}`);

        const dimensions = img ? getDimensions(img) : '';
        const srcset = getSrcSet(file, preset);
        attributes = getAttrs(attributes);

        return `<img ${srcset} ${dimensions} ${attributes}>`;
      }
    );
  },
};

// module.exports = ({
//   url,
//   alt,
//   css,
//   imgwidth,
//   imgheight,
//   sizes,
//   lazy,
//   context,
// }) => {
//   const file = path.resolve(__dirname, `../../content/${context}/${url}`);

//   const { width, height } = file ? sizeOf(file) : false;

//   const attributes = getAattrs({
//     ...(alt && { alt: alt }),
//     ...(css && { class: css }),
//     ...{ loading: lazy ?? 'lazy' },
//     ...(width && { width: width }),
//     ...(height && { height: height }),
//   });

//   const scales = [2, 0.5];

//   const srcset = scales.map((size) => {
//     if (width) {
//       const w = Math.floor(parseInt(width, 10) / size);
//       const h = Math.floor(parseInt(height, 10) / size);

//       if (!w === Infinity || h === Infinity) {
//         return `${url}?nf_resize=smartcrop&w=${w}&h=${h} ${w}w`;
//       }
//     }

//     sizes = sizes ? sizes : '(min-width: 64rem) 50vw, 100vw';
//   });

//   return `<img src="${url}" sizes="${sizes ? sizes : '100vw'}" srcset="${
//     srcset ? srcset.join(', ') : url
//   }" ${attributes} />`;
// };
