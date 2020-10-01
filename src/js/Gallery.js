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
