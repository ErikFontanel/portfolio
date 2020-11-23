if (process.env.NODE_ENV === 'production') {
  module.exports = {
    map: false,
    plugins: [
      require('postcss-media-minmax'),
      require('postcss-custom-media'),
      require('postcss-preset-env'),
      require('cssnano')({
        preset: 'default',
      }),
    ],
  };
} else {
  module.exports = {
    map: false,
    plugins: [require('postcss-media-minmax'), require('postcss-custom-media')],
  };
}
