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
		exports["UiTextbox"] = factory();
	else
		root["Keen"] = root["Keen"] || {}, root["Keen"]["UiTextbox"] = factory();
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

	module.exports = __webpack_require__(229);


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

/***/ 82:
/***/ function(module, exports) {

	module.exports = {
	  accepted: 'The :attribute must be accepted.',
	  alpha: 'The :attribute field must contain only alphabetic characters.',
	  alpha_dash: 'The :attribute field may only contain alpha-numeric characters, as well as dashes and underscores.',
	  alpha_num: 'The :attribute field must be alphanumeric.',
	  between: 'The :attribute field must be between :min and :max.',
	  confirmed: 'The :attribute confirmation does not match.',
	  email: 'The :attribute format is invalid.',
	  def: 'The :attribute attribute has errors.',
	  digits: 'The :attribute must be :digits digits.',
	  different: 'The :attribute and :different must be different.',
	  'in': 'The selected :attribute is invalid.',
	  integer: 'The :attribute must be an integer.',
	  min: {
	    numeric: 'The :attribute must be at least :min.',
	    string: 'The :attribute must be at least :min characters.'
	  },
	  max: {
	    numeric: 'The :attribute may not be greater than :max.',
	    string: 'The :attribute may not be greater than :max characters.'
	  },
	  not_in: 'The selected :attribute is invalid.',
	  numeric: 'The :attribute must be a number.',
	  required: 'The :attribute field is required.',
	  required_if: 'The :attribute field is required when :other is :value.',
	  same: 'The :attribute and :same fields must match.',
	  size: {
	    numeric: 'The :attribute must be :size.',
	    string: 'The :attribute must be :size characters.'
	  },
	  string: 'The :attribute must be a string.',
	  url: 'The :attribute format is invalid.',
	  regex: 'The :attribute format is invalid',
	  attributes: {}
	};


/***/ },

/***/ 93:
/***/ function(module, exports) {

	var replacements = {

	  /**
	   * Between replacement (replaces :min and :max)
	   *
	   * @param  {string} template
	   * @param  {Rule} rule
	   * @return {string}
	   */
	  between: function(template, rule) {
	    var parameters = rule.getParameters();
	    return this._replacePlaceholders(rule, template, {
	      min: parameters[0],
	      max: parameters[1]
	    });
	  },

	  /**
	   * Required_if replacement.
	   *
	   * @param  {string} template
	   * @param  {Rule} rule
	   * @return {string}
	   */
	  required_if: function(template, rule) {
	    var parameters = rule.getParameters();
	    return this._replacePlaceholders(rule, template, {
	      other: parameters[0],
	      value: parameters[1]
	    });
	  }
	};

	function formatter(attribute) {
	  return attribute.replace(/[_\[]/g, ' ').replace(/]/g, '');
	}

	module.exports = {
	  replacements: replacements,
	  formatter: formatter
	};


/***/ },

/***/ 94:
/***/ function(module, exports) {

	module.exports = {
	  accepted: 'El campo :attribute debe ser aceptado.',
	  alpha: 'El campo :attribute solo debe contener letras.',
	  alpha_dash: 'El campo :attribute solo debe contener letras, números y guiones.',
	  alpha_num: 'El campo :attribute solo debe contener letras y números.',
	  attributes: {},
	  between: 'El campo :attribute tiene que estar entre :min - :max.',
	  confirmed: 'La confirmación de :attribute no coincide.',
	  different: 'El campo :attribute y :other deben ser diferentes.',
	  digits: 'El campo :attribute debe tener :digits dígitos.',
	  email: 'El campo :attribute no es un correo válido',
	  'in': 'El campo :attribute es inválido.',
	  integer: 'El campo :attribute debe ser un número entero.',
	  max: {
	    numeric: 'El campo :attribute no debe ser mayor a :max.',
	    string: 'El campo :attribute no debe ser mayor que :max caracteres.'
	  },
	  min: {
	    numeric: 'El tamaño del campo :attribute debe ser de al menos :min.',
	    string: 'El campo :attribute debe contener al menos :min caracteres.'
	  },
	  not_in: 'El campo :attribute es inválido.',
	  numeric: 'El campo :attribute debe ser numérico.',
	  regex: 'El formato del campo :attribute es inválido.',
	  required: 'El campo :attribute es obligatorio.',
	  required_if: 'El campo :attribute es obligatorio cuando :other es :value.',
	  same: 'El campo :attribute y :other deben coincidir.',
	  size: {
	    numeric: 'El tamaño del campo :attribute debe ser :size.',
	    string: 'El campo :attribute debe contener :size caracteres.'
	  },
	  url: 'El formato de :attribute es inválido.'
	};


/***/ },

/***/ 95:
/***/ function(module, exports) {

	module.exports = {
	  accepted: 'Le champs :attribute doit être accepté.',
	  alpha: 'Le champs :attribute ne peut contenir que des caractères alphabétiques.',
	  alpha_dash: 'Le champs :attribute ne peut contenir que des caractères alphanumériques, des tirets et underscores.',
	  alpha_num: 'Le champs :attribute doit être alphanumérique.',
	  between: 'Le champs :attribute doit être compris entre :min and :max.',
	  confirmed: 'Le champs :attribute ne correspond pas.',
	  email: 'Le champs :attribute contient un format invalide.',
	  def: 'Le champs :attribute contient un attribut erroné.',
	  digits: 'Le champs :attribute doit être de :digits chiffres.',
	  different: 'Le champs :attribute et :different doivent être differents.',
	  'in': 'Le champs :attribute est invalide.',
	  integer: 'Le champs :attribute doit être un entier.',
	  min: {
	    numeric: 'Le champs :attribute doit être contenir au moins :min.',
	    string: 'Le champs :attribute doit être contenir au moins :min caractères.'
	  },
	  max: {
	    numeric: 'Le champs :attribute ne doit être supérieur à :max.',
	    string: 'Le champs :attribute ne doit être plus de :max characters.'
	  },
	  not_in: 'Le champs :attribute est invalide.',
	  numeric: 'Le champs :attribute doit être un numéro.',
	  required: 'Le champs :attribute est obligatoire.',
	  required_if: 'Le champs :attribute est obligatoire quand :other est :value.',
	  same: 'Le champs :attribute et :same doivent correspondre.',
	  size: {
	    numeric: 'La taille du champs :attribute doit être :size.',
	    string: 'La taille du champs :attribute doit être de :size caractères.'
	  },
	  url: 'Le format du champs :attribute est invalide.',
	  regex: 'Le format du champs :attribute est invalide.',
	  attributes: {}
	};


/***/ },

/***/ 96:
/***/ function(module, exports) {

	module.exports = {
	  accepted: 'Il campo :attribute deve essere accettato.',
	  alpha: 'Il campo :attribute deve contenere sono caratteri alfabetici.',
	  alpha_dash: 'Il campo :attribute può contenere solo caratteri alfanumerici oltre a trattini e trattini bassi.',
	  alpha_num: 'Il campo :attribute deve essere alfanumerico.',
	  between: 'Il campo :attribute deve essere compreso tra :min e :max.',
	  confirmed: 'Il campo conferma :attribute non è uguale.',
	  email: 'Il formato dell\'attributo :attribute non è valido.',
	  def: 'Gli attributi del campo :attribute contengono degli errori.',
	  digits: 'Il campo :attribute deve essere di :digits cifre.',
	  different: 'Il campo :attribute e :different devo essere diversi.',
	  'in': 'Il valore del campo :attribute non è valido.',
	  integer: 'Il campo :attribute deve essere un valore intero.',
	  min: {
	    numeric: 'Il campo :attribute deve essere maggiore o uguale di :min.',
	    string: 'Il campo :attribute deve essere composto da almeno :min caratteri.'
	  },
	  max: {
	    numeric: 'Il campo :attribute deve essere minore o uguale di :max.',
	    string: 'Il campo :attribute deve essere composto da massimo :max caratteri.'
	  },
	  not_in: 'Il campo :attribute non è valido.',
	  numeric: 'Il campo :attribute deve essere un numero.',
	  required: 'Il campo :attribute è richiesto.',
	  required_if: 'Il campo :attribute è richiesto quando il campo :other è uguale a :value.',
	  same: 'I campi :attribute e :same devono essere uguali.',
	  size: {
	    numeric: 'La dimensione del campo :attribute deve essere uguale a :size.',
	    string: 'Il campo :attribute deve essere di :size caratteri.'
	  },
	  string: 'Il campo :attribute deve essere una stringa.',
	  url: 'Il formato del campo :attribute non è valido.',
	  regex: 'Il formato del campo :attribute non è valido.',
	  attributes: {}
	};


/***/ },

