import postcssMediaMinmax from 'postcss-media-minmax';
import postcssCustomMedia from 'postcss-custom-media';
import postcssPresetEnv from 'postcss-preset-env';
import cssnano from 'cssnano';
import autoprefixer from 'autoprefixer';
const isProduction = process.env.NODE_ENV === 'production';

export default {
  plugins: [
    postcssMediaMinmax,
    postcssCustomMedia,
    ...(isProduction
      ? [
          autoprefixer,
          postcssPresetEnv,
          // cssnano({
          //   preset: 'default',
          // }),
        ]
      : []),
  ],
};
