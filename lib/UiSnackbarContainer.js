/*!
 * Keen UI v0.8.9 (https://github.com/JosephusPaye/keen-ui)
 * (c) 2017 Josephus Paye II
 * Released under the MIT License.
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["UiSnackbarContainer"] = factory();
	else
		root["Keen"] = root["Keen"] || {}, root["Keen"]["UiSnackbarContainer"] = factory();
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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(224);


/***/ },
/* 1 */
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
/* 2 */
/***/ function(module, exports) {

	module.exports = function normalizeComponent (
	  rawScriptExports,
	  compiledTemplate,
	  scopeId,
	  cssModules
	) {
	  var esModule
	  var scriptExports = rawScriptExports = rawScriptExports || {}

	  // ES6 modules interop
	  var type = typeof rawScriptExports.default
	  if (type === 'object' || type === 'function') {
	    esModule = rawScriptExports
	    scriptExports = rawScriptExports.default
	  }

	  // Vue.extend constructor export interop
	  var options = typeof scriptExports === 'function'
	    ? scriptExports.options
	    : scriptExports

	  // render functions
	  if (compiledTemplate) {
	    options.render = compiledTemplate.render
	    options.staticRenderFns = compiledTemplate.staticRenderFns
	  }

	  // scopedId
	  if (scopeId) {
	    options._scopeId = scopeId
	  }

	  // inject cssModules
	  if (cssModules) {
	    var computed = options.computed || (options.computed = {})
	    Object.keys(cssModules).forEach(function (key) {
	      var module = cssModules[key]
	      computed[key] = function () { return module }
	    })
	  }

	  return {
	    esModule: esModule,
	    exports: scriptExports,
	    options: options
	  }
	}


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/*
	  MIT License http://www.opensource.org/licenses/mit-license.php
	  Author Tobias Koppers @sokra
	  Modified by Evan You @yyx990803
	*/

	var hasDocument = typeof document !== 'undefined'

	if (false) {
	  if (!hasDocument) {
	    throw new Error(
	    'vue-style-loader cannot be used in a non-browser environment. ' +
	    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
	  ) }
	}

	var listToStyles = __webpack_require__(6)

	/*
	type StyleObject = {
	  id: number;
	  parts: Array<StyleObjectPart>
	}

	type StyleObjectPart = {
	  css: string;
	  media: string;
	  sourceMap: ?string
	}
	*/

	var stylesInDom = {/*
	  [id: number]: {
	    id: number,
	    refs: number,
	    parts: Array<(obj?: StyleObjectPart) => void>
	  }
	*/}

	var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
	var singletonElement = null
	var singletonCounter = 0
	var isProduction = false
	var noop = function () {}

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

	module.exports = function (parentId, list, _isProduction) {
	  isProduction = _isProduction

	  var styles = listToStyles(parentId, list)
	  addStylesToDom(styles)

	  return function update (newList) {
	    var mayRemove = []
	    for (var i = 0; i < styles.length; i++) {
	      var item = styles[i]
	      var domStyle = stylesInDom[item.id]
	      domStyle.refs--
	      mayRemove.push(domStyle)
	    }
	    if (newList) {
	      styles = listToStyles(parentId, newList)
	      addStylesToDom(styles)
	    } else {
	      styles = []
	    }
	    for (var i = 0; i < mayRemove.length; i++) {
	      var domStyle = mayRemove[i]
	      if (domStyle.refs === 0) {
	        for (var j = 0; j < domStyle.parts.length; j++) {
	          domStyle.parts[j]()
	        }
	        delete stylesInDom[domStyle.id]
	      }
	    }
	  }
	}

	function addStylesToDom (styles /* Array<StyleObject> */) {
	  for (var i = 0; i < styles.length; i++) {
	    var item = styles[i]
	    var domStyle = stylesInDom[item.id]
	    if (domStyle) {
	      domStyle.refs++
	      for (var j = 0; j < domStyle.parts.length; j++) {
	        domStyle.parts[j](item.parts[j])
	      }
	      for (; j < item.parts.length; j++) {
	        domStyle.parts.push(addStyle(item.parts[j]))
	      }
	      if (domStyle.parts.length > item.parts.length) {
	        domStyle.parts.length = item.parts.length
	      }
	    } else {
	      var parts = []
	      for (var j = 0; j < item.parts.length; j++) {
	        parts.push(addStyle(item.parts[j]))
	      }
	      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
	    }
	  }
	}

	function listToStyles (parentId, list) {
	  var styles = []
	  var newStyles = {}
	  for (var i = 0; i < list.length; i++) {
	    var item = list[i]
	    var id = item[0]
	    var css = item[1]
	    var media = item[2]
	    var sourceMap = item[3]
	    var part = { css: css, media: media, sourceMap: sourceMap }
	    if (!newStyles[id]) {
	      part.id = parentId + ':0'
	      styles.push(newStyles[id] = { id: id, parts: [part] })
	    } else {
	      part.id = parentId + ':' + newStyles[id].parts.length
	      newStyles[id].parts.push(part)
	    }
	  }
	  return styles
	}

	function createStyleElement () {
	  var styleElement = document.createElement('style')
	  styleElement.type = 'text/css'
	  head.appendChild(styleElement)
	  return styleElement
	}

	function addStyle (obj /* StyleObjectPart */) {
	  var update, remove
	  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')
	  var hasSSR = styleElement != null

	  // if in production mode and style is already provided by SSR,
	  // simply do nothing.
	  if (hasSSR && isProduction) {
	    return noop
	  }

	  if (isOldIE) {
	    // use singleton mode for IE9.
	    var styleIndex = singletonCounter++
	    styleElement = singletonElement || (singletonElement = createStyleElement())
	    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
	    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
	  } else {
	    // use multi-style-tag mode in all other cases
	    styleElement = styleElement || createStyleElement()
	    update = applyToTag.bind(null, styleElement)
	    remove = function () {
	      styleElement.parentNode.removeChild(styleElement)
	    }
	  }

	  if (!hasSSR) {
	    update(obj)
	  }

	  return function updateStyle (newObj /* StyleObjectPart */) {
	    if (newObj) {
	      if (newObj.css === obj.css &&
	          newObj.media === obj.media &&
	          newObj.sourceMap === obj.sourceMap) {
	        return
	      }
	      update(obj = newObj)
	    } else {
	      remove()
	    }
	  }
	}

	var replaceText = (function () {
	  var textStore = []

	  return function (index, replacement) {
	    textStore[index] = replacement
	    return textStore.filter(Boolean).join('\n')
	  }
	})()

	function applyToSingletonTag (styleElement, index, remove, obj) {
	  var css = remove ? '' : obj.css

	  if (styleElement.styleSheet) {
	    styleElement.styleSheet.cssText = replaceText(index, css)
	  } else {
	    var cssNode = document.createTextNode(css)
	    var childNodes = styleElement.childNodes
	    if (childNodes[index]) styleElement.removeChild(childNodes[index])
	    if (childNodes.length) {
	      styleElement.insertBefore(cssNode, childNodes[index])
	    } else {
	      styleElement.appendChild(cssNode)
	    }
	  }
	}

	function applyToTag (styleElement, obj) {
	  var css = obj.css
	  var media = obj.media
	  var sourceMap = obj.sourceMap

	  if (media) {
	    styleElement.setAttribute('media', media)
	  }

	  if (sourceMap) {
	    // https://developer.chrome.com/devtools/docs/javascript-debugging
	    // this makes source maps inside style tags work properly in Chrome
	    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
	    // http://stackoverflow.com/a/26603875
	    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
	  }

	  if (styleElement.styleSheet) {
	    styleElement.styleSheet.cssText = css
	  } else {
	    while (styleElement.firstChild) {
	      styleElement.removeChild(styleElement.firstChild)
	    }
	    styleElement.appendChild(document.createTextNode(css))
	  }
	}


/***/ },
/* 4 */
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
/* 5 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 6 */
/***/ function(module, exports) {

	/**
	 * Translates the list format produced by css-loader into something
	 * easier to manipulate.
	 */
	module.exports = function listToStyles (parentId, list) {
	  var styles = []
	  var newStyles = {}
	  for (var i = 0; i < list.length; i++) {
	    var item = list[i]
	    var id = item[0]
	    var css = item[1]
	    var media = item[2]
	    var sourceMap = item[3]
	    var part = {
	      id: parentId + ':' + i,
	      css: css,
	      media: media,
	      sourceMap: sourceMap
	    }
	    if (!newStyles[id]) {
	      styles.push(newStyles[id] = { id: id, parts: [part] })
	    } else {
	      newStyles[id].parts.push(part)
	    }
	  }
	  return styles
	}


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(33)
	  , defined = __webpack_require__(27);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(22)

	var Component = __webpack_require__(2)(
	  /* script */
	  __webpack_require__(18),
	  /* template */
	  __webpack_require__(21),
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)
	Component.options.__file = "/Users/Shared/dev/libs/Keen-UI/src/UiIcon.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] UiIcon.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-2173ab17", Component.options)
	  } else {
	    hotAPI.reload("data-v-2173ab17", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(16)('wks')
	  , uid    = __webpack_require__(17)
	  , Symbol = __webpack_require__(5).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 11 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 13 */
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(15)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(5)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 18 */
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
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof2 = __webpack_require__(39);

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
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(1)();
	// imports


	// module
	exports.push([module.id, "\n.ui-icon {\n  font-size: 24px;\n  width: 1em;\n  height: 1em;\n  display: inline-block;\n  cursor: inherit;\n  vertical-align: middle;\n}\n", ""]);

	// exports


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
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
	     require("vue-hot-reload-api").rerender("data-v-2173ab17", module.exports)
	  }
	}

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(20);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(3)("15de3a18", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-2173ab17!../node_modules/stylus-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./UiIcon.vue", function() {
	     var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-2173ab17!../node_modules/stylus-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./UiIcon.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ },
