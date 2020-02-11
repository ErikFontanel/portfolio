const manifest = require('./site.webmanifest.json');
const metadata = require('./_data/metadata.json');

module.exports = class {
  data() {
    return {
      eleventyExcludeFromCollections: true
    };
  }

  render() {
    manifest.name = metadata.title;
    manifest.short_name = metadata.author.name;
    manifest.description = metadata.description;
    manifest.background_color = metadata.background_color;

    return `${JSON.stringify(manifest, null, 2)}`;
  }
};
