// const sizeOf = require('image-size');
module.exports = ({ path, alt, css }) => {
  const attrs = (attrs) =>
    Object.keys(attrs).reduce((previous, current, idx) => {
      return previous + ` ${current}="${Object.values(attrs)[idx]}"`;
    }, []);

  return `<img src=${path} loading="lazy" ${attrs({
    ...(alt && { alt: alt }),
    ...(css && { class: css }),
  })} />`;
  // const { width, height } = sizeOf('./content' + path);
};
