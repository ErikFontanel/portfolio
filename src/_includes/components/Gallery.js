module.exports = ({ images, caption = '', css = 'full-width' }) => {
  return `
<div class="block gallery ${css}">${caption &&
    `<figcaption>${caption}</figcaption>`} ${images.length >= 1 &&
    images.reduce((prev, image) => prev + `<img src="${image}">`, '')}
</div>`;
};
