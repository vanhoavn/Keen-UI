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
		exports["UiRating"] = factory();
	else
		root["Keen"] = root["Keen"] || {}, root["Keen"]["UiRating"] = factory();
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

	module.exports = __webpack_require__(219);


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

/***/ 8:
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

/***/ 18:
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

/***/ 20:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(1)();
	// imports


	// module
	exports.push([module.id, "\n.ui-icon {\n  font-size: 24px;\n  width: 1em;\n  height: 1em;\n  display: inline-block;\n  cursor: inherit;\n  vertical-align: middle;\n}\n", ""]);

	// exports


/***/ },

/***/ 21:
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

/***/ 22:
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

/***/ 24:
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

/***/ 101:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _UiIcon = __webpack_require__(8);

	var _UiIcon2 = _interopRequireDefault(_UiIcon);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    name: 'ui-rating-icon',

	    props: {
	        type: {
	            type: String,
	            default: 'star' },
	        selected: {
	            type: Boolean,
	            required: true
	        },
	        filled: {
	            type: Boolean,
	            default: false
	        }
	    },

	    computed: {
	        icon: function icon() {
	            if (this.filled || this.selected) {
	                return this.type === 'star' ? 'star' : 'favorite';
	            }

	            return this.type === 'star' ? 'star_border' : 'favorite_border';
	        }
	    },

	    components: {
	        UiIcon: _UiIcon2.default
	    }
	};

/***/ },

/***/ 104:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(1)();
	// imports


	// module
	exports.push([module.id, "\n.ui-rating-icon {\n  cursor: default;\n}\n.ui-rating-icon .ui-icon {\n  color: rgba(0,0,0,0.38);\n}\n", ""]);

	// exports


/***/ },

/***/ 113:
/***/ function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(115)

	var Component = __webpack_require__(2)(
	  /* script */
	  __webpack_require__(101),
	  /* template */
	  __webpack_require__(114),
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)
	Component.options.__file = "/Users/Shared/dev/libs/Keen-UI/src/UiRatingIcon.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] UiRatingIcon.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-86b45158", Component.options)
	  } else {
	    hotAPI.reload("data-v-86b45158", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ },

/***/ 114:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "ui-rating-icon"
	  }, [_c('ui-icon', {
	    staticClass: "ui-rating-icon-icon",
	    class: {
	      'selected': _vm.selected, 'filled': _vm.filled
	    },
	    attrs: {
	      "icon": _vm.icon
	    }
	  })], 1)
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-86b45158", module.exports)
	  }
	}

/***/ },

