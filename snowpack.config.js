module.exports = {
  homepage: '/',
  mode: process.env.NODE_ENV,
  packageOptions: {
    namedExports: ['lodash'],
    rollup: {
      plugins: [require('rollup-plugin-node-polyfills')()],
    },
  },
  buildOptions: {
    clean: true,
    out: 'dist',
  },
  mount: {
    dist: { url: '/', static: true },
    src: '/static',
  },
  plugins: [
    [
      '@snowpack/plugin-run-script',
      { cmd: 'eleventy --quiet', watch: '$1 --watch' },
    ],
    [
      '@snowpack/plugin-sass',
      { native: process.env.NODE_ENV !== 'production' },
    ],
    ['@snowpack/plugin-postcss', { input: ['.css'] }],
  ],
  devOptions: {
    port: 8080,
    open: 'none',
    secure: process.env.NODE_ENV !== 'production',
    hmrDelay: 300,
    hostname: 'portfolio.test',
  },
};