/* 23 */
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
/* 24 */
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
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _UiRippleInk = __webpack_require__(51);

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
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(4)
	  , createDesc = __webpack_require__(13);
	module.exports = __webpack_require__(14) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(4).setDesc
	  , has = __webpack_require__(12)
	  , TAG = __webpack_require__(9)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(34);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(29);
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
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(5)
	  , core      = __webpack_require__(10)
	  , ctx       = __webpack_require__(31)
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
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(11);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(26);

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! tether 1.4.0 */

	(function(root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === 'object') {
	    module.exports = factory(require, exports, module);
	  } else {
	    root.Tether = factory();
	  }
	}(this, function(require, exports, module) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var TetherBase = undefined;
	if (typeof TetherBase === 'undefined') {
	  TetherBase = { modules: [] };
	}

	var zeroElement = null;

	// Same as native getBoundingClientRect, except it takes into account parent <frame> offsets
	// if the element lies within a nested document (<frame> or <iframe>-like).
	function getActualBoundingClientRect(node) {
	  var boundingRect = node.getBoundingClientRect();

	  // The original object returned by getBoundingClientRect is immutable, so we clone it
	  // We can't use extend because the properties are not considered part of the object by hasOwnProperty in IE9
	  var rect = {};
	  for (var k in boundingRect) {
	    rect[k] = boundingRect[k];
	  }

	  if (node.ownerDocument !== document) {
	    var _frameElement = node.ownerDocument.defaultView.frameElement;
	    if (_frameElement) {
	      var frameRect = getActualBoundingClientRect(_frameElement);
	      rect.top += frameRect.top;
	      rect.bottom += frameRect.top;
	      rect.left += frameRect.left;
	      rect.right += frameRect.left;
	    }
	  }

	  return rect;
	}

	function getScrollParents(el) {
	  // In firefox if the el is inside an iframe with display: none; window.getComputedStyle() will return null;
	  // https://bugzilla.mozilla.org/show_bug.cgi?id=548397
	  var computedStyle = getComputedStyle(el) || {};
	  var position = computedStyle.position;
	  var parents = [];

	  if (position === 'fixed') {
	    return [el];
	  }

	  var parent = el;
	  while ((parent = parent.parentNode) && parent && parent.nodeType === 1) {
	    var style = undefined;
	    try {
	      style = getComputedStyle(parent);
	    } catch (err) {}

	    if (typeof style === 'undefined' || style === null) {
	      parents.push(parent);
	      return parents;
	    }

	    var _style = style;
	    var overflow = _style.overflow;
	    var overflowX = _style.overflowX;
	    var overflowY = _style.overflowY;

	    if (/(auto|scroll)/.test(overflow + overflowY + overflowX)) {
	      if (position !== 'absolute' || ['relative', 'absolute', 'fixed'].indexOf(style.position) >= 0) {
	        parents.push(parent);
	      }
	    }
	  }

	  parents.push(el.ownerDocument.body);

	  // If the node is within a frame, account for the parent window scroll
	  if (el.ownerDocument !== document) {
	    parents.push(el.ownerDocument.defaultView);
	  }

	  return parents;
	}

	var uniqueId = (function () {
	  var id = 0;
	  return function () {
	    return ++id;
	  };
	})();

	var zeroPosCache = {};
	var getOrigin = function getOrigin() {
	  // getBoundingClientRect is unfortunately too accurate.  It introduces a pixel or two of
	  // jitter as the user scrolls that messes with our ability to detect if two positions
	  // are equivilant or not.  We place an element at the top left of the page that will
	  // get the same jitter, so we can cancel the two out.
	  var node = zeroElement;
	  if (!node || !document.body.contains(node)) {
	    node = document.createElement('div');
	    node.setAttribute('data-tether-id', uniqueId());
	    extend(node.style, {
	      top: 0,
	      left: 0,
	      position: 'absolute'
	    });

	    document.body.appendChild(node);

	    zeroElement = node;
	  }

	  var id = node.getAttribute('data-tether-id');
	  if (typeof zeroPosCache[id] === 'undefined') {
	    zeroPosCache[id] = getActualBoundingClientRect(node);

	    // Clear the cache when this position call is done
	    defer(function () {
	      delete zeroPosCache[id];
	    });
	  }

	  return zeroPosCache[id];
	};

	function removeUtilElements() {
	  if (zeroElement) {
	    document.body.removeChild(zeroElement);
	  }
	  zeroElement = null;
	};

	function getBounds(el) {
	  var doc = undefined;
	  if (el === document) {
	    doc = document;
	    el = document.documentElement;
	  } else {
	    doc = el.ownerDocument;
	  }

	  var docEl = doc.documentElement;

	  var box = getActualBoundingClientRect(el);

	  var origin = getOrigin();

	  box.top -= origin.top;
	  box.left -= origin.left;

	  if (typeof box.width === 'undefined') {
	    box.width = document.body.scrollWidth - box.left - box.right;
	  }
	  if (typeof box.height === 'undefined') {
	    box.height = document.body.scrollHeight - box.top - box.bottom;
	  }

	  box.top = box.top - docEl.clientTop;
	  box.left = box.left - docEl.clientLeft;
	  box.right = doc.body.clientWidth - box.width - box.left;
	  box.bottom = doc.body.clientHeight - box.height - box.top;

	  return box;
	}

	function getOffsetParent(el) {
	  return el.offsetParent || document.documentElement;
	}

	var _scrollBarSize = null;
	function getScrollBarSize() {
	  if (_scrollBarSize) {
	    return _scrollBarSize;
	  }
	  var inner = document.createElement('div');
	  inner.style.width = '100%';
	  inner.style.height = '200px';

	  var outer = document.createElement('div');
	  extend(outer.style, {
	    position: 'absolute',
	    top: 0,
	    left: 0,
	    pointerEvents: 'none',
	    visibility: 'hidden',
	    width: '200px',
	    height: '150px',
	    overflow: 'hidden'
	  });

	  outer.appendChild(inner);

	  document.body.appendChild(outer);

	  var widthContained = inner.offsetWidth;
	  outer.style.overflow = 'scroll';
	  var widthScroll = inner.offsetWidth;

	  if (widthContained === widthScroll) {
	    widthScroll = outer.clientWidth;
	  }

	  document.body.removeChild(outer);

	  var width = widthContained - widthScroll;

	  _scrollBarSize = { width: width, height: width };
	  return _scrollBarSize;
	}

	function extend() {
	  var out = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  var args = [];

	  Array.prototype.push.apply(args, arguments);

	  args.slice(1).forEach(function (obj) {
	    if (obj) {
	      for (var key in obj) {
	        if (({}).hasOwnProperty.call(obj, key)) {
	          out[key] = obj[key];
	        }
	      }
	    }
	  });

	  return out;
	}

	function removeClass(el, name) {
	  if (typeof el.classList !== 'undefined') {
	    name.split(' ').forEach(function (cls) {
	      if (cls.trim()) {
	        el.classList.remove(cls);
	      }
	    });
	  } else {
	    var regex = new RegExp('(^| )' + name.split(' ').join('|') + '( |$)', 'gi');
	    var className = getClassName(el).replace(regex, ' ');
	    setClassName(el, className);
	  }
	}

	function addClass(el, name) {
	  if (typeof el.classList !== 'undefined') {
	    name.split(' ').forEach(function (cls) {
	      if (cls.trim()) {
	        el.classList.add(cls);
	      }
	    });
	  } else {
	    removeClass(el, name);
	    var cls = getClassName(el) + (' ' + name);
	    setClassName(el, cls);
	  }
	}

	function hasClass(el, name) {
	  if (typeof el.classList !== 'undefined') {
	    return el.classList.contains(name);
	  }
	  var className = getClassName(el);
	  return new RegExp('(^| )' + name + '( |$)', 'gi').test(className);
	}

	function getClassName(el) {
	  // Can't use just SVGAnimatedString here since nodes within a Frame in IE have
	  // completely separately SVGAnimatedString base classes
	  if (el.className instanceof el.ownerDocument.defaultView.SVGAnimatedString) {
	    return el.className.baseVal;
	  }
	  return el.className;
	}

	function setClassName(el, className) {
	  el.setAttribute('class', className);
	}

	function updateClasses(el, add, all) {
	  // Of the set of 'all' classes, we need the 'add' classes, and only the
	  // 'add' classes to be set.
	  all.forEach(function (cls) {
	    if (add.indexOf(cls) === -1 && hasClass(el, cls)) {
	      removeClass(el, cls);
	    }
	  });

	  add.forEach(function (cls) {
	    if (!hasClass(el, cls)) {
	      addClass(el, cls);
	    }
	  });
	}

	var deferred = [];

	var defer = function defer(fn) {
	  deferred.push(fn);
	};

	var flush = function flush() {
	  var fn = undefined;
	  while (fn = deferred.pop()) {
	    fn();
	  }
	};

	var Evented = (function () {
	  function Evented() {
	    _classCallCheck(this, Evented);
	  }

	  _createClass(Evented, [{
	    key: 'on',
	    value: function on(event, handler, ctx) {
	      var once = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

	      if (typeof this.bindings === 'undefined') {
	        this.bindings = {};
	      }
	      if (typeof this.bindings[event] === 'undefined') {
	        this.bindings[event] = [];
	      }
	      this.bindings[event].push({ handler: handler, ctx: ctx, once: once });
	    }
	  }, {
	    key: 'once',
	    value: function once(event, handler, ctx) {
	      this.on(event, handler, ctx, true);
	    }
	  }, {
	    key: 'off',
	    value: function off(event, handler) {
	      if (typeof this.bindings === 'undefined' || typeof this.bindings[event] === 'undefined') {
	        return;
	      }

	      if (typeof handler === 'undefined') {
	        delete this.bindings[event];
	      } else {
	        var i = 0;
	        while (i < this.bindings[event].length) {
	          if (this.bindings[event][i].handler === handler) {
	            this.bindings[event].splice(i, 1);
	          } else {
	            ++i;
	          }
	        }
	      }
	    }
	  }, {
	    key: 'trigger',
	    value: function trigger(event) {
	      if (typeof this.bindings !== 'undefined' && this.bindings[event]) {
	        var i = 0;

	        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	          args[_key - 1] = arguments[_key];
	        }

	        while (i < this.bindings[event].length) {
	          var _bindings$event$i = this.bindings[event][i];
	          var handler = _bindings$event$i.handler;
	          var ctx = _bindings$event$i.ctx;
	          var once = _bindings$event$i.once;

	          var context = ctx;
	          if (typeof context === 'undefined') {
	            context = this;
	          }

	          handler.apply(context, args);

	          if (once) {
	            this.bindings[event].splice(i, 1);
	          } else {
	            ++i;
	          }
	        }
	      }
	    }
	  }]);

	  return Evented;
	})();

	TetherBase.Utils = {
	  getActualBoundingClientRect: getActualBoundingClientRect,
	  getScrollParents: getScrollParents,
	  getBounds: getBounds,
	  getOffsetParent: getOffsetParent,
	  extend: extend,
	  addClass: addClass,
	  removeClass: removeClass,
	  hasClass: hasClass,
	  updateClasses: updateClasses,
	  defer: defer,
	  flush: flush,
	  uniqueId: uniqueId,
	  Evented: Evented,
	  getScrollBarSize: getScrollBarSize,
	  removeUtilElements: removeUtilElements
	};
	/* globals TetherBase, performance */

	'use strict';

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x6, _x7, _x8) { var _again = true; _function: while (_again) { var object = _x6, property = _x7, receiver = _x8; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x6 = parent; _x7 = property; _x8 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	if (typeof TetherBase === 'undefined') {
	  throw new Error('You must include the utils.js file before tether.js');
	}

	var _TetherBase$Utils = TetherBase.Utils;
	var getScrollParents = _TetherBase$Utils.getScrollParents;
	var getBounds = _TetherBase$Utils.getBounds;
	var getOffsetParent = _TetherBase$Utils.getOffsetParent;
	var extend = _TetherBase$Utils.extend;
	var addClass = _TetherBase$Utils.addClass;
	var removeClass = _TetherBase$Utils.removeClass;
	var updateClasses = _TetherBase$Utils.updateClasses;
	var defer = _TetherBase$Utils.defer;
	var flush = _TetherBase$Utils.flush;
	var getScrollBarSize = _TetherBase$Utils.getScrollBarSize;
	var removeUtilElements = _TetherBase$Utils.removeUtilElements;

	function within(a, b) {
	  var diff = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

	  return a + diff >= b && b >= a - diff;
	}

	var transformKey = (function () {
	  if (typeof document === 'undefined') {
	    return '';
	  }
	  var el = document.createElement('div');

	  var transforms = ['transform', 'WebkitTransform', 'OTransform', 'MozTransform', 'msTransform'];
	  for (var i = 0; i < transforms.length; ++i) {
	    var key = transforms[i];
	    if (el.style[key] !== undefined) {
	      return key;
	    }
	  }
	})();

	var tethers = [];

	var position = function position() {
	  tethers.forEach(function (tether) {
	    tether.position(false);
	  });
	  flush();
	};

	function now() {
	  if (typeof performance !== 'undefined' && typeof performance.now !== 'undefined') {
	    return performance.now();
	  }
	  return +new Date();
	}

	(function () {
	  var lastCall = null;
	  var lastDuration = null;
	  var pendingTimeout = null;

	  var tick = function tick() {
	    if (typeof lastDuration !== 'undefined' && lastDuration > 16) {
	      // We voluntarily throttle ourselves if we can't manage 60fps
	      lastDuration = Math.min(lastDuration - 16, 250);

	      // Just in case this is the last event, remember to position just once more
	      pendingTimeout = setTimeout(tick, 250);
	      return;
	    }

	    if (typeof lastCall !== 'undefined' && now() - lastCall < 10) {
	      // Some browsers call events a little too frequently, refuse to run more than is reasonable
	      return;
	    }

	    if (pendingTimeout != null) {
	      clearTimeout(pendingTimeout);
	      pendingTimeout = null;
	    }

	    lastCall = now();
	    position();
	    lastDuration = now() - lastCall;
	  };

	  if (typeof window !== 'undefined' && typeof window.addEventListener !== 'undefined') {
	    ['resize', 'scroll', 'touchmove'].forEach(function (event) {
	      window.addEventListener(event, tick);
	    });
	  }
	})();

	var MIRROR_LR = {
	  center: 'center',
	  left: 'right',
	  right: 'left'
	};

	var MIRROR_TB = {
	  middle: 'middle',
	  top: 'bottom',
	  bottom: 'top'
	};

	var OFFSET_MAP = {
	  top: 0,
	  left: 0,
	  middle: '50%',
	  center: '50%',
	  bottom: '100%',
	  right: '100%'
	};

	var autoToFixedAttachment = function autoToFixedAttachment(attachment, relativeToAttachment) {
	  var left = attachment.left;
	  var top = attachment.top;

	  if (left === 'auto') {
	    left = MIRROR_LR[relativeToAttachment.left];
	  }

	  if (top === 'auto') {
	    top = MIRROR_TB[relativeToAttachment.top];
	  }

	  return { left: left, top: top };
	};

	var attachmentToOffset = function attachmentToOffset(attachment) {
	  var left = attachment.left;
	  var top = attachment.top;

	  if (typeof OFFSET_MAP[attachment.left] !== 'undefined') {
	    left = OFFSET_MAP[attachment.left];
	  }

	  if (typeof OFFSET_MAP[attachment.top] !== 'undefined') {
	    top = OFFSET_MAP[attachment.top];
	  }

	  return { left: left, top: top };
	};

	function addOffset() {
	  var out = { top: 0, left: 0 };

	  for (var _len = arguments.length, offsets = Array(_len), _key = 0; _key < _len; _key++) {
	    offsets[_key] = arguments[_key];
	  }

	  offsets.forEach(function (_ref) {
	    var top = _ref.top;
	    var left = _ref.left;

	    if (typeof top === 'string') {
	      top = parseFloat(top, 10);
	    }
	    if (typeof left === 'string') {
	      left = parseFloat(left, 10);
	    }

	    out.top += top;
	    out.left += left;
	  });

	  return out;
	}

	function offsetToPx(offset, size) {
	  if (typeof offset.left === 'string' && offset.left.indexOf('%') !== -1) {
	    offset.left = parseFloat(offset.left, 10) / 100 * size.width;
	  }
	  if (typeof offset.top === 'string' && offset.top.indexOf('%') !== -1) {
	    offset.top = parseFloat(offset.top, 10) / 100 * size.height;
	  }

	  return offset;
	}

	var parseOffset = function parseOffset(value) {
	  var _value$split = value.split(' ');

	  var _value$split2 = _slicedToArray(_value$split, 2);

	  var top = _value$split2[0];
	  var left = _value$split2[1];

	  return { top: top, left: left };
	};
	var parseAttachment = parseOffset;

	var TetherClass = (function (_Evented) {
	  _inherits(TetherClass, _Evented);

	  function TetherClass(options) {
	    var _this = this;

	    _classCallCheck(this, TetherClass);

	    _get(Object.getPrototypeOf(TetherClass.prototype), 'constructor', this).call(this);
	    this.position = this.position.bind(this);

	    tethers.push(this);

	    this.history = [];

	    this.setOptions(options, false);

	    TetherBase.modules.forEach(function (module) {
	      if (typeof module.initialize !== 'undefined') {
	        module.initialize.call(_this);
	      }
	    });

	    this.position();
	  }

	  _createClass(TetherClass, [{
	    key: 'getClass',
	    value: function getClass() {
	      var key = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	      var classes = this.options.classes;

	      if (typeof classes !== 'undefined' && classes[key]) {
	        return this.options.classes[key];
	      } else if (this.options.classPrefix) {
	        return this.options.classPrefix + '-' + key;
	      } else {
	        return key;
	      }
	    }
	  }, {
	    key: 'setOptions',
	    value: function setOptions(options) {
	      var _this2 = this;

	      var pos = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

	      var defaults = {
	        offset: '0 0',
	        targetOffset: '0 0',
	        targetAttachment: 'auto auto',
	        classPrefix: 'tether'
	      };

	      this.options = extend(defaults, options);

	      var _options = this.options;
	      var element = _options.element;
	      var target = _options.target;
	      var targetModifier = _options.targetModifier;

	      this.element = element;
	      this.target = target;
	      this.targetModifier = targetModifier;

	      if (this.target === 'viewport') {
	        this.target = document.body;
	        this.targetModifier = 'visible';
	      } else if (this.target === 'scroll-handle') {
	        this.target = document.body;
	        this.targetModifier = 'scroll-handle';
	      }

	      ['element', 'target'].forEach(function (key) {
	        if (typeof _this2[key] === 'undefined') {
	          throw new Error('Tether Error: Both element and target must be defined');
	        }

	        if (typeof _this2[key].jquery !== 'undefined') {
	          _this2[key] = _this2[key][0];
	        } else if (typeof _this2[key] === 'string') {
	          _this2[key] = document.querySelector(_this2[key]);
	        }
	      });

	      addClass(this.element, this.getClass('element'));
	      if (!(this.options.addTargetClasses === false)) {
	        addClass(this.target, this.getClass('target'));
	      }

	      if (!this.options.attachment) {
	        throw new Error('Tether Error: You must provide an attachment');
	      }

	      this.targetAttachment = parseAttachment(this.options.targetAttachment);
	      this.attachment = parseAttachment(this.options.attachment);
	      this.offset = parseOffset(this.options.offset);
	      this.targetOffset = parseOffset(this.options.targetOffset);

	      if (typeof this.scrollParents !== 'undefined') {
	        this.disable();
	      }

	      if (this.targetModifier === 'scroll-handle') {
	        this.scrollParents = [this.target];
	      } else {
	        this.scrollParents = getScrollParents(this.target);
	      }

	      if (!(this.options.enabled === false)) {
	        this.enable(pos);
	      }
	    }
	  }, {
	    key: 'getTargetBounds',
	    value: function getTargetBounds() {
	      if (typeof this.targetModifier !== 'undefined') {
	        if (this.targetModifier === 'visible') {
	          if (this.target === document.body) {
	            return { top: pageYOffset, left: pageXOffset, height: innerHeight, width: innerWidth };
	          } else {
	            var bounds = getBounds(this.target);

	            var out = {
	              height: bounds.height,
	              width: bounds.width,
	              top: bounds.top,
	              left: bounds.left
	            };

	            out.height = Math.min(out.height, bounds.height - (pageYOffset - bounds.top));
	            out.height = Math.min(out.height, bounds.height - (bounds.top + bounds.height - (pageYOffset + innerHeight)));
	            out.height = Math.min(innerHeight, out.height);
	            out.height -= 2;

	            out.width = Math.min(out.width, bounds.width - (pageXOffset - bounds.left));
	            out.width = Math.min(out.width, bounds.width - (bounds.left + bounds.width - (pageXOffset + innerWidth)));
	            out.width = Math.min(innerWidth, out.width);
	            out.width -= 2;

	            if (out.top < pageYOffset) {
	              out.top = pageYOffset;
	            }
	            if (out.left < pageXOffset) {
	              out.left = pageXOffset;
	            }

	            return out;
	          }
	        } else if (this.targetModifier === 'scroll-handle') {
	          var bounds = undefined;
	          var target = this.target;
	          if (target === document.body) {
	            target = document.documentElement;

	            bounds = {
	              left: pageXOffset,
	              top: pageYOffset,
	              height: innerHeight,
	              width: innerWidth
	            };
	          } else {
	            bounds = getBounds(target);
	          }

	          var style = getComputedStyle(target);

	          var hasBottomScroll = target.scrollWidth > target.clientWidth || [style.overflow, style.overflowX].indexOf('scroll') >= 0 || this.target !== document.body;

	          var scrollBottom = 0;
	          if (hasBottomScroll) {
	            scrollBottom = 15;
	          }

	          var height = bounds.height - parseFloat(style.borderTopWidth) - parseFloat(style.borderBottomWidth) - scrollBottom;

	          var out = {
	            width: 15,
	            height: height * 0.975 * (height / target.scrollHeight),
	            left: bounds.left + bounds.width - parseFloat(style.borderLeftWidth) - 15
	          };

	          var fitAdj = 0;
	          if (height < 408 && this.target === document.body) {
	            fitAdj = -0.00011 * Math.pow(height, 2) - 0.00727 * height + 22.58;
	          }

	          if (this.target !== document.body) {
	            out.height = Math.max(out.height, 24);
	          }

	          var scrollPercentage = this.target.scrollTop / (target.scrollHeight - height);
	          out.top = scrollPercentage * (height - out.height - fitAdj) + bounds.top + parseFloat(style.borderTopWidth);

	          if (this.target === document.body) {
	            out.height = Math.max(out.height, 24);
	          }

	          return out;
	        }
	      } else {
	        return getBounds(this.target);
	      }
	    }
	  }, {
	    key: 'clearCache',
	    value: function clearCache() {
	      this._cache = {};
	    }
	  }, {
	    key: 'cache',
	    value: function cache(k, getter) {
	      // More than one module will often need the same DOM info, so
	      // we keep a cache which is cleared on each position call
	      if (typeof this._cache === 'undefined') {
	        this._cache = {};
	      }

	      if (typeof this._cache[k] === 'undefined') {
	        this._cache[k] = getter.call(this);
	      }

	      return this._cache[k];
	    }
	  }, {
	    key: 'enable',
	    value: function enable() {
	      var _this3 = this;

	      var pos = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

	      if (!(this.options.addTargetClasses === false)) {
	        addClass(this.target, this.getClass('enabled'));
	      }
	      addClass(this.element, this.getClass('enabled'));
	      this.enabled = true;

	      this.scrollParents.forEach(function (parent) {
	        if (parent !== _this3.target.ownerDocument) {
	          parent.addEventListener('scroll', _this3.position);
	        }
	      });

	      if (pos) {
	        this.position();
	      }
	    }
	  }, {
	    key: 'disable',
	    value: function disable() {
	      var _this4 = this;

	      removeClass(this.target, this.getClass('enabled'));
	      removeClass(this.element, this.getClass('enabled'));
	      this.enabled = false;

	      if (typeof this.scrollParents !== 'undefined') {
	        this.scrollParents.forEach(function (parent) {
	          parent.removeEventListener('scroll', _this4.position);
	        });
	      }
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      var _this5 = this;

	      this.disable();

	      tethers.forEach(function (tether, i) {
	        if (tether === _this5) {
	          tethers.splice(i, 1);
	        }
	      });

	      // Remove any elements we were using for convenience from the DOM
	      if (tethers.length === 0) {
	        removeUtilElements();
	      }
	    }
	  }, {
	    key: 'updateAttachClasses',
	    value: function updateAttachClasses(elementAttach, targetAttach) {
	      var _this6 = this;

	      elementAttach = elementAttach || this.attachment;
	      targetAttach = targetAttach || this.targetAttachment;
	      var sides = ['left', 'top', 'bottom', 'right', 'middle', 'center'];

	      if (typeof this._addAttachClasses !== 'undefined' && this._addAttachClasses.length) {
	        // updateAttachClasses can be called more than once in a position call, so
	        // we need to clean up after ourselves such that when the last defer gets
	        // ran it doesn't add any extra classes from previous calls.
	        this._addAttachClasses.splice(0, this._addAttachClasses.length);
	      }

	      if (typeof this._addAttachClasses === 'undefined') {
	        this._addAttachClasses = [];
	      }
	      var add = this._addAttachClasses;

	      if (elementAttach.top) {
	        add.push(this.getClass('element-attached') + '-' + elementAttach.top);
	      }
	      if (elementAttach.left) {
	        add.push(this.getClass('element-attached') + '-' + elementAttach.left);
	      }
	      if (targetAttach.top) {
	        add.push(this.getClass('target-attached') + '-' + targetAttach.top);
	      }
	      if (targetAttach.left) {
	        add.push(this.getClass('target-attached') + '-' + targetAttach.left);
	      }

	      var all = [];
	      sides.forEach(function (side) {
	        all.push(_this6.getClass('element-attached') + '-' + side);
	        all.push(_this6.getClass('target-attached') + '-' + side);
	      });

	      defer(function () {
	        if (!(typeof _this6._addAttachClasses !== 'undefined')) {
	          return;
	        }

	        updateClasses(_this6.element, _this6._addAttachClasses, all);
	        if (!(_this6.options.addTargetClasses === false)) {
	          updateClasses(_this6.target, _this6._addAttachClasses, all);
	        }

	        delete _this6._addAttachClasses;
	      });
	    }
	  }, {
	    key: 'position',
	    value: function position() {
	      var _this7 = this;

	      var flushChanges = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

	      // flushChanges commits the changes immediately, leave true unless you are positioning multiple
	      // tethers (in which case call Tether.Utils.flush yourself when you're done)

	      if (!this.enabled) {
	        return;
	      }

	      this.clearCache();

	      // Turn 'auto' attachments into the appropriate corner or edge
	      var targetAttachment = autoToFixedAttachment(this.targetAttachment, this.attachment);

	      this.updateAttachClasses(this.attachment, targetAttachment);

	      var elementPos = this.cache('element-bounds', function () {
	        return getBounds(_this7.element);
	      });

	      var width = elementPos.width;
	      var height = elementPos.height;

	      if (width === 0 && height === 0 && typeof this.lastSize !== 'undefined') {
	        var _lastSize = this.lastSize;

	        // We cache the height and width to make it possible to position elements that are
	        // getting hidden.
	        width = _lastSize.width;
	        height = _lastSize.height;
	      } else {
	        this.lastSize = { width: width, height: height };
	      }

	      var targetPos = this.cache('target-bounds', function () {
	        return _this7.getTargetBounds();
	      });
	      var targetSize = targetPos;

	      // Get an actual px offset from the attachment
	      var offset = offsetToPx(attachmentToOffset(this.attachment), { width: width, height: height });
	      var targetOffset = offsetToPx(attachmentToOffset(targetAttachment), targetSize);

	      var manualOffset = offsetToPx(this.offset, { width: width, height: height });
	      var manualTargetOffset = offsetToPx(this.targetOffset, targetSize);

	      // Add the manually provided offset
	      offset = addOffset(offset, manualOffset);
	      targetOffset = addOffset(targetOffset, manualTargetOffset);

	      // It's now our goal to make (element position + offset) == (target position + target offset)
	      var left = targetPos.left + targetOffset.left - offset.left;
	      var top = targetPos.top + targetOffset.top - offset.top;

	      for (var i = 0; i < TetherBase.modules.length; ++i) {
	        var _module2 = TetherBase.modules[i];
	        var ret = _module2.position.call(this, {
	          left: left,
	          top: top,
	          targetAttachment: targetAttachment,
	          targetPos: targetPos,
	          elementPos: elementPos,
	          offset: offset,
	          targetOffset: targetOffset,
	          manualOffset: manualOffset,
	          manualTargetOffset: manualTargetOffset,
	          scrollbarSize: scrollbarSize,
	          attachment: this.attachment
	        });

	        if (ret === false) {
	          return false;
	        } else if (typeof ret === 'undefined' || typeof ret !== 'object') {
	          continue;
	        } else {
	          top = ret.top;
	          left = ret.left;
	        }
	      }

	      // We describe the position three different ways to give the optimizer
	      // a chance to decide the best possible way to position the element
	      // with the fewest repaints.
	      var next = {
	        // It's position relative to the page (absolute positioning when
	        // the element is a child of the body)
	        page: {
	          top: top,
	          left: left
	        },

	        // It's position relative to the viewport (fixed positioning)
	        viewport: {
	          top: top - pageYOffset,
	          bottom: pageYOffset - top - height + innerHeight,
	          left: left - pageXOffset,
	          right: pageXOffset - left - width + innerWidth
	        }
	      };

	      var doc = this.target.ownerDocument;
	      var win = doc.defaultView;

	      var scrollbarSize = undefined;
	      if (win.innerHeight > doc.documentElement.clientHeight) {
	        scrollbarSize = this.cache('scrollbar-size', getScrollBarSize);
	        next.viewport.bottom -= scrollbarSize.height;
	      }

	      if (win.innerWidth > doc.documentElement.clientWidth) {
	        scrollbarSize = this.cache('scrollbar-size', getScrollBarSize);
	        next.viewport.right -= scrollbarSize.width;
	      }

	      if (['', 'static'].indexOf(doc.body.style.position) === -1 || ['', 'static'].indexOf(doc.body.parentElement.style.position) === -1) {
	        // Absolute positioning in the body will be relative to the page, not the 'initial containing block'
	        next.page.bottom = doc.body.scrollHeight - top - height;
	        next.page.right = doc.body.scrollWidth - left - width;
	      }

	      if (typeof this.options.optimizations !== 'undefined' && this.options.optimizations.moveElement !== false && !(typeof this.targetModifier !== 'undefined')) {
	        (function () {
	          var offsetParent = _this7.cache('target-offsetparent', function () {
	            return getOffsetParent(_this7.target);
	          });
	          var offsetPosition = _this7.cache('target-offsetparent-bounds', function () {
	            return getBounds(offsetParent);
	          });
	          var offsetParentStyle = getComputedStyle(offsetParent);
	          var offsetParentSize = offsetPosition;

	          var offsetBorder = {};
	          ['Top', 'Left', 'Bottom', 'Right'].forEach(function (side) {
	            offsetBorder[side.toLowerCase()] = parseFloat(offsetParentStyle['border' + side + 'Width']);
	          });

	          offsetPosition.right = doc.body.scrollWidth - offsetPosition.left - offsetParentSize.width + offsetBorder.right;
	          offsetPosition.bottom = doc.body.scrollHeight - offsetPosition.top - offsetParentSize.height + offsetBorder.bottom;

	          if (next.page.top >= offsetPosition.top + offsetBorder.top && next.page.bottom >= offsetPosition.bottom) {
	            if (next.page.left >= offsetPosition.left + offsetBorder.left && next.page.right >= offsetPosition.right) {
	              // We're within the visible part of the target's scroll parent
	              var scrollTop = offsetParent.scrollTop;
	              var scrollLeft = offsetParent.scrollLeft;

	              // It's position relative to the target's offset parent (absolute positioning when
	              // the element is moved to be a child of the target's offset parent).
	              next.offset = {
	                top: next.page.top - offsetPosition.top + scrollTop - offsetBorder.top,
	                left: next.page.left - offsetPosition.left + scrollLeft - offsetBorder.left
	              };
	            }
	          }
	        })();
	      }

	      // We could also travel up the DOM and try each containing context, rather than only
	      // looking at the body, but we're gonna get diminishing returns.

	      this.move(next);

	      this.history.unshift(next);

	      if (this.history.length > 3) {
	        this.history.pop();
	      }

	      if (flushChanges) {
	        flush();
	      }

	      return true;
	    }

	    // THE ISSUE
	  }, {
	    key: 'move',
	    value: function move(pos) {
	      var _this8 = this;

	      if (!(typeof this.element.parentNode !== 'undefined')) {
	        return;
	      }

	      var same = {};

	      for (var type in pos) {
	        same[type] = {};

	        for (var key in pos[type]) {
	          var found = false;

	          for (var i = 0; i < this.history.length; ++i) {
	            var point = this.history[i];
	            if (typeof point[type] !== 'undefined' && !within(point[type][key], pos[type][key])) {
	              found = true;
	              break;
	            }
	          }

	          if (!found) {
	            same[type][key] = true;
	          }
	        }
	      }

	      var css = { top: '', left: '', right: '', bottom: '' };

	      var transcribe = function transcribe(_same, _pos) {
	        var hasOptimizations = typeof _this8.options.optimizations !== 'undefined';
	        var gpu = hasOptimizations ? _this8.options.optimizations.gpu : null;
	        if (gpu !== false) {
	          var yPos = undefined,
	              xPos = undefined;
	          if (_same.top) {
	            css.top = 0;
	            yPos = _pos.top;
	          } else {
	            css.bottom = 0;
	            yPos = -_pos.bottom;
	          }

	          if (_same.left) {
	            css.left = 0;
	            xPos = _pos.left;
	          } else {
	            css.right = 0;
	            xPos = -_pos.right;
	          }

	          if (window.matchMedia) {
	            // HubSpot/tether#207
	            var retina = window.matchMedia('only screen and (min-resolution: 1.3dppx)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3)').matches;
	            if (!retina) {
	              xPos = Math.round(xPos);
	              yPos = Math.round(yPos);
	            }
	          }

	          css[transformKey] = 'translateX(' + xPos + 'px) translateY(' + yPos + 'px)';

	          if (transformKey !== 'msTransform') {
	            // The Z transform will keep this in the GPU (faster, and prevents artifacts),
	            // but IE9 doesn't support 3d transforms and will choke.
	            css[transformKey] += " translateZ(0)";
	          }
	        } else {
	          if (_same.top) {
	            css.top = _pos.top + 'px';
	          } else {
	            css.bottom = _pos.bottom + 'px';
	          }

	          if (_same.left) {
	            css.left = _pos.left + 'px';
	          } else {
	            css.right = _pos.right + 'px';
	          }
	        }
	      };

	      var moved = false;
	      if ((same.page.top || same.page.bottom) && (same.page.left || same.page.right)) {
	        css.position = 'absolute';
	        transcribe(same.page, pos.page);
	      } else if ((same.viewport.top || same.viewport.bottom) && (same.viewport.left || same.viewport.right)) {
	        css.position = 'fixed';
	        transcribe(same.viewport, pos.viewport);
	      } else if (typeof same.offset !== 'undefined' && same.offset.top && same.offset.left) {
	        (function () {
	          css.position = 'absolute';
	          var offsetParent = _this8.cache('target-offsetparent', function () {
	            return getOffsetParent(_this8.target);
	          });

	          if (getOffsetParent(_this8.element) !== offsetParent) {
	            defer(function () {
	              _this8.element.parentNode.removeChild(_this8.element);
	              offsetParent.appendChild(_this8.element);
	            });
	          }

	          transcribe(same.offset, pos.offset);
	          moved = true;
	        })();
	      } else {
	        css.position = 'absolute';
	        transcribe({ top: true, left: true }, pos.page);
	      }

	      if (!moved) {
	        if (this.options.bodyElement) {
	          this.options.bodyElement.appendChild(this.element);
	        } else {
	          var offsetParentIsBody = true;
	          var currentNode = this.element.parentNode;
	          while (currentNode && currentNode.nodeType === 1 && currentNode.tagName !== 'BODY') {
	            if (getComputedStyle(currentNode).position !== 'static') {
	              offsetParentIsBody = false;
	              break;
	            }

	            currentNode = currentNode.parentNode;
	          }

	          if (!offsetParentIsBody) {
	            this.element.parentNode.removeChild(this.element);
	            this.element.ownerDocument.body.appendChild(this.element);
	          }
	        }
	      }

	      // Any css change will trigger a repaint, so let's avoid one if nothing changed
	      var writeCSS = {};
	      var write = false;
	      for (var key in css) {
	        var val = css[key];
	        var elVal = this.element.style[key];

	        if (elVal !== val) {
	          write = true;
	          writeCSS[key] = val;
	        }
	      }

	      if (write) {
	        defer(function () {
	          extend(_this8.element.style, writeCSS);
	          _this8.trigger('repositioned');
	        });
	      }
	    }
	  }]);

	  return TetherClass;
	})(Evented);

	TetherClass.modules = [];

	TetherBase.position = position;

	var Tether = extend(TetherClass, TetherBase);
	/* globals TetherBase */

	'use strict';

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	var _TetherBase$Utils = TetherBase.Utils;
	var getBounds = _TetherBase$Utils.getBounds;
	var extend = _TetherBase$Utils.extend;
	var updateClasses = _TetherBase$Utils.updateClasses;
	var defer = _TetherBase$Utils.defer;

	var BOUNDS_FORMAT = ['left', 'top', 'right', 'bottom'];

	function getBoundingRect(tether, to) {
	  if (to === 'scrollParent') {
	    to = tether.scrollParents[0];
	  } else if (to === 'window') {
	    to = [pageXOffset, pageYOffset, innerWidth + pageXOffset, innerHeight + pageYOffset];
	  }

	  if (to === document) {
	    to = to.documentElement;
	  }

	  if (typeof to.nodeType !== 'undefined') {
	    (function () {
	      var node = to;
	      var size = getBounds(to);
	      var pos = size;
	      var style = getComputedStyle(to);

	      to = [pos.left, pos.top, size.width + pos.left, size.height + pos.top];

	      // Account any parent Frames scroll offset
	      if (node.ownerDocument !== document) {
	        var win = node.ownerDocument.defaultView;
	        to[0] += win.pageXOffset;
	        to[1] += win.pageYOffset;
	        to[2] += win.pageXOffset;
	        to[3] += win.pageYOffset;
	      }

	      BOUNDS_FORMAT.forEach(function (side, i) {
	        side = side[0].toUpperCase() + side.substr(1);
	        if (side === 'Top' || side === 'Left') {
	          to[i] += parseFloat(style['border' + side + 'Width']);
	        } else {
	          to[i] -= parseFloat(style['border' + side + 'Width']);
	        }
	      });
	    })();
	  }

	  return to;
	}

	TetherBase.modules.push({
	  position: function position(_ref) {
	    var _this = this;

	    var top = _ref.top;
	    var left = _ref.left;
	    var targetAttachment = _ref.targetAttachment;

	    if (!this.options.constraints) {
	      return true;
	    }

	    var _cache = this.cache('element-bounds', function () {
	      return getBounds(_this.element);
	    });

	    var height = _cache.height;
	    var width = _cache.width;

	    if (width === 0 && height === 0 && typeof this.lastSize !== 'undefined') {
	      var _lastSize = this.lastSize;

	      // Handle the item getting hidden as a result of our positioning without glitching
	      // the classes in and out
	      width = _lastSize.width;
	      height = _lastSize.height;
	    }

	    var targetSize = this.cache('target-bounds', function () {
	      return _this.getTargetBounds();
	    });

	    var targetHeight = targetSize.height;
	    var targetWidth = targetSize.width;

	    var allClasses = [this.getClass('pinned'), this.getClass('out-of-bounds')];

	    this.options.constraints.forEach(function (constraint) {
	      var outOfBoundsClass = constraint.outOfBoundsClass;
	      var pinnedClass = constraint.pinnedClass;

	      if (outOfBoundsClass) {
	        allClasses.push(outOfBoundsClass);
	      }
	      if (pinnedClass) {
	        allClasses.push(pinnedClass);
	      }
	    });

	    allClasses.forEach(function (cls) {
	      ['left', 'top', 'right', 'bottom'].forEach(function (side) {
	        allClasses.push(cls + '-' + side);
	      });
	    });

	    var addClasses = [];

	    var tAttachment = extend({}, targetAttachment);
	    var eAttachment = extend({}, this.attachment);

	    this.options.constraints.forEach(function (constraint) {
	      var to = constraint.to;
	      var attachment = constraint.attachment;
	      var pin = constraint.pin;

	      if (typeof attachment === 'undefined') {
	        attachment = '';
	      }

	      var changeAttachX = undefined,
	          changeAttachY = undefined;
	      if (attachment.indexOf(' ') >= 0) {
	        var _attachment$split = attachment.split(' ');

	        var _attachment$split2 = _slicedToArray(_attachment$split, 2);

	        changeAttachY = _attachment$split2[0];
	        changeAttachX = _attachment$split2[1];
	      } else {
	        changeAttachX = changeAttachY = attachment;
	      }

	      var bounds = getBoundingRect(_this, to);

	      if (changeAttachY === 'target' || changeAttachY === 'both') {
	        if (top < bounds[1] && tAttachment.top === 'top') {
	          top += targetHeight;
	          tAttachment.top = 'bottom';
	        }

	        if (top + height > bounds[3] && tAttachment.top === 'bottom') {
	          top -= targetHeight;
	          tAttachment.top = 'top';
	        }
	      }

	      if (changeAttachY === 'together') {
	        if (tAttachment.top === 'top') {
	          if (eAttachment.top === 'bottom' && top < bounds[1]) {
	            top += targetHeight;
	            tAttachment.top = 'bottom';

	            top += height;
	            eAttachment.top = 'top';
	          } else if (eAttachment.top === 'top' && top + height > bounds[3] && top - (height - targetHeight) >= bounds[1]) {
	            top -= height - targetHeight;
	            tAttachment.top = 'bottom';

	            eAttachment.top = 'bottom';
	          }
	        }

	        if (tAttachment.top === 'bottom') {
	          if (eAttachment.top === 'top' && top + height > bounds[3]) {
	            top -= targetHeight;
	            tAttachment.top = 'top';

	            top -= height;
	            eAttachment.top = 'bottom';
	          } else if (eAttachment.top === 'bottom' && top < bounds[1] && top + (height * 2 - targetHeight) <= bounds[3]) {
	            top += height - targetHeight;
	            tAttachment.top = 'top';

	            eAttachment.top = 'top';
	          }
	        }

	        if (tAttachment.top === 'middle') {
	          if (top + height > bounds[3] && eAttachment.top === 'top') {
	            top -= height;
	            eAttachment.top = 'bottom';
	          } else if (top < bounds[1] && eAttachment.top === 'bottom') {
	            top += height;
	            eAttachment.top = 'top';
	          }
	        }
	      }

	      if (changeAttachX === 'target' || changeAttachX === 'both') {
	        if (left < bounds[0] && tAttachment.left === 'left') {
	          left += targetWidth;
	          tAttachment.left = 'right';
	        }

	        if (left + width > bounds[2] && tAttachment.left === 'right') {
	          left -= targetWidth;
	          tAttachment.left = 'left';
	        }
	      }

	      if (changeAttachX === 'together') {
	        if (left < bounds[0] && tAttachment.left === 'left') {
	          if (eAttachment.left === 'right') {
	            left += targetWidth;
	            tAttachment.left = 'right';

	            left += width;
	            eAttachment.left = 'left';
	          } else if (eAttachment.left === 'left') {
	            left += targetWidth;
	            tAttachment.left = 'right';

	            left -= width;
	            eAttachment.left = 'right';
	          }
	        } else if (left + width > bounds[2] && tAttachment.left === 'right') {
	          if (eAttachment.left === 'left') {
	            left -= targetWidth;
	            tAttachment.left = 'left';

	            left -= width;
	            eAttachment.left = 'right';
	          } else if (eAttachment.left === 'right') {
	            left -= targetWidth;
	            tAttachment.left = 'left';

	            left += width;
	            eAttachment.left = 'left';
	          }
	        } else if (tAttachment.left === 'center') {
	          if (left + width > bounds[2] && eAttachment.left === 'left') {
	            left -= width;
	            eAttachment.left = 'right';
	          } else if (left < bounds[0] && eAttachment.left === 'right') {
	            left += width;
	            eAttachment.left = 'left';
	          }
	        }
	      }

	      if (changeAttachY === 'element' || changeAttachY === 'both') {
	        if (top < bounds[1] && eAttachment.top === 'bottom') {
	          top += height;
	          eAttachment.top = 'top';
	        }

	        if (top + height > bounds[3] && eAttachment.top === 'top') {
	          top -= height;
	          eAttachment.top = 'bottom';
	        }
	      }

	      if (changeAttachX === 'element' || changeAttachX === 'both') {
	        if (left < bounds[0]) {
	          if (eAttachment.left === 'right') {
	            left += width;
	            eAttachment.left = 'left';
	          } else if (eAttachment.left === 'center') {
	            left += width / 2;
	            eAttachment.left = 'left';
	          }
	        }

	        if (left + width > bounds[2]) {
	          if (eAttachment.left === 'left') {
	            left -= width;
	            eAttachment.left = 'right';
	          } else if (eAttachment.left === 'center') {
	            left -= width / 2;
	            eAttachment.left = 'right';
	          }
	        }
	      }

	      if (typeof pin === 'string') {
	        pin = pin.split(',').map(function (p) {
	          return p.trim();
	        });
	      } else if (pin === true) {
	        pin = ['top', 'left', 'right', 'bottom'];
	      }

	      pin = pin || [];

	      var pinned = [];
	      var oob = [];

	      if (top < bounds[1]) {
	        if (pin.indexOf('top') >= 0) {
	          top = bounds[1];
	          pinned.push('top');
	        } else {
	          oob.push('top');
	        }
	      }

	      if (top + height > bounds[3]) {
	        if (pin.indexOf('bottom') >= 0) {
	          top = bounds[3] - height;
	          pinned.push('bottom');
	        } else {
	          oob.push('bottom');
	        }
	      }

	      if (left < bounds[0]) {
	        if (pin.indexOf('left') >= 0) {
	          left = bounds[0];
	          pinned.push('left');
	        } else {
	          oob.push('left');
	        }
	      }

	      if (left + width > bounds[2]) {
	        if (pin.indexOf('right') >= 0) {
	          left = bounds[2] - width;
	          pinned.push('right');
	        } else {
	          oob.push('right');
	        }
	      }

	      if (pinned.length) {
	        (function () {
	          var pinnedClass = undefined;
	          if (typeof _this.options.pinnedClass !== 'undefined') {
	            pinnedClass = _this.options.pinnedClass;
	          } else {
	            pinnedClass = _this.getClass('pinned');
	          }

	          addClasses.push(pinnedClass);
	          pinned.forEach(function (side) {
	            addClasses.push(pinnedClass + '-' + side);
	          });
	        })();
	      }

	      if (oob.length) {
	        (function () {
	          var oobClass = undefined;
	          if (typeof _this.options.outOfBoundsClass !== 'undefined') {
	            oobClass = _this.options.outOfBoundsClass;
	          } else {
	            oobClass = _this.getClass('out-of-bounds');
	          }

	          addClasses.push(oobClass);
	          oob.forEach(function (side) {
	            addClasses.push(oobClass + '-' + side);
	          });
	        })();
	      }

	      if (pinned.indexOf('left') >= 0 || pinned.indexOf('right') >= 0) {
	        eAttachment.left = tAttachment.left = false;
	      }
	      if (pinned.indexOf('top') >= 0 || pinned.indexOf('bottom') >= 0) {
	        eAttachment.top = tAttachment.top = false;
	      }

	      if (tAttachment.top !== targetAttachment.top || tAttachment.left !== targetAttachment.left || eAttachment.top !== _this.attachment.top || eAttachment.left !== _this.attachment.left) {
	        _this.updateAttachClasses(eAttachment, tAttachment);
	        _this.trigger('update', {
	          attachment: eAttachment,
	          targetAttachment: tAttachment
	        });
	      }
	    });

	    defer(function () {
	      if (!(_this.options.addTargetClasses === false)) {
	        updateClasses(_this.target, addClasses, allClasses);
	      }
	      updateClasses(_this.element, addClasses, allClasses);
	    });

	    return { top: top, left: left };
	  }
	});
	/* globals TetherBase */

	'use strict';

	var _TetherBase$Utils = TetherBase.Utils;
	var getBounds = _TetherBase$Utils.getBounds;
	var updateClasses = _TetherBase$Utils.updateClasses;
	var defer = _TetherBase$Utils.defer;

	TetherBase.modules.push({
	  position: function position(_ref) {
	    var _this = this;

	    var top = _ref.top;
	    var left = _ref.left;

	    var _cache = this.cache('element-bounds', function () {
	      return getBounds(_this.element);
	    });

	    var height = _cache.height;
	    var width = _cache.width;

	    var targetPos = this.getTargetBounds();

	    var bottom = top + height;
	    var right = left + width;

	    var abutted = [];
	    if (top <= targetPos.bottom && bottom >= targetPos.top) {
	      ['left', 'right'].forEach(function (side) {
	        var targetPosSide = targetPos[side];
	        if (targetPosSide === left || targetPosSide === right) {
	          abutted.push(side);
	        }
	      });
	    }

	    if (left <= targetPos.right && right >= targetPos.left) {
	      ['top', 'bottom'].forEach(function (side) {
	        var targetPosSide = targetPos[side];
	        if (targetPosSide === top || targetPosSide === bottom) {
	          abutted.push(side);
	        }
	      });
	    }

	    var allClasses = [];
	    var addClasses = [];

	    var sides = ['left', 'top', 'right', 'bottom'];
	    allClasses.push(this.getClass('abutted'));
	    sides.forEach(function (side) {
	      allClasses.push(_this.getClass('abutted') + '-' + side);
	    });

	    if (abutted.length) {
	      addClasses.push(this.getClass('abutted'));
	    }

	    abutted.forEach(function (side) {
	      addClasses.push(_this.getClass('abutted') + '-' + side);
	    });

	    defer(function () {
	      if (!(_this.options.addTargetClasses === false)) {
	        updateClasses(_this.target, addClasses, allClasses);
	      }
	      updateClasses(_this.element, addClasses, allClasses);
	    });

	    return true;
	  }
	});
	/* globals TetherBase */

	'use strict';

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	TetherBase.modules.push({
	  position: function position(_ref) {
	    var top = _ref.top;
	    var left = _ref.left;

	    if (!this.options.shift) {
	      return;
	    }

	    var shift = this.options.shift;
	    if (typeof this.options.shift === 'function') {
	      shift = this.options.shift.call(this, { top: top, left: left });
	    }

	    var shiftTop = undefined,
	        shiftLeft = undefined;
	    if (typeof shift === 'string') {
	      shift = shift.split(' ');
	      shift[1] = shift[1] || shift[0];

	      var _shift = shift;

	      var _shift2 = _slicedToArray(_shift, 2);

	      shiftTop = _shift2[0];
	      shiftLeft = _shift2[1];

	      shiftTop = parseFloat(shiftTop, 10);
	      shiftLeft = parseFloat(shiftLeft, 10);
	    } else {
	      shiftTop = shift.top;
	      shiftLeft = shift.left;
	    }

	    top += shiftTop;
	    left += shiftLeft;

	    return { top: top, left: left };
	  }
	});
	return Tether;

	}));


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(40), __esModule: true };

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Symbol = __webpack_require__(38)["default"];

	exports["default"] = function (obj) {
	  return obj && obj.constructor === _Symbol ? "symbol" : typeof obj;
	};

	exports.__esModule = true;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(46);
	__webpack_require__(45);
	module.exports = __webpack_require__(10).Symbol;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var $ = __webpack_require__(4);
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
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(7)
	  , getNames  = __webpack_require__(4).getNames
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
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(11);
	module.exports = Array.isArray || function(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var $         = __webpack_require__(4)
	  , toIObject = __webpack_require__(7);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = $.getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 45 */
/***/ function(module, exports) {

	

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var $              = __webpack_require__(4)
	  , global         = __webpack_require__(5)
	  , has            = __webpack_require__(12)
	  , DESCRIPTORS    = __webpack_require__(14)
	  , $export        = __webpack_require__(32)
	  , redefine       = __webpack_require__(36)
	  , $fails         = __webpack_require__(15)
	  , shared         = __webpack_require__(16)
	  , setToStringTag = __webpack_require__(28)
	  , uid            = __webpack_require__(17)
	  , wks            = __webpack_require__(9)
	  , keyOf          = __webpack_require__(44)
	  , $names         = __webpack_require__(42)
	  , enumKeys       = __webpack_require__(41)
	  , isArray        = __webpack_require__(43)
	  , anObject       = __webpack_require__(30)
	  , toIObject      = __webpack_require__(7)
	  , createDesc     = __webpack_require__(13)
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

	  if(DESCRIPTORS && !__webpack_require__(35)){
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
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! tether-drop 1.4.1 */

	(function(root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(37)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === 'object') {
	    module.exports = factory(require('tether'));
	  } else {
	    root.Drop = factory(root.Tether);
	  }
	}(this, function(Tether) {

	/* global Tether */
	'use strict';

	var _bind = Function.prototype.bind;

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _Tether$Utils = Tether.Utils;
	var extend = _Tether$Utils.extend;
	var addClass = _Tether$Utils.addClass;
	var removeClass = _Tether$Utils.removeClass;
	var hasClass = _Tether$Utils.hasClass;
	var Evented = _Tether$Utils.Evented;

	function sortAttach(str) {
	  var _str$split = str.split(' ');

	  var _str$split2 = _slicedToArray(_str$split, 2);

	  var first = _str$split2[0];
	  var second = _str$split2[1];

	  if (['left', 'right'].indexOf(first) >= 0) {
	    var _ref = [second, first];
	    first = _ref[0];
	    second = _ref[1];
	  }
	  return [first, second].join(' ');
	}

	function removeFromArray(arr, item) {
	  var index = undefined;
	  var results = [];
	  while ((index = arr.indexOf(item)) !== -1) {
	    results.push(arr.splice(index, 1));
	  }
	  return results;
	}

	var clickEvents = ['click'];
	if ('ontouchstart' in document.documentElement) {
	  clickEvents.push('touchstart');
	}

	var transitionEndEvents = {
	  'WebkitTransition': 'webkitTransitionEnd',
	  'MozTransition': 'transitionend',
	  'OTransition': 'otransitionend',
	  'transition': 'transitionend'
	};

	var transitionEndEvent = '';
	for (var _name in transitionEndEvents) {
	  if (({}).hasOwnProperty.call(transitionEndEvents, _name)) {
	    var tempEl = document.createElement('p');
	    if (typeof tempEl.style[_name] !== 'undefined') {
	      transitionEndEvent = transitionEndEvents[_name];
	    }
	  }
	}

	var MIRROR_ATTACH = {
	  left: 'right',
	  right: 'left',
	  top: 'bottom',
	  bottom: 'top',
	  middle: 'middle',
	  center: 'center'
	};

	var allDrops = {};

	// Drop can be included in external libraries.  Calling createContext gives you a fresh
	// copy of drop which won't interact with other copies on the page (beyond calling the document events).

	function createContext() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  var drop = function drop() {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return new (_bind.apply(DropInstance, [null].concat(args)))();
	  };

	  extend(drop, {
	    createContext: createContext,
	    drops: [],
	    defaults: {}
	  });

	  var defaultOptions = {
	    classPrefix: 'drop',
	    defaults: {
	      position: 'bottom left',
	      openOn: 'click',
	      beforeClose: null,
	      constrainToScrollParent: true,
	      constrainToWindow: true,
	      classes: '',
	      remove: false,
	      openDelay: 0,
	      closeDelay: 50,
	      // inherited from openDelay and closeDelay if not explicitly defined
	      focusDelay: null,
	      blurDelay: null,
	      hoverOpenDelay: null,
	      hoverCloseDelay: null,
	      tetherOptions: {}
	    }
	  };

	  extend(drop, defaultOptions, options);
	  extend(drop.defaults, defaultOptions.defaults, options.defaults);

	  if (typeof allDrops[drop.classPrefix] === 'undefined') {
	    allDrops[drop.classPrefix] = [];
	  }

	  drop.updateBodyClasses = function () {
	    // There is only one body, so despite the context concept, we still iterate through all
	    // drops which share our classPrefix.

	    var anyOpen = false;
	    var drops = allDrops[drop.classPrefix];
	    var len = drops.length;
	    for (var i = 0; i < len; ++i) {
	      if (drops[i].isOpened()) {
	        anyOpen = true;
	        break;
	      }
	    }

	    if (anyOpen) {
	      addClass(document.body, drop.classPrefix + '-open');
	    } else {
	      removeClass(document.body, drop.classPrefix + '-open');
	    }
	  };

	  var DropInstance = (function (_Evented) {
	    _inherits(DropInstance, _Evented);

	    function DropInstance(opts) {
	      _classCallCheck(this, DropInstance);

	      _get(Object.getPrototypeOf(DropInstance.prototype), 'constructor', this).call(this);
	      this.options = extend({}, drop.defaults, opts);
	      this.target = this.options.target;

	      if (typeof this.target === 'undefined') {
	        throw new Error('Drop Error: You must provide a target.');
	      }

	      var dataPrefix = 'data-' + drop.classPrefix;

	      var contentAttr = this.target.getAttribute(dataPrefix);
	      if (contentAttr && this.options.content == null) {
	        this.options.content = contentAttr;
	      }

	      var attrsOverride = ['position', 'openOn'];
	      for (var i = 0; i < attrsOverride.length; ++i) {

	        var override = this.target.getAttribute(dataPrefix + '-' + attrsOverride[i]);
	        if (override && this.options[attrsOverride[i]] == null) {
	          this.options[attrsOverride[i]] = override;
	        }
	      }

	      if (this.options.classes && this.options.addTargetClasses !== false) {
	        addClass(this.target, this.options.classes);
	      }

	      drop.drops.push(this);
	      allDrops[drop.classPrefix].push(this);

	      this._boundEvents = [];
	      this.bindMethods();
	      this.setupElements();
	      this.setupEvents();
	      this.setupTether();
	    }

	    _createClass(DropInstance, [{
	      key: '_on',
	      value: function _on(element, event, handler) {
	        this._boundEvents.push({ element: element, event: event, handler: handler });
	        element.addEventListener(event, handler);
	      }
	    }, {
	      key: 'bindMethods',
	      value: function bindMethods() {
	        this.transitionEndHandler = this._transitionEndHandler.bind(this);
	      }
	    }, {
	      key: 'setupElements',
	      value: function setupElements() {
	        var _this = this;

	        this.drop = document.createElement('div');
	        addClass(this.drop, drop.classPrefix);

	        if (this.options.classes) {
	          addClass(this.drop, this.options.classes);
	        }

	        this.content = document.createElement('div');
	        addClass(this.content, drop.classPrefix + '-content');

	        if (typeof this.options.content === 'function') {
	          var generateAndSetContent = function generateAndSetContent() {
	            // content function might return a string or an element
	            var contentElementOrHTML = _this.options.content.call(_this, _this);

	            if (typeof contentElementOrHTML === 'string') {
	              _this.content.innerHTML = contentElementOrHTML;
	            } else if (typeof contentElementOrHTML === 'object') {
	              _this.content.innerHTML = '';
	              _this.content.appendChild(contentElementOrHTML);
	            } else {
	              throw new Error('Drop Error: Content function should return a string or HTMLElement.');
	            }
	          };

	          generateAndSetContent();
	          this.on('open', generateAndSetContent.bind(this));
	        } else if (typeof this.options.content === 'object') {
	          this.content.appendChild(this.options.content);
	        } else {
	          this.content.innerHTML = this.options.content;
	        }

	        this.drop.appendChild(this.content);
	      }
	    }, {
	      key: 'setupTether',
	      value: function setupTether() {
	        // Tether expects two attachment points, one in the target element, one in the
	        // drop.  We use a single one, and use the order as well, to allow us to put
	        // the drop on either side of any of the four corners.  This magic converts between
	        // the two:
	        var dropAttach = this.options.position.split(' ');
	        dropAttach[0] = MIRROR_ATTACH[dropAttach[0]];
	        dropAttach = dropAttach.join(' ');

	        var constraints = [];
	        if (this.options.constrainToScrollParent) {
	          constraints.push({
	            to: 'scrollParent',
	            pin: 'top, bottom',
	            attachment: 'together none'
	          });
	        } else {
	          // To get 'out of bounds' classes
	          constraints.push({
	            to: 'scrollParent'
	          });
	        }

	        if (this.options.constrainToWindow !== false) {
	          constraints.push({
	            to: 'window',
	            attachment: 'together'
	          });
	        } else {
	          // To get 'out of bounds' classes
	          constraints.push({
	            to: 'window'
	          });
	        }

	        var opts = {
	          element: this.drop,
	          target: this.target,
	          attachment: sortAttach(dropAttach),
	          targetAttachment: sortAttach(this.options.position),
	          classPrefix: drop.classPrefix,
	          offset: '0 0',
	          targetOffset: '0 0',
	          enabled: false,
	          constraints: constraints,
	          addTargetClasses: this.options.addTargetClasses
	        };

	        if (this.options.tetherOptions !== false) {
	          this.tether = new Tether(extend({}, opts, this.options.tetherOptions));
	        }
	      }
	    }, {
	      key: 'setupEvents',
	      value: function setupEvents() {
	        var _this2 = this;

	        if (!this.options.openOn) {
	          return;
	        }

	        if (this.options.openOn === 'always') {
	          setTimeout(this.open.bind(this));
	          return;
	        }

	        var events = this.options.openOn.split(' ');

	        if (events.indexOf('click') >= 0) {
	          var openHandler = function openHandler(event) {
	            _this2.toggle(event);
	            event.preventDefault();
	          };

	          var closeHandler = function closeHandler(event) {
	            if (!_this2.isOpened()) {
	              return;
	            }

	            // Clicking inside dropdown
	            if (event.target === _this2.drop || _this2.drop.contains(event.target)) {
	              return;
	            }

	            // Clicking target
	            if (event.target === _this2.target || _this2.target.contains(event.target)) {
	              return;
	            }

	            _this2.close(event);
	          };

	          for (var i = 0; i < clickEvents.length; ++i) {
	            var clickEvent = clickEvents[i];
	            this._on(this.target, clickEvent, openHandler);
	            this._on(document, clickEvent, closeHandler);
	          }
	        }

	        var inTimeout = null;
	        var outTimeout = null;

	        var inHandler = function inHandler(event) {
	          if (outTimeout !== null) {
	            clearTimeout(outTimeout);
	          } else {
	            inTimeout = setTimeout(function () {
	              _this2.open(event);
	              inTimeout = null;
	            }, (event.type === 'focus' ? _this2.options.focusDelay : _this2.options.hoverOpenDelay) || _this2.options.openDelay);
	          }
	        };

	        var outHandler = function outHandler(event) {
	          if (inTimeout !== null) {
	            clearTimeout(inTimeout);
	          } else {
	            outTimeout = setTimeout(function () {
	              _this2.close(event);
	              outTimeout = null;
	            }, (event.type === 'blur' ? _this2.options.blurDelay : _this2.options.hoverCloseDelay) || _this2.options.closeDelay);
	          }
	        };

	        if (events.indexOf('hover') >= 0) {
	          this._on(this.target, 'mouseover', inHandler);
	          this._on(this.drop, 'mouseover', inHandler);
	          this._on(this.target, 'mouseout', outHandler);
	          this._on(this.drop, 'mouseout', outHandler);
	        }

	        if (events.indexOf('focus') >= 0) {
	          this._on(this.target, 'focus', inHandler);
	          this._on(this.drop, 'focus', inHandler);
	          this._on(this.target, 'blur', outHandler);
	          this._on(this.drop, 'blur', outHandler);
	        }
	      }
	    }, {
	      key: 'isOpened',
	      value: function isOpened() {
	        if (this.drop) {
	          return hasClass(this.drop, drop.classPrefix + '-open');
	        }
	      }
	    }, {
	      key: 'toggle',
	      value: function toggle(event) {
	        if (this.isOpened()) {
	          this.close(event);
	        } else {
	          this.open(event);
	        }
	      }
	    }, {
	      key: 'open',
	      value: function open(event) {
	        var _this3 = this;

	        /* eslint no-unused-vars: 0 */
	        if (this.isOpened()) {
	          return;
	        }

	        if (!this.drop.parentNode) {
	          document.body.appendChild(this.drop);
	        }

	        if (typeof this.tether !== 'undefined') {
	          this.tether.enable();
	        }

	        addClass(this.drop, drop.classPrefix + '-open');
	        addClass(this.drop, drop.classPrefix + '-open-transitionend');

	        setTimeout(function () {
	          if (_this3.drop) {
	            addClass(_this3.drop, drop.classPrefix + '-after-open');
	          }
	        });

	        if (typeof this.tether !== 'undefined') {
	          this.tether.position();
	        }

	        this.trigger('open');

	        drop.updateBodyClasses();
	      }
	    }, {
	      key: '_transitionEndHandler',
	      value: function _transitionEndHandler(e) {
	        if (e.target !== e.currentTarget) {
	          return;
	        }

	        if (!hasClass(this.drop, drop.classPrefix + '-open')) {
	          removeClass(this.drop, drop.classPrefix + '-open-transitionend');
	        }
	        this.drop.removeEventListener(transitionEndEvent, this.transitionEndHandler);
	      }
	    }, {
	      key: 'beforeCloseHandler',
	      value: function beforeCloseHandler(event) {
	        var shouldClose = true;

	        if (!this.isClosing && typeof this.options.beforeClose === 'function') {
	          this.isClosing = true;
	          shouldClose = this.options.beforeClose(event, this) !== false;
	        }

	        this.isClosing = false;

	        return shouldClose;
	      }
	    }, {
	      key: 'close',
	      value: function close(event) {
	        if (!this.isOpened()) {
	          return;
	        }

	        if (!this.beforeCloseHandler(event)) {
	          return;
	        }

	        removeClass(this.drop, drop.classPrefix + '-open');
	        removeClass(this.drop, drop.classPrefix + '-after-open');

	        this.drop.addEventListener(transitionEndEvent, this.transitionEndHandler);

	        this.trigger('close');

	        if (typeof this.tether !== 'undefined') {
	          this.tether.disable();
	        }

	        drop.updateBodyClasses();

	        if (this.options.remove) {
	          this.remove(event);
	        }
	      }
	    }, {
	      key: 'remove',
	      value: function remove(event) {
	        this.close(event);
	        if (this.drop.parentNode) {
	          this.drop.parentNode.removeChild(this.drop);
	        }
	      }
	    }, {
	      key: 'position',
	      value: function position() {
	        if (this.isOpened() && typeof this.tether !== 'undefined') {
	          this.tether.position();
	        }
	      }
	    }, {
	      key: 'destroy',
	      value: function destroy() {
	        this.remove();

	        if (typeof this.tether !== 'undefined') {
	          this.tether.destroy();
	        }

	        for (var i = 0; i < this._boundEvents.length; ++i) {
	          var _boundEvents$i = this._boundEvents[i];
	          var element = _boundEvents$i.element;
	          var _event = _boundEvents$i.event;
	          var handler = _boundEvents$i.handler;

	          element.removeEventListener(_event, handler);
	        }

	        this._boundEvents = [];

	        this.tether = null;
	        this.drop = null;
	        this.content = null;
	        this.target = null;

	        removeFromArray(allDrops[drop.classPrefix], this);
	        removeFromArray(drop.drops, this);
	      }
	    }]);

	    return DropInstance;
	  })(Evented);

	  return drop;
	}

	var Drop = createContext();

	document.addEventListener('DOMContentLoaded', function () {
	  Drop.updateBodyClasses();
	});
	return Drop;

	}));


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _classlist = __webpack_require__(19);

	var _classlist2 = _interopRequireDefault(_classlist);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var startRipple = function startRipple(eventType, event) {
	    var holder = event.target || event.currentTarget;

	    if (!holder) return;

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
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _tetherDrop = __webpack_require__(47);

	var _tetherDrop2 = _interopRequireDefault(_tetherDrop);

	var _classlist = __webpack_require__(19);

	var _classlist2 = _interopRequireDefault(_classlist);

	var _ReceivesTargetedEvent = __webpack_require__(24);

	var _ReceivesTargetedEvent2 = _interopRequireDefault(_ReceivesTargetedEvent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    props: {
	        id: String,
	        trigger: {
	            type: [Element, Function]
	        },
	        containFocus: {
	            type: Boolean,
	            default: true
	        },
	        dropdownPosition: {
	            type: String,
	            default: 'bottom left'
	        },
	        openOn: {
	            type: String,
	            default: 'click' },
	        dropConstrainToWindow: {
	            type: Boolean,
	            default: false
	        },
	        dropConstrainToScrollParent: {
	            type: Boolean,
	            default: false
	        },
	        tetherOptions: {
	            default: undefined
	        }
	    },

	    data: function data() {
	        return {
	            drop: null,
	            lastFocussedElement: null,
	            currentTrigger: null
	        };
	    },
	    mounted: function mounted() {
	        var _this = this;

	        var _arr = ['open', 'close', 'toggle'];

	        for (var _i = 0; _i < _arr.length; _i++) {
	            var event = _arr[_i];
	            this.$on('ui-dropdown::' + event, this['ui-dropdown::' + event]);
	        }
	        this.$nextTick(function () {
	            _this.initializeDropdown(_this.triggerComputed);
	        });
	    },
	    beforeDestroy: function beforeDestroy() {
	        this.destroyDropdown();
	        var _arr2 = ['open', 'close', 'toggle'];
	        for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
	            var event = _arr2[_i2];
	            this.$off('ui-dropdown::' + event, this['ui-dropdown::' + event]);
	        }
	    },


	    computed: {
	        triggerComputed: function triggerComputed() {
	            var result = void 0;
	            if (this.trigger instanceof Function) {
	                result = this.trigger();
	            } else {
	                result = this.trigger;
	            }
	            if (result && result.$el) {
	                return result.$el;
	            } else {
	                return result;
	            }
	        }
	    },

	    methods: {
	        'ui-dropdown::open': function uiDropdownOpen(id) {
	            if (!this.eventTargetsComponent(id)) {
	                return;
	            }

	            this.openDropdown();
	        },
	        'ui-dropdown::close': function uiDropdownClose(id) {
	            if (!this.eventTargetsComponent(id)) {
	                return;
	            }

	            this.closeDropdown();
	        },
	        'ui-dropdown::toggle': function uiDropdownToggle(id) {
	            if (!this.eventTargetsComponent(id)) {
	                return;
	            }

	            this.toggleDropdown();
	        },
	        initializeDropdown: function initializeDropdown(el) {
	            if (el !== this.currentTrigger) {
	                this.destroyDropdown();
	            } else return;

	            if (!el || !this.$refs || !this.$refs.dropdown) return;

	            this.currentTrigger = el;
	            this.currentTrigger.classList.add('no-fast-click');

	            this.drop = new _tetherDrop2.default({
	                target: el,
	                content: this.$refs.dropdown,
	                position: this.dropdownPosition,
	                constrainToWindow: this.dropConstrainToWindow,
	                constrainToScrollParent: this.dropConstrainToScrollParent,
	                openOn: this.openOn,
	                tetherOptions: this.tetherOptions
	            });

	            if (this.dropdownPosition !== 'bottom left') {
	                this.drop.open();
	                this.drop.close();
	                this.drop.open();
	                this.drop.close();
	            }

	            this.drop.on('open', this.positionDrop);
	            this.drop.on('open', this.dropdownOpened);
	            this.drop.on('close', this.dropdownClosed);
	        },
	        destroyDropdown: function destroyDropdown() {
	            if (this.drop) {
	                this.drop.remove();
	                this.drop.destroy();
	            }
	            this.currentTrigger = null;
	        },
	        openDropdown: function openDropdown() {
	            if (this.drop) {
	                this.drop.open();
	            }
	        },
	        positionDrop: function positionDrop() {
	            var drop = this.drop;
	            var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

	            var dropWidth = drop.drop.getBoundingClientRect().width;
	            var left = drop.target.getBoundingClientRect().left;
	            var availableSpace = windowWidth - left;

	            if (dropWidth > availableSpace) {
	                var direction = dropWidth > availableSpace ? 'right' : 'left';

	                drop.tether.attachment.left = direction;
	                drop.tether.targetAttachment.left = direction;

	                drop.position();
	            }
	        },
	        closeDropdown: function closeDropdown() {
	            if (this.drop) {
	                this.drop.close();
	            }
	        },
	        toggleDropdown: function toggleDropdown(e) {
	            if (this.drop) {
	                this.drop.toggle(e);
	            }
	        },
	        dropdownOpened: function dropdownOpened() {
	            _classlist2.default.add(this.trigger, 'dropdown-open');

	            this.lastFocussedElement = document.activeElement;
	            this.$refs.dropdown.focus();

	            this.$emit('dropdown-opened');
	        },
	        dropdownClosed: function dropdownClosed() {
	            _classlist2.default.remove(this.trigger, 'dropdown-open');

	            if (this.lastFocussedElement) {
	                this.lastFocussedElement.focus();
	            }

	            this.$emit('dropdown-closed');
	        }
	    },

	    mixins: [_ReceivesTargetedEvent2.default]
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(1)();
	// imports


	// module
	exports.push([module.id, "\n.ui-ripple-ink {\n  display: block;\n  overflow: hidden;\n  border-radius: inherit;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  -webkit-mask-image: -webkit-radial-gradient(circle, #fff, #000);\n}\n.ui-ripple-ink .ripple {\n  position: absolute;\n  width: 0;\n  height: 0;\n  pointer-events: none;\n  user-select: none;\n  border-radius: 50%;\n  background-color: currentColor;\n  background-clip: padding-box;\n  opacity: 0.2;\n  transform: scale(0);\n  transition: transform 0.4s ease-out, opacity 0.4s ease-out;\n}\n.ui-ripple-ink .ripple.held {\n  opacity: 0.4;\n  transform: scale(1);\n}\n.ui-ripple-ink .ripple.done {\n  opacity: 0 !important;\n}\n", ""]);

	// exports


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(53)

	var Component = __webpack_require__(2)(
	  /* script */
	  __webpack_require__(48),
	  /* template */
	  __webpack_require__(52),
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)
	Component.options.__file = "/Users/Shared/dev/libs/Keen-UI/src/UiRippleInk.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] UiRippleInk.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-5e039330", Component.options)
	  } else {
	    hotAPI.reload("data-v-5e039330", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "ui-ripple-ink"
	  })
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-5e039330", module.exports)
	  }
	}

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(50);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(3)("032b6c2e", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-5e039330!../node_modules/stylus-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./UiRippleInk.vue", function() {
	     var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-5e039330!../node_modules/stylus-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./UiRippleInk.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(65)

	var Component = __webpack_require__(2)(
	  /* script */
	  __webpack_require__(56),
	  /* template */
	  __webpack_require__(63),
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)
	Component.options.__file = "/Users/Shared/dev/libs/Keen-UI/src/UiProgressCircular.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] UiProgressCircular.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-d856d7ec", Component.options)
	  } else {
	    hotAPI.reload("data-v-d856d7ec", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _UiIcon = __webpack_require__(8);

	var _UiIcon2 = _interopRequireDefault(_UiIcon);

	var _ShowsRippleInk = __webpack_require__(25);

	var _ShowsRippleInk2 = _interopRequireDefault(_ShowsRippleInk);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    name: 'ui-menu-option',

	    props: {
	        type: String,
	        text: String,
	        icon: String,
	        showIcon: {
	            type: Boolean,
	            default: false
	        },
	        secondaryText: String,
	        showSecondaryText: {
	            type: Boolean,
	            default: false
	        },
	        partial: {
	            type: String,
	            default: 'ui-menu-default'
	        },
	        disabled: {
	            type: Boolean,
	            default: false
	        },
	        option: Object
	    },

	    computed: {
	        isDivider: function isDivider() {
	            return this.type === 'divider';
	        }
	    },

	    components: {
	        UiIcon: _UiIcon2.default,
	        'ui-menu-default': {
	            props: ['icon', 'showIcon', 'showSecondaryText', 'isDivider', 'text', 'secondaryText', 'partialClass'],
	            template: '\n            <div :class="[\'ui-menu-option-content\',partialClass]">\n                <ui-icon\n                    class="ui-menu-option-icon" :icon="icon" v-if="showIcon && !isDivider && icon"\n                ></ui-icon>\n\n                <div class="ui-menu-option-text" v-text="text" v-if="!isDivider"></div>\n\n                <div\n                    class="ui-menu-option-secondary-text" v-text="secondaryText"\n                    v-if="showSecondaryText && !isDivider && secondaryText"\n                ></div>\n            </div>\n            '
	        }
	    },

	    mixins: [_ShowsRippleInk2.default]
	};

/***/ },
/* 56 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    name: 'ui-progress-circular',

	    props: {
	        show: {
	            type: Boolean,
	            default: false
	        },
	        type: {
	            type: String,
	            default: 'indeterminate' },
	        color: {
	            type: String,
	            default: 'primary' },
	        value: {
	            type: Number,
	            default: 0
	        },
	        size: {
	            type: Number,
	            default: 32
	        },
	        inputStroke: Number,
	        autoStroke: {
	            type: Boolean,
	            default: true
	        },
	        disableTransition: {
	            type: Boolean,
	            default: false
	        }
	    },

	    computed: {
	        strokeDashArray: function strokeDashArray() {
	            var circumference = 2 * Math.PI * this.radius;

	            return Math.round(circumference * 1000) / 1000;
	        },
	        strokeDashOffset: function strokeDashOffset() {
	            var value = this.moderateValue(this.value);
	            var circumference = 2 * Math.PI * this.radius;

	            return (100 - value) / 100 * circumference;
	        },
	        radius: function radius() {
	            return (this.size - this.stroke) / 2;
	        },
	        stroke: function stroke() {
	            if (this.inputStroke) return this.inputStroke;
	            if (this.autoStroke) {
	                return parseInt(this.size / 8, 10);
	            } else {
	                return 4;
	            }
	        }
	    },

	    created: function created() {},


	    methods: {
	        moderateValue: function moderateValue(value) {
	            if (isNaN(value) || value < 0) {
	                return 0;
	            }

	            if (value > 100) {
	                return 100;
	            }

	            return value;
	        }
	    }
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(1)();
	// imports


	// module
	exports.push([module.id, "\n.ui-menu-option {\n  -webkit-user-select: none;\n  user-select: none;\n  cursor: default;\n}\n.ui-menu-option-text {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.ui-menu-option {\n  font-family: Roboto, -apple-system, BlinkMacSystemFont, \"Segoe UI\", \"Oxygen\", \"Ubuntu\", \"Cantarell\", \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif;\n  position: relative;\n  display: block;\n  height: 40px;\n}\n.ui-menu-option.divider {\n  display: block;\n  width: 100%;\n  margin: 6px 0;\n  padding: 0;\n  height: 1px;\n  background-color: rgba(0,0,0,0.08);\n}\n.ui-menu-option:not(.divider) {\n  width: 100%;\n  text-decoration: none;\n  color: rgba(0,0,0,0.87);\n  font-size: 14px;\n  font-weight: normal;\n  outline: none;\n}\n.ui-menu-option:not(.divider):hover:not(.disabled) {\n  background-color: rgba(0,0,0,0.06);\n}\nbody[modality=\"keyboard\"] .ui-menu-option:not(.divider):focus {\n  background-color: rgba(0,0,0,0.1);\n}\n.ui-menu-option:not(.divider).disabled {\n  opacity: 0.5;\n  color: rgba(0,0,0,0.54);\n}\n.ui-menu-option:not(.divider).disabled .ui-menu-option-secondary-text {\n  color: rgba(0,0,0,0.54);\n}\n.ui-menu-option:not(.divider):not(.disabled) {\n  cursor: pointer;\n}\n.ui-menu-option-content.ui-menu-default {\n  display: flex;\n  align-items: center;\n  padding: 8px 16px;\n}\n.ui-menu-option-icon {\n  margin-right: 16px;\n  font-size: 18px;\n  color: rgba(0,0,0,0.54);\n}\n.ui-menu-option-text {\n  flex-grow: 1;\n}\n.ui-menu-option-secondary-text {\n  flex-shrink: 0;\n  margin-left: 4px;\n  font-size: 13px;\n  color: rgba(0,0,0,0.38);\n}\n", ""]);

	// exports


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(1)();
	// imports


	// module
	exports.push([module.id, "\n.ui-progress-circular {\n  position: relative;\n}\n.ui-progress-circular .ui-progress-circular-determinate {\n  transform: rotate(270deg);\n}\n.ui-progress-circular .ui-progress-circular-determinate .ui-progress-circular-determinate-path {\n  stroke-dashoffset: 0;\n  transition: stroke-dashoffset 0.3s ease;\n}\n.ui-progress-circular .ui-progress-circular-determinate .ui-progress-circular-determinate-path.primary,\n.ui-progress-circular .ui-progress-circular-determinate .ui-progress-circular-determinate-path.multi-color {\n  stroke: #2196f3;\n}\n.ui-progress-circular .ui-progress-circular-determinate .ui-progress-circular-determinate-path.accent {\n  stroke: #d500f9;\n}\n.ui-progress-circular .ui-progress-circular-determinate .ui-progress-circular-determinate-path.black {\n  stroke: #212121;\n}\n.ui-progress-circular .ui-progress-circular-determinate .ui-progress-circular-determinate-path.white {\n  stroke: #fff;\n}\n.ui-progress-circular .ui-progress-circular-indeterminate {\n  animation: ui-progress-circular-rotate 1.4s linear infinite;\n  transform-origin: center center;\n  width: 100%;\n  height: 100%;\n  margin: auto;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n}\n.ui-progress-circular .ui-progress-circular-indeterminate-path {\n  stroke-dasharray: 1, 200;\n  stroke-dashoffset: 0;\n  stroke-linecap: round;\n  animation: ui-progress-circular-dash 1.4s ease-in-out infinite;\n}\n.ui-progress-circular .ui-progress-circular-indeterminate-path.multi-color {\n  animation: ui-progress-circular-dash 1.4s ease-in-out infinite, ui-progress-circular-color 6s ease-in-out infinite;\n}\n.ui-progress-circular .ui-progress-circular-indeterminate-path.primary {\n  stroke: #2196f3;\n}\n.ui-progress-circular .ui-progress-circular-indeterminate-path.accent {\n  stroke: #d500f9;\n}\n.ui-progress-circular .ui-progress-circular-indeterminate-path.black {\n  stroke: #212121;\n}\n.ui-progress-circular .ui-progress-circular-indeterminate-path.white {\n  stroke: #fff;\n}\n.ui-progress-circular-toggle-transition {\n  opacity: 1;\n  transform: scale(1);\n  transition-duration: 0.3s;\n  transition-timing-function: ease;\n  transition-property: transform, opacity;\n}\n.ui-progress-circular-toggle-enter,\n.ui-progress-circular-toggle-leave {\n  opacity: 0;\n  transform: scale(0);\n}\n@-moz-keyframes ui-progress-circular-rotate {\n100% {\n    transform: rotate(360deg);\n}\n}\n@-webkit-keyframes ui-progress-circular-rotate {\n100% {\n    transform: rotate(360deg);\n}\n}\n@-o-keyframes ui-progress-circular-rotate {\n100% {\n    transform: rotate(360deg);\n}\n}\n@keyframes ui-progress-circular-rotate {\n100% {\n    transform: rotate(360deg);\n}\n}\n@-moz-keyframes ui-progress-circular-dash {\n0% {\n    stroke-dasharray: 1, 200;\n    stroke-dashoffset: 0;\n}\n50% {\n    stroke-dasharray: 89, 200;\n    stroke-dashoffset: -35px;\n}\n100% {\n    stroke-dasharray: 89, 200;\n    stroke-dashoffset: -124px;\n}\n}\n@-webkit-keyframes ui-progress-circular-dash {\n0% {\n    stroke-dasharray: 1, 200;\n    stroke-dashoffset: 0;\n}\n50% {\n    stroke-dasharray: 89, 200;\n    stroke-dashoffset: -35px;\n}\n100% {\n    stroke-dasharray: 89, 200;\n    stroke-dashoffset: -124px;\n}\n}\n@-o-keyframes ui-progress-circular-dash {\n0% {\n    stroke-dasharray: 1, 200;\n    stroke-dashoffset: 0;\n}\n50% {\n    stroke-dasharray: 89, 200;\n    stroke-dashoffset: -35px;\n}\n100% {\n    stroke-dasharray: 89, 200;\n    stroke-dashoffset: -124px;\n}\n}\n@keyframes ui-progress-circular-dash {\n0% {\n    stroke-dasharray: 1, 200;\n    stroke-dashoffset: 0;\n}\n50% {\n    stroke-dasharray: 89, 200;\n    stroke-dashoffset: -35px;\n}\n100% {\n    stroke-dasharray: 89, 200;\n    stroke-dashoffset: -124px;\n}\n}\n@-moz-keyframes ui-progress-circular-color {\n100%, 0% {\n    stroke: #f44336;\n}\n40% {\n    stroke: #2196f3;\n}\n66% {\n    stroke: #4caf50;\n}\n80%, 90% {\n    stroke: #ff9800;\n}\n}\n@-webkit-keyframes ui-progress-circular-color {\n100%, 0% {\n    stroke: #f44336;\n}\n40% {\n    stroke: #2196f3;\n}\n66% {\n    stroke: #4caf50;\n}\n80%, 90% {\n    stroke: #ff9800;\n}\n}\n@-o-keyframes ui-progress-circular-color {\n100%, 0% {\n    stroke: #f44336;\n}\n40% {\n    stroke: #2196f3;\n}\n66% {\n    stroke: #4caf50;\n}\n80%, 90% {\n    stroke: #ff9800;\n}\n}\n@keyframes ui-progress-circular-color {\n100%, 0% {\n    stroke: #f44336;\n}\n40% {\n    stroke: #2196f3;\n}\n66% {\n    stroke: #4caf50;\n}\n80%, 90% {\n    stroke: #ff9800;\n}\n}\n", ""]);

	// exports


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(74)

	var Component = __webpack_require__(2)(
	  /* script */
	  __webpack_require__(66),
	  /* template */
	  __webpack_require__(72),
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)
	Component.options.__file = "/Users/Shared/dev/libs/Keen-UI/src/UiMenu.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] UiMenu.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-2972a0fd", Component.options)
	  } else {
	    hotAPI.reload("data-v-2972a0fd", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(64)

	var Component = __webpack_require__(2)(
	  /* script */
	  __webpack_require__(55),
	  /* template */
	  __webpack_require__(62),
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)
	Component.options.__file = "/Users/Shared/dev/libs/Keen-UI/src/UiMenuOption.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] UiMenuOption.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-2ba6a352", Component.options)
	  } else {
	    hotAPI.reload("data-v-2ba6a352", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(73)

	var Component = __webpack_require__(2)(
	  /* script */
	  __webpack_require__(67),
	  /* template */
	  __webpack_require__(71),
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)
	Component.options.__file = "/Users/Shared/dev/libs/Keen-UI/src/UiPopover.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] UiPopover.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-18c78077", Component.options)
	  } else {
	    hotAPI.reload("data-v-18c78077", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('a', {
	    staticClass: "ui-menu-option",
	    class: {
	      'divider': _vm.isDivider, 'disabled': _vm.disabled
	    },
	    attrs: {
	      "role": "menu-item",
	      "tabindex": (_vm.isDivider || _vm.disabled) ? null : '0'
	    },
	    on: {
	      "click": function($event) {
	        _vm.$emit('click', $event)
	      },
	      "keydown": function($event) {
	        _vm.$emit('keydown', $event)
	      }
	    }
	  }, [_c(_vm.partial, {
	    tag: "component",
	    attrs: {
	      "icon": _vm.icon,
	      "show-icon": _vm.showIcon,
	      "is-divider": _vm.isDivider,
	      "text": _vm.text,
	      "secondary-text": _vm.secondaryText,
	      "show-secondary-text": _vm.showSecondaryText,
	      "partial-class": [_vm.partial]
	    }
	  }), _vm._v(" "), (!_vm.hideRippleInk && !_vm.disabled && !_vm.isDivider) ? _c('ui-ripple-ink', {
	    attrs: {
	      "trigger": function () { return _vm.$el; }
	    }
	  }) : _vm._e()], 1)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-2ba6a352", module.exports)
	  }
	}

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.show),
	      expression: "show"
	    }],
	    staticClass: "ui-progress-circular",
	    style: ({
	      'width': _vm.size + 'px',
	      'height': _vm.size + 'px'
	    }),
	    attrs: {
	      "transition": _vm.disableTransition ? null : 'ui-progress-circular-toggle'
	    }
	  }, [(_vm.type === 'determinate') ? _c('svg', {
	    staticClass: "ui-progress-circular-determinate",
	    attrs: {
	      "width": _vm.size,
	      "height": _vm.size,
	      "role": "progressbar",
	      "aria-valuemin": 0,
	      "aria-valuemax": 100,
	      "aria-valuenow": _vm.value
	    }
	  }, [_c('circle', {
	    staticClass: "ui-progress-circular-determinate-path",
	    class: [_vm.color],
	    style: ({
	      'stroke-dashoffset': _vm.strokeDashOffset,
	      'stroke-width': _vm.stroke
	    }),
	    attrs: {
	      "r": _vm.radius,
	      "cx": _vm.size / 2,
	      "cy": _vm.size / 2,
	      "fill": "transparent",
	      "stroke-dasharray": _vm.strokeDashArray,
	      "stroke-dashoffset": "0"
	    }
	  })]) : _c('svg', {
	    staticClass: "ui-progress-circular-indeterminate",
	    attrs: {
	      "viewBox": "25 25 50 50",
	      "role": "progressbar",
	      "aria-valuemin": 0,
	      "aria-valuemax": 100
	    }
	  }, [_c('circle', {
	    staticClass: "ui-progress-circular-indeterminate-path",
	    class: [_vm.color],
	    attrs: {
	      "cx": "50",
	      "cy": "50",
	      "r": "20",
	      "fill": "none",
	      "stroke-miterlimit": "10",
	      "stroke-width": _vm.stroke
	    }
	  })])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-d856d7ec", module.exports)
	  }
	}

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(57);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(3)("d607d62a", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-2ba6a352!../node_modules/stylus-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./UiMenuOption.vue", function() {
	     var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-2ba6a352!../node_modules/stylus-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./UiMenuOption.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(58);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(3)("37a74ca5", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-d856d7ec!../node_modules/stylus-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./UiProgressCircular.vue", function() {
	     var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-d856d7ec!../node_modules/stylus-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./UiProgressCircular.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _UiMenuOption = __webpack_require__(60);

	var _UiMenuOption2 = _interopRequireDefault(_UiMenuOption);

	var _ShowsDropdown = __webpack_require__(49);

	var _ShowsDropdown2 = _interopRequireDefault(_ShowsDropdown);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var inFocusFunction = false;

	exports.default = {
	    name: 'ui-menu',

	    props: {
	        options: {
	            type: Array,
	            required: true,
	            default: function _default() {
	                return [];
	            }
	        },
	        showIcons: {
	            type: Boolean,
	            default: false
	        },
	        showSecondaryText: {
	            type: Boolean,
	            default: false
	        },
	        hideRippleInk: {
	            type: Boolean,
	            default: false
	        },
	        closeOnSelect: {
	            type: Boolean,
	            default: true
	        },
	        partial: {
	            type: String,
	            default: 'ui-menu-default'
	        }
	    },

	    mounted: function mounted() {
	        var _this = this;

	        this.$nextTick(function () {
	            var _arr = ['opened', 'closed'];

	            for (var _i = 0; _i < _arr.length; _i++) {
	                var event = _arr[_i];
	                _this.$on('dropdown-' + event, _this['dropdown-' + event]);
	            }
	        });
	    },
	    beforeDestroy: function beforeDestroy() {
	        var _arr2 = ['opened', 'closed'];

	        for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
	            var event = _arr2[_i2];
	            this.$off('dropdown-' + event, this['dropdown-' + event]);
	        }
	    },


	    methods: {
	        'dropdown-opened': function dropdownOpened() {
	            if (this.containFocus) {
	                document.addEventListener('focus', this.restrictFocus, true);
	            }

	            this.$emit('opened');

	            return true;
	        },

	        'dropdown-closed': function dropdownClosed() {
	            if (this.containFocus) {
	                document.removeEventListener('focus', this.restrictFocus, true);
	            }

	            this.$emit('closed');

	            return true;
	        },

	        optionSelect: function optionSelect(option) {
	            if (!(option.disabled || option.type === 'divider')) {
	                this.$emit('option-selected', option);

	                if (this.closeOnSelect) {
	                    this.closeDropdown();
	                }
	            }
	        },
	        restrictFocus: function restrictFocus(e) {
	            if (inFocusFunction) return;
	            inFocusFunction = true;
	            if (!this.$refs.dropdown.contains(e.target)) {
	                e.stopPropagation();

	                this.$refs.dropdown.querySelector('.ui-menu-option').focus();
	            }
	            inFocusFunction = false;
	        },
	        redirectFocus: function redirectFocus(e) {
	            e.stopPropagation();

	            this.$refs.dropdown.querySelector('.ui-menu-option').focus();
	        }
	    },

	    components: {
	        UiMenuOption: _UiMenuOption2.default
	    },

	    mixins: [_ShowsDropdown2.default]
	};

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _ShowsDropdown = __webpack_require__(49);

	var _ShowsDropdown2 = _interopRequireDefault(_ShowsDropdown);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var inFocusFunction = false;

	exports.default = {
	    name: 'ui-popover',

	    mounted: function mounted() {
	        var _arr = ['opened', 'closed'];

	        for (var _i = 0; _i < _arr.length; _i++) {
	            var event = _arr[_i];
	            this.$on('dropdown-' + event, this['dropdown-' + event]);
	        }
	    },
	    beforeDestroy: function beforeDestroy() {
	        var _arr2 = ['opened', 'closed'];

	        for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
	            var event = _arr2[_i2];
	            this.$off('dropdown-' + event, this['dropdown-' + event]);
	        }
	    },


	    methods: {
	        'dropdown-opened': function dropdownOpened() {
	            if (this.containFocus) {
	                document.addEventListener('focus', this.restrictFocus, true);
	            }

	            this.$emit('opened');

	            return true;
	        },

	        'dropdown-closed': function dropdownClosed() {
	            if (this.containFocus) {
	                document.removeEventListener('focus', this.restrictFocus, true);
	            }

	            this.$emit('closed');

	            return true;
	        },

	        restrictFocus: function restrictFocus(e) {
	            if (inFocusFunction) return;
	            inFocusFunction = true;
	            if (!this.$refs.dropdown.contains(e.target)) {
	                e.stopPropagation();

	                this.$refs.dropdown.focus();
	            }
	            inFocusFunction = false;
	        }
	    },

	    mixins: [_ShowsDropdown2.default]
	};

