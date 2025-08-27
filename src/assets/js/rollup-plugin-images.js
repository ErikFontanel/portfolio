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
              let buffer;

              if (typeof asset.source === 'string') {
                if (/^data:/.test(asset.source)) {
                  // base64 data URI
                  const base64 = asset.source.split(',')[1];
                  buffer = Buffer.from(base64, 'base64');
                } else {
                  // raw string (e.g. inline SVG) → skip
                  this.warn(`Skipping non-binary image ${src}`);
                  continue;
                }
              } else if (asset.source instanceof Uint8Array) {
                buffer = Buffer.from(asset.source);
              } else {
                this.warn(`Unsupported source type for ${src}`);
                continue;
              }

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