/***/ 97:
/***/ function(module, exports) {

	module.exports = {
	    accepted: ':attributeを確認してください。',
	    alpha: ':attributeは英字のみで入力してください。',
	    alpha_dash: ':attributeは英字とダッシュと下線のみで入力してください。',
	    alpha_num: ':attributeは英数字のみで入力してください。',
	    between: ':attributeは:min〜:max文字で入力してください。',
	    confirmed: ':attributeは確認が一致しません。',
	    email: ':attributeは正しいメールアドレスを入力してください。',
	    def: ':attributeは検証エラーが含まれています。',
	    digits: ':attributeは:digitsの数字のみで入力してください。',
	    different: ':attributeと:differentは同じであってはなりません。',
	    'in': '選択された:attributeは無効です。',
	    integer: ':attributeは整数で入力してください。',
	    min        : {
	        numeric : ":attributeは:min以上を入力してください。",
	        string  : ":attributeは:min文字以上で入力してください。"
	    },
	    max : {
	        numeric : ":attributeは:max以下を入力してください。",
	        string  : ":attributeは:max文字以上で入力してください。"
	    },
	    not_in      : "選択された:attributeは無効です。",
	    numeric     : ":attributeは数値で入力してください。",
	    required    : ":attributeは必須です。",
	    required_if : ":otherは:valueになったら:attributeは必須です。",
	    same        : ":attributeと:sameは同じでなければなりません。",
	    size        : {
	        numeric : ":attributeは:sizeを入力してください。",
	        string  : ":attributeは:size文字で入力してください。"
	    },
	    url        : ":attributeはURIを入力してください。",
	    regex      : ":attributeの値 \":value\" はパターンにマッチする必要があります。",
	    attributes : {}
	};


/***/ },

/***/ 98:
/***/ function(module, exports) {

	module.exports = {
	    accepted: 'Pole :attribute musi być zaakceptowane.',
	    alpha: 'Pole :attribute może zawierać tylko litery.',
	    alpha_dash: 'Pole :attribute moze zawierać tylko litery, myślnik i podrkeślenie.',
	    alpha_num: 'Pole :attribute moze zawierac tylko znaki alfanumeryczne.',
	    between: 'Pole :attribute musi mieć długość od :min do :max.',
	    confirmed: 'Pole :attribute nie spełnia warunku potwierdzenia.',
	    email: 'Pole :attribute ma niepoprawny format adresu email.',
	    def: 'Pole :attribute zawiera błędy.',
	    digits: 'Pole :attribute może zawierać tylko cyfry ze zbioru :digits.',
	    different: 'Pola :attribute i :different muszą się różnić.',
	    'in': 'Pole :attribute musi należeć do zbioru :in.',
	    integer: 'Pole :attribute musi być liczbą całkowitą.',
	    min: {
	        numeric: 'Pole :attribute musi być równe conajmniej :min.',
	        string: 'Pole :attribute musi zawierać conajmniej :min znaków.'
	    },
	    max: {
	        numeric: 'Pole :attribute nie moze być większe :max.',
	        string: 'Pole :attribute nie moze być dłuższe niż :max znaków.'
	    },
	    not_in: 'Pole :attribute nie może należeć do zbioru :not_in.',
	    numeric: 'Pole :attribute musi być liczbą.',
	    required: 'Pole :attribute jest wymagane.',
	    required_if: 'Pole :attribute jest wymagane jeśli pole :other jest równe :value.',
	    same: 'Pola :attribute i :same muszą być takie same.',
	    size: {
	        numeric: 'Pole :attribute musi być równe :size.',
	        string: 'Pole :attribute musi zawierać :size znaków.'
	    },
	    string: 'Pole :attribute musi być ciągiem znaków.',
	    url: 'Pole :attribute musi być poprawnym adresem URL.',
	    regex: 'Pole :attribute nie spełnia warunku.',
	    attributes: {}
	};


/***/ },

/***/ 99:
/***/ function(module, exports) {

	module.exports = {
	  accepted: 'Вы должны принять :attribute.',
	  alpha: 'Поле :attribute может содержать только буквы.',
	  alpha_dash: 'Поле :attribute может содержать только буквы, цифры, дефисы и символы подчёркивания.',
	  alpha_num: 'Поле :attribute может содержать только буквы и цифры.',
	  between: 'Поле :attribute должно быть между :min и :max.',
	  confirmed: 'Поле :attribute не совпадает с подтверждением.',
	  email: 'Поле :attribute должно быть действительным электронным адресом.',
	  def: 'Поле :attribute содержит ошибки.',
	  digits: 'Длина цифрового поля :attribute должна быть :digits.',
	  different: 'Поля :attribute и :different должны различаться.',
	  'in': 'Выбранное значение для :attribute ошибочно.',
	  integer: 'Поле :attribute должно быть целым числом.',
	  min: {
	    numeric: 'Значение поля :attribute должно быть больше или равно :min.',
	    string: 'Количество символов в поле :attribute должно быть не менее :min.'
	  },
	  max: {
	    numeric: 'Значение поля :attribute должно быть меньше или равно :max.',
	    string: 'Количество символов в поле :attribute не может превышать :max.'
	  },
	  not_in: 'Выбранное значение для :attribute ошибочно.',
	  numeric: 'Поле :attribute должно быть числом.',
	  required: 'Поле :attribute обязательно для заполнения.',
	  required_if: 'Поле :attribute требуется когда значения поля :other равно :value.',
	  same: 'Значение :attribute должно совпадать с :same.',
	  size: {
	    numeric: 'Значение поля :attribute должно быть равным :size.',
	    string: 'Количество символов в поле :attribute должно быть равно :size.'
	  },
	  url: 'Поле :attribute должно содержать валидный URL.',
	  regex: 'Неверный формат поля :attribute.',
	  attributes: {}
	};


/***/ },

/***/ 102:
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
	    props: {
	        id: String,
	        name: {
	            type: String,
	            required: true
	        },
	        placeholder: String,
	        value: {
	            type: [String, Number],
	            default: ''
	        },
	        icon: String,
	        iconRight: {
	            type: Boolean,
	            default: false
	        },
	        label: String,
	        floatingLabel: {
	            type: Boolean,
	            default: false
	        },
	        hideLabel: {
	            type: Boolean,
	            default: false
	        },
	        helpText: String,
	        disabled: {
	            type: Boolean,
	            default: false
	        },
	        debounce: {
	            type: Number,
	            default: null
	        }
	    },

	    data: function data() {
	        return {
	            active: false,
	            initialValue: ''
	        };
	    },


	    computed: {
	        showFeedback: function showFeedback() {
	            var canBeValidated = Boolean(this.validationRules);
	            var hasHelpText = Boolean(this.helpText);

	            return canBeValidated || hasHelpText;
	        }
	    },

	    created: function created() {
	        this.initialValue = this.value;
	    },


	    directives: {
	        disabled: _disabled2.default
	    },

	    mixins: [_ReceivesTargetedEvent2.default]
	};

/***/ },

