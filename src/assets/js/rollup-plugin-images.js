import { JSDOM } from 'jsdom';
import imageSize from 'image-size';
import url from 'node:url';
import http from 'node:https';
import path from 'path';
import fs from 'fs';
import { readFileSync } from 'node:fs';

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
          const baseUrl = process.env.URL || '/';

          for (const img of imgs) {
            const src = img.getAttribute('src');
            if (!src) continue;

            const { name, ext } = path.parse(src.split('?')[0]);
            const imgurl = url.parse(`${baseUrl}assets/img/${name}${ext}`);

            const req = http.get(imgurl, (response) => {
              const chunks = [];
              response
                .on('data', (chunk) => {
                  chunks.push(chunk);
                })
                .on('end', () => {
                  const buffer = Buffer.concat(chunks);
                  if (buffer !== undefined && buffer.length) {
                    const { width, height } = imageSize(buffer);
                    if (width && height) {
                      img.setAttribute('width', width);
                      img.setAttribute('height', height);
                    }
                  }
                });
            });

            req.on('error', (e) => {
              this.warn(`Could not fetch image ${src}: ${e.message}`);
            });
          }
        }
      }
    },
  };
}