/***/ },
/* 68 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    props: {
	        openDropdownOn: String,
	        dropdownPosition: String,
	        hasPopover: {
	            type: Boolean,
	            default: false
	        },
	        hasDropdownMenu: {
	            type: Boolean,
	            default: false
	        },
	        menuOptions: {
	            type: Array,
	            default: function _default() {
	                return [];
	            }
	        },
	        showMenuIcons: {
	            type: Boolean,
	            default: false
	        },
	        showMenuSecondaryText: {
	            type: Boolean,
	            default: false
	        }
	    },

	    methods: {
	        menuOptionSelect: function menuOptionSelect(option) {
	            this.$emit('menu-option-selected', option);
	        }
	    }
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(1)();
	// imports


	// module
	exports.push([module.id, "\n.ui-popover {\n  padding: 16px;\n  outline: none;\n  background-color: #fff;\n  box-shadow: 0 2px 4px -1px rgba(0,0,0,0.3), 0 4px 5px 0 rgba(0,0,0,0.15), 0 1px 10px 0 rgba(0,0,0,0.13);\n}\n", ""]);

	// exports


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(1)();
	// imports


	// module
	exports.push([module.id, "\n.ui-menu {\n  font-family: Roboto, -apple-system, BlinkMacSystemFont, \"Segoe UI\", \"Oxygen\", \"Ubuntu\", \"Cantarell\", \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif;\n  margin: 0;\n  padding: 4px 0;\n  outline: none;\n  list-style: none;\n  background-color: #fff;\n  box-shadow: 0 2px 4px -1px rgba(0,0,0,0.3), 0 4px 5px 0 rgba(0,0,0,0.15), 0 1px 10px 0 rgba(0,0,0,0.13);\n  min-width: 168px;\n  max-width: 272px;\n  max-height: 100vh;\n  overflow-y: auto;\n  overflow-x: hidden;\n}\n.ui-menu.has-secondary-text {\n  min-width: 208px;\n  max-width: 304px;\n}\n", ""]);

	// exports


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    ref: "dropdown",
	    staticClass: "ui-popover",
	    attrs: {
	      "role": "dialog",
	      "tabindex": "-1"
	    },
	    on: {
	      "keydown": function($event) {
	        if (_vm._k($event.keyCode, "esc", 27)) { return null; }
	        _vm.closeDropdown($event)
	      }
	    }
	  }, [_vm._t("default")], 2)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-18c78077", module.exports)
	  }
	}

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('ul', {
	    ref: "dropdown",
	    staticClass: "ui-menu",
	    class: {
	      'has-icons': _vm.showIcons, 'has-secondary-text': _vm.showSecondaryText
	    },
	    attrs: {
	      "role": "menu",
	      "tabindex": "-1"
	    },
	    on: {
	      "keydown": function($event) {
	        if (_vm._k($event.keyCode, "esc", 27)) { return null; }
	        _vm.closeDropdown($event)
	      }
	    }
	  }, [_vm._l((_vm.options), function(option) {
	    return _c('ui-menu-option', {
	      attrs: {
	        "type": option.type,
	        "icon": option.icon,
	        "text": option.text,
	        "disabled": option.disabled,
	        "secondary-text": option.secondaryText,
	        "option": option,
	        "show-icon": _vm.showIcons,
	        "show-secondary-text": _vm.showSecondaryText,
	        "hide-ripple-ink": _vm.hideRippleInk,
	        "partial": option.partial || _vm.partial
	      },
	      on: {
	        "keydown": function($event) {
	          if (_vm._k($event.keyCode, "enter", 13)) { return null; }
	          $event.preventDefault();
	          _vm.optionSelect(option)
	        },
	        "click": function($event) {
	          _vm.optionSelect(option)
	        }
	      }
	    })
	  }), _vm._v(" "), _c('div', {
	    staticClass: "ui-menu-focus-redirector",
	    attrs: {
	      "tabindex": "0"
	    },
	    on: {
	      "focus": _vm.redirectFocus
	    }
	  })], 2)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-2972a0fd", module.exports)
	  }
	}

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(69);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(3)("2c7bd6b1", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-18c78077!../node_modules/stylus-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./UiPopover.vue", function() {
	     var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-18c78077!../node_modules/stylus-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./UiPopover.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(70);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(3)("3ed6e2bb", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-2972a0fd!../node_modules/stylus-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./UiMenu.vue", function() {
	     var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-2972a0fd!../node_modules/stylus-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./UiMenu.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ },
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(91)

	var Component = __webpack_require__(2)(
	  /* script */
	  __webpack_require__(84),
	  /* template */
	  __webpack_require__(89),
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)
	Component.options.__file = "/Users/Shared/dev/libs/Keen-UI/src/UiButton.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] UiButton.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-052887d0", Component.options)
	  } else {
	    hotAPI.reload("data-v-052887d0", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _UiIcon = __webpack_require__(8);

	var _UiIcon2 = _interopRequireDefault(_UiIcon);

	var _UiMenu = __webpack_require__(59);

	var _UiMenu2 = _interopRequireDefault(_UiMenu);

	var _UiPopover = __webpack_require__(61);

	var _UiPopover2 = _interopRequireDefault(_UiPopover);

	var _UiProgressCircular = __webpack_require__(54);

	var _UiProgressCircular2 = _interopRequireDefault(_UiProgressCircular);

	var _disabled = __webpack_require__(23);

	var _disabled2 = _interopRequireDefault(_disabled);

	var _HasDropdown = __webpack_require__(68);

	var _HasDropdown2 = _interopRequireDefault(_HasDropdown);

	var _ShowsRippleInk = __webpack_require__(25);

	var _ShowsRippleInk2 = _interopRequireDefault(_ShowsRippleInk);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    name: 'ui-button',

	    props: {
	        type: {
	            type: String,
	            default: 'normal' },
	        buttonType: {
	            type: String,
	            default: 'submit' },
	        color: {
	            type: String,
	            default: 'default' },
	        raised: {
	            type: Boolean,
	            default: false
	        },
	        text: String,
	        icon: String,
	        iconRight: {
	            type: Boolean,
	            default: false
	        },
	        loading: {
	            type: Boolean,
	            default: false
	        },
	        showDropdownIcon: {
	            type: Boolean,
	            default: true
	        },
	        disabled: {
	            type: Boolean,
	            default: false
	        }
	    },

	    computed: {
	        colorComputed: function colorComputed() {
	            return 'color-' + this.color;
	        },
	        typeComputed: function typeComputed() {
	            return 'ui-button-' + this.type;
	        },
	        styleClasses: function styleClasses() {
	            var classes = [this.typeComputed, this.colorComputed];

	            if (this.raised) {
	                classes.push('ui-button-raised');
	            }

	            if (this.hasDropdownMenu || this.hasPopover) {
	                classes.push('has-dropdown');
	            }

	            return classes;
	        },
	        spinnerColor: function spinnerColor() {
	            if (this.colorComputed === 'color-default' || this.type === 'ui-button-flat') {
	                return 'black';
	            }

	            return 'white';
	        },
	        showIcon: function showIcon() {
	            return Boolean(this.icon);
	        }
	    },

	    components: {
	        UiIcon: _UiIcon2.default,
	        UiMenu: _UiMenu2.default,
	        UiPopover: _UiPopover2.default,
	        UiProgressCircular: _UiProgressCircular2.default
	    },

	    mixins: [_HasDropdown2.default, _ShowsRippleInk2.default],

	    directives: {
	        disabled: _disabled2.default
	    }
	};

/***/ },
/* 85 */,
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(1)();
	// imports


	// module
	exports.push([module.id, "\n.ui-button {\n  font-size: 14px;\n  text-transform: uppercase;\n  font-weight: 500;\n  line-height: 1.71em;\n  letter-spacing: 0.02em;\n}\n.drop-element {\n  position: absolute;\n  display: none;\n  z-index: 60;\n  max-width: 100%;\n  max-height: 100%;\n  transition: opacity 0.2s ease;\n  opacity: 0;\n}\n.drop-element,\n.drop-element:after,\n.drop-element:before,\n.drop-element *,\n.drop-element *:after,\n.drop-element *:before {\n  box-sizing: border-box;\n}\n.drop-element.drop-open {\n  display: block;\n}\n.drop-element.drop-after-open {\n  opacity: 1;\n}\n.ui-button {\n  font-family: Roboto, -apple-system, BlinkMacSystemFont, \"Segoe UI\", \"Oxygen\", \"Ubuntu\", \"Cantarell\", \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif;\n  line-height: 1;\n  background: none;\n  overflow: hidden;\n  outline: none;\n  border: none;\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  touch-action: manipulation;\n  cursor: default;\n  border-radius: 2px;\n  padding: 8px 16px;\n  min-width: 80px;\n  height: 40px;\n}\n.ui-button::-moz-focus-inner {\n  border: 0;\n}\n.ui-button.autofocus:focus,\nbody[modality=\"keyboard\"] .ui-button:focus {\n  outline-style: solid;\n}\n.ui-button[disabled] {\n  opacity: 0.6;\n}\n.ui-button:not([disabled]) {\n  cursor: pointer;\n}\n.ui-button .ui-button-dropdown-menu {\n  display: none;\n}\n.ui-button .ui-button-spinner {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n.ui-button-raised {\n  box-shadow: 0 0 2px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.2);\n  transition: box-shadow 0.1s;\n}\n.ui-button-raised.autofocus:focus,\nbody[modality=\"keyboard\"] .ui-button-raised:focus {\n  outline: none;\n  box-shadow: 0 0 5px rgba(0,0,0,0.22), 0 3px 6px rgba(0,0,0,0.3);\n}\n.ui-button-normal.autofocus:focus,\nbody[modality=\"keyboard\"] .ui-button-normal:focus {\n  outline-width: 2px;\n  outline-offset: 2px;\n}\n.ui-button-normal.color-primary,\n.ui-button-normal.color-accent,\n.ui-button-normal.color-success,\n.ui-button-normal.color-warning,\n.ui-button-normal.color-danger {\n  color: #fff;\n}\n.ui-button-normal.color-primary .ui-ripple-ink .ripple.held,\n.ui-button-normal.color-accent .ui-ripple-ink .ripple.held,\n.ui-button-normal.color-success .ui-ripple-ink .ripple.held,\n.ui-button-normal.color-warning .ui-ripple-ink .ripple.held,\n.ui-button-normal.color-danger .ui-ripple-ink .ripple.held {\n  opacity: 0.7;\n}\n.ui-button-normal.color-default {\n  color: rgba(0,0,0,0.87);\n  background-color: #eee;\n}\n.ui-button-normal.color-default:hover:not([disabled]),\n.ui-button-normal.color-default.dropdown-open {\n  background-color: #dcdcdc;\n}\n.ui-button-normal.color-default.autofocus:focus,\nbody[modality=\"keyboard\"] .ui-button-normal.color-default:focus {\n  background-color: #cacaca;\n  outline-color: #a7a7a7;\n}\n.ui-button-normal.color-default .ui-ripple-ink .ripple.held {\n  opacity: 0.2;\n}\n.ui-button-normal.color-default .ui-button-icon,\n.ui-button-normal.color-default .ui-button-dropdown-icon {\n  color: rgba(0,0,0,0.54);\n}\n.ui-button-normal.color-primary {\n  background-color: #2196f3;\n}\n.ui-button-normal.color-primary:hover:not([disabled]),\n.ui-button-normal.color-primary.dropdown-open {\n  background-color: #0c81df;\n}\n.ui-button-normal.color-primary.autofocus:focus,\nbody[modality=\"keyboard\"] .ui-button-normal.color-primary:focus {\n  background-color: #0b7ad1;\n  outline-color: #0b7ad1;\n}\n.ui-button-normal.color-accent {\n  background-color: #d500f9;\n}\n.ui-button-normal.color-accent:hover:not([disabled]),\n.ui-button-normal.color-accent.dropdown-open {\n  background-color: #b500d4;\n}\n.ui-button-normal.color-accent.autofocus:focus,\nbody[modality=\"keyboard\"] .ui-button-normal.color-accent:focus {\n  background-color: #aa00c7;\n  outline-color: #aa00c7;\n}\n.ui-button-normal.color-success {\n  background-color: #4caf50;\n}\n.ui-button-normal.color-success:hover:not([disabled]),\n.ui-button-normal.color-success.dropdown-open {\n  background-color: #419544;\n}\n.ui-button-normal.color-success.autofocus:focus,\nbody[modality=\"keyboard\"] .ui-button-normal.color-success:focus {\n  background-color: #3d8c40;\n  outline-color: #3d8c40;\n}\n.ui-button-normal.color-warning {\n  background-color: #ff9800;\n}\n.ui-button-normal.color-warning:hover:not([disabled]),\n.ui-button-normal.color-warning.dropdown-open {\n  background-color: #d98100;\n}\n.ui-button-normal.color-warning.autofocus:focus,\nbody[modality=\"keyboard\"] .ui-button-normal.color-warning:focus {\n  background-color: #cc7a00;\n  outline-color: #cc7a00;\n}\n.ui-button-normal.color-danger {\n  background-color: #f44336;\n}\n.ui-button-normal.color-danger:hover:not([disabled]),\n.ui-button-normal.color-danger.dropdown-open {\n  background-color: #f01d0d;\n}\n.ui-button-normal.color-danger.autofocus:focus,\nbody[modality=\"keyboard\"] .ui-button-normal.color-danger:focus {\n  background-color: #e21b0c;\n  outline-color: #e21b0c;\n}\n.ui-button-flat {\n  background-color: transparent;\n}\n.ui-button-flat:hover:not([disabled]),\n.ui-button-flat.dropdown-open {\n  background-color: #e7e7e7;\n}\n.ui-button-flat.autofocus:focus,\nbody[modality=\"keyboard\"] .ui-button-flat:focus {\n  outline-width: 2px;\n  outline-offset: 0;\n}\n.ui-button-flat.color-default {\n  color: rgba(0,0,0,0.87);\n}\n.ui-button-flat.color-default .ui-button-icon {\n  color: rgba(0,0,0,0.54);\n}\n.ui-button-flat.color-default.autofocus:focus,\nbody[modality=\"keyboard\"] .ui-button-flat.color-default:focus {\n  outline-color: #b3b3b3;\n}\n.ui-button-flat.color-primary {\n  color: #2196f3;\n}\n.ui-button-flat.color-accent {\n  color: #d500f9;\n}\n.ui-button-flat.color-success {\n  color: #43a047;\n}\n.ui-button-flat.color-warning {\n  color: #ff9800;\n}\n.ui-button-flat.color-danger {\n  color: #f44336;\n}\n.ui-button-icon {\n  font-size: 18px;\n  margin-right: 4px;\n  margin-left: -4px;\n}\n.ui-button-icon.position-right {\n  order: 1;\n  margin-left: 4px;\n  margin-right: -4px;\n}\n.ui-button-content {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.ui-button-content.invisible {\n  visibility: hidden;\n}\n.ui-button-dropdown-icon {\n  font-size: 18px;\n  margin-right: -8px;\n  margin-left: 1px;\n}\n.ui-button-group {\n  display: flex;\n  flex-wrap: wrap;\n}\n", ""]);

	// exports


