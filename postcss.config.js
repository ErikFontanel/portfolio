const isProduction = () => process.env.NODE_ENV === 'production';

module.exports = {
  plugins: [
    require('postcss-media-minmax'),
    require('postcss-custom-media'),
    isProduction()
      ? require('postcss-preset-env')({
          autoprefixer: isProduction()
            ? {
                grid: true,
              }
            : false,
        })
      : false,
    isProduction
      ? require('cssnano')({
          preset: 'default',
        })
      : false,
  ],
};
