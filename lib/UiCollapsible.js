/*!
 * Keen UI v0.8.9 (https://github.com/JosephusPaye/keen-ui)
 * (c) 2016 Josephus Paye II
 * Released under the MIT License.
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["UiCollapsible"] = factory();
	else
		root["Keen"] = root["Keen"] || {}, root["Keen"]["UiCollapsible"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(212);


/***/ },

/***/ 1:
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },

/***/ 2:
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if (media) {
			styleElement.setAttribute("media", media);
		}

		if (sourceMap) {
			// https://developer.chrome.com/devtools/docs/javascript-debugging
			// this makes source maps inside style tags work properly in Chrome
			css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },

/***/ 3:
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },

/***/ 4:
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },

/***/ 5:
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(31)
	  , defined = __webpack_require__(25);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },

/***/ 6:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(20)

	/* script */
	__vue_exports__ = __webpack_require__(16)

	/* template */
	var __vue_template__ = __webpack_require__(19)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/Shared/dev/libs/Keen-UI/src/UiIcon.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-e4d38184", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-e4d38184", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] UiIcon.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 7:
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(14)('wks')
	  , uid    = __webpack_require__(15)
	  , Symbol = __webpack_require__(4).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
	};

/***/ },

/***/ 8:
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },

/***/ 9:
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },

/***/ 10:
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },

/***/ 11:
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },

/***/ 12:
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(13)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },

/***/ 13:
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },

/***/ 14:
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(4)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },

/***/ 15:
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },

/***/ 16:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    name: 'ui-icon',

	    props: {
	        icon: {
	            type: String,
	            required: true
	        },
	        removeText: {
	            type: Boolean,
	            default: false
	        }
	    }
	};

/***/ },

/***/ 17:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof2 = __webpack_require__(37);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var trim = /^\s+|\s+$/g;
	var whitespace = /\s+/g;

	function interpret(input) {
	    return typeof input === 'string' ? input.replace(trim, '').split(whitespace) : input;
	}

	function classes(el) {
	    if (isElement(el)) {
	        return el.className.replace(trim, '').split(whitespace);
	    }

	    return [];
	}

	function set(el, input) {
	    if (isElement(el)) {
	        el.className = interpret(input).join(' ');
	    }
	}

	function add(el, input) {
	    var current = remove(el, input);
	    var values = interpret(input);

	    current.push.apply(current, values);
	    set(el, current);

	    return current;
	}

	function remove(el, input) {
	    var current = classes(el);
	    var values = interpret(input);

	    values.forEach(function (value) {
	        var i = current.indexOf(value);
	        if (i !== -1) {
	            current.splice(i, 1);
	        }
	    });

	    set(el, current);

	    return current;
	}

	function contains(el, input) {
	    var current = classes(el);
	    var values = interpret(input);

	    return values.every(function (value) {
	        return current.indexOf(value) !== -1;
	    });
	}

	function isElement(o) {
	    var elementObjects = (typeof HTMLElement === 'undefined' ? 'undefined' : (0, _typeof3.default)(HTMLElement)) === 'object';

	    return elementObjects ? o instanceof HTMLElement : isElementObject(o);
	}

	function isElementObject(o) {
	    return o && (typeof o === 'undefined' ? 'undefined' : (0, _typeof3.default)(o)) === 'object' && typeof o.nodeName === 'string' && o.nodeType === 1;
	}

	exports.default = {
	    add: add,
	    remove: remove,
	    contains: contains,
	    has: contains,
	    set: set,
	    get: classes
	};

/***/ },

/***/ 18:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(1)();
	// imports


	// module
	exports.push([module.id, "\n.ui-icon {\n  font-size: 24px;\n  width: 1em;\n  height: 1em;\n  display: inline-block;\n  cursor: inherit;\n  vertical-align: middle;\n}\n", ""]);

	// exports


/***/ },

