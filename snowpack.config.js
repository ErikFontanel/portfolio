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
    src: '/public',
  },
  plugins: [
    [
      '@snowpack/plugin-run-script',
      { cmd: 'sass src/scss:src/scss', watch: '$1 --watch' },
    ],
    [
      '@snowpack/plugin-run-script',
      { cmd: 'postcss src/scss/**/*.css -d src/css', watch: '$1 --watch' },
    ],
    [
      '@snowpack/plugin-build-script',
      {
        cmd: 'postcss',
        input: ['src/scss/*.css'],
        output: ['dist/public/css/'],
        watch: '$1 --watch',
      },
    ],
  ],
  devOptions: {
    port: 8080,
    open: 'none',
    out: 'dist',
    secure: true,
    bundle: false,
  },
};
