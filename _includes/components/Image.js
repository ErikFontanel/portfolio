const sizeOf = require('image-size');
module.exports = ({ path, alt, css }) => {
  const { width, height } = sizeOf('./content' + path);
  return `<img src="${path}" alt="${alt}" class="${css}" loading="lazy" width="${width}" height="${height}"/>`;
};