/***/ 19:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('i', {
	    staticClass: "ui-icon material-icons",
	    class: [_vm.icon],
	    attrs: {
	      "aria-hidden": "true"
	    },
	    domProps: {
	      "textContent": _vm._s(_vm.removeText ? null : _vm.icon)
	    }
	  })
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-e4d38184", module.exports)
	  }
	}

/***/ },

/***/ 20:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(18);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(2)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-e4d38184!./../node_modules/stylus-loader/index.js!./../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./UiIcon.vue", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-e4d38184!./../node_modules/stylus-loader/index.js!./../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./UiIcon.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 21:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (el, binding, vnode, oldVnode) {
	    if (el) {
	        el.disabled = Boolean(binding.value);
	    }
	};

/***/ },

/***/ 22:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    props: {
	        id: String
	    },

	    methods: {
	        eventTargetsComponent: function eventTargetsComponent(eventTarget) {
	            if (eventTarget === undefined || this.id === eventTarget) {
	                return true;
	            }

	            return false;
	        }
	    }
	};

/***/ },

/***/ 23:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _UiRippleInk = __webpack_require__(49);

	var _UiRippleInk2 = _interopRequireDefault(_UiRippleInk);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    props: {
	        hideRippleInk: {
	            type: Boolean,
	            default: false
	        }
	    },

	    components: {
	        UiRippleInk: _UiRippleInk2.default
	    }
	};

/***/ },

/***/ 24:
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(3)
	  , createDesc = __webpack_require__(11);
	module.exports = __webpack_require__(12) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },

/***/ 25:
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },

/***/ 26:
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(3).setDesc
	  , has = __webpack_require__(10)
	  , TAG = __webpack_require__(7)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },

/***/ 27:
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },

/***/ 28:
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(32);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },

/***/ 29:
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(27);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },

/***/ 30:
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(4)
	  , core      = __webpack_require__(8)
	  , ctx       = __webpack_require__(29)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$export.F = 1;  // forced
	$export.G = 2;  // global
	$export.S = 4;  // static
	$export.P = 8;  // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	module.exports = $export;

/***/ },

/***/ 31:
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(9);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },

/***/ 32:
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },

/***/ 33:
/***/ function(module, exports) {

	module.exports = true;

/***/ },

/***/ 34:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(24);

/***/ },

/***/ 36:
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(38), __esModule: true };

/***/ },

/***/ 37:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Symbol = __webpack_require__(36)["default"];

	exports["default"] = function (obj) {
	  return obj && obj.constructor === _Symbol ? "symbol" : typeof obj;
	};

	exports.__esModule = true;

/***/ },

/***/ 38:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(44);
	__webpack_require__(43);
	module.exports = __webpack_require__(8).Symbol;

/***/ },

/***/ 39:
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var $ = __webpack_require__(3);
	module.exports = function(it){
	  var keys       = $.getKeys(it)
	    , getSymbols = $.getSymbols;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = $.isEnum
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))keys.push(key);
	  }
	  return keys;
	};

/***/ },

/***/ 40:
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(5)
	  , getNames  = __webpack_require__(3).getNames
	  , toString  = {}.toString;

	var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return getNames(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	module.exports.get = function getOwnPropertyNames(it){
	  if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
	  return getNames(toIObject(it));
	};

/***/ },

/***/ 41:
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(9);
	module.exports = Array.isArray || function(arg){
	  return cof(arg) == 'Array';
	};

/***/ },

/***/ 42:
/***/ function(module, exports, __webpack_require__) {

	var $         = __webpack_require__(3)
	  , toIObject = __webpack_require__(5);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = $.getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },

/***/ 43:
/***/ function(module, exports) {

	

/***/ },