/***/ },
/* 87 */,
/* 88 */,
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('button', {
	    directives: [{
	      name: "disabled",
	      rawName: "v-disabled",
	      value: (_vm.disabled || _vm.loading),
	      expression: "disabled || loading"
	    }],
	    ref: "button",
	    staticClass: "ui-button",
	    class: _vm.styleClasses,
	    attrs: {
	      "type": _vm.buttonType
	    },
	    on: {
	      "click": function($event) {
	        _vm.$emit('click', $event)
	      }
	    }
	  }, [_c('div', {
	    staticClass: "ui-button-content",
	    class: {
	      'invisible': _vm.loading
	    }
	  }, [(_vm.showIcon) ? _c('ui-icon', {
	    staticClass: "ui-button-icon",
	    class: {
	      'position-right': _vm.iconRight
	    },
	    attrs: {
	      "icon": _vm.icon
	    }
	  }) : _vm._e(), _vm._v(" "), _c('div', {
	    staticClass: "ui-button-text"
	  }, [_vm._t("default", [_c('span', {
	    domProps: {
	      "textContent": _vm._s(_vm.text)
	    }
	  })])], 2), _vm._v(" "), (!_vm.iconRight && _vm.showDropdownIcon && (_vm.hasDropdownMenu || _vm.hasPopover)) ? _c('ui-icon', {
	    staticClass: "ui-button-dropdown-icon",
	    attrs: {
	      "icon": "&#xE5C5;"
	    }
	  }) : _vm._e()], 1), _vm._v(" "), _c('ui-progress-circular', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.loading),
	      expression: "loading"
	    }],
	    staticClass: "ui-button-spinner",
	    attrs: {
	      "color": _vm.spinnerColor,
	      "size": 18,
	      "stroke": 4.5,
	      "disable-transition": ""
	    }
	  }), _vm._v(" "), (!_vm.hideRippleInk && !_vm.disabled) ? _c('ui-ripple-ink', {
	    attrs: {
	      "trigger": function () { return _vm.$el; }
	    }
	  }) : _vm._e(), _vm._v(" "), (_vm.hasDropdownMenu) ? _c('ui-menu', {
	    staticClass: "ui-button-dropdown-menu",
	    attrs: {
	      "trigger": function () { return _vm.$el; },
	      "options": _vm.menuOptions,
	      "show-icons": _vm.showMenuIcons,
	      "show-secondary-text": _vm.showMenuSecondaryText,
	      "open-on": _vm.openDropdownOn,
	      "dropdown-position": _vm.dropdownPosition
	    },
	    on: {
	      "option-selected": _vm.menuOptionSelect
	    }
	  }) : _vm._e(), _vm._v(" "), (_vm.hasPopover) ? _c('ui-popover', {
	    attrs: {
	      "trigger": function () { return _vm.$el; },
	      "open-on": _vm.openDropdownOn,
	      "dropdown-position": _vm.dropdownPosition
	    }
	  }, [_vm._t("popover")], 2) : _vm._e()], 1)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-052887d0", module.exports)
	  }
	}

