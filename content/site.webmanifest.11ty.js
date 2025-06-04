import manifest from './site.webmanifest.json' with { type: 'json' };
import metadata from './_data/metadata.json' with { type: 'json' };

export default class {
  data() {
    return {
      eleventyExcludeFromCollections: true,
      permalink: 'site.webmanifest',
    };
  }

  render() {
    manifest.name = metadata.title;
    manifest.short_name = metadata.author.name;
    manifest.description = metadata.description;
    manifest.background_color = metadata.background_color;
    return `${JSON.stringify(manifest, null, 2)}`;
  }
}
