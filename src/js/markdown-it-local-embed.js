const VideoServiceBase = require('markdown-it-block-embed/lib/services/VideoServiceBase');

class LocalService extends VideoServiceBase {
  getEmbedCode(videoID) {
    return `<video src="./${videoID}" autoplay loop muted preload="auto"></video>`;
  }
}

module.exports = LocalService;
