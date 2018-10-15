import Vue from 'vue';
import { createRouter } from './router/index.js';
import Home from '~/components/Home';

const router = createRouter();

const app = new Vue({
  el: '#app',
  router,

  render(h) {
    return h(Home);
  }
});