/***/ 103:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _validatorjs = __webpack_require__(112);

	var _validatorjs2 = _interopRequireDefault(_validatorjs);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    props: {
	        hideValidationErrors: {
	            type: Boolean,
	            default: false
	        },
	        validationRules: [String, Array],
	        validationMessages: Object
	    },

	    data: function data() {
	        return {
	            validationError: '',
	            valid: true,
	            dirty: false
	        };
	    },
	    mounted: function mounted() {
	        var _this = this;

	        this.$nextTick(function () {
	            var _arr = ['set-validity'];

	            for (var _i = 0; _i < _arr.length; _i++) {
	                var event = _arr[_i];
	                _this.$on('ui-input::' + event, _this['ui-input::' + event]);
	            }
	        });
	    },
	    beforeDestroy: function beforeDestroy() {
	        var _arr2 = ['set-validity'];

	        for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
	            var event = _arr2[_i2];
	            this.$off('ui-input::' + event, this['ui-input::' + event]);
	        }
	    },


	    methods: {
	        'ui-input::set-validity': function uiInputSetValidity(valid, error, id) {
	            if (!this.eventTargetsComponent(id)) {
	                return;
	            }

	            this.setValidity(valid, error);
	        },
	        validate: function validate() {
	            if (!this.validationRules || !this.dirty) {
	                return;
	            }

	            var data = {
	                value: this.currentValue
	            };

	            var rules = {
	                value: this.validationRules
	            };

	            var validation = new _validatorjs2.default(data, rules, this.validationMessages);

	            validation.setAttributeNames({ value: this.name.replace(/_/g, ' ') });

	            this.setValidity(validation.passes(), validation.errors.first('value'));
	        },
	        setValidity: function setValidity(valid, error) {
	            this.valid = valid;

	            if (!valid && error && error.length) {
	                this.validationError = error;
	            }
	        }
	    }
	};

/***/ },

/***/ 106:
/***/ function(module, exports) {

	function AsyncResolvers(onFailedOne, onResolvedAll) {
	  this.onResolvedAll = onResolvedAll;
	  this.onFailedOne = onFailedOne;
	  this.resolvers = {};
	  this.resolversCount = 0;
	  this.passed = [];
	  this.failed = [];
	  this.firing = false;
	}

	AsyncResolvers.prototype = {

	  /**
	   * Add resolver
	   *
	   * @param {Rule} rule
	   * @return {integer}
	   */
	  add: function(rule) {
	    var index = this.resolversCount;
	    this.resolvers[index] = rule;
	    this.resolversCount++;
	    return index;
	  },

	  /**
	   * Resolve given index
	   *
	   * @param  {integer} index
	   * @return {void}
	   */
	  resolve: function(index) {
	    var rule = this.resolvers[index];
	    if (rule.passes === true) {
	      this.passed.push(rule);
	    } else if (rule.passes === false) {
	      this.failed.push(rule);
	      this.onFailedOne(rule);
	    }

	    this.fire();
	  },

	  /**
	   * Determine if all have been resolved
	   *
	   * @return {boolean}
	   */
	  isAllResolved: function() {
	    return (this.passed.length + this.failed.length) === this.resolversCount;
	  },

	  /**
	   * Attempt to fire final all resolved callback if completed
	   *
	   * @return {void}
	   */
	  fire: function() {

	    if (!this.firing) {
	      return;
	    }

	    if (this.isAllResolved()) {
	      this.onResolvedAll(this.failed.length === 0);
	    }

	  },

	  /**
	   * Enable firing
	   *
	   * @return {void}
	   */
	  enableFiring: function() {
	    this.firing = true;
	  }

	};

	module.exports = AsyncResolvers;


/***/ },

/***/ 107:
/***/ function(module, exports) {

	var Errors = function() {
	  this.errors = {};
	};

	Errors.prototype = {
	  constructor: Errors,

	  /**
	   * Add new error message for given attribute
	   *
	   * @param  {string} attribute
	   * @param  {string} message
	   * @return {void}
	   */
	  add: function(attribute, message) {
	    if (!this.has(attribute)) {
	      this.errors[attribute] = [];
	    }

	    if (this.errors[attribute].indexOf(message) === -1) {
	      this.errors[attribute].push(message);
	    }
	  },

	  /**
	   * Returns an array of error messages for an attribute, or an empty array
	   *
	   * @param  {string} attribute A key in the data object being validated
	   * @return {array} An array of error messages
	   */
	  get: function(attribute) {
	    if (this.has(attribute)) {
	      return this.errors[attribute];
	    }

	    return [];
	  },

	  /**
	   * Returns the first error message for an attribute, false otherwise
	   *
	   * @param  {string} attribute A key in the data object being validated
	   * @return {string|false} First error message or false
	   */
	  first: function(attribute) {
	    if (this.has(attribute)) {
	      return this.errors[attribute][0];
	    }

	    return false;
	  },

	  /**
	   * Get all error messages from all failing attributes
	   *
	   * @return {Object} Failed attribute names for keys and an array of messages for values
	   */
	  all: function() {
	    return this.errors;
	  },

	  /**
	   * Determine if there are any error messages for an attribute
	   *
	   * @param  {string}  attribute A key in the data object being validated
	   * @return {boolean}
	   */
	  has: function(attribute) {
	    if (this.errors.hasOwnProperty(attribute)) {
	      return true;
	    }

	    return false;
	  }
	};

	module.exports = Errors;


/***/ },

/***/ 108:
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./en": 82,
		"./en.js": 82,
		"./es": 94,
		"./es.js": 94,
		"./fr": 95,
		"./fr.js": 95,
		"./it": 96,
		"./it.js": 96,
		"./ja": 97,
		"./ja.js": 97,
		"./pl": 98,
		"./pl.js": 98,
		"./ru": 99,
		"./ru.js": 99
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 108;


/***/ },

/***/ 109:
/***/ function(module, exports, __webpack_require__) {

	var Messages = __webpack_require__(110);

	__webpack_require__(82);

	var container = {

	  messages: {},

	  /**
	   * Set messages for language
	   *
	   * @param {string} lang
	   * @param {object} rawMessages
	   * @return {void}
	   */
	  _set: function(lang, rawMessages) {
	    this.messages[lang] = rawMessages;
	  },

	  /**
	   * Set message for given language's rule.
	   *
	   * @param {string} lang
	   * @param {string} attribute
	   * @param {string|object} message
	   * @return {void}
	   */
	  _setRuleMessage: function(lang, attribute, message) {
	    this._load(lang);
	    if (message === undefined) {
	      message = this.messages[lang].def;
	    }

	    this.messages[lang][attribute] = message;
	  },

	  /**
	   * Load messages (if not already loaded)
	   *
	   * @param  {string} lang
	   * @return {void}
	   */
	  _load: function(lang) {
	    if (!this.messages[lang]) {
	      var rawMessages = __webpack_require__(108)("./" + lang);
	      this._set(lang, rawMessages);
	    }
	  },

	  /**
	   * Get raw messages for language
	   *
	   * @param  {string} lang
	   * @return {object}
	   */
	  _get: function(lang) {
	    this._load(lang);
	    return this.messages[lang];
	  },

	  /**
	   * Make messages for given language
	   *
	   * @param  {string} lang
	   * @return {Messages}
	   */
	  _make: function(lang) {
	    this._load(lang);
	    return new Messages(lang, this.messages[lang]);
	  }

	};

	module.exports = container;


/***/ },

