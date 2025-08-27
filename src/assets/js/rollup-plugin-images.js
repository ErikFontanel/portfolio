import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';
import imageSize from 'image-size';

export default function htmlImgDimensions() {
  return {
    name: 'html-img-dimensions',

    writeBundle(options, bundle) {
      const outDir = options.dir || path.dirname(options.file);

      for (const [fileName, file] of Object.entries(bundle)) {
        if (file.type === 'asset' && fileName.endsWith('.html')) {
          const htmlPath = path.join(outDir, fileName);
          const html = fs.readFileSync(htmlPath, 'utf-8');
          const dom = new JSDOM(html);
          const document = dom.window.document;

          for (const img of document.querySelectorAll('img')) {
            let src = img.getAttribute('src');
            if (!src) continue;

            // Skip if width/height already set
            // if (img.hasAttribute('width') && img.hasAttribute('height'))
            // continue;

            // Skip remote URLs
            if (/^(https?:)?\/\//.test(src)) continue;

            // Extract the original file name before query string or hash
            const cleanSrc = src.split('?')[0].split('#')[0];
            const imgPath = path.join(outDir, cleanSrc);

            if (!fs.existsSync(imgPath)) {
              this.warn(`Image ${cleanSrc} not found on disk, skipping`);
              continue;
            }

            // Skip SVGs
            if (cleanSrc.endsWith('.svg')) continue;

            try {
              const { width, height } = imageSize(imgPath);
              if (width && height) {
                img.setAttribute('width', width);
                img.setAttribute('height', height);
              }
            } catch (e) {
              this.warn(`Could not process image ${cleanSrc}: ${e.message}`);
            }
          }

          fs.writeFileSync(htmlPath, dom.serialize(), 'utf-8');
        }
      }
    },
  };
}
