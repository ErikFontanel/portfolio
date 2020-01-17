// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
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

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
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
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/slugify/slugify.js":[function(require,module,exports) {
var define;
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function (obj) { return typeof obj; }; } else { _typeof = function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

;

(function (name, root, factory) {
  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object') {
    module.exports = factory();
    module.exports['default'] = factory();
  }
  /* istanbul ignore next */
  else if (typeof define === 'function' && define.amd) {
      define(factory);
    } else {
      root[name] = factory();
    }
})('slugify', this, function () {
  var charMap = JSON.parse('{"$":"dollar","%":"percent","&":"and","<":"less",">":"greater","|":"or","¢":"cent","£":"pound","¤":"currency","¥":"yen","©":"(c)","ª":"a","®":"(r)","º":"o","À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","Æ":"AE","Ç":"C","È":"E","É":"E","Ê":"E","Ë":"E","Ì":"I","Í":"I","Î":"I","Ï":"I","Ð":"D","Ñ":"N","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","Ù":"U","Ú":"U","Û":"U","Ü":"U","Ý":"Y","Þ":"TH","ß":"ss","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","æ":"ae","ç":"c","è":"e","é":"e","ê":"e","ë":"e","ì":"i","í":"i","î":"i","ï":"i","ð":"d","ñ":"n","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","ù":"u","ú":"u","û":"u","ü":"u","ý":"y","þ":"th","ÿ":"y","Ā":"A","ā":"a","Ă":"A","ă":"a","Ą":"A","ą":"a","Ć":"C","ć":"c","Č":"C","č":"c","Ď":"D","ď":"d","Đ":"DJ","đ":"dj","Ē":"E","ē":"e","Ė":"E","ė":"e","Ę":"e","ę":"e","Ě":"E","ě":"e","Ğ":"G","ğ":"g","Ģ":"G","ģ":"g","Ĩ":"I","ĩ":"i","Ī":"i","ī":"i","Į":"I","į":"i","İ":"I","ı":"i","Ķ":"k","ķ":"k","Ļ":"L","ļ":"l","Ľ":"L","ľ":"l","Ł":"L","ł":"l","Ń":"N","ń":"n","Ņ":"N","ņ":"n","Ň":"N","ň":"n","Ő":"O","ő":"o","Œ":"OE","œ":"oe","Ŕ":"R","ŕ":"r","Ř":"R","ř":"r","Ś":"S","ś":"s","Ş":"S","ş":"s","Š":"S","š":"s","Ţ":"T","ţ":"t","Ť":"T","ť":"t","Ũ":"U","ũ":"u","Ū":"u","ū":"u","Ů":"U","ů":"u","Ű":"U","ű":"u","Ų":"U","ų":"u","Ŵ":"W","ŵ":"w","Ŷ":"Y","ŷ":"y","Ÿ":"Y","Ź":"Z","ź":"z","Ż":"Z","ż":"z","Ž":"Z","ž":"z","ƒ":"f","Ơ":"O","ơ":"o","Ư":"U","ư":"u","ǈ":"LJ","ǉ":"lj","ǋ":"NJ","ǌ":"nj","Ș":"S","ș":"s","Ț":"T","ț":"t","˚":"o","Ά":"A","Έ":"E","Ή":"H","Ί":"I","Ό":"O","Ύ":"Y","Ώ":"W","ΐ":"i","Α":"A","Β":"B","Γ":"G","Δ":"D","Ε":"E","Ζ":"Z","Η":"H","Θ":"8","Ι":"I","Κ":"K","Λ":"L","Μ":"M","Ν":"N","Ξ":"3","Ο":"O","Π":"P","Ρ":"R","Σ":"S","Τ":"T","Υ":"Y","Φ":"F","Χ":"X","Ψ":"PS","Ω":"W","Ϊ":"I","Ϋ":"Y","ά":"a","έ":"e","ή":"h","ί":"i","ΰ":"y","α":"a","β":"b","γ":"g","δ":"d","ε":"e","ζ":"z","η":"h","θ":"8","ι":"i","κ":"k","λ":"l","μ":"m","ν":"n","ξ":"3","ο":"o","π":"p","ρ":"r","ς":"s","σ":"s","τ":"t","υ":"y","φ":"f","χ":"x","ψ":"ps","ω":"w","ϊ":"i","ϋ":"y","ό":"o","ύ":"y","ώ":"w","Ё":"Yo","Ђ":"DJ","Є":"Ye","І":"I","Ї":"Yi","Ј":"J","Љ":"LJ","Њ":"NJ","Ћ":"C","Џ":"DZ","А":"A","Б":"B","В":"V","Г":"G","Д":"D","Е":"E","Ж":"Zh","З":"Z","И":"I","Й":"J","К":"K","Л":"L","М":"M","Н":"N","О":"O","П":"P","Р":"R","С":"S","Т":"T","У":"U","Ф":"F","Х":"H","Ц":"C","Ч":"Ch","Ш":"Sh","Щ":"Sh","Ъ":"U","Ы":"Y","Ь":"","Э":"E","Ю":"Yu","Я":"Ya","а":"a","б":"b","в":"v","г":"g","д":"d","е":"e","ж":"zh","з":"z","и":"i","й":"j","к":"k","л":"l","м":"m","н":"n","о":"o","п":"p","р":"r","с":"s","т":"t","у":"u","ф":"f","х":"h","ц":"c","ч":"ch","ш":"sh","щ":"sh","ъ":"u","ы":"y","ь":"","э":"e","ю":"yu","я":"ya","ё":"yo","ђ":"dj","є":"ye","і":"i","ї":"yi","ј":"j","љ":"lj","њ":"nj","ћ":"c","ѝ":"u","џ":"dz","Ґ":"G","ґ":"g","Ғ":"GH","ғ":"gh","Қ":"KH","қ":"kh","Ң":"NG","ң":"ng","Ү":"UE","ү":"ue","Ұ":"U","ұ":"u","Һ":"H","һ":"h","Ә":"AE","ә":"ae","Ө":"OE","ө":"oe","฿":"baht","ა":"a","ბ":"b","გ":"g","დ":"d","ე":"e","ვ":"v","ზ":"z","თ":"t","ი":"i","კ":"k","ლ":"l","მ":"m","ნ":"n","ო":"o","პ":"p","ჟ":"zh","რ":"r","ს":"s","ტ":"t","უ":"u","ფ":"f","ქ":"k","ღ":"gh","ყ":"q","შ":"sh","ჩ":"ch","ც":"ts","ძ":"dz","წ":"ts","ჭ":"ch","ხ":"kh","ჯ":"j","ჰ":"h","Ẁ":"W","ẁ":"w","Ẃ":"W","ẃ":"w","Ẅ":"W","ẅ":"w","ẞ":"SS","Ạ":"A","ạ":"a","Ả":"A","ả":"a","Ấ":"A","ấ":"a","Ầ":"A","ầ":"a","Ẩ":"A","ẩ":"a","Ẫ":"A","ẫ":"a","Ậ":"A","ậ":"a","Ắ":"A","ắ":"a","Ằ":"A","ằ":"a","Ẳ":"A","ẳ":"a","Ẵ":"A","ẵ":"a","Ặ":"A","ặ":"a","Ẹ":"E","ẹ":"e","Ẻ":"E","ẻ":"e","Ẽ":"E","ẽ":"e","Ế":"E","ế":"e","Ề":"E","ề":"e","Ể":"E","ể":"e","Ễ":"E","ễ":"e","Ệ":"E","ệ":"e","Ỉ":"I","ỉ":"i","Ị":"I","ị":"i","Ọ":"O","ọ":"o","Ỏ":"O","ỏ":"o","Ố":"O","ố":"o","Ồ":"O","ồ":"o","Ổ":"O","ổ":"o","Ỗ":"O","ỗ":"o","Ộ":"O","ộ":"o","Ớ":"O","ớ":"o","Ờ":"O","ờ":"o","Ở":"O","ở":"o","Ỡ":"O","ỡ":"o","Ợ":"O","ợ":"o","Ụ":"U","ụ":"u","Ủ":"U","ủ":"u","Ứ":"U","ứ":"u","Ừ":"U","ừ":"u","Ử":"U","ử":"u","Ữ":"U","ữ":"u","Ự":"U","ự":"u","Ỳ":"Y","ỳ":"y","Ỵ":"Y","ỵ":"y","Ỷ":"Y","ỷ":"y","Ỹ":"Y","ỹ":"y","‘":"\'","’":"\'","“":"\\\"","”":"\\\"","†":"+","•":"*","…":"...","₠":"ecu","₢":"cruzeiro","₣":"french franc","₤":"lira","₥":"mill","₦":"naira","₧":"peseta","₨":"rupee","₩":"won","₪":"new shequel","₫":"dong","€":"euro","₭":"kip","₮":"tugrik","₯":"drachma","₰":"penny","₱":"peso","₲":"guarani","₳":"austral","₴":"hryvnia","₵":"cedi","₸":"kazakhstani tenge","₹":"indian rupee","₽":"russian ruble","₿":"bitcoin","℠":"sm","™":"tm","∂":"d","∆":"delta","∑":"sum","∞":"infinity","♥":"love","元":"yuan","円":"yen","﷼":"rial"}');
  var locales = JSON.parse('{"vi":{"Đ":"D","đ":"d"}}');

  function replace(string, options) {
    if (typeof string !== 'string') {
      throw new Error('slugify: string argument expected');
    }

    options = typeof options === 'string' ? {
      replacement: options
    } : options || {};
    var locale = locales[options.locale] || {};
    var slug = string.split('').reduce(function (result, ch) {
      return result + (locale[ch] || charMap[ch] || ch). // allowed
      replace(options.remove || /[^\w\s$*_+~.()'"!\-:@]/g, '');
    }, '') // trim leading/trailing spaces
    .trim() // convert spaces
    .replace(/[-\s]+/g, options.replacement || '-');
    return options.lower ? slug.toLowerCase() : slug;
  }

  replace.extend = function (customMap) {
    for (var key in customMap) {
      charMap[key] = customMap[key];
    }
  };

  return replace;
});
},{}],"content/projects.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  title: "Close",
  images: [],
  description: "",
  date: "2019",
  url: "https://thecloseapp.com",
  services: ["UX Design", "Product Design", "Front-end Development"]
}, {
  title: "Matter Prelaunch",
  images: ["matter/matter1.png"],
  description: "Matter collaborated with fashion label Olaf Hussein. I designed the website for the prelaunch campaign.",
  date: "2018",
  url: "https://erikfontanel.github.io/matter/",
  services: ["UX Design", "Front-end Development"]
}, {
  title: "Ace & Tate",
  images: ["aceandtate/at1.png", "aceandtate/at2.png", "aceandtate/at3.png", "aceandtate/at4.png", "aceandtate/at5a.png", "aceandtate/at5b.png", "aceandtate/at5c.png"],
  description: "For fast growing Dutch start-up Ace & Tate I was asked to create a completely new concept and redesign of the Ace & Tate e-commerce platform.",
  url: "https://aceandtate.com",
  path: "ace-and-tate",
  date: "2016 - 2017",
  services: ["UX Design", "Visual design", "Concept"]
}, {
  title: "Lernert & Sander × Ace & Tate",
  images: ["ls/ls1.png"],
  description: "Design legends Lernert & Sander collaborated with Ace & Tate for a unique limited edition pair of glasses. The campaign website was awarded with a FWA.",
  url: "https://aceandtate.com/lernert-sander",
  path: "lernert-sander-ace-and-tate",
  date: "2017",
  services: ["UX Design", "Concept", "Front-end Development"]
}, {
  title: "Let It Grow",
  images: ["letitgrow/lig1.png", "letitgrow/lig2a.png", "letitgrow/lig2b.png", "letitgrow/lig2c.png", "letitgrow/lig3.png"],
  description: "For green start-up incubator Let It Grow I designed their online magazine and start-up directory.",
  path: "let-it-grow",
  url: "https://letitgrow.org/",
  date: "2016",
  collaboration: "Vandejong",
  services: ["UX Design", "Visual design", "Concept"]
}, {
  title: "Porsche",
  images: ["porsche/porsche1a.png", "porsche/porsche1b.png", "porsche/porsche1c.png", "porsche/porsche2.png"],
  description: "Ever dreamed of owning a Porsche? But not enough cash yet?Maybe some friends share the same dream. I created the UX design for mobile app and marketing website.",
  path: "porsche",
  date: "2016",
  collaboration: "Achtung! / Studio Kraftwerk",
  services: ["UX Design"]
}, {
  title: "The Boyscouts",
  images: ["boyscouts/bs1.png"],
  description: "The Boyscouts offers boutique, affordable jewelry. I redesigned and built their e-commerce platform (based on Shopify).",
  path: "boyscouts",
  url: "http://theboyscouts.com",
  date: "2016",
  services: ["UX Design", "Visual design", "Concept", "Front-end Development"]
}, {
  title: "TIS.tv",
  images: ["tis/tis1.png", "tis/tis2.png", "tis/tis3.png", "tis/tis4.png"],
  description: "The Innovation Station is a global platform presenting the best videos on social and technological innovation. Webby Honoree Best Visual Design - Function",
  path: "tis-tv",
  url: "http://tis.tv",
  date: "2016",
  collaboration: "Festina",
  services: ["UX Design", "Visual design", "Concept"]
}, {
  title: "Rotterdam.info",
  images: ["rotterdam/rotterdam1.png", "rotterdam/rotterdam2.png", "rotterdam/rotterdam3.png", "rotterdam/rotterdam4.png"],
  description: "Rotterdam.info is the place to go if you want to know what's on in Rotterdam. When Rotterdam Partners got a new identity by Studio Dumbar, I redesigned their online presence.",
  path: "rotterdam-info",
  url: "http://rotterdam.info",
  collaboration: "Studio Dumbar",
  date: "2015",
  services: ["UX Design", "Visual design", "Concept"]
}, {
  title: "HBO",
  images: ["hbo/hbo1.png", "hbo/hbo2.png", "hbo/hbo3.png", "hbo/hbo4.png", "hbo/hbo5.png"],
  description: "It's not TV, it's HBO. Together with Digital agency Tam Tam (Part of Dept) we provided HBO with a new online identity and strategy. In the rapidly changing world of television, it’s important for a top player like HBO to stand out, especially online. The result is a lean and clear website where the images embody HBO’s identity and what they have to offer.",
  path: "hbo",
  url: "http://itshbo.nl",
  date: "2014",
  collaboration: "Tam Tam (Dept).",
  services: ["UX Design", "Visual design", "Concept"]
}, {
  title: "Fontanel",
  description: "I founded Fontanel, supporting Dutch creative careers through exclusive magazine content, a job board, an active community and collaborations with brands ranging between Adobe and Habbekrats.",
  images: ["fontanel/fontanel1.png", "fontanel/fontanel2.png", "fontanel/fontanel3.png", "fontanel/fontanel4.png"],
  date: "2006 - 2014",
  services: ["Founder", "UX Design", "Editor", "Janitor"]
}];
exports.default = _default;
},{}],"src/intro.js":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/* globals THREE */
var canvas = document.querySelector('canvas');
var canvasWidth = canvas.parentElement.clientWidth;
var canvasHeight = canvas.parentElement.clientHeight;
var wrapper = document.querySelector('.wrapper');