/***/ 110:
/***/ function(module, exports, __webpack_require__) {

	var Attributes = __webpack_require__(93);

	var Messages = function(lang, messages) {
	  this.lang = lang;
	  this.messages = messages;
	  this.customMessages = {};
	  this.attributeNames = {};
	};

	Messages.prototype = {
	  constructor: Messages,

	  /**
	   * Set custom messages
	   *
	   * @param {object} customMessages
	   * @return {void}
	   */
	  _setCustom: function(customMessages) {
	    this.customMessages = customMessages || {};
	  },

	  /**
	   * Set custom attribute names.
	   *
	   * @param {object} attributes
	   */
	  _setAttributeNames: function(attributes) {
	    this.attributeNames = attributes;
	  },

	  /**
	   * Set the attribute formatter.
	   *
	   * @param {fuction} func
	   * @return {void}
	   */
	  _setAttributeFormatter: function(func) {
	    this.attributeFormatter = func;
	  },

	  /**
	   * Get attribute name to display.
	   *
	   * @param  {string} attribute
	   * @return {string}
	   */
	  _getAttributeName: function(attribute) {
	    var name = attribute;
	    if (this.attributeNames.hasOwnProperty(attribute)) {
	      return this.attributeNames[attribute];
	    } else if (this.messages.attributes.hasOwnProperty(attribute)) {
	      name = this.messages.attributes[attribute];
	    }

	    if (this.attributeFormatter) {
	      name = this.attributeFormatter(name);
	    }

	    return name;
	  },

	  /**
	   * Get all messages
	   *
	   * @return {object}
	   */
	  all: function() {
	    return this.messages;
	  },

	  /**
	   * Render message
	   *
	   * @param  {Rule} rule
	   * @return {string}
	   */
	  render: function(rule) {
	    if (rule.customMessage) {
	      return rule.customMessage;
	    }
	    var template = this._getTemplate(rule);

	    var message;
	    if (Attributes.replacements[rule.name]) {
	      message = Attributes.replacements[rule.name].apply(this, [template, rule]);
	    } else {
	      message = this._replacePlaceholders(rule, template, {});
	    }

	    return message;
	  },

	  /**
	   * Get the template to use for given rule
	   *
	   * @param  {Rule} rule
	   * @return {string}
	   */
	  _getTemplate: function(rule) {

	    var messages = this.messages;
	    var template = messages.def;
	    var customMessages = this.customMessages;
	    var formats = [rule.name + '.' + rule.attribute, rule.name];

	    for (var i = 0, format; i < formats.length; i++) {
	      format = formats[i];
	      if (customMessages.hasOwnProperty(format)) {
	        template = customMessages[format];
	        break;
	      } else if (messages.hasOwnProperty(format)) {
	        template = messages[format];
	        break;
	      }
	    }

	    if (typeof template === 'object') {
	      template = template[rule._getValueType()];
	    }

	    return template;
	  },

	  /**
	   * Replace placeholders in the template using the data object
	   *
	   * @param  {Rule} rule
	   * @param  {string} template
	   * @param  {object} data
	   * @return {string}
	   */
	  _replacePlaceholders: function(rule, template, data) {
	    var message, attribute;

	    data.attribute = this._getAttributeName(rule.attribute);
	    data[rule.name] = rule.getParameters().join(',');

	    if (typeof template === 'string' && typeof data === 'object') {
	      message = template;

	      for (attribute in data) {
	        message = message.replace(new RegExp(':' + attribute, 'g'), data[attribute]);
	      }
	    }

	    return message;
	  }

	};

	module.exports = Messages;


/***/ },

/***/ 111:
/***/ function(module, exports) {

	var rules = {

	  required: function(val) {
	    var str;

	    if (val === undefined || val === null) {
	      return false;
	    }

	    str = String(val).replace(/\s/g, "");
	    return str.length > 0 ? true : false;
	  },

	  required_if: function(val, req, attribute) {
	    req = this.getParameters();
	    if (this.validator.input[req[0]] === req[1]) {
	      return this.validator.getRule('required').validate(val);
	    }

	    return true;
	  },

	  // compares the size of strings
	  // with numbers, compares the value
	  size: function(val, req, attribute) {
	    if (val) {
	      req = parseFloat(req);

	      var size = this.getSize();

	      return size === req;
	    }

	    return true;
	  },

	  string: function(val, req, attribute) {
	    return typeof val === 'string';
	  },

	  /**
	   * Compares the size of strings or the value of numbers if there is a truthy value
	   */
	  min: function(val, req, attribute) {
	    var size = this.getSize();
	    return size >= req;
	  },

	  /**
	   * Compares the size of strings or the value of numbers if there is a truthy value
	   */
	  max: function(val, req, attribute) {
	    var size = this.getSize();
	    return size <= req;
	  },

	  between: function(val, req, attribute) {
	    req = this.getParameters();
	    var size = this.getSize();
	    var min = parseFloat(req[0], 10);
	    var max = parseFloat(req[1], 10);
	    return size >= min && size <= max;
	  },

	  email: function(val) {
	    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(val);
	  },

	  numeric: function(val) {
	    var num;

	    num = Number(val); // tries to convert value to a number. useful if value is coming from form element

	    if (typeof num === 'number' && !isNaN(num) && typeof val !== 'boolean') {
	      return true;
	    } else {
	      return false;
	    }
	  },

	  array: function(val) {
	    return val instanceof Array;
	  },

	  url: function(url) {
	    return (/^https?:\/\/\S+/).test(url);
	  },

	  alpha: function(val) {
	    return (/^[a-zA-Z]+$/).test(val);
	  },

	  alpha_dash: function(val) {
	    return (/^[a-zA-Z0-9_\-]+$/).test(val);
	  },

	  alpha_num: function(val) {
	    return (/^[a-zA-Z0-9]+$/).test(val);
	  },

	  same: function(val, req) {
	    var val1 = this.validator.input[req];
	    var val2 = val;

	    if (val1 === val2) {
	      return true;
	    }

	    return false;
	  },

	  different: function(val, req) {
	    var val1 = this.validator.input[req];
	    var val2 = val;

	    if (val1 !== val2) {
	      return true;
	    }

	    return false;
	  },

	  "in": function(val, req) {
	    var list, i;

	    if (val) {
	      list = req.split(',');
	    }

	    if (val && !(val instanceof Array)) {
	      val = String(val); // if it is a number

	      for (i = 0; i < list.length; i++) {
	        if (val === list[i]) {
	          return true;
	        }
	      }

	      return false;
	    }

	    if (val && val instanceof Array) {
	      for (i = 0; i < val.length; i++) {
	        if (list.indexOf(val[i]) < 0) {
	          return false;
	        }
	      }
	    }

	    return true;
	  },

	  not_in: function(val, req) {
	    var list = req.split(',');
	    var len = list.length;
	    var returnVal = true;

	    val = String(val); // convert val to a string if it is a number

	    for (var i = 0; i < len; i++) {
	      if (val === list[i]) {
	        returnVal = false;
	        break;
	      }
	    }

	    return returnVal;
	  },

	  accepted: function(val) {
	    if (val === 'on' || val === 'yes' || val === 1 || val === '1' || val === true) {
	      return true;
	    }

	    return false;
	  },

	  confirmed: function(val, req, key) {
	    var confirmedKey = key + '_confirmation';

	    if (this.validator.input[confirmedKey] === val) {
	      return true;
	    }

	    return false;
	  },

	  integer: function(val) {
	    return String(parseInt(val, 10)) === String(val);
	  },

	  digits: function(val, req) {
	    var numericRule = this.validator.getRule('numeric');
	    if (numericRule.validate(val) && String(val).length === parseInt(req)) {
	      return true;
	    }

	    return false;
	  },

	  regex: function(val, req) {
	    var mod = /[g|i|m]{1,3}$/;
	    var flag = req.match(mod);
	    flag = flag ? flag[0] : "i";
	    req = req.replace(mod, "").slice(1, -1);
	    req = new RegExp(req, flag);
	    return !!val.match(req);
	  }

	};

	function Rule(name, fn, async) {
	  this.name = name;
	  this.fn = fn;
	  this.passes = null;
	  this.customMessage = undefined;
	  this.async = async;
	}

	Rule.prototype = {

	  /**
	   * Validate rule
	   *
	   * @param  {mixed} inputValue
	   * @param  {mixed} ruleValue
	   * @param  {string} attribute
	   * @param  {function} callback
	   * @return {boolean|undefined}
	   */
	  validate: function(inputValue, ruleValue, attribute, callback) {
	    var _this = this;
	    this._setValidatingData(attribute, inputValue, ruleValue);
	    if (typeof callback === 'function') {
	      this.callback = callback;
	      var handleResponse = function(passes, message) {
	        _this.response(passes, message);
	      };

	      if (this.async) {
	        return this.fn.apply(this, [inputValue, ruleValue, attribute, handleResponse]);
	      } else {
	        return handleResponse(this.fn.apply(this, [inputValue, ruleValue, attribute]));
	      }
	    }
	    return this.fn.apply(this, [inputValue, ruleValue, attribute]);
	  },

	  /**
	   * Set validating data
	   *
	   * @param {string} attribute
	   * @param {mixed} inputValue
	   * @param {mixed} ruleValue
	   * @return {void}
	   */
	  _setValidatingData: function(attribute, inputValue, ruleValue) {
	    this.attribute = attribute;
	    this.inputValue = inputValue;
	    this.ruleValue = ruleValue;
	  },

	  /**
	   * Get parameters
	   *
	   * @return {array}
	   */
	  getParameters: function() {
	    return this.ruleValue ? this.ruleValue.split(',') : [];
	  },

	  /**
	   * Get true size of value
	   *
	   * @return {integer|float}
	   */
	  getSize: function() {
	    var value = this.inputValue;

	    if (value instanceof Array) {
	      return value.length;
	    }

	    if (typeof value === 'number') {
	      return value;
	    }

	    if (this.validator._hasNumericRule(this.attribute)) {
	      return parseFloat(value, 10);
	    }

	    return value.length;
	  },

	  /**
	   * Get the type of value being checked; numeric or string.
	   *
	   * @return {string}
	   */
	  _getValueType: function() {

	    if (typeof this.inputValue === 'number' || this.validator._hasNumericRule(this.attribute)) {
	      return 'numeric';
	    }

	    return 'string';
	  },

	  /**
	   * Set the async callback response
	   *
	   * @param  {boolean|undefined} passes  Whether validation passed
	   * @param  {string|undefined} message Custom error message
	   * @return {void}
	   */
	  response: function(passes, message) {
	    this.passes = (passes === undefined || passes === true);
	    this.customMessage = message;
	    this.callback(this.passes, message);
	  },

	  /**
	   * Set validator instance
	   *
	   * @param {Validator} validator
	   * @return {void}
	   */
	  setValidator: function(validator) {
	    this.validator = validator;
	  }

	};

	var manager = {

	  /**
	   * List of async rule names
	   *
	   * @type {Array}
	   */
	  asyncRules: [],

	  /**
	   * Implicit rules (rules to always validate)
	   *
	   * @type {Array}
	   */
	  implicitRules: ['required', 'required_if', 'accepted'],

	  /**
	   * Get rule by name
	   *
	   * @param  {string} name
	   * @param {Validator}
	   * @return {Rule}
	   */
	  make: function(name, validator) {
	    var async = this.isAsync(name);
	    var rule = new Rule(name, rules[name], async);
	    rule.setValidator(validator);
	    return rule;
	  },

	  /**
	   * Determine if given rule is async
	   *
	   * @param  {string}  name
	   * @return {boolean}
	   */
	  isAsync: function(name) {
	    for (var i = 0, len = this.asyncRules.length; i < len; i++) {
	      if (this.asyncRules[i] === name) {
	        return true;
	      }
	    }
	    return false;
	  },

	  /**
	   * Determine if rule is implicit (should always validate)
	   *
	   * @param {string} name
	   * @return {boolean}
	   */
	  isImplicit: function(name) {
	    return this.implicitRules.indexOf(name) > -1;
	  },

	  /**
	   * Register new rule
	   *
	   * @param  {string}   name
	   * @param  {function} fn
	   * @return {void}
	   */
	  register: function(name, fn) {
	    rules[name] = fn;
	  },

	  /**
	   * Register async rule
	   *
	   * @param  {string}   name
	   * @param  {function} fn
	   * @return {void}
	   */
	  registerAsync: function(name, fn) {
	    this.register(name, fn);
	    this.asyncRules.push(name);
	  }

	};


	module.exports = manager;


/***/ },

