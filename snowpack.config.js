module.exports = {
  homepage: '/',
  installOptions: {
    rollup: {
      plugins: [require('rollup-plugin-node-polyfills')()],
    },
  },
  scripts: {
    'mount:eleventy': 'mount dist --to /',
    'mount:src': 'mount src --to /public',
    'bundle:*': 'parcel build src/app.js',
    'run:sass': 'sass src/scss:src/scss --no-source-map',
    'run:sass::watch': '$1 --watch',
    'run:tpostcss': 'postcss src/scss/**/*.css',
    'run:tpostcss::watch': 'postcss src/scss/**/*.css -d src/css --watch',
    'run:11ty': 'eleventy',
    'run:11ty::watch': '$1 --watch',
  },
  devOptions: {
    port: 8080,
    open: 'none',
    out: 'dist',
    secure: true,
    bundle: true,
  },
};