/***/ 44:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var $              = __webpack_require__(3)
	  , global         = __webpack_require__(4)
	  , has            = __webpack_require__(10)
	  , DESCRIPTORS    = __webpack_require__(12)
	  , $export        = __webpack_require__(30)
	  , redefine       = __webpack_require__(34)
	  , $fails         = __webpack_require__(13)
	  , shared         = __webpack_require__(14)
	  , setToStringTag = __webpack_require__(26)
	  , uid            = __webpack_require__(15)
	  , wks            = __webpack_require__(7)
	  , keyOf          = __webpack_require__(42)
	  , $names         = __webpack_require__(40)
	  , enumKeys       = __webpack_require__(39)
	  , isArray        = __webpack_require__(41)
	  , anObject       = __webpack_require__(28)
	  , toIObject      = __webpack_require__(5)
	  , createDesc     = __webpack_require__(11)
	  , getDesc        = $.getDesc
	  , setDesc        = $.setDesc
	  , _create        = $.create
	  , getNames       = $names.get
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , setter         = false
	  , HIDDEN         = wks('_hidden')
	  , isEnum         = $.isEnum
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , useNative      = typeof $Symbol == 'function'
	  , ObjectProto    = Object.prototype;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(setDesc({}, 'a', {
	    get: function(){ return setDesc(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = getDesc(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  setDesc(it, key, D);
	  if(protoDesc && it !== ObjectProto)setDesc(ObjectProto, key, protoDesc);
	} : setDesc;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol.prototype);
	  sym._k = tag;
	  DESCRIPTORS && setter && setSymbolDesc(ObjectProto, tag, {
	    configurable: true,
	    set: function(value){
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    }
	  });
	  return sym;
	};

	var isSymbol = function(it){
	  return typeof it == 'symbol';
	};

	var $defineProperty = function defineProperty(it, key, D){
	  if(D && has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))setDesc(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return setDesc(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key);
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]
	    ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  var D = getDesc(it = toIObject(it), key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
	  return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
	  return result;
	};
	var $stringify = function stringify(it){
	  if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	  var args = [it]
	    , i    = 1
	    , $$   = arguments
	    , replacer, $replacer;
	  while($$.length > i)args.push($$[i++]);
	  replacer = args[1];
	  if(typeof replacer == 'function')$replacer = replacer;
	  if($replacer || !isArray(replacer))replacer = function(key, value){
	    if($replacer)value = $replacer.call(this, key, value);
	    if(!isSymbol(value))return value;
	  };
	  args[1] = replacer;
	  return _stringify.apply($JSON, args);
	};
	var buggyJSON = $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	});

	// 19.4.1.1 Symbol([description])
	if(!useNative){
	  $Symbol = function Symbol(){
	    if(isSymbol(this))throw TypeError('Symbol is not a constructor');
	    return wrap(uid(arguments.length > 0 ? arguments[0] : undefined));
	  };
	  redefine($Symbol.prototype, 'toString', function toString(){
	    return this._k;
	  });

	  isSymbol = function(it){
	    return it instanceof $Symbol;
	  };

	  $.create     = $create;
	  $.isEnum     = $propertyIsEnumerable;
	  $.getDesc    = $getOwnPropertyDescriptor;
	  $.setDesc    = $defineProperty;
	  $.setDescs   = $defineProperties;
	  $.getNames   = $names.get = $getOwnPropertyNames;
	  $.getSymbols = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !__webpack_require__(33)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	}

	var symbolStatics = {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    return keyOf(SymbolRegistry, key);
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	};
	// 19.4.2.2 Symbol.hasInstance
	// 19.4.2.3 Symbol.isConcatSpreadable
	// 19.4.2.4 Symbol.iterator
	// 19.4.2.6 Symbol.match
	// 19.4.2.8 Symbol.replace
	// 19.4.2.9 Symbol.search
	// 19.4.2.10 Symbol.species
	// 19.4.2.11 Symbol.split
	// 19.4.2.12 Symbol.toPrimitive
	// 19.4.2.13 Symbol.toStringTag
	// 19.4.2.14 Symbol.unscopables
	$.each.call((
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
	  'species,split,toPrimitive,toStringTag,unscopables'
	).split(','), function(it){
	  var sym = wks(it);
	  symbolStatics[it] = useNative ? sym : wrap(sym);
	});

	setter = true;

	$export($export.G + $export.W, {Symbol: $Symbol});

	$export($export.S, 'Symbol', symbolStatics);

	$export($export.S + $export.F * !useNative, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!useNative || buggyJSON), 'JSON', {stringify: $stringify});

	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },

/***/ 46:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _classlist = __webpack_require__(17);

	var _classlist2 = _interopRequireDefault(_classlist);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var startRipple = function startRipple(eventType, event) {
	    var holder = event.currentTarget;

	    if (!_classlist2.default.has(holder, 'ui-ripple-ink')) {
	        holder = holder.querySelector('.ui-ripple-ink');

	        if (!holder) {
	            return;
	        }
	    }

	    var prev = holder.getAttribute('data-ui-event');

	    if (prev && prev !== eventType) {
	        return;
	    }

	    holder.setAttribute('data-ui-event', eventType);

	    var rect = holder.getBoundingClientRect();
	    var x = event.offsetX;
	    var y;

	    if (x !== undefined) {
	        y = event.offsetY;
	    } else {
	        x = event.clientX - rect.left;
	        y = event.clientY - rect.top;
	    }

	    var ripple = document.createElement('div');
	    var max;

	    if (rect.width === rect.height) {
	        max = rect.width * 1.412;
	    } else {
	        max = Math.sqrt(rect.width * rect.width + rect.height * rect.height);
	    }

	    var dim = max * 2 + 'px';

	    ripple.style.width = dim;
	    ripple.style.height = dim;
	    ripple.style.marginLeft = -max + x + 'px';
	    ripple.style.marginTop = -max + y + 'px';

	    ripple.className = 'ripple';
	    holder.appendChild(ripple);

	    setTimeout(function () {
	        _classlist2.default.add(ripple, 'held');
	    }, 0);

	    var releaseEvent = eventType === 'mousedown' ? 'mouseup' : 'touchend';

	    var release = function release() {
	        document.removeEventListener(releaseEvent, release);

	        _classlist2.default.add(ripple, 'done');

	        setTimeout(function () {
	            holder.removeChild(ripple);

	            if (!holder.children.length) {
	                _classlist2.default.remove(holder, 'active');
	                holder.removeAttribute('data-ui-event');
	            }
	        }, 450);
	    };

	    document.addEventListener(releaseEvent, release);
	};

	var handleMouseDown = function handleMouseDown(e) {
	    if (e.button === 0) {
	        startRipple(e.type, e);
	    }
	};

	var handleTouchStart = function handleTouchStart(e) {
	    if (e.changedTouches) {
	        for (var i = 0; i < e.changedTouches.length; ++i) {
	            startRipple(e.type, e.changedTouches[i]);
	        }
	    }
	};

	exports.default = {
	    name: 'ui-ripple-ink',

	    props: {
	        trigger: {
	            required: false
	        }
	    },

	    data: function data() {
	        return {
	            currentTrigger: null
	        };
	    },


	    watch: {
	        trigger: function trigger() {
	            if (this.trigger) {
	                this.hook(this.triggerComputed);
	            }
	        }
	    },

	    mounted: function mounted() {
	        if (this.trigger) {
	            this.hook(this.triggerComputed);
	        }
	    },
	    beforeDestroy: function beforeDestroy() {
	        if (this.currentTrigger) {
	            this.unhook(this.currentTrigger);
	        }
	    },


	    computed: {
	        triggerComputed: function triggerComputed() {
	            if (this.trigger instanceof Function) {
	                return this.trigger();
	            } else {
	                return this.trigger;
	            }
	        }
	    },

	    methods: {
	        hook: function hook(el) {
	            if (el != this.currentTrigger) {
	                this.unhook(this.currentTrigger);
	            } else {
	                return;
	            }
	            if (el) {
	                el.addEventListener('touchstart', handleTouchStart);
	                el.addEventListener('mousedown', handleMouseDown);
	            };
	            this.currentTrigger = el;
	        },
	        unhook: function unhook(el) {
	            if (el) {
	                el.removeEventListener('mousedown', handleMouseDown);
	                el.removeEventListener('touchstart', handleTouchStart);
	            };
	            if (el === this.currentTrigger) {
	                this.currentTrigger = null;
	            };
	        }
	    }
	};