/***/ 112:
/***/ function(module, exports, __webpack_require__) {

	var Rules = __webpack_require__(111);
	var Lang = __webpack_require__(109);
	var Errors = __webpack_require__(107);
	var Attributes = __webpack_require__(93);
	var AsyncResolvers = __webpack_require__(106);

	var Validator = function(input, rules, customMessages) {
	  var lang = Validator.getDefaultLang();
	  this.input = input;
	  this.messages = Lang._make(lang);
	  this.messages._setCustom(customMessages);
	  this.setAttributeFormatter(Validator.prototype.attributeFormatter);

	  this.errors = new Errors();
	  this.errorCount = 0;

	  this.hasAsync = false;
	  this.rules = this._parseRules(rules);
	};

	Validator.prototype = {

	  constructor: Validator,

	  /**
	   * Default language
	   *
	   * @type {string}
	   */
	  lang: 'en',

	  /**
	   * Numeric based rules
	   *
	   * @type {array}
	   */
	  numericRules: ['integer', 'numeric'],

	  /**
	   * Attribute formatter.
	   *
	   * @type {function}
	   */
	  attributeFormatter: Attributes.formatter,

	  /**
	   * Run validator
	   *
	   * @return {boolean} Whether it passes; true = passes, false = fails
	   */
	  check: function() {
	    var self = this;

	    for (var attribute in this.rules) {
	      var attributeRules = this.rules[attribute];
	      var inputValue = this.input[attribute]; // if it doesnt exist in input, it will be undefined

	      for (var i = 0, len = attributeRules.length, rule, ruleOptions, rulePassed; i < len; i++) {
	        ruleOptions = attributeRules[i];
	        rule = this.getRule(ruleOptions.name);

	        if (!this._isValidatable(rule, inputValue)) {
	          continue;
	        }

	        rulePassed = rule.validate(inputValue, ruleOptions.value, attribute);
	        if (!rulePassed) {
	          this._addFailure(rule);
	        }

	        if (this._shouldStopValidating(attribute, rulePassed)) {
	          break;
	        }
	      }
	    }

	    return this.errorCount === 0;
	  },

	  /**
	   * Run async validator
	   *
	   * @param {function} passes
	   * @param {function} fails
	   * @return {void}
	   */
	  checkAsync: function(passes, fails) {
	    var _this = this;
	    passes = passes || function() {};
	    fails = fails || function() {};

	    var failsOne = function(rule, message) {
	      _this._addFailure(rule, message);
	    };

	    var resolvedAll = function(allPassed) {
	      if (allPassed) {
	        passes();
	      } else {
	        fails();
	      }
	    };

	    var validateRule = function(inputValue, ruleOptions, attribute, rule) {
	      return function() {
	        var resolverIndex = asyncResolvers.add(rule);
	        rule.validate(inputValue, ruleOptions.value, attribute, function() {
	          asyncResolvers.resolve(resolverIndex);
	        });
	      };
	    };

	    var asyncResolvers = new AsyncResolvers(failsOne, resolvedAll);

	    for (var attribute in this.rules) {
	      var attributeRules = this.rules[attribute];
	      var inputValue = this.input[attribute]; // if it doesnt exist in input, it will be undefined

	      for (var i = 0, len = attributeRules.length, rule, ruleOptions; i < len; i++) {
	        ruleOptions = attributeRules[i];

	        rule = this.getRule(ruleOptions.name);

	        if (!this._isValidatable(rule, inputValue)) {
	          continue;
	        }

	        validateRule(inputValue, ruleOptions, attribute, rule)();
	      }
	    }

	    asyncResolvers.enableFiring();
	    asyncResolvers.fire();
	  },

	  /**
	   * Add failure and error message for given rule
	   *
	   * @param {Rule} rule
	   */
	  _addFailure: function(rule) {
	    var msg = this.messages.render(rule);
	    this.errors.add(rule.attribute, msg);
	    this.errorCount++;
	  },

	  /**
	   * Parse rules, normalizing format into: { attribute: [{ name: 'age', value: 3 }] }
	   *
	   * @param  {object} rules
	   * @return {object}
	   */
	  _parseRules: function(rules) {
	    var parsedRules = {};
	    for (var attribute in rules) {
	      var rulesArray = rules[attribute];
	      var attributeRules = [];

	      if (typeof rulesArray === 'string') {
	        rulesArray = rulesArray.split('|');
	      }

	      for (var i = 0, len = rulesArray.length, rule; i < len; i++) {
	        rule = this._extractRuleAndRuleValue(rulesArray[i]);
	        if (Rules.isAsync(rule.name)) {
	          this.hasAsync = true;
	        }
	        attributeRules.push(rule);
	      }

	      parsedRules[attribute] = attributeRules;
	    }
	    return parsedRules;
	  },

	  /**
	   * Extract a rule and a value from a ruleString (i.e. min:3), rule = min, value = 3
	   *
	   * @param  {string} ruleString min:3
	   * @return {object} object containing the name of the rule and value
	   */
	  _extractRuleAndRuleValue: function(ruleString) {
	    var rule = {},
	      ruleArray;

	    rule.name = ruleString;

	    if (ruleString.indexOf(':') >= 0) {
	      ruleArray = ruleString.split(':');
	      rule.name = ruleArray[0];
	      rule.value = ruleArray.slice(1).join(":");
	    }

	    return rule;
	  },

	  /**
	   * Determine if attribute has any of the given rules
	   *
	   * @param  {string}  attribute
	   * @param  {array}   findRules
	   * @return {boolean}
	   */
	  _hasRule: function(attribute, findRules) {
	    var rules = this.rules[attribute] || [];
	    for (var i = 0, len = rules.length; i < len; i++) {
	      if (findRules.indexOf(rules[i].name) > -1) {
	        return true;
	      }
	    }
	    return false;
	  },

	  /**
	   * Determine if attribute has any numeric-based rules.
	   *
	   * @param  {string}  attribute
	   * @return {Boolean}
	   */
	  _hasNumericRule: function(attribute) {
	    return this._hasRule(attribute, this.numericRules);
	  },

	  /**
	   * Determine if rule is validatable
	   *
	   * @param  {Rule}   rule
	   * @param  {mixed}  value
	   * @return {boolean}
	   */
	  _isValidatable: function(rule, value) {
	    if (Rules.isImplicit(rule.name)) {
	      return true;
	    }

	    return this.getRule('required').validate(value);
	  },


	  /**
	   * Determine if we should stop validating.
	   *
	   * @param  {string} attribute
	   * @param  {boolean} rulePassed
	   * @return {boolean}
	   */
	  _shouldStopValidating: function(attribute, rulePassed) {

	    var stopOnAttributes = this.stopOnAttributes;
	    if (stopOnAttributes === false || rulePassed === true) {
	      return false;
	    }

	    if (stopOnAttributes instanceof Array) {
	      return stopOnAttributes.indexOf(attribute) > -1;
	    }

	    return true;
	  },

	  /**
	   * Set custom attribute names.
	   *
	   * @param {object} attributes
	   * @return {void}
	   */
	  setAttributeNames: function(attributes) {
	    this.messages._setAttributeNames(attributes);
	  },

	  /**
	   * Set the attribute formatter.
	   *
	   * @param {fuction} func
	   * @return {void}
	   */
	  setAttributeFormatter: function(func) {
	    this.messages._setAttributeFormatter(func);
	  },

	  /**
	   * Get validation rule
	   *
	   * @param  {string} name
	   * @return {Rule}
	   */
	  getRule: function(name) {
	    return Rules.make(name, this);
	  },

	  /**
	   * Stop on first error.
	   *
	   * @param  {boolean|array} An array of attributes or boolean true/false for all attributes.
	   * @return {void}
	   */
	  stopOnError: function(attributes) {
	    this.stopOnAttributes = attributes;
	  },

	  /**
	   * Determine if validation passes
	   *
	   * @param {function} passes
	   * @return {boolean|undefined}
	   */
	  passes: function(passes) {
	    var async = this._checkAsync('passes', passes);
	    if (async) {
	      return this.checkAsync(passes);
	    }
	    return this.check();
	  },

	  /**
	   * Determine if validation fails
	   *
	   * @param {function} fails
	   * @return {boolean|undefined}
	   */
	  fails: function(fails) {
	    var async = this._checkAsync('fails', fails);
	    if (async) {
	      return this.checkAsync(function() {}, fails);
	    }
	    return !this.check();
	  },

	  /**
	   * Check if validation should be called asynchronously
	   *
	   * @param  {string}   funcName Name of the caller
	   * @param  {function} callback
	   * @return {boolean}
	   */
	  _checkAsync: function(funcName, callback) {
	    var hasCallback = typeof callback === 'function';
	    if (this.hasAsync && !hasCallback) {
	      throw funcName + ' expects a callback when async rules are being tested.';
	    }

	    return this.hasAsync || hasCallback;
	  }

	};

	/**
	 * Set messages for language
	 *
	 * @param {string} lang
	 * @param {object} messages
	 * @return {this}
	 */
	Validator.setMessages = function(lang, messages) {
	  Lang._set(lang, messages);
	  return this;
	};

	/**
	 * Get messages for given language
	 *
	 * @param  {string} lang
	 * @return {Messages}
	 */
	Validator.getMessages = function(lang) {
	  return Lang._get(lang);
	};

	/**
	 * Set default language to use
	 *
	 * @param {string} lang
	 * @return {void}
	 */
	Validator.useLang = function(lang) {
	  this.prototype.lang = lang;
	};

	/**
	 * Get default language
	 *
	 * @return {string}
	 */
	Validator.getDefaultLang = function() {
	  return this.prototype.lang;
	};

	/**
	 * Set the attribute formatter.
	 *
	 * @param {fuction} func
	 * @return {void}
	 */
	Validator.setAttributeFormatter = function(func) {
	  this.prototype.attributeFormatter = func;
	};

	/**
	 * Stop on first error.
	 *
	 * @param  {boolean|array} An array of attributes or boolean true/false for all attributes.
	 * @return {void}
	 */
	Validator.stopOnError = function(attributes) {
	  this.prototype.stopOnAttributes = attributes;
	};

	/**
	 * Register custom validation rule
	 *
	 * @param  {string}   name
	 * @param  {function} fn
	 * @param  {string}   message
	 * @return {void}
	 */
	Validator.register = function(name, fn, message) {
	  var lang = Validator.getDefaultLang();
	  Rules.register(name, fn);
	  Lang._setRuleMessage(lang, name, message);
	};

	/**
	 * Register asynchronous validation rule
	 *
	 * @param  {string}   name
	 * @param  {function} fn
	 * @param  {string}   message
	 * @return {void}
	 */
	Validator.registerAsync = function(name, fn, message) {
	  var lang = Validator.getDefaultLang();
	  Rules.registerAsync(name, fn);
	  Lang._setRuleMessage(lang, name, message);
	};

	module.exports = Validator;


/***/ },