/***/ },
/* 90 */,
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(86);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(3)("3f820162", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-052887d0!../node_modules/stylus-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./UiButton.vue", function() {
	     var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-052887d0!../node_modules/stylus-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./UiButton.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ },
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */
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
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _UiButton = __webpack_require__(83);

	var _UiButton2 = _interopRequireDefault(_UiButton);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    name: 'ui-snackbar',

	    props: {
	        id: String,
	        show: {
	            type: Boolean,
	            default: false
	        },
	        message: String,
	        action: String,
	        actionColor: {
	            type: String,
	            default: 'accent' },
	        persistent: {
	            type: Boolean,
	            default: false
	        },
	        duration: {
	            type: Number,
	            default: 5000
	        },
	        autoHide: {
	            type: Boolean,
	            default: true
	        }
	    },

	    data: function data() {
	        return {
	            height: 0,
	            timeout: null
	        };
	    },
	    beforeDestroy: function beforeDestroy() {
	        if (this.timeout) {
	            clearTimeout(this.timeout);
	        }
	    },


	    methods: {
	        click: function click() {
	            this.$emit('clicked');
	            this.hide();
	        },
	        actionClick: function actionClick() {
	            this.$emit('action-clicked');
	            this.hide();
	        },
	        hide: function hide() {
	            if (!this.persistent) {
	                this.show = false;
	            }
	        }
	    },

	    components: {
	        UiButton: _UiButton2.default
	    },

	    transitions: {
	        'ui-snackbar-toggle': {
	            afterEnter: function afterEnter() {
	                this.$emit('shown');

	                if (this.autoHide) {
	                    this.timeout = setTimeout(this.hide, this.duration);
	                }
	            },
	            afterLeave: function afterLeave() {
	                this.$emit('hidden');

	                if (this.timeout) {
	                    clearTimeout(this.timeout);
	                    this.timeout = null;
	                }
	            }
	        }
	    }
	};