/***/ },

/***/ 48:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(1)();
	// imports


	// module
	exports.push([module.id, "\n.ui-ripple-ink {\n  display: block;\n  overflow: hidden;\n  border-radius: inherit;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  -webkit-mask-image: -webkit-radial-gradient(circle, #fff, #000);\n}\n.ui-ripple-ink .ripple {\n  position: absolute;\n  width: 0;\n  height: 0;\n  pointer-events: none;\n  user-select: none;\n  border-radius: 50%;\n  background-color: currentColor;\n  background-clip: padding-box;\n  opacity: 0.2;\n  transform: scale(0);\n  transition: transform 0.4s ease-out, opacity 0.4s ease-out;\n}\n.ui-ripple-ink .ripple.held {\n  opacity: 0.4;\n  transform: scale(1);\n}\n.ui-ripple-ink .ripple.done {\n  opacity: 0 !important;\n}\n", ""]);

	// exports


/***/ },

/***/ 49:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(51)

	/* script */
	__vue_exports__ = __webpack_require__(46)

	/* template */
	var __vue_template__ = __webpack_require__(50)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/Shared/dev/libs/Keen-UI/src/UiRippleInk.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-79e522a1", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-79e522a1", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] UiRippleInk.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 50:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('div', {
	    staticClass: "ui-ripple-ink"
	  })
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-79e522a1", module.exports)
	  }
	}

/***/ },

/***/ 51:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(48);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(2)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-79e522a1!./../node_modules/stylus-loader/index.js!./../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./UiRippleInk.vue", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-79e522a1!./../node_modules/stylus-loader/index.js!./../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./UiRippleInk.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 98:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Fast UUID generator, RFC4122 version 4 compliant.
	 * @author Jeff Ward (jcward.com).
	 * @license MIT license
	 * @link http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136
	 **/

	var lut = [];

	for (var i = 0; i < 256; i++) {
	    lut[i] = (i < 16 ? '0' : '') + i.toString(16);
	}

	var generate = function generate() {
	    var d0 = Math.random() * 0xffffffff | 0;
	    var d1 = Math.random() * 0xffffffff | 0;
	    var d2 = Math.random() * 0xffffffff | 0;
	    var d3 = Math.random() * 0xffffffff | 0;

	    return lut[d0 & 0xff] + lut[d0 >> 8 & 0xff] + lut[d0 >> 16 & 0xff] + lut[d0 >> 24 & 0xff] + '-' + lut[d1 & 0xff] + lut[d1 >> 8 & 0xff] + '-' + lut[d1 >> 16 & 0x0f | 0x40] + lut[d1 >> 24 & 0xff] + '-' + lut[d2 & 0x3f | 0x80] + lut[d2 >> 8 & 0xff] + '-' + lut[d2 >> 16 & 0xff] + lut[d2 >> 24 & 0xff] + lut[d3 & 0xff] + lut[d3 >> 8 & 0xff] + lut[d3 >> 16 & 0xff] + lut[d3 >> 24 & 0xff];
	};

	var short = function short(prefix) {
	    prefix = prefix || '';

	    var uuid = generate();

	    return prefix + uuid.split('-')[0];
	};

	exports.default = {
	    generate: generate,
	    short: short
	};

/***/ },

