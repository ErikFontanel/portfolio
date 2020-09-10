module.exports = function (md) {
  const defaultRender =
    md.renderer.rules.image ||
    function (tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
    };

  md.renderer.rules.image = function (tokens, idx, options, env, self) {
    const token = tokens[idx];

    const loading = token.attrIndex('loading');

    if (loading < 0) {
      token.attrPush(['loading', 'lazy']); // add new attribute
    }

    // pass token to default renderer.
    return defaultRender(tokens, idx, options, env, self);
  };
};
