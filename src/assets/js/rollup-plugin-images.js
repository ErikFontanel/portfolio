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
          let html = fs.readFileSync(htmlPath, 'utf-8');
          const dom = new JSDOM(html);
          const document = dom.window.document;

          for (const img of document.querySelectorAll('img')) {
            const src = img.getAttribute('src');
            if (!src) continue;

            const cleanSrc = src.split('?')[0];
            const imgPath = path.join(outDir, cleanSrc);

            if (!fs.existsSync(imgPath)) {
              this.warn(`Image ${src} not found at ${imgPath}`);
              continue;
            }

            try {
              const { width, height } = imageSize(imgPath);
              if (width && height) {
                img.setAttribute('width', width);
                img.setAttribute('height', height);
              }
            } catch (e) {
              this.warn(`Could not process image ${src}: ${e.message}`);
            }
          }

          fs.writeFileSync(htmlPath, dom.serialize(), 'utf-8');
        }
      }
    },
  };
}
