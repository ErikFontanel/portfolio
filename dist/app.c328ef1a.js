parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"/Hfe":[function(require,module,exports) {
var define;
var e;function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}!function(n,r,t){"object"===("undefined"==typeof exports?"undefined":o(exports))?(module.exports=t(),module.exports.default=t()):"function"==typeof e&&e.amd?e(t):r.slugify=t()}(0,this,function(){var e=JSON.parse('{"$":"dollar","&":"and","<":"less",">":"greater","|":"or","¢":"cent","£":"pound","¤":"currency","¥":"yen","©":"(c)","ª":"a","®":"(r)","º":"o","À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","Æ":"AE","Ç":"C","È":"E","É":"E","Ê":"E","Ë":"E","Ì":"I","Í":"I","Î":"I","Ï":"I","Ð":"D","Ñ":"N","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","Ù":"U","Ú":"U","Û":"U","Ü":"U","Ý":"Y","Þ":"TH","ß":"ss","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","æ":"ae","ç":"c","è":"e","é":"e","ê":"e","ë":"e","ì":"i","í":"i","î":"i","ï":"i","ð":"d","ñ":"n","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","ù":"u","ú":"u","û":"u","ü":"u","ý":"y","þ":"th","ÿ":"y","Ā":"A","ā":"a","Ă":"A","ă":"a","Ą":"A","ą":"a","Ć":"C","ć":"c","Č":"C","č":"c","Ď":"D","ď":"d","Đ":"DJ","đ":"dj","Ē":"E","ē":"e","Ė":"E","ė":"e","Ę":"e","ę":"e","Ě":"E","ě":"e","Ğ":"G","ğ":"g","Ģ":"G","ģ":"g","Ĩ":"I","ĩ":"i","Ī":"i","ī":"i","Į":"I","į":"i","İ":"I","ı":"i","Ķ":"k","ķ":"k","Ļ":"L","ļ":"l","Ł":"L","ł":"l","Ń":"N","ń":"n","Ņ":"N","ņ":"n","Ň":"N","ň":"n","Ő":"O","ő":"o","Œ":"OE","œ":"oe","Ř":"R","ř":"r","Ś":"S","ś":"s","Ş":"S","ş":"s","Š":"S","š":"s","Ţ":"T","ţ":"t","Ť":"T","ť":"t","Ũ":"U","ũ":"u","Ū":"u","ū":"u","Ů":"U","ů":"u","Ű":"U","ű":"u","Ų":"U","ų":"u","Ź":"Z","ź":"z","Ż":"Z","ż":"z","Ž":"Z","ž":"z","ƒ":"f","Ơ":"O","ơ":"o","Ư":"U","ư":"u","ǈ":"LJ","ǉ":"lj","ǋ":"NJ","ǌ":"nj","Ș":"S","ș":"s","Ț":"T","ț":"t","˚":"o","Ά":"A","Έ":"E","Ή":"H","Ί":"I","Ό":"O","Ύ":"Y","Ώ":"W","ΐ":"i","Α":"A","Β":"B","Γ":"G","Δ":"D","Ε":"E","Ζ":"Z","Η":"H","Θ":"8","Ι":"I","Κ":"K","Λ":"L","Μ":"M","Ν":"N","Ξ":"3","Ο":"O","Π":"P","Ρ":"R","Σ":"S","Τ":"T","Υ":"Y","Φ":"F","Χ":"X","Ψ":"PS","Ω":"W","Ϊ":"I","Ϋ":"Y","ά":"a","έ":"e","ή":"h","ί":"i","ΰ":"y","α":"a","β":"b","γ":"g","δ":"d","ε":"e","ζ":"z","η":"h","θ":"8","ι":"i","κ":"k","λ":"l","μ":"m","ν":"n","ξ":"3","ο":"o","π":"p","ρ":"r","ς":"s","σ":"s","τ":"t","υ":"y","φ":"f","χ":"x","ψ":"ps","ω":"w","ϊ":"i","ϋ":"y","ό":"o","ύ":"y","ώ":"w","Ё":"Yo","Ђ":"DJ","Є":"Ye","І":"I","Ї":"Yi","Ј":"J","Љ":"LJ","Њ":"NJ","Ћ":"C","Џ":"DZ","А":"A","Б":"B","В":"V","Г":"G","Д":"D","Е":"E","Ж":"Zh","З":"Z","И":"I","Й":"J","К":"K","Л":"L","М":"M","Н":"N","О":"O","П":"P","Р":"R","С":"S","Т":"T","У":"U","Ф":"F","Х":"H","Ц":"C","Ч":"Ch","Ш":"Sh","Щ":"Sh","Ъ":"U","Ы":"Y","Ь":"","Э":"E","Ю":"Yu","Я":"Ya","а":"a","б":"b","в":"v","г":"g","д":"d","е":"e","ж":"zh","з":"z","и":"i","й":"j","к":"k","л":"l","м":"m","н":"n","о":"o","п":"p","р":"r","с":"s","т":"t","у":"u","ф":"f","х":"h","ц":"c","ч":"ch","ш":"sh","щ":"sh","ъ":"u","ы":"y","ь":"","э":"e","ю":"yu","я":"ya","ё":"yo","ђ":"dj","є":"ye","і":"i","ї":"yi","ј":"j","љ":"lj","њ":"nj","ћ":"c","џ":"dz","Ґ":"G","ґ":"g","฿":"baht","ა":"a","ბ":"b","გ":"g","დ":"d","ე":"e","ვ":"v","ზ":"z","თ":"t","ი":"i","კ":"k","ლ":"l","მ":"m","ნ":"n","ო":"o","პ":"p","ჟ":"zh","რ":"r","ს":"s","ტ":"t","უ":"u","ფ":"f","ქ":"k","ღ":"gh","ყ":"q","შ":"sh","ჩ":"ch","ც":"ts","ძ":"dz","წ":"ts","ჭ":"ch","ხ":"kh","ჯ":"j","ჰ":"h","ẞ":"SS","Ạ":"A","ạ":"a","Ả":"A","ả":"a","Ấ":"A","ấ":"a","Ầ":"A","ầ":"a","Ẩ":"A","ẩ":"a","Ẫ":"A","ẫ":"a","Ậ":"A","ậ":"a","Ắ":"A","ắ":"a","Ằ":"A","ằ":"a","Ẳ":"A","ẳ":"a","Ẵ":"A","ẵ":"a","Ặ":"A","ặ":"a","Ẹ":"E","ẹ":"e","Ẻ":"E","ẻ":"e","Ẽ":"E","ẽ":"e","Ế":"E","ế":"e","Ề":"E","ề":"e","Ể":"E","ể":"e","Ễ":"E","ễ":"e","Ệ":"E","ệ":"e","Ỉ":"I","ỉ":"i","Ị":"I","ị":"i","Ọ":"O","ọ":"o","Ỏ":"O","ỏ":"o","Ố":"O","ố":"o","Ồ":"O","ồ":"o","Ổ":"O","ổ":"o","Ỗ":"O","ỗ":"o","Ộ":"O","ộ":"o","Ớ":"O","ớ":"o","Ờ":"O","ờ":"o","Ở":"O","ở":"o","Ỡ":"O","ỡ":"o","Ợ":"O","ợ":"o","Ụ":"U","ụ":"u","Ủ":"U","ủ":"u","Ứ":"U","ứ":"u","Ừ":"U","ừ":"u","Ử":"U","ử":"u","Ữ":"U","ữ":"u","Ự":"U","ự":"u","Ỳ":"Y","ỳ":"y","Ỵ":"Y","ỵ":"y","Ỷ":"Y","ỷ":"y","Ỹ":"Y","ỹ":"y","‘":"\'","’":"\'","“":"\\"","”":"\\"","†":"+","•":"*","…":"...","₠":"ecu","₢":"cruzeiro","₣":"french franc","₤":"lira","₥":"mill","₦":"naira","₧":"peseta","₨":"rupee","₩":"won","₪":"new shequel","₫":"dong","€":"euro","₭":"kip","₮":"tugrik","₯":"drachma","₰":"penny","₱":"peso","₲":"guarani","₳":"austral","₴":"hryvnia","₵":"cedi","₹":"indian rupee","₽":"russian ruble","℠":"sm","™":"tm","∂":"d","∆":"delta","∑":"sum","∞":"infinity","♥":"love","元":"yuan","円":"yen","﷼":"rial"}');function o(o,n){if("string"!=typeof o)throw new Error("slugify: string argument expected");n="string"==typeof n?{replacement:n}:n||{};var r=o.split("").reduce(function(o,r){return o+(e[r]||r).replace(n.remove||/[^\w\s$*_+~.()'"!\-:@]/g,"")},"").trim().replace(/[-\s]+/g,n.replacement||"-").replace("#{replacement}$","");return n.lower?r.toLowerCase():r}return o.extend=function(o){for(var n in o)e[n]=o[n]},o});
},{}],"z9iP":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=[{title:"Matter Prelaunch",images:["matter/matter1.png"],description:"Matter collaborated with fashion label Olaf Hussein. I designed the website for the prelaunch campaign.",date:"2018",url:"https://erikfontanel.github.io/matter/",services:["UX Design","Front-end Development"]},{title:"Ace & Tate",images:["aceandtate/at1.png","aceandtate/at2.png","aceandtate/at3.png","aceandtate/at4.png","aceandtate/at5a.png","aceandtate/at5b.png","aceandtate/at5c.png"],description:"For fast growing Dutch start-up Ace & Tate I was asked to create a completely new concept and redesign of the Ace & Tate e-commerce platform.",url:"https://aceandtate.com",path:"ace-and-tate",date:"2016 - 2017",services:["UX Design","Visual design","Concept"]},{title:"Lernert & Sander × Ace & Tate",images:["ls/ls1.png"],description:"Design legends Lernert & Sander collaborated with Ace & Tate for a unique limited edition pair of glasses. The campaign website was awarded with a FWA.",url:"https://aceandtate.com/lernert-sander",path:"lernert-sander-ace-and-tate",date:"2017",services:["UX Design","Concept","Front-end Development"]},{title:"Let It Grow",images:["letitgrow/lig1.png","letitgrow/lig2a.png","letitgrow/lig2b.png","letitgrow/lig2c.png","letitgrow/lig3.png"],description:"For green start-up incubator I designed their online magazine and start-up directory.",path:"let-it-grow",url:"https://letitgrow.org/",date:"2016",collaboration:"Vandejong",services:["UX Design","Visual design","Concept"]},{title:"Porsche",images:["porsche/porsche1a.png","porsche/porsche1b.png","porsche/porsche1c.png","porsche/porsche2.png"],description:"Ever dreamed of owning a Porsche? But not enough cash yet?Maybe some friends share the same dream. I created the UX design for mobile app and marketing website.",path:"porsche",date:"2016",collaboration:"Achtung! / Studio Kraftwerk",services:["UX Design"]},{title:"The Boyscouts",images:["boyscouts/bs1.png"],description:"The Boyscouts offers boutique, affordable jewelry. I redesigned and built their e-commerce platform (based on Shopify).",path:"boyscouts",url:"http://theboyscouts.com",date:"2016",services:["UX Design","Visual design","Concept","Front-end Development"]},{title:"TIS.tv",images:["tis/tis1.png","tis/tis2.png","tis/tis3.png","tis/tis4.png"],description:"The Innovation Station is a global platform presenting the best videos on social and technological innovation. Webby Honoree Best Visual Design - Function",path:"tis-tv",url:"http://tis.tv",date:"2016",collaboration:"Festina",services:["UX Design","Visual design","Concept"]},{title:"Rotterdam.info",images:["rotterdam/rotterdam1.png","rotterdam/rotterdam2.png","rotterdam/rotterdam3.png","rotterdam/rotterdam4.png"],description:"Rotterdam.info is the place to go if you want to know what's on in Rotterdam. When Rotterdam Partners got a new identity by Studio Dumbar, I redesigned their online presence.",path:"rotterdam-info",url:"http://rotterdam.info",collaboration:"Studio Dumbar",date:"2015",services:["UX Design","Visual design","Concept"]},{title:"HBO",images:["hbo/hbo1.png","hbo/hbo2.png","hbo/hbo3.png","hbo/hbo4.png","hbo/hbo5.png"],description:"It's not TV, it's HBO. Together with Digital agency Tam Tam (Part of Dept) we provided HBO with a new online identity and strategy. In the rapidly changing world of television, it’s important for a top player like HBO to stand out, especially online. The result is a lean and clear website where the images embody HBO’s identity and what they have to offer.",path:"hbo",url:"http://itshbo.nl",date:"2014",collaboration:"Tam Tam (Dept).",services:["UX Design","Visual design","Concept"]},{title:"Fontanel",description:"I founded Fontanel, supporting Dutch creative careers through exclusive magazine content, a job board, an active community and collaborations with brands ranging between Adobe and Habbekrats.",images:["fontanel/fontanel1.png","fontanel/fontanel2.png","fontanel/fontanel3.png","fontanel/fontanel4.png"],date:"2006 - 2014",services:["Founder","UX Design","Editor","Janitor"]}];exports.default=e;
},{}],"8evg":[function(require,module,exports) {
function e(e){return r(e)||t(e)||n()}function n(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function t(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function r(e){if(Array.isArray(e)){for(var n=0,t=new Array(e.length);n<e.length;n++)t[n]=e[n];return t}}var o=document.querySelector("canvas"),i=o.parentElement.clientWidth,a=o.parentElement.clientHeight,c=document.querySelector(".wrapper"),d=function(e,n){return Math.min(e,n)/Math.max(e,n)},u=new THREE.Scene;u.background=new THREE.Color(window.getComputedStyle(document.body).backgroundColor);var s=new THREE.PerspectiveCamera(40,d(i,a),1,1e3);s.position.set(20,0,5),s.lookAt(u.position);var w=new THREE.WebGLRenderer({canvas:o});w.setPixelRatio(window.devicePixelRatio),w.setSize(i,a);var l=new THREE.MeshBasicMaterial({color:16711935,wireframe:!0}),m=new THREE.BoxGeometry(3,4,8,2,3,4),f=new THREE.Mesh(m,l);function h(){requestAnimationFrame(h),f.rotation.x+=.01,f.rotation.y+=.01,w.render(u,s)}u.add(f),h();var v=window.innerHeight,E=Math.tan(Math.PI/180*s.fov/2);function y(e){requestAnimationFrame(function(){var e=window.matchMedia("(min-width: 96ch)").matches,n=e?window.innerWidth-c.clientWidth:window.innerWidth,t=e?window.innerHeight:.75*window.innerHeight;s.aspect=d(n,t),s.updateProjectionMatrix(),s.lookAt(u.position),w.setSize(n,t),w.render(u,s)})}window.addEventListener("resize",y,!1);var p=document.querySelectorAll(".contact a");function b(e){window.location=e.href}var g=function(){var n=e(p).indexOf(document.activeElement);return n>=0?n:0},k=function(n){return e(p).includes(n)};function H(e){var n,t=p.length-1,r=k(document.activeElement)?g():-1;return 37===e&&(n=r<=0?t:r-1),39===e&&(n=r>=t?0:r+1),p[n]}window.addEventListener("keydown",function(e){switch(e.keyCode){case 49:p[0].focus();break;case 50:p[1].focus();break;case 51:p[2].focus();break;case 52:p[3].focus();break;case 37:case 39:H(e.keyCode).focus();break;case 13:b(document.activeElement)}});
},{}],"A2T1":[function(require,module,exports) {
"use strict";var e=n(require("slugify")),t=n(require("~/content/projects"));function n(e){return e&&e.__esModule?e:{default:e}}require("./src/intro");var c=document.createDocumentFragment(),a=document.createRange().createContextualFragment("<ol></ol>"),r=function(e){return document.querySelector(e)},o=function(e){if(e.length>0)return e.map(function(e){return'<figure class="'.concat(e.search(/\D\.png$/g)>=0?"mobile":"desktop",'"><img src="/').concat(e,'"/></figure>')}).join("")},i=function(t){var n=t.title,c=t.description,a=t.images,r=t.collaboration,i=t.services,l=t.date,u=t.url,d=(0,e.default)(n),s=u?'<br><a href="'.concat(u,'">Visit</a>'):"",p=l?"Year: ".concat(l,"<br>"):"",f=r?"With: ".concat(r,"<br>"):"",g=i?"Services: ".concat(i.join(", "),"<br>"):"",m=o(a),h='\n  <article id="'.concat(d,'" class="project">\n    <div class="project-info">\n      <h1 class="project-title listheader">').concat(n,"</h1>\n      <p>").concat(c,'</p>\n      <p class="project-meta">\n      ').concat(g,"\n      ").concat(f,"\n      ").concat(p,"\n      ").concat(s,'\n      </p>\n    </div>\n\n    <div class="project-gallery">\n      ').concat(m,"\n    </div>\n  </article>\n  ");return document.createRange().createContextualFragment(h)},l=function(t){var n='\n    <li><a href="#'.concat((0,e.default)(t.title),'">').concat(t.title,"</a></li>\n  ");return document.createRange().createContextualFragment(n)};void 0!==t.default&&(t.default.forEach(function(e){var t=i(e),n=l(e);a.querySelector("ol").appendChild(n),c.appendChild(t)}),r("#selected-work").appendChild(a),r(".projects").appendChild(c));
},{"slugify":"/Hfe","~/content/projects":"z9iP","./src/intro":"8evg"}]},{},["A2T1"], null)