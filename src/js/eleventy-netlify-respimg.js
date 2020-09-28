const sizeOf = require('image-size');
const path = require('path');

const getAttrs = (attrs) =>
  Object.keys(attrs).reduce((previous, current, idx) => {
    return previous + ` ${current}="${Object.values(attrs)[idx]}"`;
  }, []);

const getDimensions = (img) => {
  const { width, height } = sizeOf(img);
  if (width && height) return `width=${width} height=${height}`;
};

module.exports = {
  configFunction: (eleventyConfig, options = {}) => {
    options = {
      presets: {
        /**
         * This preset will generate five images 320 to 1600 pixels wide in the srcset and define sizes as "(min-width: 64rem) 32rem, 100vw". The fallback image defined in the src will have a width of 1280 pixels.
         */
        default: {
          min_width: 320,
          min_height: 1600,
          fallback_max_width: 1280,
          steps: 5,
          sizes: '(min-width: 64rem) 32rem, 100vw',
        },
      },
      ...options,
    };

    eleventyConfig.addShortcode('image', (preset, file, attributes) => {
      const img = path.resolve(`./${eleventyConfig.dir.input}/${file}`);

      const dimensions = img ? getDimensions(img) : '';

      return `<img src="${file}" ${dimensions} ${attributes}>`;
    });
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