/***/ 115:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(104);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(3)("77e7f144", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-86b45158!../node_modules/stylus-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./UiRatingIcon.vue", function() {
	     var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-86b45158!../node_modules/stylus-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./UiRatingIcon.vue");
	     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
	     update(newContent);
	   });
	 }
	 // When the module is disposed, remove the <style> tags
	 module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 155:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _UiRatingIcon = __webpack_require__(113);

	var _UiRatingIcon2 = _interopRequireDefault(_UiRatingIcon);

	var _ReceivesTargetedEvent = __webpack_require__(24);

	var _ReceivesTargetedEvent2 = _interopRequireDefault(_ReceivesTargetedEvent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    name: 'ui-rating',

	    props: {
	        type: {
	            type: String,
	            default: 'star' },
	        value: {
	            type: Number,
	            required: true
	        },
	        total: {
	            type: Number,
	            required: true
	        },
	        label: String,
	        hideLabel: {
	            type: Boolean,
	            default: false
	        },
	        helpText: String,
	        disabled: {
	            type: Boolean,
	            default: false
	        }
	    },

	    data: function data() {
	        return {
	            active: false,
	            initialValue: 0,
	            previewValue: 0,
	            previewing: false
	        };
	    },


	    computed: {
	        showFeedback: function showFeedback() {
	            return Boolean(this.helpText);
	        }
	    },

	    watch: {
	        value: function value() {
	            this.previewValue = this.value;
	        },
	        previewValue: function previewValue() {
	            this.$emit('preview-value-changed', this.previewValue);
	        }
	    },

	    created: function created() {
	        this.initialValue = this.value;

	        this.previewValue = this.value;
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
	        'ui-input::reset': function uiInputReset(id) {
	            if (!this.eventTargetsComponent(id)) {
	                return;
	            }

	            this.value = this.initialValue;
	        },

	        startPreview: function startPreview() {
	            if (this.disabled) {
	                return;
	            }

	            this.previewing = true;
	        },
	        endPreview: function endPreview() {
	            if (this.disabled) {
	                return;
	            }

	            this.previewing = false;
	            this.previewValue = this.value;
	        },
	        preview: function preview(n) {
	            if (this.disabled) {
	                return;
	            }

	            this.previewValue = n + 1;
	        },
	        commitValue: function commitValue(value) {
	            if (this.disabled) {
	                return;
	            }

	            if (value > 0 && value <= this.total) {
	                this.value = value;
	            }
	        },
	        incrementPreviewValue: function incrementPreviewValue() {
	            if (this.disabled) {
	                return;
	            }

	            var proposedValue = this.previewValue + 1;

	            if (proposedValue <= this.total) {
	                this.previewValue = proposedValue;
	            }
	        },
	        decrementPreviewValue: function decrementPreviewValue() {
	            if (this.disabled) {
	                return;
	            }

	            var proposedValue = this.previewValue - 1;

	            if (proposedValue > 0) {
	                this.previewValue = proposedValue;
	            }
	        },
	        focus: function focus() {
	            this.active = true;
	            this.startPreview();
	        },
	        blur: function blur() {
	            this.active = false;

	            this.commitValue(this.previewValue);
	            this.endPreview();
	        }
	    },

	    components: {
	        UiRatingIcon: _UiRatingIcon2.default
	    },

	    mixins: [_ReceivesTargetedEvent2.default]
	};

/***/ },

/***/ 193:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(1)();
	// imports


	// module
	exports.push([module.id, "\n.ui-rating {\n  font-family: Roboto, -apple-system, BlinkMacSystemFont, \"Segoe UI\", \"Oxygen\", \"Ubuntu\", \"Cantarell\", \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif;\n  outline: none;\n  flex-direction: column;\n}\n.ui-rating:hover:not(.disabled) .ui-rating-label {\n  color: rgba(0,0,0,0.65);\n}\n.ui-rating.active:not(.disabled) .ui-rating-label {\n  color: #2196f3;\n}\nbody[modality=\"keyboard\"] .ui-rating:focus .ui-rating-icon-icon {\n  color: rgba(0,0,0,0.54);\n}\nbody[modality=\"keyboard\"] .ui-rating:focus .ui-rating-icon-icon.selected {\n  color: rgba(0,0,0,0.54);\n}\nbody[modality=\"keyboard\"] .ui-rating:focus .ui-rating-icon-icon.filled {\n  color: #0b7ad1;\n}\n.ui-rating.preview .ui-rating-icon-icon {\n  cursor: pointer;\n}\n.ui-rating.preview .ui-rating-icon-icon.selected {\n  color: rgba(0,0,0,0.38);\n}\n.ui-rating.preview .ui-rating-icon-icon.filled {\n  color: #2196f3;\n}\n.ui-rating.disabled .ui-rating-icons-wrapper {\n  opacity: 0.6;\n}\n.ui-rating.disabled .ui-rating-feedback {\n  opacity: 0.8;\n}\n.ui-rating .ui-rating-icon-icon.selected {\n  color: #2196f3;\n}\n.ui-rating-label {\n  font-size: 14px;\n  margin-bottom: 4px;\n  color: rgba(0,0,0,0.54);\n  transition: color 0.1s ease;\n}\n.ui-rating-icons-wrapper {\n  display: inline-flex;\n}\n.ui-rating-feedback {\n  height: 20px;\n  overflow: hidden;\n  padding-top: 4px;\n  position: relative;\n  font-size: 14px;\n}\n.ui-rating-help-text {\n  color: rgba(0,0,0,0.38);\n  line-height: 1;\n}\n.ui-rating-feedback-toggle-transition {\n  transition-property: opacity, margin-top;\n  transition-duration: 0.3s;\n  margin-top: 0;\n  opacity: 1;\n}\n.ui-rating-feedback-toggle-enter,\n.ui-rating-feedback-toggle-leave {\n  margin-top: -20px;\n  opacity: 0;\n}\n", ""]);

	// exports


