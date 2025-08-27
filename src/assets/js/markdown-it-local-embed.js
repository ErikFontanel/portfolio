import VideoServiceBase from 'markdown-it-block-embed/lib/services/VideoServiceBase.js';

class LocalService extends VideoServiceBase {
  getEmbedCode(videoID) {
    const poster = videoID.substr(0, videoID.length - 4) + '-thumb.png';
    return `<video poster="${poster}" src="${videoID}" autoplay loop muted preload="auto"></video>`;
  }
}

export default LocalService;
