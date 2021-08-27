module.exports = {
  homepage: '/',
  packageOptions: {
    namedExports: ['lodash'],
    rollup: {
      plugins: [require('rollup-plugin-node-polyfills')()],
    },
  },
  alias: {
    static: './dist/static',
  },
  buildOptions: {
    clean: true,
    out: 'dist',
  },
  mount: {
    dist: { url: '/', static: false },
    src: '/static',
  },
  plugins: [
    [
      '@snowpack/plugin-run-script',
      { cmd: 'eleventy --quiet', watch: '$1 --watch' },
    ],
    ['@snowpack/plugin-sass', { native: !process.env.NETLIFY }],
    ['@snowpack/plugin-postcss', { input: ['.css'] }],
  ],
  devOptions: {
    port: 8080,
    open: 'none',
    secure: !process.env.NETLIFY,
    hmrDelay: 300,
    hostname: 'portfolio.test',
  },
};
