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
		exports["UiCheckbox"] = factory();
	else
		root["Keen"] = root["Keen"] || {}, root["Keen"]["UiCheckbox"] = factory();
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

	module.exports = __webpack_require__(213);


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

/***/ 23:
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

/***/ 149:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _disabled = __webpack_require__(23);

	var _disabled2 = _interopRequireDefault(_disabled);

	var _ReceivesTargetedEvent = __webpack_require__(24);

	var _ReceivesTargetedEvent2 = _interopRequireDefault(_ReceivesTargetedEvent);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    name: 'ui-checkbox',

	    props: {
	        name: String,
	        model: {
	            type: [Array, String, Boolean],
	            required: true
	        },
	        value: String,
	        label: String,
	        hideLabel: {
	            type: Boolean,
	            default: false
	        },
	        labelLeft: {
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
	            active: false,
	            initialValue: false
	        };
	    },


	    computed: {
	        isChecked: function isChecked() {
	            if (this.value) {
	                return this.model.indexOf(this.value) > -1;
	            }

	            return this.model;
	        }
	    },

	    created: function created() {
	        this.initialValue = this.model;
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

	            this.model = this.initialValue;
	        },

	        focus: function focus() {
	            this.active = true;
	        },
	        blur: function blur() {
	            this.active = false;
	        }
	    },

	    directives: {
	        disabled: _disabled2.default
	    },

	    mixins: [_ReceivesTargetedEvent2.default]
	};

/***/ },

/***/ 181:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(1)();
	// imports


	// module
	exports.push([module.id, "\n.ui-checkbox {\n  font-family: Roboto, -apple-system, BlinkMacSystemFont, \"Segoe UI\", \"Oxygen\", \"Ubuntu\", \"Cantarell\", \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif;\n  font-weight: normal;\n  display: flex;\n  align-items: center;\n  margin: 0;\n  margin-bottom: 12px;\n  cursor: default;\n  position: relative;\n}\n.ui-checkbox:not(.disabled):not(.checked):hover .ui-checkbox-checkmark:before,\n.ui-checkbox:not(.disabled):not(.checked).active .ui-checkbox-checkmark:before {\n  border-color: rgba(0,0,0,0.54);\n}\n.ui-checkbox:not(.disabled).checked:hover .ui-checkbox-checkmark:before,\n.ui-checkbox:not(.disabled).checked.active .ui-checkbox-checkmark:before {\n  background-color: #0c81df;\n  border-color: #0c81df;\n}\n.ui-checkbox.checked .ui-checkbox-checkmark:before {\n  background: #2196f3;\n  border-color: #2196f3;\n}\n.ui-checkbox.checked .ui-checkbox-checkmark:after {\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  opacity: 1;\n}\n.ui-checkbox.checked .ui-checkbox-focus-ring {\n  background-color: rgba(33,150,243,0.12);\n}\n.ui-checkbox.label-left .ui-checkbox-label-text {\n  margin-left: 0;\n  margin-right: auto;\n  order: -1;\n}\n.ui-checkbox.disabled .ui-checkbox-label-text {\n  color: rgba(0,0,0,0.38);\n}\n.ui-checkbox.disabled .ui-checkbox-checkmark:before {\n  border-color: rgba(0,0,0,0.26);\n}\n.ui-checkbox.disabled.checked .ui-checkbox-checkmark:before {\n  border: none;\n  background: rgba(0,0,0,0.26);\n}\n.ui-checkbox:not(.disabled) .ui-checkbox-label-text {\n  cursor: pointer;\n}\n.ui-checkbox-label-text {\n  margin-left: 8px;\n  font-size: 15px;\n}\n.ui-checkbox-checkmark {\n  position: relative;\n  height: 20px;\n  width: 20px;\n  background: #fff;\n}\n.ui-checkbox-checkmark:before {\n  box-sizing: border-box;\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  display: block;\n  content: \"\";\n  border-radius: 2px;\n  border: 2px solid rgba(0,0,0,0.38);\n  transition: all 0.3s ease;\n}\n.ui-checkbox-checkmark:after {\n  box-sizing: border-box;\n  position: absolute;\n  left: 7px;\n  bottom: 5px;\n  display: block;\n  content: \"\";\n  width: 6px;\n  height: 13px;\n  transform: rotate(45deg);\n  opacity: 0;\n  transition: opacity 0.3s ease;\n  transition-delay: 0.1s;\n  box-sizing: border-box;\n}\n.ui-checkbox-input {\n  position: absolute;\n  opacity: 0;\n}\nbody[modality=\"keyboard\"] .ui-checkbox-input:focus + .ui-checkbox-checkmark .ui-checkbox-focus-ring {\n  opacity: 1;\n  transform: scale(1);\n}\n.ui-checkbox-focus-ring {\n  position: absolute;\n  width: 48px;\n  height: 48px;\n  background-color: rgba(0,0,0,0.1);\n  margin-left: -14px;\n  margin-top: -14px;\n  border-radius: 50%;\n  transition-property: opacity, transform;\n  transition-duration: 0.2s;\n  transition-timing-function: ease;\n  transform: scale(0);\n  opacity: 0;\n}\n", ""]);

	// exports