/***/ 122:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports.default = function (el, binding, vnode, oldVnode) {
	    if (el) {
	        el.autofocus = Boolean(binding.value);
	    }
	};

/***/ },

/***/ 165:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _UiIcon = __webpack_require__(8);

	var _UiIcon2 = _interopRequireDefault(_UiIcon);

	var _autofocus = __webpack_require__(122);

	var _autofocus2 = _interopRequireDefault(_autofocus);

	var _HasTextInput = __webpack_require__(102);

	var _HasTextInput2 = _interopRequireDefault(_HasTextInput);

	var _ValidatesInput = __webpack_require__(103);

	var _ValidatesInput2 = _interopRequireDefault(_ValidatesInput);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    name: 'ui-textbox',

	    props: {
	        type: {
	            type: String,
	            default: 'text'
	        },
	        multiLine: {
	            type: Boolean,
	            default: false
	        },
	        rows: {
	            type: Number,
	            default: 2
	        },
	        maxLength: Number,
	        trimValue: {
	            type: Boolean,
	            default: true
	        },
	        validateOnBlur: {
	            type: Boolean,
	            default: false
	        },
	        autocomplete: String,
	        autofocus: {
	            type: Boolean,
	            default: false
	        },
	        min: Number,
	        max: Number,
	        step: {
	            type: String,
	            default: 'any'
	        }
	    },

	    watch: {
	        value: function value() {
	            this.currentValue = this.value;
	        },
	        currentValue: function currentValue() {
	            if (this.currentValue !== this.value) {
	                this.$emit('input', this.currentValue);
	            };

	            if (this.ignoreValueChange) {
	                return;
	            }

	            if (!this.dirty) {
	                this.dirty = true;
	            }

	            if (!this.validateOnBlur) {
	                this.validate();
	            }
	        }
	    },

	    data: function data() {
	        return {
	            ignoreValueChange: false,
	            currentValue: this.value
	        };
	    },


	    computed: {
	        showIcon: function showIcon() {
	            return Boolean(this.icon);
	        },
	        minValue: function minValue() {
	            if (this.type !== 'number') {
	                return null;
	            }

	            if (this.min || this.min === 0) {
	                return this.min;
	            }

	            return null;
	        },
	        maxValue: function maxValue() {
	            if (this.type !== 'number') {
	                return null;
	            }

	            if (this.max || this.max === 0) {
	                return this.max;
	            }

	            return null;
	        },
	        stepValue: function stepValue() {
	            if (this.type === 'number') {
	                return this.step;
	            }

	            return null;
	        }
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
	            var _this2 = this;

	            if (!this.eventTargetsComponent(id)) {
	                return;
	            }

	            this.ignoreValueChange = true;

	            if (document.activeElement === this.$el.querySelector('input') || document.activeElement === this.$el.querySelector('textarea')) {
	                document.activeElement.blur();
	            }

	            this.validationError = '';
	            this.currentValue = this.initialValue;
	            this.valid = true;
	            this.dirty = false;

	            this.$nextTick(function () {
	                _this2.ignoreValueChange = false;
	            });
	        },

	        focussed: function focussed() {
	            this.active = true;
	            this.$emit('focussed');
	        },
	        blurred: function blurred() {
	            this.active = false;

	            if (!this.dirty) {
	                this.dirty = true;
	            }

	            this.$emit('blurred');
	            this.validate();
	        },
	        changed: function changed() {
	            this.$emit('changed');
	        },
	        keydown: function keydown(e) {
	            this.$emit('keydown', e);
	        },
	        keydownEnter: function keydownEnter(e) {
	            this.$emit('keydown-enter', e);
	        }
	    },

	    filters: {
	        trim: {
	            write: function write(value) {
	                if (this.type !== 'number' && this.trimValue) {
	                    return value.trim();
	                }

	                return value;
	            }
	        }
	    },

	    components: {
	        UiIcon: _UiIcon2.default
	    },

	    directives: {
	        autofocus: _autofocus2.default
	    },

	    mixins: [_HasTextInput2.default, _ValidatesInput2.default]
	};

