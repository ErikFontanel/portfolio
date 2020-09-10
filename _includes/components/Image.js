const sizeOf = require('image-size');
const path = require('path');

const attrs = (attrs) =>
  Object.keys(attrs).reduce((previous, current, idx) => {
    return previous + ` ${current}="${Object.values(attrs)[idx]}"`;
  }, []);

module.exports = ({ url, alt, css, lazy, context }) => {
  const file = path.resolve(__dirname, `../../content/${context}/${url}`);

  const { width, height } = file ? sizeOf(file) : false;

  const attributes = attrs({
    ...(alt && { alt: alt }),
    ...(css && { class: css }),
    ...{ loading: lazy ?? 'lazy' },
    ...(width && { width: width }),
    ...(height && { height: height }),
  });

  return `<img src="${url}" ${attributes} />`;
};
