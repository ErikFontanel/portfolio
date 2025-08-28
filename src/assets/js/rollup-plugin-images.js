import { JSDOM } from 'jsdom';
import { imageSize, disableTypes } from 'image-size';
import url from 'node:url';
import http from 'node:https';
import path from 'path';

disableTypes(['tiff', 'svg', 'ico']);
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
          const baseUrl = process.env.DEPLOY_PRIME_URL || '/';

          for (const img of imgs) {
            const src = img.getAttribute('src');
            if (!src) continue;

            const { name, ext } = path.parse(src.split('?')[0]);

            if (ext === '.svg' || ext === '.ico') continue; // skip svg and ico files

            const imgurl = url.parse(`${baseUrl}/assets/img/${name}${ext}`);

            try {
              const req = http.get(imgurl, (response) => {
                const chunks = [];
                response
                  .on('data', (chunk) => {
                    chunks.push(chunk);
                  })
                  .on('end', () => {
                    const buffer = Buffer.concat(chunks);
                    if (buffer !== undefined && buffer.length) {
                      this.warn(
                        `Setting dimensions for image: ${imgurl.href}, ${buffer.length} bytes`
                      );

                      const { width, height } = imageSize(buffer);
                      this.warn(` - width: ${width}, height: ${height}`);

                      if (width) {
                        img.setAttribute('width', width);
                      }
                      if (height) {
                        img.setAttribute('height', height);
                      }
                    }
                  });
              });

              req.on('error', (e) => {
                this.warn(`Could not fetch image ${src}: ${e.message}`);
              });
            } catch (error) {
              this.warn(`Could not fetch image ${src}: ${e.message}`);
              continue;
            }
          }
          // Update bundle with modified HTML
          fs.writeFileSync(htmlPath, dom.serialize(), 'utf-8');
          // file.source = dom.serialize();
          // this.emitFile({ type: 'asset', fileName, source: file.source });
        }
      }
    },
  };
}
