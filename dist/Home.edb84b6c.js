// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"components/ProjectLink.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
var _default = {
  name: 'ProjectLink',
  props: ['href', 'title']
};
exports.default = _default;
        var $4adf95 = exports.default || module.exports;
      
      if (typeof $4adf95 === 'function') {
        $4adf95 = $4adf95.options;
      }
    
        /* template */
        Object.assign($4adf95, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("li", { staticClass: "project-link" }, [
    _c(
      "a",
      { attrs: { href: "#" + _vm.href } },
      [_vm._t("default", [_vm._v(_vm._s(_vm.title))])],
      2
    )
  ])
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$4adf95', $4adf95);
          } else {
            api.reload('$4adf95', $4adf95);
          }
        }

        
      }
    })();
},{"vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.common.js"}],"content/projects.json":[function(require,module,exports) {
module.exports = [{
  "title": "Ace & Tate",
  "images": ["at1.png", "at2.png", "at3.png"],
  "description": "This is the project description",
  "url": "https://aceandtate.com",
  "path": "ace-and-tate",
  "services": ["UX Design", "Visual design", "Concept"]
}, {
  "title": "Lernert & Sander × Ace & Tate",
  "images": ["ls1.png", "ls2.png", "ls3.png"],
  "description": "This is the project description",
  "url": "https://aceandtate.com/lernert-sander",
  "path": "lernert-sander-ace-and-tate",
  "services": ["UX Design", "Visual design", "Concept"]
}, {
  "title": "Let It Grow",
  "images": ["at1.png", "at2.png", "at3.png"],
  "description": "This is the project description",
  "path": "let-it-grow",
  "services": ["UX Design", "Visual design", "Concept"]
}, {
  "title": "Porsche",
  "images": ["at1.png", "at2.png", "at3.png"],
  "description": "This is the project description",
  "path": "porsche",
  "services": ["UX Design", "Visual design", "Concept"]
}, {
  "title": "HBO",
  "images": ["at1.png", "at2.png", "at3.png"],
  "description": "This is the project description",
  "path": "hbo",
  "url": "http://itshbo.nl",
  "services": ["UX Design", "Visual design", "Concept"]
}, {
  "title": "TIS.tv",
  "images": ["at1.png", "at2.png", "at3.png"],
  "description": "This is the project description",
  "path": "tis-tv",
  "url": "http://tis.tv",
  "services": ["UX Design", "Visual design", "Concept"]
}, {
  "title": "Rotterdam.info",
  "images": ["at1.png", "at2.png", "at3.png"],
  "description": "This is the project description",
  "path": "rotterdam-info",
  "url": "http://rotterdam.info",
  "services": ["UX Design", "Visual design", "Concept"]
}, {
  "title": "The Boyscouts",
  "images": ["at1.png", "at2.png", "at3.png"],
  "description": "This is the project description",
  "path": "boyscouts",
  "url": "http://theboyscouts.com",
  "services": ["UX Design", "Visual design", "Concept"]
}, {
  "title": "BKB",
  "images": ["at1.png", "at2.png", "at3.png"],
  "description": "This is the project description",
  "path": "bkb",
  "url": "http://bkb.nl",
  "services": ["UX Design", "Visual design", "Concept"]
}];
},{}],"components/NavPrimary.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ProjectLink = _interopRequireDefault(require("./ProjectLink"));

var _projects = _interopRequireDefault(require("~/content/projects"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  components: {
    ProjectLink: _ProjectLink.default
  },
  data: function data() {
    return {
      title: 'Erik Gelderblom',
      subtitle: 'Freelance UX Designer with Front-End skills',
      projects: _projects.default
    };
  }
};
exports.default = _default;
        var $73f479 = exports.default || module.exports;
      
      if (typeof $73f479 === 'function') {
        $73f479 = $73f479.options;
      }
    
        /* template */
        Object.assign($73f479, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "site-header" }, [
    _c("h1", { staticClass: "page-title" }, [
      _vm._v("\n    " + _vm._s(_vm.title)),
      _c("br"),
      _vm._v("\n    " + _vm._s(_vm.subtitle) + "\n  ")
    ]),
    _vm._v(" "),
    _c("nav", { staticClass: "primary" }),
    _vm._v(" "),
    _c("nav", { staticClass: "projects" }, [
      _c(
        "ul",
        _vm._l(_vm.projects, function(project, index) {
          return _c(
            "project-link",
            { key: index, attrs: { href: project.path } },
            [_vm._v(_vm._s(project.title))]
          )
        })
      )
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$73f479', $73f479);
          } else {
            api.reload('$73f479', $73f479);
          }
        }

        
      }
    })();
},{"./ProjectLink":"components/ProjectLink.vue","~/content/projects":"content/projects.json","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.common.js"}],"layouts/Main.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _NavPrimary = _interopRequireDefault(require("~/components/NavPrimary.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
var _default = {
  data: function data() {
    return {
      message: 'hello'
    };
  },
  components: {
    NavPrimary: _NavPrimary.default
  }
};
exports.default = _default;
        var $b29060 = exports.default || module.exports;
      
      if (typeof $b29060 === 'function') {
        $b29060 = $b29060.options;
      }
    
        /* template */
        Object.assign($b29060, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "main",
    [
      _c("nav-primary"),
      _vm._v(" "),
      _c("div", { staticClass: "wrapper" }, [_vm._t("content")], 2)
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$b29060', $b29060);
          } else {
            api.reload('$b29060', $b29060);
          }
        }

        
      }
    })();
},{"~/components/NavPrimary.vue":"components/NavPrimary.vue","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.common.js"}],"components/Intro.vue":[function(require,module,exports) {
//
//
//
//
// import '~/js/intro.js'
        var $5cf9ce = exports.default || module.exports;
      
      if (typeof $5cf9ce === 'function') {
        $5cf9ce = $5cf9ce.options;
      }
    
        /* template */
        Object.assign($5cf9ce, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "object" }, [_c("canvas")])
  }
]
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$5cf9ce', $5cf9ce);
          } else {
            api.reload('$5cf9ce', $5cf9ce);
          }
        }

        
      }
    })();
},{"vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.common.js"}],"components/Home.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Main = _interopRequireDefault(require("~/layouts/Main"));

var _Intro = _interopRequireDefault(require("~/components/Intro"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
var _default = {
  components: {
    MainLayout: _Main.default,
    Intro: _Intro.default
  }
};
exports.default = _default;
        var $fbe25e = exports.default || module.exports;
      
      if (typeof $fbe25e === 'function') {
        $fbe25e = $fbe25e.options;
      }
    
        /* template */
        Object.assign($fbe25e, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "main-layout",
    [_c("template", { slot: "content" }, [_c("Intro")], 1)],
    2
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$fbe25e', $fbe25e);
          } else {
            api.reload('$fbe25e', $fbe25e);
          }
        }

        
      }
    })();
},{"~/layouts/Main":"layouts/Main.vue","~/components/Intro":"components/Intro.vue","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.common.js"}],"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55967" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js"], null)
//# sourceMappingURL=/Home.edb84b6c.map