/***/ 148:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _UiIcon = __webpack_require__(6);

	var _UiIcon2 = _interopRequireDefault(_UiIcon);

	var _uuid = __webpack_require__(98);

	var _uuid2 = _interopRequireDefault(_uuid);

	var _disabled = __webpack_require__(21);

	var _disabled2 = _interopRequireDefault(_disabled);

	var _ShowsRippleInk = __webpack_require__(23);

	var _ShowsRippleInk2 = _interopRequireDefault(_ShowsRippleInk);

	var _ReceivesTargetedEvent = __webpack_require__(22);

	var _ReceivesTargetedEvent2 = _interopRequireDefault(_ReceivesTargetedEvent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    name: 'ui-collapsible',

	    props: {
	        id: String,
	        open: {
	            type: Boolean,
	            default: false
	        },
	        header: String,
	        transition: {
	            type: String,
	            default: 'ui-collapsible-toggle'
	        },
	        hideIcon: {
	            type: Boolean,
	            default: false
	        },
	        disabled: {
	            type: Boolean,
	            default: false
	        }
	    },

	    data: function data() {
	        return {
	            height: 0,
	            isReady: false,
	            rid: this.id,
	            currentOpen: this.open
	        };
	    },


	    computed: {
	        icon: function icon() {
	            return this.open ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
	        },
	        calculatedHeight: function calculatedHeight() {
	            if (this.height === 0) {
	                return 'initial';
	            }

	            return this.height + 'px';
	        }
	    },

	    watch: {
	        currentOpen: function currentOpen() {
	            this.$emit('toggled', this.currentOpen);
	        },
	        open: function open() {
	            if (this.open != this.currentOpen) {
	                this.currentOpen = this.open;
	            }
	        }
	    },

	    created: function created() {
	        this.rid = this.id || _uuid2.default.short('ui-collapsible-');
	    },
	    ready: function ready() {
	        this.isReady = true;
	        this.setHeight();
	    },
	    mounted: function mounted() {
	        var _this = this;

	        this.$nextTick(function () {
	            var _arr = ['reset'];

	            for (var _i = 0; _i < _arr.length; _i++) {
	                var event = _arr[_i];
	                _this.$on('ui-input::' + event, _this['ui-input::' + event]);
	            }
	        });
	    },
	    beforeDestroy: function beforeDestroy() {
	        var _arr2 = ['reset'];

	        for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
	            var event = _arr2[_i2];
	            this.$off('ui-input::' + event, this['ui-input::' + event]);
	        }
	    },


	    methods: {
	        'ui-collapsible::refresh-height': function uiCollapsibleRefreshHeight(id) {
	            if (!this.eventTargetsComponent(id)) {
	                return;
	            }

	            this.$nextTick(this.setHeight);
	        },

	        toggleMenu: function toggleMenu() {
	            if (this.disabled) {
	                return;
	            }

	            this.currentOpen = !this.currentOpen;
	        },
	        setHeight: function setHeight() {
	            var body = this.$refs.body;

	            body.style.display = 'block';
	            this.height = body.scrollHeight;

	            if (!this.currentOpen) {
	                body.style.display = 'none';
	            }
	        }
	    },

	    components: {
	        UiIcon: _UiIcon2.default
	    },

	    directives: {
	        disabled: _disabled2.default
	    },

	    mixins: [_ShowsRippleInk2.default, _ReceivesTargetedEvent2.default],

	    transitions: {
	        'ui-collapsible-toggle': {
	            afterEnter: function afterEnter() {
	                this.$emit('opened');
	                this.setHeight();
	            },
	            afterLeave: function afterLeave() {
	                this.$emit('closed');
	            }
	        }
	    }
	};

/***/ },

