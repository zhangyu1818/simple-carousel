!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Carousel=e():t.Carousel=e()}(window,function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=5)}([function(t,e,n){var r=n(1);"string"==typeof r&&(r=[[t.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};n(3)(r,o);r.locals&&(t.exports=r.locals)},function(t,e,n){(e=t.exports=n(2)(!1)).push([t.i,'.carousel_2fjGh {\n  font-size: 0;\n  overflow: hidden;\n  cursor: pointer;\n  position: relative; }\n  .carousel_2fjGh .scroll_V8kaT {\n    will-change: transform;\n    position: relative;\n    z-index: -1;\n    width: -webkit-max-content;\n    width: -moz-max-content;\n    width: max-content;\n    white-space: nowrap;\n    overflow: hidden;\n    left: -100%;\n    height: 100%; }\n    .carousel_2fjGh .scroll_V8kaT:after {\n      content: \'\';\n      clear: both; }\n    .carousel_2fjGh .scroll_V8kaT .slider_2cCjl {\n      float: left;\n      background: center/cover no-repeat; }\n  .carousel_2fjGh .pagination_2M5FQ {\n    position: absolute;\n    font-size: 0;\n    width: 100%;\n    left: 0;\n    bottom: 20px;\n    text-align: center; }\n    .carousel_2fjGh .pagination_2M5FQ .dot_30g-o {\n      display: inline-block;\n      width: 10px;\n      height: 10px;\n      border-radius: 50%;\n      background: rgba(187, 187, 187, 0.6); }\n      .carousel_2fjGh .pagination_2M5FQ .dot_30g-o + .dot_30g-o {\n        margin-left: 10px; }\n      .carousel_2fjGh .pagination_2M5FQ .dot_30g-o.current_3q1Rd {\n        background: rgba(102, 102, 102, 0.7); }\n  .carousel_2fjGh .button_1t8u7 {\n    width: 50px;\n    height: 50px;\n    border-radius: 50%;\n    background: rgba(31, 45, 61, 0.11) center/30px no-repeat content-box;\n    display: inline-block;\n    position: absolute;\n    top: calc(50% - 25px);\n    z-index: 1;\n    transition: all 0.5s;\n    opacity: 0; }\n    .carousel_2fjGh .button_1t8u7:hover {\n      background-color: rgba(31, 45, 61, 0.4); }\n    .carousel_2fjGh .button_1t8u7.prev-button_3h3tp {\n      left: -50px;\n      background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAQAAABLCVATAAAAdElEQVR4Ae3MgQWAUBSG0StStE0hSEBEIKBlmikAAgRoizaIRCp9DfF+Ee8McMz7kkdErGhCRiYSRQMwEyiah07R3JrmotU0jaI5Nc1BZS4YAIDe3FBxAnBQqKpdWeWqalNWqapaddVCoKh2MnNHTWl/4Xkvt7enksKM+HYAAAAASUVORK5CYII="); }\n    .carousel_2fjGh .button_1t8u7.next-button_2BsIZ {\n      right: -50px;\n      background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAQAAABLCVATAAAAdElEQVR4Ae3MgQWAUABF0SopABGhdSIE0FQBQgQEBAiCtgiEoDkKN2mE/6L4Z4DjvM2yCIkUjc/ETGDaeAwAxhUuPaiqTlA9lFXzyarWVS2P0azJ2AE4yE2aVNVsiiZRNauiiTWNzyJoblScguZGSeH8kWVdfkiqCeFvghMAAAAASUVORK5CYII="); }\n  .carousel_2fjGh:hover .button_1t8u7 {\n    opacity: 1; }\n    .carousel_2fjGh:hover .button_1t8u7.prev-button_3h3tp {\n      left: 10px; }\n    .carousel_2fjGh:hover .button_1t8u7.next-button_2BsIZ {\n      right: 10px; }\n',""]),e.locals={carousel:"carousel_2fjGh",scroll:"scroll_V8kaT",slider:"slider_2cCjl",pagination:"pagination_2M5FQ",dot:"dot_30g-o",current:"current_3q1Rd",button:"button_1t8u7","prev-button":"prev-button_3h3tp","next-button":"next-button_2BsIZ"}},function(t,e,n){"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var n=function(t,e){var n=t[1]||"",r=t[3];if(!r)return n;if(e&&"function"==typeof btoa){var o=(i=r,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),a=r.sources.map(function(t){return"/*# sourceURL="+r.sourceRoot+t+" */"});return[n].concat(a).concat([o]).join("\n")}var i;return[n].join("\n")}(e,t);return e[2]?"@media "+e[2]+"{"+n+"}":n}).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var r={},o=0;o<this.length;o++){var a=this[o][0];null!=a&&(r[a]=!0)}for(o=0;o<t.length;o++){var i=t[o];null!=i[0]&&r[i[0]]||(n&&!i[2]?i[2]=n:n&&(i[2]="("+i[2]+") and ("+n+")"),e.push(i))}},e}},function(t,e,n){var r,o,a={},i=(r=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===o&&(o=r.apply(this,arguments)),o}),s=function(t){var e={};return function(t,n){if("function"==typeof t)return t();if(void 0===e[t]){var r=function(t,e){return e?e.querySelector(t):document.querySelector(t)}.call(this,t,n);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(t){r=null}e[t]=r}return e[t]}}(),c=null,u=0,l=[],f=n(4);function d(t,e){for(var n=0;n<t.length;n++){var r=t[n],o=a[r.id];if(o){o.refs++;for(var i=0;i<o.parts.length;i++)o.parts[i](r.parts[i]);for(;i<r.parts.length;i++)o.parts.push(b(r.parts[i],e))}else{var s=[];for(i=0;i<r.parts.length;i++)s.push(b(r.parts[i],e));a[r.id]={id:r.id,refs:1,parts:s}}}}function p(t,e){for(var n=[],r={},o=0;o<t.length;o++){var a=t[o],i=e.base?a[0]+e.base:a[0],s={css:a[1],media:a[2],sourceMap:a[3]};r[i]?r[i].parts.push(s):n.push(r[i]={id:i,parts:[s]})}return n}function h(t,e){var n=s(t.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=l[l.length-1];if("top"===t.insertAt)r?r.nextSibling?n.insertBefore(e,r.nextSibling):n.appendChild(e):n.insertBefore(e,n.firstChild),l.push(e);else if("bottom"===t.insertAt)n.appendChild(e);else{if("object"!=typeof t.insertAt||!t.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var o=s(t.insertAt.before,n);n.insertBefore(e,o)}}function v(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t);var e=l.indexOf(t);e>=0&&l.splice(e,1)}function m(t){var e=document.createElement("style");if(void 0===t.attrs.type&&(t.attrs.type="text/css"),void 0===t.attrs.nonce){var r=function(){0;return n.nc}();r&&(t.attrs.nonce=r)}return g(e,t.attrs),h(t,e),e}function g(t,e){Object.keys(e).forEach(function(n){t.setAttribute(n,e[n])})}function b(t,e){var n,r,o,a;if(e.transform&&t.css){if(!(a="function"==typeof e.transform?e.transform(t.css):e.transform.default(t.css)))return function(){};t.css=a}if(e.singleton){var i=u++;n=c||(c=m(e)),r=A.bind(null,n,i,!1),o=A.bind(null,n,i,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(t){var e=document.createElement("link");return void 0===t.attrs.type&&(t.attrs.type="text/css"),t.attrs.rel="stylesheet",g(e,t.attrs),h(t,e),e}(e),r=function(t,e,n){var r=n.css,o=n.sourceMap,a=void 0===e.convertToAbsoluteUrls&&o;(e.convertToAbsoluteUrls||a)&&(r=f(r));o&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var i=new Blob([r],{type:"text/css"}),s=t.href;t.href=URL.createObjectURL(i),s&&URL.revokeObjectURL(s)}.bind(null,n,e),o=function(){v(n),n.href&&URL.revokeObjectURL(n.href)}):(n=m(e),r=function(t,e){var n=e.css,r=e.media;r&&t.setAttribute("media",r);if(t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}.bind(null,n),o=function(){v(n)});return r(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;r(t=e)}else o()}}t.exports=function(t,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(e=e||{}).attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||"boolean"==typeof e.singleton||(e.singleton=i()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var n=p(t,e);return d(n,e),function(t){for(var r=[],o=0;o<n.length;o++){var i=n[o];(s=a[i.id]).refs--,r.push(s)}t&&d(p(t,e),e);for(o=0;o<r.length;o++){var s;if(0===(s=r[o]).refs){for(var c=0;c<s.parts.length;c++)s.parts[c]();delete a[s.id]}}}};var y,w=(y=[],function(t,e){return y[t]=e,y.filter(Boolean).join("\n")});function A(t,e,n,r){var o=n?"":r.css;if(t.styleSheet)t.styleSheet.cssText=w(e,o);else{var a=document.createTextNode(o),i=t.childNodes;i[e]&&t.removeChild(i[e]),i.length?t.insertBefore(a,i[e]):t.appendChild(a)}}},function(t,e){t.exports=function(t){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var n=e.protocol+"//"+e.host,r=n+e.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(t,e){var o,a=e.trim().replace(/^"(.*)"$/,function(t,e){return e}).replace(/^'(.*)'$/,function(t,e){return e});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(a)?t:(o=0===a.indexOf("//")?a:0===a.indexOf("/")?n+a:r+a.replace(/^\.\//,""),"url("+JSON.stringify(o)+")")})}},function(t,e,n){"use strict";n.r(e);var r=n(0),o=n.n(r);function a(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=[],r=!0,o=!1,a=void 0;try{for(var i,s=t[Symbol.iterator]();!(r=(i=s.next()).done)&&(n.push(i.value),!e||n.length!==e);r=!0);}catch(t){o=!0,a=t}finally{try{r||null==s.return||s.return()}finally{if(o)throw a}}return n}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var i={Linear:function(t,e,n,r){return n*t/r+e},Quad:{easeIn:function(t,e,n,r){return n*(t/=r)*t+e},easeOut:function(t,e,n,r){return-n*(t/=r)*(t-2)+e},easeInOut:function(t,e,n,r){return(t/=r/2)<1?n/2*t*t+e:-n/2*(--t*(t-2)-1)+e}},Cubic:{easeIn:function(t,e,n,r){return n*(t/=r)*t*t+e},easeOut:function(t,e,n,r){return n*((t=t/r-1)*t*t+1)+e},easeInOut:function(t,e,n,r){return(t/=r/2)<1?n/2*t*t*t+e:n/2*((t-=2)*t*t+2)+e}},Quart:{easeIn:function(t,e,n,r){return n*(t/=r)*t*t*t+e},easeOut:function(t,e,n,r){return-n*((t=t/r-1)*t*t*t-1)+e},easeInOut:function(t,e,n,r){return(t/=r/2)<1?n/2*t*t*t*t+e:-n/2*((t-=2)*t*t*t-2)+e}},Quint:{easeIn:function(t,e,n,r){return n*(t/=r)*t*t*t*t+e},easeOut:function(t,e,n,r){return n*((t=t/r-1)*t*t*t*t+1)+e},easeInOut:function(t,e,n,r){return(t/=r/2)<1?n/2*t*t*t*t*t+e:n/2*((t-=2)*t*t*t*t+2)+e}},Sine:{easeIn:function(t,e,n,r){return-n*Math.cos(t/r*(Math.PI/2))+n+e},easeOut:function(t,e,n,r){return n*Math.sin(t/r*(Math.PI/2))+e},easeInOut:function(t,e,n,r){return-n/2*(Math.cos(Math.PI*t/r)-1)+e}},Expo:{easeIn:function(t,e,n,r){return 0==t?e:n*Math.pow(2,10*(t/r-1))+e},easeOut:function(t,e,n,r){return t==r?e+n:n*(1-Math.pow(2,-10*t/r))+e},easeInOut:function(t,e,n,r){return 0==t?e:t==r?e+n:(t/=r/2)<1?n/2*Math.pow(2,10*(t-1))+e:n/2*(2-Math.pow(2,-10*--t))+e}},Circ:{easeIn:function(t,e,n,r){return-n*(Math.sqrt(1-(t/=r)*t)-1)+e},easeOut:function(t,e,n,r){return n*Math.sqrt(1-(t=t/r-1)*t)+e},easeInOut:function(t,e,n,r){return(t/=r/2)<1?-n/2*(Math.sqrt(1-t*t)-1)+e:n/2*(Math.sqrt(1-(t-=2)*t)+1)+e}},Elastic:{easeIn:function(t,e,n,r,o,a){var i;return 0==t?e:1==(t/=r)?e+n:(void 0===a&&(a=.3*r),!o||o<Math.abs(n)?(i=a/4,o=n):i=a/(2*Math.PI)*Math.asin(n/o),-o*Math.pow(2,10*(t-=1))*Math.sin((t*r-i)*(2*Math.PI)/a)+e)},easeOut:function(t,e,n,r,o,a){var i;return 0==t?e:1==(t/=r)?e+n:(void 0===a&&(a=.3*r),!o||o<Math.abs(n)?(o=n,i=a/4):i=a/(2*Math.PI)*Math.asin(n/o),o*Math.pow(2,-10*t)*Math.sin((t*r-i)*(2*Math.PI)/a)+n+e)},easeInOut:function(t,e,n,r,o,a){var i;return 0==t?e:2==(t/=r/2)?e+n:(void 0===a&&(a=r*(.3*1.5)),!o||o<Math.abs(n)?(o=n,i=a/4):i=a/(2*Math.PI)*Math.asin(n/o),t<1?o*Math.pow(2,10*(t-=1))*Math.sin((t*r-i)*(2*Math.PI)/a)*-.5+e:o*Math.pow(2,-10*(t-=1))*Math.sin((t*r-i)*(2*Math.PI)/a)*.5+n+e)}},Back:{easeIn:function(t,e,n,r,o){return void 0===o&&(o=1.70158),n*(t/=r)*t*((o+1)*t-o)+e},easeOut:function(t,e,n,r,o){return void 0===o&&(o=1.70158),n*((t=t/r-1)*t*((o+1)*t+o)+1)+e},easeInOut:function(t,e,n,r,o){return void 0===o&&(o=1.70158),(t/=r/2)<1?n/2*(t*t*((1+(o*=1.525))*t-o))+e:n/2*((t-=2)*t*((1+(o*=1.525))*t+o)+2)+e}},Bounce:{easeIn:function(t,e,n,r){return n-i.Bounce.easeOut(r-t,0,n,r)+e},easeOut:function(t,e,n,r){return(t/=r)<1/2.75?n*(7.5625*t*t)+e:t<2/2.75?n*(7.5625*(t-=1.5/2.75)*t+.75)+e:t<2.5/2.75?n*(7.5625*(t-=2.25/2.75)*t+.9375)+e:n*(7.5625*(t-=2.625/2.75)*t+.984375)+e},easeInOut:function(t,e,n,r){return t<r/2?.5*i.Bounce.easeIn(2*t,0,n,r)+e:.5*i.Bounce.easeOut(2*t-r,0,n,r)+.5*n+e}}},s=function(t){var e=a(t.split("."),2),n=e[0],r=e[1];return r?i[n][r]:i.Linear};function c(t){return function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function u(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var l=function(t,e,n,r,a,i){var s={};Object.keys(i).forEach(function(t){s[t]=i[t]instanceof Array?i[t].join(" "):i[t]});var c=s.imgClass,u=void 0===c?"":c,l=s.paginationClass,f=void 0===l?"":l,d=s.dotClass,p=void 0===d?"":d,h=s.prevButtonClass,v=void 0===h?"":h,m=s.nextButtonClass,g=void 0===m?"":m,b=t.map(function(t){return'<div class="'.concat(o.a.slider," ").concat(u,'" style="background-image: url(\'').concat(t,"');width: ").concat(e,";height: ").concat(n,';"></div>')});return'<div class="'.concat(o.a.carousel,'" style="width: ').concat(e,";height: ").concat(n,';">\n                <div class="').concat(o.a.scroll,'">').concat(b.join(""),"</div>\n                ").concat(r?function(t,e,n){for(var r='<div class="'.concat(o.a.pagination," ").concat(e,'">'),a=0;a<t;a++)r+='<span data-index="'.concat(a,'" class="').concat(o.a.dot).concat(0===a?" "+o.a.current:""," ").concat(n,'"></span>');return r+="</div>"}(t.length-2,f,p):"","\n                ").concat(a?function(t,e){return'<span class="'.concat(o.a.button," ").concat(o.a["prev-button"]," ").concat(t,'"></span><span class="').concat(o.a.button," ").concat(o.a["next-button"]," ").concat(e,'"></span>')}(v,g):"","\n            </div>")};e.default=function t(e,n){var r=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),u(this,"startInfo",{pos:0,timeStamp:0,isDrag:!1}),u(this,"moveInfo",{pos:0,timeStamp:0,isMove:!1}),u(this,"prevOffset",0),u(this,"currentOffset",0),u(this,"currentIndex",0),u(this,"dotsIndex",0),u(this,"animateTimer",0),u(this,"animateCompleted",!0),u(this,"autoplayTimer",0),u(this,"prevScale",1),u(this,"scale",1),u(this,"destroy",function(){window.removeEventListener("mousedown",r.onDragStart),window.removeEventListener("mousemove",r.onDragMove),window.removeEventListener("mouseup",r.onDragEnd),window.removeEventListener("touchstart",r.onDragStart),window.removeEventListener("touchmove",r.onDragMove),window.removeEventListener("touchend",r.onDragEnd),r.carouselWrapper.removeEventListener("click",r.onClickButton),r.carouselWrapper.innerHTML=""}),u(this,"onClickButton",function(t){t.stopPropagation(),t.preventDefault();var e=t.target;if(e.classList.contains(o.a.button)&&r.animateCompleted)e.classList.contains(o.a["prev-button"])?++r.currentIndex:--r.currentIndex,r.animate();else if(e.classList.contains(o.a.dot)){var n=e.dataset.index,a=void 0===n?0:n;r.animate(-a)}}),u(this,"onDragStart",function(t){t.stopPropagation(),r.preventDefault&&t.preventDefault();var e=t.target;if(e.classList.contains(o.a.carousel)&&r.carouselWrapper.contains(e)){r.animateTimer&&cancelAnimationFrame(r.animateTimer),r.autoplayTimer&&clearTimeout(r.autoplayTimer);var n=t.timeStamp,a=("mousedown"===t.type?t:t.touches[0]).pageX;r.startInfo.pos=a,r.startInfo.timeStamp=n,r.startInfo.isDrag=!0,r.moveInfo.isMove=!1,r.currentOffset<-(r.imgLength-1)*r.carouselWidth-r.carouselWidth/2?(r.currentOffset+=-r.minOffset,r.prevOffset=r.currentOffset,r.scrollEle.style.transform="translate3d(".concat(r.currentOffset,"px,0,0)")):r.currentOffset>r.carouselWidth/2&&(r.currentOffset+=r.minOffset,r.prevOffset=r.currentOffset,r.scrollEle.style.transform="translate3d(".concat(r.currentOffset,"px,0,0)")),r.currentIndex=Math.round(r.currentOffset/r.carouselWidth)}}),u(this,"onDragMove",function(t){if(r.startInfo.isDrag){r.moveInfo.isMove=!0,t.stopPropagation(),r.preventDefault&&t.preventDefault();var e=t.timeStamp,n=("mousemove"===t.type?t:t.touches[0]).pageX;r.moveInfo.pos=n,r.moveInfo.timeStamp=e;var o=r.moveInfo.pos-r.startInfo.pos;if(r.currentOffset=o+r.prevOffset,r.scrollEle.style.transform="translate3d(".concat(r.currentOffset,"px,0,0)"),r.enableScale){r.scale=r.prevScale-Math.abs(o)/r.carouselWidth/2;var a=1-r.scale;r.sliders.forEach(function(t){t.style.transform="scale(".concat(r.scale,")"),t.style.boxShadow="0 ".concat(52.5*a,"px ").concat(115*a,"px ").concat(-15*a,"px rgba(50, 50, 73, 0.5), 0 ").concat(27.5*a,"px ").concat(65*a,"px ").concat(-27.5*a,"px rgba(0, 0, 0, 0.6)")})}var i=Math.round(r.currentOffset/r.carouselWidth)%r.imgLength;r.setDotsIndex(1===i?1-r.imgLength:i)}}),u(this,"onDragEnd",function(t){if(r.startInfo.isDrag){t.stopPropagation(),r.preventDefault&&t.preventDefault(),r.startInfo.isDrag=!1,r.moveInfo.isMove||(r.moveInfo.pos=r.startInfo.pos),r.prevOffset=r.currentOffset,r.enableScale&&(r.prevScale=r.scale);var e=(r.moveInfo.pos-r.startInfo.pos)/(r.moveInfo.timeStamp-r.startInfo.timeStamp);(0!==Math.abs(e)&&(e<0?Math.abs(r.currentOffset)%r.carouselWidth>r.carouselWidth/2:r.currentOffset<0?r.carouselWidth-Math.abs(r.currentOffset)%r.carouselWidth>r.carouselWidth/2:r.currentOffset>r.carouselWidth/2)||Math.abs(e)>r.momentum)&&(e>0?r.currentIndex++:r.currentIndex--),r.animate()}}),u(this,"setDotsIndex",function(t){var e,n,a;r.dotsIndex=Math.round((e=r.currentOffset,n=r.minOffset+r.carouselWidth,a=0,Math.min(Math.max(n,e),a)/r.carouselWidth)),r.dots.forEach(function(e,n){return n===Math.abs(void 0!==t?t:r.dotsIndex)?e.classList.add(o.a.current):e.classList.remove(o.a.current)})}),u(this,"autoPlay",function(){r.autoplayTimer&&clearTimeout(r.autoplayTimer),r.autoplayTimer=window.setTimeout(function(){r.animate(--r.currentIndex)},r.autoplayDelay)}),u(this,"animate",function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:r.currentIndex;r.animateTimer&&cancelAnimationFrame(r.animateTimer);var e=Date.now(),n=r.duration,o=r.currentOffset,a=t*r.carouselWidth-r.prevOffset,i=r.scale,c=1-i;r.animateCompleted=!1,function u(){var l=(Date.now()-e)/1e3,f=s(r.tween)(l,o,a,n);if(r.scrollEle.style.transform="translate3d(".concat(f,"px,0,0)"),r.currentOffset=f,r.prevOffset=f,r.enableScale){var d=s(r.tween)(l,i,c,n);r.sliders.forEach(function(t){return t.style.transform="scale(".concat(d,")")}),r.scale=d,r.prevScale=d}var p=Math.round(f/r.carouselWidth)%r.imgLength;if(r.setDotsIndex(1===p?1-r.imgLength:p),l>=n){cancelAnimationFrame(r.animateTimer);var h=(t>=1?1-r.imgLength:t%r.imgLength)*r.carouselWidth;return r.animateCompleted=!0,r.currentIndex=Math.round(h/r.carouselWidth),r.currentOffset=h,r.prevOffset=h,r.scrollEle.style.transform="translate3d(".concat(h,"px,0,0)"),void(r.autoplay&&r.autoPlay())}r.animateTimer=requestAnimationFrame(u)}()});var a=n.width,i=void 0===a?"100vw":a,f=n.height,d=void 0===f?"50vh":f,p=n.element,h=n.duration,v=void 0===h?1:h,m=n.pagination,g=void 0===m||m,b=n.arrowButton,y=void 0===b||b,w=n.momentum,A=void 0===w?1:w,I=n.tween,x=void 0===I?"Quart.easeOut":I,M=n.autoplay,O=void 0===M||M,E=n.autoplayDelay,S=void 0===E?5:E,j=n.scale,_=void 0!==j&&j,L=n.customStyles,C=void 0===L?{}:L,D=n.preventDefault,T=void 0!==D&&D;if(this.carouselWrapper=document.querySelector(p),!this.carouselWrapper)throw new Error("can't find element");var k=[e[e.length-1]].concat(c(e),[e[0]]),B=this.carouselWrapper.getBoundingClientRect().width+"px";this.carouselWrapper.innerHTML=l(k,-1===i.indexOf("%")?i:B,d,g,y,C);var W=this.carouselWrapper.querySelector(".".concat(o.a.carousel)).getBoundingClientRect().width;this.carouselWidth=W,this.minOffset=-e.length*W,this.imgLength=e.length,this.duration=v,this.momentum=A,this.tween=x,this.autoplay=O,this.autoplayDelay=1e3*S,this.enableScale=_,this.preventDefault=T,this.scrollEle=document.querySelector("".concat(p," .").concat(o.a.scroll)),this.scrollEle.style.width=(e.length+2)*W+"px",this.dots=Array.prototype.slice.call(document.querySelectorAll("".concat(p," .").concat(o.a.dot))),this.sliders=Array.prototype.slice.call(document.querySelectorAll("".concat(p," .").concat(o.a.slider))),window.addEventListener("mousedown",this.onDragStart),window.addEventListener("mousemove",this.onDragMove),window.addEventListener("mouseup",this.onDragEnd),window.addEventListener("touchstart",this.onDragStart),window.addEventListener("touchmove",this.onDragMove),window.addEventListener("touchend",this.onDragEnd),this.carouselWrapper.addEventListener("click",this.onClickButton),O&&this.autoPlay()}}]).default});