/***/ },
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(1)();
	// imports


	// module
	exports.push([module.id, "\n.ui-snackbar {\n  font-family: Roboto, -apple-system, BlinkMacSystemFont, \"Segoe UI\", \"Oxygen\", \"Ubuntu\", \"Cantarell\", \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif;\n  display: inline-flex;\n  align-items: center;\n  min-width: 288px;\n  max-width: 568px;\n  min-height: 48px;\n  padding: 14px 24px;\n  border-radius: 2px;\n  background-color: #323232;\n  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);\n}\n.ui-snackbar-text {\n  line-height: 1.5;\n  font-size: 14px;\n  color: #fff;\n  cursor: default;\n}\n.ui-snackbar-action {\n  margin: -9px -12px -9px auto;\n  padding-left: 48px;\n}\n.ui-snackbar-action .ui-snackbar-action-button {\n  margin: 0;\n  padding: 12px;\n  min-height: initial;\n  min-width: initial;\n}\n.ui-snackbar-action .ui-snackbar-action-button:hover {\n  background-color: rgba(255,255,255,0.05);\n}\n.ui-snackbar-toggle-transition {\n  transition: transform 0.3s ease;\n}\n.ui-snackbar-toggle-transition .ui-snackbar-text,\n.ui-snackbar-toggle-transition .ui-snackbar-action {\n  opacity: 1;\n  transition: opacity 0.3s ease;\n}\n.ui-snackbar-toggle-enter,\n.ui-snackbar-toggle-leave {\n  transform: translateY(84px);\n}\n.ui-snackbar-toggle-enter .ui-snackbar-text,\n.ui-snackbar-toggle-leave .ui-snackbar-text,\n.ui-snackbar-toggle-enter .ui-snackbar-action,\n.ui-snackbar-toggle-leave .ui-snackbar-action {\n  opacity: 0;\n}\n", ""]);

	// exports


