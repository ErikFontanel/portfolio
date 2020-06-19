const isDev = () => process.env.NODE_ENV !== 'production';

module.exports = {
  plugins: [
    require('postcss-preset-env')({
      autoprefixer: !isDev()
        ? {
            grid: true,
          }
        : false,
    }),
    ,
    require('postcss-custom-media'),
  ],
};
