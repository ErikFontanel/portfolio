const sizeOf = require('image-size');
const path = require('path');

const attrs = (attrs) =>
  Object.keys(attrs).reduce((previous, current, idx) => {
    return previous + ` ${current}="${Object.values(attrs)[idx]}"`;
  }, []);

module.exports = ({ url, alt, css, context }) => {
  const { width, height } = sizeOf(
    `${path.resolve(__dirname, `../../content/${context}`)}/${url}`
  );

  return `<img src=${url} loading="lazy" ${attrs({
    ...(alt && { alt: alt }),
    ...(css && { class: css }),
    ...(width && { width: width }),
    ...(height && { height: height }),
  })} />`;
};
