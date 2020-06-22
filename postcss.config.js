const isDev = () => process.env.NODE_ENV !== 'production';

module.exports = {
  plugins: [
    !isDev()
      ? require('postcss-preset-env')({
          autoprefixer: !isDev()
            ? {
                grid: true,
              }
            : false,
        })
      : false,
    require('postcss-media-minmax'),
    require('postcss-custom-media'),
  ],
};
