module.exports = {
  homepage: '/',
  installOptions: {
    namedExports: ['lodash-es/debounce'],
    rollup: {
      plugins: [require('rollup-plugin-node-polyfills')()],
    },
  },
  scripts: {
    'run:11ty': 'eleventy --quiet',
    'run:11ty::watch': '$1 --watch',
  },
  buildOptions: {
    clean: true,
  },
  mount: {
    dist: '/',
    src: '/static',
  },
  plugins: [
    ['@snowpack/plugin-sass', { native: true }],
    ['@snowpack/plugin-postcss', { input: ['.css'] }],
  ],
  devOptions: {
    port: 8080,
    open: 'none',
    out: 'dist',
    secure: true,
    bundle: true,
  },
};
