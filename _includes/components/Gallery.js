module.exports = ({ images, caption = '', css = 'grid:full' }) => {
  return `
<div class="block gallery ${css}">${
    caption && `<figcaption>${caption}</figcaption>`
  } ${
    images.length >= 1 &&
    images.reduce(
      (prev, image) => prev + `<img src="${image}" loading="lazy">`,
      ''
    )
  }
</div>`;
};
