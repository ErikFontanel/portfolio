const sizeOf = require('image-size');
const path = require('path');

module.exports = function (md) {
  const defaultRender =
    md.renderer.rules.image ||
    function (tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
    };

  md.renderer.rules.image = function (tokens, idx, options, env, self) {
    const token = tokens[idx];

    if (token.content !== '') {
      const file = path.resolve(
        __dirname,
        `./../../content/${env.page.url}/${token.content}`
      );
      const { width, height } = file ? sizeOf(file) : false;
      const loading = token.attrIndex('loading');

      if (loading < 0) {
        token.attrPush(['loading', 'lazy']); // add new attribute
      }

      if (width) {
        token.attrPush(['width', width]);
      }

      if (height) {
        token.attrPush(['height', height]);
      }
    }

    // pass token to default renderer.
    return defaultRender(tokens, idx, options, env, self);
  };
};
