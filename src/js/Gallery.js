// const sizeOf = require('image-size');
// const path = require('path');

function imageSize(inputPath, image) {
  const { dir } = path.parse(inputPath);
  const { width, height } = sizeOf(`${dir}/${image}`);

  let sizes;

  if (width) {
    sizes = `width=${width}`;
  }
  if (height) {
    sizes += ` height=${height}`;
  }
  return sizes;
}

module.exports = (context, args, body, nunjucksEngine) => {
  const { caption, css } = {
    caption: '',
    css: 'full-width',
    ...args,
  };

  return new nunjucksEngine.runtime.SafeString(
    `<div class="block gallery ${css}">${
      caption && `<figcaption>${caption}</figcaption>`
    } ${body()}</div>`
  );
};