/***/ },

/***/ 219:
/***/ function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(264)

	var Component = __webpack_require__(2)(
	  /* script */
	  __webpack_require__(155),
	  /* template */
	  __webpack_require__(243),
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)
	Component.options.__file = "/Users/Shared/dev/libs/Keen-UI/src/UiRating.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] UiRating.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-6c6ae4bb", Component.options)
	  } else {
	    hotAPI.reload("data-v-6c6ae4bb", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ },

/***/ 243:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "ui-rating",
	    class: {
	      'disabled': _vm.disabled, 'preview': _vm.previewing, 'active': _vm.active
	    },
	    attrs: {
	      "tabindex": _vm.disabled ? null : 0,
	      "role": "slider",
	      "aria-valuemin": 0,
	      "aria-valuemax": _vm.total,
	      "aria-valuenow": _vm.previewValue
	    },
	    on: {
	      "keydown": [function($event) {
	        if (_vm._k($event.keyCode, "up", 38)) { return null; }
	        $event.preventDefault();
	        _vm.incrementPreviewValue($event)
	      }, function($event) {
	        if (_vm._k($event.keyCode, "down", 40)) { return null; }
	        $event.preventDefault();
	        _vm.decrementPreviewValue($event)
	      }, function($event) {
	        if ($event.button !== 2) { return null; }
	        $event.preventDefault();
	        _vm.incrementPreviewValue($event)
	      }, function($event) {
	        if ($event.button !== 0) { return null; }
	        $event.preventDefault();
	        _vm.decrementPreviewValue($event)
	      }, function($event) {
	        if (_vm._k($event.keyCode, "enter", 13)) { return null; }
	        $event.preventDefault();
	        _vm.commitValue(_vm.previewValue)
	      }],
	      "focus": _vm.focus,
	      "blur": _vm.blur
	    }
	  }, [(!_vm.hideLabel) ? _c('div', {
	    staticClass: "ui-rating-label",
	    domProps: {
	      "textContent": _vm._s(_vm.label)
	    }
	  }) : _vm._e(), _vm._v(" "), _c('div', {
	    staticClass: "ui-rating-icons-wrapper",
	    on: {
	      "mouseenter": _vm.startPreview,
	      "mouseleave": _vm.endPreview
	    }
	  }, _vm._l((_vm.total), function(n) {
	    return _c('ui-rating-icon', {
	      attrs: {
	        "type": _vm.type,
	        "selected": (n + 1) <= _vm.value,
	        "filled": (n + 1) <= _vm.previewValue
	      },
	      on: {
	        "mouseover": function($event) {
	          _vm.preview(n)
	        },
	        "click": function($event) {
	          _vm.commitValue(n + 1)
	        }
	      }
	    })
	  })), _vm._v(" "), (_vm.showFeedback) ? _c('div', {
	    staticClass: "ui-rating-feedback",
	    attrs: {
	      "transition": "ui-rating-feedback-toggle"
	    }
	  }, [_c('div', {
	    staticClass: "ui-rating-help-text",
	    domProps: {
	      "textContent": _vm._s(_vm.helpText)
	    }
	  })]) : _vm._e()])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-6c6ae4bb", module.exports)
	  }
	}

/***/ },

/***/ 264:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(193);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(3)("8a54c916", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-6c6ae4bb!../node_modules/stylus-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./UiRating.vue", function() {
	     var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-6c6ae4bb!../node_modules/stylus-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./UiRating.vue");
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