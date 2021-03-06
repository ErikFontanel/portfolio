module.exports = {
  homepage: '/',
  installOptions: {
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
    ['@snowpack/plugin-sass'],
    ['@snowpack/plugin-postcss', { input: ['.css'] }],
    ['@snowpack/plugin-optimize'],
  ],
  devOptions: {
    port: 8080,
    open: 'none',
    secure: true,
    hmrDelay: 300,
    hostname: 'portfolio.test',
  },
};