/***/ },

/***/ 196:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(1)();
	// imports


	// module
	exports.push([module.id, "\n.ui-textbox {\n  font-family: Roboto, -apple-system, BlinkMacSystemFont, \"Segoe UI\", \"Oxygen\", \"Ubuntu\", \"Cantarell\", \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif;\n  display: flex;\n  align-items: flex-start;\n  margin-bottom: 12px;\n}\n.ui-textbox:hover:not(.disabled):not(.invalid) .ui-textbox-label-text {\n  color: rgba(0,0,0,0.65);\n}\n.ui-textbox:hover:not(.disabled):not(.invalid) .ui-textbox-input,\n.ui-textbox:hover:not(.disabled):not(.invalid) .ui-textbox-textarea {\n  border-bottom-color: rgba(0,0,0,0.22);\n}\n.ui-textbox.active:not(.disabled) .ui-textbox-input,\n.ui-textbox.active:not(.disabled) .ui-textbox-textarea {\n  border-bottom-width: 2px;\n}\n.ui-textbox.active:not(.disabled):not(.invalid) .ui-textbox-label-text,\n.ui-textbox.active:not(.disabled):not(.invalid) .ui-textbox-icon {\n  color: #2196f3;\n}\n.ui-textbox.active:not(.disabled):not(.invalid) .ui-textbox-input,\n.ui-textbox.active:not(.disabled):not(.invalid) .ui-textbox-textarea {\n  border-bottom-color: #2196f3;\n}\n.ui-textbox.has-label .ui-textbox-icon-wrapper {\n  padding-top: 20px;\n}\n.ui-textbox.icon-right .ui-textbox-icon-wrapper {\n  order: 1;\n  margin-left: 8px;\n  margin-right: 0;\n}\n.ui-textbox.is-multi-line .ui-textbox-label-text {\n  margin-bottom: 8px;\n}\n.ui-textbox.has-counter .ui-textbox-feedback {\n  padding-right: 48px;\n}\n.ui-textbox.invalid .ui-textbox-label-text,\n.ui-textbox.invalid .ui-textbox-icon,\n.ui-textbox.invalid .ui-textbox-counter {\n  color: #f44336;\n}\n.ui-textbox.invalid .ui-textbox-input,\n.ui-textbox.invalid .ui-textbox-textarea {\n  border-bottom-color: #f44336;\n}\n.ui-textbox.disabled .ui-textbox-input,\n.ui-textbox.disabled .ui-textbox-textarea {\n  color: rgba(0,0,0,0.38);\n  border-bottom-style: dotted;\n  border-bottom-width: 2px;\n}\n.ui-textbox.disabled .ui-textbox-icon {\n  opacity: 0.6;\n}\n.ui-textbox.disabled .ui-textbox-feedback {\n  opacity: 0.8;\n}\n.ui-textbox-label {\n  width: 100%;\n  margin: 0;\n  padding: 0;\n}\n.ui-textbox-icon-wrapper {\n  height: 24px;\n  flex-shrink: 0;\n  margin-right: 12px;\n  padding-top: 4px;\n}\n.ui-textbox-icon {\n  color: rgba(0,0,0,0.54);\n}\n.ui-textbox-content {\n  flex-grow: 1;\n}\n.ui-textbox-label-text {\n  font-size: 14px;\n  line-height: 1;\n  margin-bottom: 2px;\n  color: rgba(0,0,0,0.54);\n  transition: color 0.1s ease;\n}\n.ui-textbox-input,\n.ui-textbox-textarea {\n  cursor: auto;\n  background: none;\n  outline: none;\n  border: none;\n  padding: 0;\n  display: block;\n  width: 100%;\n  border-bottom-width: 1px;\n  border-bottom-style: solid;\n  border-bottom-color: rgba(0,0,0,0.12);\n  transition: border 0.1s ease;\n  color: rgba(26,26,26,0.87);\n  font-weight: normal;\n  font-size: 16px;\n  font-family: Roboto, -apple-system, BlinkMacSystemFont, \"Segoe UI\", \"Oxygen\", \"Ubuntu\", \"Cantarell\", \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif;\n}\n.ui-textbox-input {\n  height: 32px;\n}\n.ui-textbox-textarea {\n  resize: vertical;\n  overflow-x: hidden;\n  padding-bottom: 8px;\n}\n.ui-textbox-feedback {\n  margin: 0;\n  min-height: 20px;\n  overflow: hidden;\n  position: relative;\n  font-size: 14px;\n  padding-top: 2px;\n}\n.ui-textbox-help-text,\n.ui-textbox-counter {\n  color: rgba(0,0,0,0.38);\n  line-height: 1.2;\n}\n.ui-textbox-error-text {\n  position: absolute;\n  color: #f44336;\n  line-height: 1.2;\n}\n.ui-textbox-counter {\n  position: absolute;\n  right: 0;\n  top: 2px;\n}\n.ui-textbox-feedback-toggle-transition {\n  transition-property: opacity, margin-top;\n  transition-duration: 0.3s;\n  margin-top: 0;\n  opacity: 1;\n}\n.ui-textbox-feedback-toggle-enter,\n.ui-textbox-feedback-toggle-leave {\n  margin-top: -20px;\n  opacity: 0;\n}\n", ""]);

	// exports


/***/ },

