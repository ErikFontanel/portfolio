module.exports = {
  syntax: 'postcss-scss',
  plugins: [
    require('@csstools/postcss-sass')({
      includePaths: ['./node_modules'],
    }),
    require('postcss-preset-env')({
      stage: 1,
      autoprefixer: {
        grid: true,
      },
    }),
  ],
};