/***/ },
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(139)

	var Component = __webpack_require__(2)(
	  /* script */
	  __webpack_require__(121),
	  /* template */
	  __webpack_require__(135),
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)
	Component.options.__file = "/Users/Shared/dev/libs/Keen-UI/src/UiSnackbar.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] UiSnackbar.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-10117ea3", Component.options)
	  } else {
	    hotAPI.reload("data-v-10117ea3", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.show),
	      expression: "show"
	    }],
	    staticClass: "ui-snackbar",
	    attrs: {
	      "id": _vm.id,
	      "transition": "ui-snackbar-toggle"
	    },
	    on: {
	      "click": _vm.click
	    }
	  }, [_c('div', {
	    staticClass: "ui-snackbar-text"
	  }, [_vm._t("default", [_c('span', {
	    domProps: {
	      "textContent": _vm._s(_vm.message)
	    }
	  })])], 2), _vm._v(" "), _c('div', {
	    staticClass: "ui-snackbar-action"
	  }, [(_vm.action) ? _c('ui-button', {
	    staticClass: "ui-snackbar-action-button",
	    attrs: {
	      "type": "flat",
	      "color": _vm.actionColor,
	      "text": _vm.action
	    },
	    on: {
	      "click": function($event) {
	        $event.stopPropagation();
	        _vm.actionClick($event)
	      }
	    }
	  }) : _vm._e()], 1)])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-10117ea3", module.exports)
	  }
	}

