module.exports = {
  homepage: '/',
  installOptions: {
    rollup: {
      plugins: [require('rollup-plugin-node-polyfills')()],
    },
  },
  scripts: {
    // 'run:sass': 'sass src/scss:src/scss --no-source-map',
    // 'run:sass::watch': '$1 --watch',
    // 'run:tpostcss': 'postcss src/scss/**/*.css',
    // 'run:tpostcss::watch': 'postcss src/scss/**/*.css -d src/css --watch',
    'run:11ty': 'eleventy --quiet',
    'run:11ty::watch': '$1 --watch',
  },
  mount: {
    dist: '/',
    src: '/public',
  },
  plugins: [
    [
      '@snowpack/plugin-run-script',
      { cmd: 'sass src/scss:src/css', watch: '$1 --watch' },
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
        output: ['src/css/'],
        watch: '$1 --watch',
      },
    ],
  ],
  devOptions: {
    port: 8080,
    open: 'none',
    out: 'dist',
    secure: true,
    bundle: true,
  },
};
