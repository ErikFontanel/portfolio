const sizeOf = require('image-size');
const path = require('path');

const attrs = (attrs) =>
  Object.keys(attrs).reduce((previous, current, idx) => {
    return previous + ` ${current}="${Object.values(attrs)[idx]}"`;
  }, []);

module.exports = ({ url, alt, css, width, height, sizes, lazy, context }) => {
  // const file = path.resolve(__dirname, `../../content/${context}/${url}`);

  // const { width, height } = file ? sizeOf(file) : false;

  const attributes = attrs({
    ...(alt && { alt: alt }),
    ...(css && { class: css }),
    ...{ loading: lazy ?? 'lazy' },
    ...(width && { width: width }),
    ...(height && { height: height }),
  });

  const scales = [2, 0.5];

  const srcset = scales.map((size) => {
    if (width) {
      const w = Math.floor(width / size);
      const h = Math.floor(height / size);

      if (w === Infinity || h === Infinity) return false;

      return `${url}?nf_resize=smartcrop&w=${w}&h=${h} ${w}w`;
    }

    sizes = sizes ? sizes : '(min-width: 64rem) 50vw, 100vw';
  });

  return `<img src="${url}" sizes="${sizes ? sizes : '100vw'}" srcset="${
    srcset ? srcset.join(', ') : url
  }" ${attributes} />`;
};
