const respimg = require('./eleventy-netlify-respimg');

module.exports = function (md, config) {
  const defaultRender =
    md.renderer.rules.image ||
    function (tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
    };

  md.renderer.rules.image = function (tokens, idx, options, env, self) {
    const token = tokens[idx];

    if (token.content !== '') {
      const loading = token.attrIndex('loading');
      const img = env.page.url + token.content;
      const { src, srcset, sizes } = respimg.getSrcset(img, 'default', config);

      const dimensions = respimg.getDimensions(img);

      if (srcset) {
        token.attrPush(['src', src]);
        token.attrPush(['srcset', srcset]);
        token.attrPush(['sizes', sizes]);
      }

      if (dimensions) {
        token.attrPush(['width', dimensions.width]);
        token.attrPush(['height', dimensions.height]);
      }

      if (loading < 0) {
        token.attrPush(['loading', 'lazy']);
      }
    }

    // pass token to default renderer.
    return defaultRender(tokens, idx, options, env, self);
  };
};
