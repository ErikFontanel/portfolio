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
  plugins: [
    [
      '@snowpack/plugin-sass',
      {
        native: true,
        compilerOptions: {
          sourceMap: true,
          embedSourceMap: true,
          update: true,
        },
      },
    ],
    ['@snowpack/plugin-postcss', { input: ['.css'] }],
    [
      '@snowpack/plugin-run-script',
      { cmd: 'eleventy', watch: '$1 --watch --quiet' },
    ],
  ],
  devOptions: {
    port: 8080,
    open: 'none',
    secure: true,
    bundle: true,
  },
};