/***/ 229:
/***/ function(module, exports, __webpack_require__) {

	
	/* styles */
	__webpack_require__(267)

	var Component = __webpack_require__(2)(
	  /* script */
	  __webpack_require__(165),
	  /* template */
	  __webpack_require__(246),
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)
	Component.options.__file = "/Users/Shared/dev/libs/Keen-UI/src/UiTextbox.vue"
	if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
	if (Component.options.functional) {console.error("[vue-loader] UiTextbox.vue: functional components are not supported with templates, they should use render functions.")}

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-7a6d9ad0", Component.options)
	  } else {
	    hotAPI.reload("data-v-7a6d9ad0", Component.options)
	  }
	})()}

	module.exports = Component.exports


/***/ },

/***/ 246:
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "ui-textbox",
	    class: {
	      'disabled': _vm.disabled, 'invalid': !_vm.valid, 'dirty': _vm.dirty, 'active': _vm.active,
	      'has-label': !_vm.hideLabel, 'is-multi-line': _vm.multiLine, 'icon-right': _vm.iconRight,
	      'has-counter': _vm.maxLength
	    }
	  }, [(_vm.showIcon) ? _c('div', {
	    staticClass: "ui-textbox-icon-wrapper"
	  }, [_c('ui-icon', {
	    staticClass: "ui-textbox-icon",
	    attrs: {
	      "icon": _vm.icon
	    }
	  })], 1) : _vm._e(), _vm._v(" "), _c('div', {
	    staticClass: "ui-textbox-content"
	  }, [_c('label', {
	    staticClass: "ui-textbox-label"
	  }, [(!_vm.hideLabel) ? _c('div', {
	    staticClass: "ui-textbox-label-text",
	    domProps: {
	      "textContent": _vm._s(_vm.label)
	    }
	  }) : _vm._e(), _vm._v(" "), (!_vm.multiLine && _vm.type === 'password') ? _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.currentValue),
	      expression: "currentValue"
	    }, {
	      name: "disabled",
	      rawName: "v-disabled",
	      value: (_vm.disabled),
	      expression: "disabled"
	    }, {
	      name: "autofocus",
	      rawName: "v-autofocus",
	      value: (_vm.autofocus),
	      expression: "autofocus"
	    }],
	    staticClass: "ui-textbox-input",
	    attrs: {
	      "type": "password",
	      "placeholder": _vm.placeholder,
	      "name": _vm.name,
	      "id": _vm.id,
	      "autocomplete": "off",
	      "debounce": _vm.debounce
	    },
	    domProps: {
	      "value": (_vm.currentValue)
	    },
	    on: {
	      "focus": _vm.focussed,
	      "blur": _vm.blurred,
	      "change": _vm.changed,
	      "keydown": [_vm.keydown, function($event) {
	        if (_vm._k($event.keyCode, "enter", 13)) { return null; }
	        _vm.keydownEnter($event)
	      }],
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.currentValue = $event.target.value
	      }
	    }
	  }) : _vm._e(), _vm._v(" "), (!_vm.multiLine && _vm.type === 'number') ? _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.currentValue),
	      expression: "currentValue"
	    }, {
	      name: "disabled",
	      rawName: "v-disabled",
	      value: (_vm.disabled),
	      expression: "disabled"
	    }, {
	      name: "autofocus",
	      rawName: "v-autofocus",
	      value: (_vm.autofocus),
	      expression: "autofocus"
	    }],
	    staticClass: "ui-textbox-input",
	    attrs: {
	      "type": "number",
	      "placeholder": _vm.placeholder,
	      "name": _vm.name,
	      "id": _vm.id,
	      "number": true,
	      "min": _vm.minValue,
	      "max": _vm.maxValue,
	      "step": _vm.stepValue,
	      "autocomplete": _vm.autocomplete ? _vm.autocomplete : null,
	      "debounce": _vm.debounce
	    },
	    domProps: {
	      "value": (_vm.currentValue)
	    },
	    on: {
	      "focus": _vm.focussed,
	      "blur": [_vm.blurred, function($event) {
	        _vm.$forceUpdate()
	      }],
	      "change": _vm.changed,
	      "keydown": [_vm.keydown, function($event) {
	        if (_vm._k($event.keyCode, "enter", 13)) { return null; }
	        _vm.keydownEnter($event)
	      }],
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.currentValue = $event.target.value
	      }
	    }
	  }) : _vm._e(), _vm._v(" "), (!_vm.multiLine && _vm.type === 'text') ? _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.currentValue),
	      expression: "currentValue"
	    }, {
	      name: "disabled",
	      rawName: "v-disabled",
	      value: (_vm.disabled),
	      expression: "disabled"
	    }, {
	      name: "autofocus",
	      rawName: "v-autofocus",
	      value: (_vm.autofocus),
	      expression: "autofocus"
	    }],
	    staticClass: "ui-textbox-input",
	    attrs: {
	      "type": "text",
	      "placeholder": _vm.placeholder,
	      "name": _vm.name,
	      "id": _vm.id,
	      "autocomplete": _vm.autocomplete ? _vm.autocomplete : null,
	      "debounce": _vm.debounce
	    },
	    domProps: {
	      "value": (_vm.currentValue)
	    },
	    on: {
	      "focus": _vm.focussed,
	      "blur": _vm.blurred,
	      "change": _vm.changed,
	      "keydown": [_vm.keydown, function($event) {
	        if (_vm._k($event.keyCode, "enter", 13)) { return null; }
	        _vm.keydownEnter($event)
	      }],
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.currentValue = $event.target.value
	      }
	    }
	  }) : _vm._e(), _vm._v(" "), (_vm.multiLine) ? _c('textarea', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.currentValue),
	      expression: "currentValue"
	    }, {
	      name: "disabled",
	      rawName: "v-disabled",
	      value: (_vm.disabled),
	      expression: "disabled"
	    }],
	    staticClass: "ui-textbox-textarea",
	    attrs: {
	      "placeholder": _vm.placeholder,
	      "name": _vm.name,
	      "id": _vm.id,
	      "rows": _vm.rows,
	      "debounce": _vm.debounce
	    },
	    domProps: {
	      "value": (_vm.currentValue)
	    },
	    on: {
	      "focus": _vm.focussed,
	      "blur": _vm.blurred,
	      "change": _vm.changed,
	      "keydown": [_vm.keydown, function($event) {
	        if (_vm._k($event.keyCode, "enter", 13)) { return null; }
	        _vm.keydownEnter($event)
	      }],
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.currentValue = $event.target.value
	      }
	    }
	  }) : _vm._e()]), _vm._v(" "), (_vm.showFeedback || _vm.maxLength) ? _c('div', {
	    staticClass: "ui-textbox-feedback"
	  }, [_c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (!_vm.hideValidationErrors && !_vm.valid),
	      expression: "!hideValidationErrors && !valid"
	    }],
	    staticClass: "ui-textbox-error-text",
	    attrs: {
	      "transition": "ui-textbox-feedback-toggle"
	    },
	    domProps: {
	      "textContent": _vm._s(_vm.validationError)
	    }
	  }), _vm._v(" "), _c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.hideValidationErrors || _vm.valid),
	      expression: "hideValidationErrors || valid"
	    }],
	    staticClass: "ui-textbox-help-text",
	    attrs: {
	      "transition": "ui-textbox-feedback-toggle"
	    },
	    domProps: {
	      "textContent": _vm._s(_vm.helpText)
	    }
	  }), _vm._v(" "), (_vm.maxLength) ? _c('div', {
	    staticClass: "ui-textbox-counter",
	    domProps: {
	      "textContent": _vm._s(_vm.value.length + '/' + _vm.maxLength)
	    }
	  }) : _vm._e()]) : _vm._e()])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-7a6d9ad0", module.exports)
	  }
	}

/***/ },

/***/ 267:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(196);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(3)("28825d3f", content, false);
	// Hot Module Replacement
	if(false) {
	 // When the styles change, update the <style> tags
	 if(!content.locals) {
	   module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-7a6d9ad0!../node_modules/stylus-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./UiTextbox.vue", function() {
	     var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-7a6d9ad0!../node_modules/stylus-loader/index.js!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./UiTextbox.vue");
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