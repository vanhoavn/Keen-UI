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
		exports["UiProgressCircular"] = factory();
	else
		root["Keen"] = root["Keen"] || {}, root["Keen"]["UiProgressCircular"] = factory();
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

	module.exports = __webpack_require__(54);


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

/***/ 3:
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

/***/ 6:
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

/***/ 54:
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

/***/ 56:
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

/***/ 58:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(1)();
	// imports


	// module
	exports.push([module.id, "\n.ui-progress-circular {\n  position: relative;\n}\n.ui-progress-circular .ui-progress-circular-determinate {\n  transform: rotate(270deg);\n}\n.ui-progress-circular .ui-progress-circular-determinate .ui-progress-circular-determinate-path {\n  stroke-dashoffset: 0;\n  transition: stroke-dashoffset 0.3s ease;\n}\n.ui-progress-circular .ui-progress-circular-determinate .ui-progress-circular-determinate-path.primary,\n.ui-progress-circular .ui-progress-circular-determinate .ui-progress-circular-determinate-path.multi-color {\n  stroke: #2196f3;\n}\n.ui-progress-circular .ui-progress-circular-determinate .ui-progress-circular-determinate-path.accent {\n  stroke: #d500f9;\n}\n.ui-progress-circular .ui-progress-circular-determinate .ui-progress-circular-determinate-path.black {\n  stroke: #212121;\n}\n.ui-progress-circular .ui-progress-circular-determinate .ui-progress-circular-determinate-path.white {\n  stroke: #fff;\n}\n.ui-progress-circular .ui-progress-circular-indeterminate {\n  animation: ui-progress-circular-rotate 1.4s linear infinite;\n  transform-origin: center center;\n  width: 100%;\n  height: 100%;\n  margin: auto;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n}\n.ui-progress-circular .ui-progress-circular-indeterminate-path {\n  stroke-dasharray: 1, 200;\n  stroke-dashoffset: 0;\n  stroke-linecap: round;\n  animation: ui-progress-circular-dash 1.4s ease-in-out infinite;\n}\n.ui-progress-circular .ui-progress-circular-indeterminate-path.multi-color {\n  animation: ui-progress-circular-dash 1.4s ease-in-out infinite, ui-progress-circular-color 6s ease-in-out infinite;\n}\n.ui-progress-circular .ui-progress-circular-indeterminate-path.primary {\n  stroke: #2196f3;\n}\n.ui-progress-circular .ui-progress-circular-indeterminate-path.accent {\n  stroke: #d500f9;\n}\n.ui-progress-circular .ui-progress-circular-indeterminate-path.black {\n  stroke: #212121;\n}\n.ui-progress-circular .ui-progress-circular-indeterminate-path.white {\n  stroke: #fff;\n}\n.ui-progress-circular-toggle-transition {\n  opacity: 1;\n  transform: scale(1);\n  transition-duration: 0.3s;\n  transition-timing-function: ease;\n  transition-property: transform, opacity;\n}\n.ui-progress-circular-toggle-enter,\n.ui-progress-circular-toggle-leave {\n  opacity: 0;\n  transform: scale(0);\n}\n@-moz-keyframes ui-progress-circular-rotate {\n100% {\n    transform: rotate(360deg);\n}\n}\n@-webkit-keyframes ui-progress-circular-rotate {\n100% {\n    transform: rotate(360deg);\n}\n}\n@-o-keyframes ui-progress-circular-rotate {\n100% {\n    transform: rotate(360deg);\n}\n}\n@keyframes ui-progress-circular-rotate {\n100% {\n    transform: rotate(360deg);\n}\n}\n@-moz-keyframes ui-progress-circular-dash {\n0% {\n    stroke-dasharray: 1, 200;\n    stroke-dashoffset: 0;\n}\n50% {\n    stroke-dasharray: 89, 200;\n    stroke-dashoffset: -35px;\n}\n100% {\n    stroke-dasharray: 89, 200;\n    stroke-dashoffset: -124px;\n}\n}\n@-webkit-keyframes ui-progress-circular-dash {\n0% {\n    stroke-dasharray: 1, 200;\n    stroke-dashoffset: 0;\n}\n50% {\n    stroke-dasharray: 89, 200;\n    stroke-dashoffset: -35px;\n}\n100% {\n    stroke-dasharray: 89, 200;\n    stroke-dashoffset: -124px;\n}\n}\n@-o-keyframes ui-progress-circular-dash {\n0% {\n    stroke-dasharray: 1, 200;\n    stroke-dashoffset: 0;\n}\n50% {\n    stroke-dasharray: 89, 200;\n    stroke-dashoffset: -35px;\n}\n100% {\n    stroke-dasharray: 89, 200;\n    stroke-dashoffset: -124px;\n}\n}\n@keyframes ui-progress-circular-dash {\n0% {\n    stroke-dasharray: 1, 200;\n    stroke-dashoffset: 0;\n}\n50% {\n    stroke-dasharray: 89, 200;\n    stroke-dashoffset: -35px;\n}\n100% {\n    stroke-dasharray: 89, 200;\n    stroke-dashoffset: -124px;\n}\n}\n@-moz-keyframes ui-progress-circular-color {\n100%, 0% {\n    stroke: #f44336;\n}\n40% {\n    stroke: #2196f3;\n}\n66% {\n    stroke: #4caf50;\n}\n80%, 90% {\n    stroke: #ff9800;\n}\n}\n@-webkit-keyframes ui-progress-circular-color {\n100%, 0% {\n    stroke: #f44336;\n}\n40% {\n    stroke: #2196f3;\n}\n66% {\n    stroke: #4caf50;\n}\n80%, 90% {\n    stroke: #ff9800;\n}\n}\n@-o-keyframes ui-progress-circular-color {\n100%, 0% {\n    stroke: #f44336;\n}\n40% {\n    stroke: #2196f3;\n}\n66% {\n    stroke: #4caf50;\n}\n80%, 90% {\n    stroke: #ff9800;\n}\n}\n@keyframes ui-progress-circular-color {\n100%, 0% {\n    stroke: #f44336;\n}\n40% {\n    stroke: #2196f3;\n}\n66% {\n    stroke: #4caf50;\n}\n80%, 90% {\n    stroke: #ff9800;\n}\n}\n", ""]);

	// exports


/***/ },

/***/ 63:
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

/***/ 65:
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

/***/ }

/******/ })
});
;