/***/ },
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(126);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(3)("aa717ff6", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-10117ea3!../node_modules/stylus-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./UiSnackbar.vue", function() {
	     var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-10117ea3!../node_modules/stylus-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./UiSnackbar.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ },
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _uuid = __webpack_require__(100);

	var _uuid2 = _interopRequireDefault(_uuid);

	var _UiSnackbar = __webpack_require__(134);

	var _UiSnackbar2 = _interopRequireDefault(_UiSnackbar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    name: 'ui-snackbar-container',

	    props: {
	        queueSnackbars: {
	            type: Boolean,
	            default: false
	        },
	        defaultDuration: {
	            type: Number,
	            default: 5000
	        },
	        position: {
	            type: String,
	            default: 'left' }
	    },

	    data: function data() {
	        return {
	            queue: [] };
	    },
	    mounted: function mounted() {
	        var _this = this;

	        this.$nextTick(function () {
	            var _arr = ['create'];

	            for (var _i = 0; _i < _arr.length; _i++) {
	                var event = _arr[_i];
	                _this.$on('ui-snackbar::' + event, _this['ui-snackbar::' + event]);
	            }
	        });
	    },
	    beforeDestroy: function beforeDestroy() {
	        var _arr2 = ['create'];

	        for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
	            var event = _arr2[_i2];
	            this.$off('ui-snackbar::' + event, this['ui-snackbar::' + event]);
	        }
	        if (this.draggable) {
	            this.draggable.destroy();
	        }
	    },


	    computed: {
	        positionComputed: function positionComputed() {
	            return 'position-' + this.position;
	        }
	    },

	    methods: {
	        'ui-snackbar::create': function uiSnackbarCreate(snackbar) {
	            snackbar.show = false;
	            snackbar.id = snackbar.id || _uuid2.default.short('ui-snackbar-');
	            snackbar.duration = snackbar.duration || this.defaultDuration;

	            this.queue.push(snackbar);

	            if (this.queue.length === 1) {
	                this.showNext();
	            } else {
	                if (!this.queueSnackbars) {
	                    this.queue[0].show = false;
	                }
	            }
	        },

	        showNext: function showNext() {
	            if (!this.queue.length) {
	                return;
	            }

	            this.queue[0].show = true;
	        },
	        shown: function shown(snackbar) {
	            this.$emit('snackbar-shown', snackbar);
	            this.callHook('onShow', snackbar);
	        },
	        hidden: function hidden(snackbar) {
	            this.$emit('snackbar-hidden', snackbar);
	            this.callHook('onHide', snackbar);

	            this.queue.$remove(snackbar);
	            this.showNext();
	        },
	        clicked: function clicked(snackbar) {
	            this.callHook('onClick', snackbar);
	        },
	        actionClicked: function actionClicked(snackbar) {
	            this.callHook('onActionClick', snackbar);
	        },
	        callHook: function callHook(hook, snackbar) {
	            if (typeof snackbar[hook] === 'function') {
	                snackbar[hook].call(undefined, snackbar);
	            }
	        }
	    },

	    components: {
	        UiSnackbar: _UiSnackbar2.default
	    }
	};

/***/ },
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(1)();
	// imports


	// module
	exports.push([module.id, "\n.ui-snackbar-container {\n  position: absolute;\n  overflow: hidden;\n  bottom: 0;\n  left: 8px;\n}\n.ui-snackbar-container.position-right {\n  left: initial;\n  right: 8px;\n}\n.ui-snackbar-container.position-center {\n  left: 8px;\n  right: 8px;\n  display: flex;\n  justify-content: center;\n}\n.ui-snackbar-container .ui-snackbar {\n  margin: 4px 4px 12px 4px;\n}\n", ""]);

	// exports


/***/ },
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(256)

	var Component = __webpack_require__(2)(
	  /* script */
	  __webpack_require__(160),
	  /* template */
	  __webpack_require__(235),
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)
	Component.options.__file = "/Users/Shared/dev/libs/Keen-UI/src/UiSnackbarContainer.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] UiSnackbarContainer.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-1944d264", Component.options)
	  } else {
	    hotAPI.reload("data-v-1944d264", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ },
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "ui-snackbar-container",
	    class: [_vm.positionComputed]
	  }, _vm._l((_vm.queue), function(s) {
	    return _c('ui-snackbar', {
	      attrs: {
	        "duration": s.duration,
	        "show": s.show,
	        "action": s.action,
	        "action-color": s.actionColor,
	        "persistent": s.persistent,
	        "id": s.id,
	        "auto-hide": ""
	      },
	      on: {
	        "shown": function($event) {
	          _vm.shown(s)
	        },
	        "hidden": function($event) {
	          _vm.hidden(s)
	        },
	        "clicked": function($event) {
	          _vm.clicked(s)
	        },
	        "action-clicked": function($event) {
	          _vm.actionClicked(s)
	        }
	      }
	    }, [(s.allowHtml) ? _c('div', {
	      domProps: {
	        "innerHTML": _vm._s(s.message)
	      }
	    }) : _c('span', {
	      domProps: {
	        "textContent": _vm._s(s.message)
	      }
	    })])
	  }))
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-1944d264", module.exports)
	  }
	}

/***/ },
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */,
/* 256 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(185);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(3)("874256ce", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-1944d264!../node_modules/stylus-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./UiSnackbarContainer.vue", function() {
	     var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-1944d264!../node_modules/stylus-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./UiSnackbarContainer.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ }
/******/ ])
});
;