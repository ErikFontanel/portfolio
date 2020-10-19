module.exports = {
  homepage: '/',
  installOptions: {
    namedExports: ['lodash-es/debounce'],
    rollup: {
      plugins: [require('rollup-plugin-node-polyfills')()],
    },
  },
  buildOptions: {
    clean: true,
    out: 'dist',
    sourceMaps: true,
  },
  mount: {
    dist: '/',
    src: '/static',
  },
  scripts: {
    'run:11ty': 'eleventy --quiet',
    'run:11ty::watch': '$1 --watch',
  },
  plugins: [
    [
      '@snowpack/plugin-sass',
      {
        native: true,
        compilerOptions: { update: true },
      },
    ],
    ['@snowpack/plugin-postcss', { input: ['.css'] }],
  ],
  devOptions: {
    port: 8080,
    open: 'none',
    secure: true,
    bundle: true,
  },
};
