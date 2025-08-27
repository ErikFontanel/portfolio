import { JSDOM } from 'jsdom';
import imageSize from 'image-size';

export default function () {
  return {
    name: 'html-img-dimensions',

    generateBundle(_, bundle) {
      for (const [fileName, file] of Object.entries(bundle)) {
        if (file.type === 'asset' && fileName.endsWith('.html')) {
          let html = file.source.toString();

          const dom = new JSDOM(html);
          const document = dom.window.document;
          const imgs = [...document.querySelectorAll('img')];

          for (const img of imgs) {
            let src = img.getAttribute('src');
            if (!src) continue;

            // Try direct match first
            src = src.replace(/^\//, '').replace(/\?.*/, ''); // Remove leading slash if present
            let asset = bundle[src];

            // If not found, try to match by fileName (handles hashed names)
            if (!asset) {
              asset = Object.values(bundle).find(
                (item) => item.type === 'asset' && item.fileName === src
              );
            }

            if (!asset) {
              this.warn(`Image ${src} not found in Rollup bundle`);
              continue;
            }

            try {
              const buffer =
                typeof asset.source === 'string'
                  ? Buffer.from(asset.source)
                  : Buffer.from(asset.source);

              const { width, height } = imageSize(buffer);
              if (width && height) {
                img.setAttribute('width', width);
                img.setAttribute('height', height);
              }
            } catch (e) {
              this.warn(`Could not process image ${src}: ${e.message}`);
            }
          }

          file.source = dom.serialize();
        }
      }
    },
  };
}