/***/ },

/***/ 213:
/***/ function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(252)

	var Component = __webpack_require__(2)(
	  /* script */
	  __webpack_require__(149),
	  /* template */
	  __webpack_require__(231),
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)
	Component.options.__file = "/Users/Shared/dev/libs/Keen-UI/src/UiCheckbox.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] UiCheckbox.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-00f92261", Component.options)
	  } else {
	    hotAPI.reload("data-v-00f92261", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ },

/***/ 231:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('label', {
	    staticClass: "ui-checkbox",
	    class: {
	      'disabled': _vm.disabled, 'checked': _vm.isChecked, 'active': _vm.active, 'label-left': _vm.labelLeft
	    }
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.model),
	      expression: "model"
	    }, {
	      name: "disabled",
	      rawName: "v-disabled",
	      value: (_vm.disabled),
	      expression: "disabled"
	    }],
	    staticClass: "ui-checkbox-input",
	    attrs: {
	      "type": "checkbox",
	      "name": _vm.name
	    },
	    domProps: {
	      "value": _vm.value ? _vm.value : null,
	      "checked": Array.isArray(_vm.model) ? _vm._i(_vm.model, _vm.value ? _vm.value : null) > -1 : (_vm.model)
	    },
	    on: {
	      "focus": _vm.focus,
	      "blur": _vm.blur,
	      "__c": function($event) {
	        var $$a = _vm.model,
	          $$el = $event.target,
	          $$c = $$el.checked ? (true) : (false);
	        if (Array.isArray($$a)) {
	          var $$v = _vm.value ? _vm.value : null,
	            $$i = _vm._i($$a, $$v);
	          if ($$c) {
	            $$i < 0 && (_vm.model = $$a.concat($$v))
	          } else {
	            $$i > -1 && (_vm.model = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
	          }
	        } else {
	          _vm.model = $$c
	        }
	      }
	    }
	  }), _vm._v(" "), _vm._m(0), _vm._v(" "), (!_vm.hideLabel) ? _c('div', {
	    staticClass: "ui-checkbox-label-text"
	  }, [_vm._t("default", [_c('span', {
	    domProps: {
	      "textContent": _vm._s(_vm.label)
	    }
	  })])], 2) : _vm._e()])
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "ui-checkbox-checkmark"
	  }, [_c('div', {
	    staticClass: "ui-checkbox-focus-ring"
	  })])
	}]}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-00f92261", module.exports)
	  }
	}

/***/ },

/***/ 252:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(181);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(3)("d6c8fed4", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-00f92261!../node_modules/stylus-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./UiCheckbox.vue", function() {
	     var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-00f92261!../node_modules/stylus-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./UiCheckbox.vue");
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