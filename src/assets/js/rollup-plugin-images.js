import { JSDOM } from 'jsdom';
import imageSize from 'image-size';

export default function htmlImgDimensions() {
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
            const src = img.getAttribute('src');
            if (!src) continue;

            // Find the asset in the bundle
            let asset = bundle[src];
            if (!asset) {
              asset = Object.values(bundle).find(
                (item) => item.type === 'asset' && item.fileName === src
              );
            }

            if (!asset) {
              this.warn(`Image ${src} not found in Rollup bundle`);
              continue;
            }

            // Skip if already has dimensions
            if (img.hasAttribute('width') && img.hasAttribute('height')) {
              continue;
            }

            try {
              let buffer;

              if (typeof asset.source === 'string') {
                // Might be base64 encoded string — try to decode
                if (/^data:/.test(asset.source)) {
                  // data URI
                  const base64 = asset.source.split(',')[1];
                  buffer = Buffer.from(base64, 'base64');
                } else {
                  // plain string (unlikely for an image, but fallback)
                  buffer = Buffer.from(asset.source);
                }
              } else if (asset.source instanceof Uint8Array) {
                buffer = Buffer.from(asset.source);
              } else {
                this.warn(`Unsupported source type for ${src}`);
                continue;
              }

              const { width, height } = imageSize(buffer);

              if (width && height) {
                if (!img.hasAttribute('width')) {
                  img.setAttribute('width', width);
                }
                if (!img.hasAttribute('height')) {
                  img.setAttribute('height', height);
                }
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