var getAspect = function getAspect(x, y) {
  return Math.min(x, y) / Math.max(x, y);
};

var scene = new THREE.Scene();
scene.background = new THREE.Color(window.getComputedStyle(document.body).backgroundColor);
var camera = new THREE.PerspectiveCamera(40, getAspect(canvasWidth, canvasHeight), 1, 1000);
camera.position.set(20, 0, 5);
camera.lookAt(scene.position);
var renderer = new THREE.WebGLRenderer({
  canvas: canvas
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(canvasWidth, canvasHeight); // material

var material = new THREE.MeshBasicMaterial({
  color: 0xff00ff,
  wireframe: true
}); // geometry

var geometry = new THREE.BoxGeometry(3, 4, 8, 2, 3, 4); // create orb

var orb = new THREE.Mesh(geometry, material);
scene.add(orb);

function animate() {
  requestAnimationFrame(animate);
  orb.rotation.x += 0.01;
  orb.rotation.y += 0.01;
  renderer.render(scene, camera);
}

animate();
var windowHeight = window.innerHeight;
var tanFOV = Math.tan(Math.PI / 180 * camera.fov / 2);

function onWindowResize(event) {
  requestAnimationFrame(function () {
    var isTwoCol = window.matchMedia('(min-width: 96ch)').matches;
    var wrapperWidth = isTwoCol ? window.innerWidth - wrapper.clientWidth : window.innerWidth;
    var parentHeight = isTwoCol ? window.innerHeight : window.innerHeight * 0.75;
    camera.aspect = getAspect(wrapperWidth, parentHeight);
    camera.updateProjectionMatrix();
    camera.lookAt(scene.position);
    renderer.setSize(wrapperWidth, parentHeight);
    renderer.render(scene, camera);
  });
}

window.addEventListener('resize', onWindowResize, false);
/**
 * Minimal Keyboard navigation
 */

var contactNav = document.querySelectorAll('.contact a');

function navigate(el) {
  window.location = el.href;
}

var getFocusIndex = function getFocusIndex() {
  var index = _toConsumableArray(contactNav).indexOf(document.activeElement);

  return index >= 0 ? index : 0;
};

var isInContactNav = function isInContactNav(el) {
  return _toConsumableArray(contactNav).includes(el);
};

function getFocusTarget(keyCode) {
  var totalItems = contactNav.length - 1;
  var currFocus = isInContactNav(document.activeElement) ? getFocusIndex() : -1;
  var nextFocus;
  var shouldRepeat;

  if (keyCode === 37) {
    shouldRepeat = currFocus <= 0;
    nextFocus = shouldRepeat ? totalItems : currFocus - 1;
  }

  if (keyCode === 39) {
    shouldRepeat = currFocus >= totalItems;
    nextFocus = shouldRepeat ? 0 : currFocus + 1;
  }

  return contactNav[nextFocus];
}

window.addEventListener('keydown', function (e) {
  var target = contactNav;

  switch (e.keyCode) {
    // 1
    case 49:
      contactNav[0].focus();
      break;
    // 2

    case 50:
      contactNav[1].focus();
      break;
    // 3

    case 51:
      contactNav[2].focus();
      break;
    // 4

    case 52:
      contactNav[3].focus();
      break;
    // Left arrow

    case 37:
      target = getFocusTarget(e.keyCode);
      target.focus();
      break;
    // Right arrow

    case 39:
      target = getFocusTarget(e.keyCode);
      target.focus();
      break;
    // Enter

    case 13:
      navigate(document.activeElement);
      break;

    default:
  }
});
},{}],"app.js":[function(require,module,exports) {
"use strict";

var _slugify = _interopRequireDefault(require("slugify"));

var _projects = _interopRequireDefault(require("~/content/projects"));

require("./src/intro");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nav = document.createRange().createContextualFragment("<ol></ol>");

var $ = function $(selector) {
  return document.querySelector(selector);
};

var renderNavItem = function renderNavItem(node) {
  var html = "\n    <li><a href=\"#".concat((0, _slugify.default)(node.title), "\">").concat(node.title, "</a></li>\n  ");
  return document.createRange().createContextualFragment(html);
};

if (_projects.default !== undefined) {
  _projects.default.forEach(function (project) {
    var navItem = renderNavItem(project);
    nav.querySelector("ol").appendChild(navItem);
  });

  $("#selected-work").appendChild(nav);
}
},{"slugify":"node_modules/slugify/slugify.js","~/content/projects":"content/projects.js","./src/intro":"src/intro.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55714" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
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

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
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
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/app.c328ef1a.js.map