/***/ 195:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(1)();
	// imports


	// module
	exports.push([module.id, "\n.ui-collapsible-header-content {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.ui-collapsible {\n  font-family: Roboto, -apple-system, BlinkMacSystemFont, \"Segoe UI\", \"Oxygen\", \"Ubuntu\", \"Cantarell\", \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif;\n  width: 100%;\n  margin-bottom: 8px;\n}\n.ui-collapsible-header {\n  position: relative;\n  margin: 0;\n  width: 100%;\n  border: none;\n  line-height: 1;\n  text-align: left;\n  font-family: Roboto, -apple-system, BlinkMacSystemFont, \"Segoe UI\", \"Oxygen\", \"Ubuntu\", \"Cantarell\", \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif;\n  display: flex;\n  height: 0;\n  min-height: 48px;\n  padding: 8px 16px;\n  align-items: center;\n  touch-action: manipulation;\n  cursor: pointer;\n  font-size: 16px;\n  background-color: #eee;\n}\n.ui-collapsible-header:hover:not(.disabled),\nbody[modality=\"keyboard\"] .ui-collapsible-header:focus {\n  background-color: #e0e0e0;\n}\n.ui-collapsible-header.disabled {\n  opacity: 0.6;\n  cursor: default;\n}\n.ui-collapsible-header.disabled .ui-icon {\n  cursor: default;\n}\n.ui-collapsible-header .ui-icon {\n  cursor: pointer;\n}\n.ui-collapsible-header .ui-ripple-ink .ripple.held {\n  opacity: 0.01;\n}\n.ui-collapsible-header-content {\n  line-height: 1.25em;\n}\n.ui-collapsible-header-icon {\n  margin-left: auto;\n  margin-right: -4px;\n  color: rgba(0,0,0,0.54);\n}\n.ui-collapsible-body-wrapper {\n  overflow: hidden;\n  height: initial;\n}\n.ui-collapsible-body {\n  width: 100%;\n  padding: 16px;\n  display: block;\n  border: 1px solid #eee;\n  border-top: 0;\n}\n.ui-collapsible-toggle-transition {\n  transition: height 0.2s ease;\n}\n.ui-collapsible-toggle-enter,\n.ui-collapsible-toggle-leave {\n  height: 0 !important;\n}\n", ""]);

	// exports


/***/ },

/***/ 212:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* styles */
	__webpack_require__(266)

	/* script */
	__vue_exports__ = __webpack_require__(148)

	/* template */
	var __vue_template__ = __webpack_require__(245)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/Users/Shared/dev/libs/Keen-UI/src/UiCollapsible.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-950da756", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-950da756", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] UiCollapsible.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },

/***/ 245:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._c;
	  return _c('div', {
	    staticClass: "ui-collapsible"
	  }, [_c('button', {
	    directives: [{
	      name: "disabled",
	      rawName: "v-disabled",
	      value: (_vm.disabled),
	      expression: "disabled"
	    }],
	    ref: "button",
	    staticClass: "ui-collapsible-header",
	    class: {
	      'disabled': _vm.disabled
	    },
	    attrs: {
	      "aria-controls": _vm.id,
	      "aria-expanded": _vm.open ? 'true' : 'false'
	    },
	    on: {
	      "click": _vm.toggleMenu
	    }
	  }, [_c('div', {
	    staticClass: "ui-collapsible-header-content"
	  }, [_vm._t("header", [_c('div', {
	    domProps: {
	      "textContent": _vm._s(_vm.header)
	    }
	  })])], true), _vm._v(" "), (!_vm.hideIcon) ? _c('ui-icon', {
	    staticClass: "ui-collapsible-header-icon",
	    attrs: {
	      "icon": _vm.icon
	    }
	  }) : _vm._e(), _vm._v(" "), (!_vm.hideRippleInk && !_vm.disabled && _vm.isReady) ? _c('ui-ripple-ink', {
	    attrs: {
	      "trigger": function () { return _vm.$refs.button; }
	    }
	  }) : _vm._e()]), _vm._v(" "), _c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.currentOpen),
	      expression: "currentOpen"
	    }],
	    ref: "body",
	    staticClass: "ui-collapsible-body-wrapper",
	    style: ({
	      'height': _vm.calculatedHeight
	    }),
	    attrs: {
	      "transition": _vm.transition
	    }
	  }, [_c('div', {
	    staticClass: "ui-collapsible-body",
	    attrs: {
	      "id": _vm.rid,
	      "aria-hidden": _vm.currentOpen ? null : 'true'
	    }
	  }, [_vm._t("default")], true)])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-950da756", module.exports)
	  }
	}

/***/ },

/***/ 266:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(195);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(2)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-950da756!./../node_modules/stylus-loader/index.js!./../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./UiCollapsible.vue", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-950da756!./../node_modules/stylus-loader/index.js!./../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./UiCollapsible.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }

/******/ })
});
;