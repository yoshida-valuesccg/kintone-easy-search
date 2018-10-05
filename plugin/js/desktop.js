/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _Query = __webpack_require__(1);

var _form = __webpack_require__(2);

var _form2 = _interopRequireDefault(_form);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PLUGIN_ID = kintone.$PLUGIN_ID;
var Promise = kintone.Promise;
var APP_ID = kintone.app.getId();

var config = kintone.plugin.app.getConfig(PLUGIN_ID);
config.fields = config.fields ? JSON.parse(config.fields) : [];

function getUrlParam() {

    var urlParam = {};

    var params = location.search.substring(1).split('&');

    for (var i = 0; i < params.length; i++) {
        var _params$i$split = params[i].split('='),
            _params$i$split2 = _slicedToArray(_params$i$split, 2),
            key = _params$i$split2[0],
            value = _params$i$split2[1];

        urlParam[key] = value;
    }

    return urlParam;
}

function removeElementById(id) {
    var el = document.getElementById(id);
    if (el) {
        el.parentNode.removeChild(el);
    }
}

function createElementByHtml(html) {
    var div = document.createElement('div');
    div.innerHTML = html;
    return div.firstElementChild;
}

var getPropertiesCache = {};

function getProperties(appId) {

    var appIdStr = String(appId);

    if (!getPropertiesCache[appIdStr]) {
        getPropertiesCache[appIdStr] = kintone.api('/k/v1/form', 'GET', { app: appId }).then(function (_ref) {
            var properties = _ref.properties;
            return properties;
        }).catch(function () {
            return [];
        });
    }

    return getPropertiesCache[appIdStr];
}

kintone.events.on('app.record.index.show', function (event) {

    removeElementById('easy-search-form');

    var urlParam = getUrlParam();

    var formEl = createElementByHtml(_form2.default);
    var textEl = formEl.getElementsByClassName('easy-search-text')[0];
    var clearEl = formEl.getElementsByClassName('easy-search-clear')[0];

    var headerMenuEl = kintone.app.getHeaderMenuSpaceElement();
    // headerMenuEl.prepend(formEl);
    headerMenuEl.insertBefore(formEl, headerMenuEl.childNodes[0]);

    if (urlParam.keyword) {
        urlParam.keyword = decodeURIComponent(urlParam.keyword);
        textEl.value = urlParam.keyword;
        textEl.focus();
    }

    formEl.onsubmit = function () {

        var keyword = textEl.value;

        if (!keyword) {
            return false;
        }

        var promises = [];
        var query = new _Query.Query('or');

        var _loop = function _loop(code, type, subTable, referenceTable) {

            var fieldCode = referenceTable ? referenceTable.code + '.' + code : code;
            var appId = referenceTable ? referenceTable.app : APP_ID;

            var promise = Promise.all([getProperties(APP_ID), getProperties(appId)]).then(function (_ref3) {
                var _ref4 = _slicedToArray(_ref3, 2),
                    thisProperties = _ref4[0],
                    properties = _ref4[1];

                var prop = properties.find(function (prop) {
                    return prop.code === code && prop.type === type;
                });

                if (!prop) {
                    return;
                }

                if (referenceTable) {

                    var thisProp = thisProperties.find(function (prop) {
                        return prop.code === referenceTable.code && prop.type === 'REFERENCE_TABLE';
                    });

                    if (!thisProp) {
                        return;
                    }
                }

                var options = void 0;

                switch (type) {
                    case 'SINGLE_LINE_TEXT':
                    case 'MULTI_LINE_TEXT':
                    case 'RICH_TEXT':
                    case 'LINK':

                        query.param(fieldCode, 'like', keyword);

                        break;

                    case 'NUMBER':

                        if (subTable || referenceTable) {
                            query.param(fieldCode, 'in', [keyword]);
                        } else {
                            query.param(fieldCode, '=', keyword);
                        }

                        break;

                    case 'CHECK_BOX':
                    case 'RADIO_BUTTON':
                    case 'DROP_DOWN':
                    case 'MULTI_SELECT':

                        options = prop.options.filter(function (option) {
                            return option.indexOf(keyword) > -1;
                        });
                        if (options.length > 0) {
                            query.param(fieldCode, 'in', options);
                        }

                        break;
                }
            });

            promises.push(promise);
        };

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = config.fields[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var _ref2 = _step.value;
                var code = _ref2.code;
                var type = _ref2.type;
                var subTable = _ref2.subTable;
                var referenceTable = _ref2.referenceTable;

                _loop(code, type, subTable, referenceTable);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        Promise.all(promises).then(function () {

            var url = '?view=' + event.viewId + '&query=' + encodeURIComponent(query.query()) + ('&keyword=' + encodeURIComponent(keyword) + location.hash);

            location.href = url;
        });

        return false;
    };

    clearEl.onclick = function () {

        var url = '?view=' + event.viewId + location.hash;
        location.href = url;

        return false;
    };

    return event;
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// logical operators
var LOG_OPS = exports.LOG_OPS = ['and', 'or'];

// relational operators
var REL_OPS = exports.REL_OPS = ['=', '!=', '>', '<', '>=', '<=', 'in', 'not in', 'like', 'not like'];

var SORT_TYPES = exports.SORT_TYPES = ['asc', 'desc'];

var QueryFn = exports.QueryFn = function QueryFn(fnName) {
    _classCallCheck(this, QueryFn);

    this.fnName = fnName;

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }

    this.args = args;
};

var QueryConst = exports.QueryConst = function QueryConst(constName) {
    _classCallCheck(this, QueryConst);

    this.constName = constName;
};

function isNull(n) {
    return n === null || n === undefined;
}

function isString(n) {
    return typeof n === 'string';
}

function isNumber(n) {
    return typeof n === 'number';
}

function isArray(n) {
    return Array.isArray(n);
}

// function isObject(n) {
//     return typeof n === 'object';
// }

function isQueryFn(n) {
    return n instanceof QueryFn;
}

function isQueryConst(n) {
    return n instanceof QueryConst;
}

function stringify(n) {

    if (isNull(n)) {
        return '""';
    } else if (isArray(n)) {
        return '(' + n.map(function (n) {
            return stringify(n);
        }).join(', ') + ')';
    } else if (isString(n)) {
        return '"' + n + '"';
    } else if (isNumber(n)) {
        return '' + n;
    } else if (isQueryConst(n)) {
        return n.constName;
    } else if (isQueryFn(n)) {
        return '' + n.fnName + stringify(n.args);
    }

    return '""';
}

var Query = function () {
    function Query() {
        var logOp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'and';

        _classCallCheck(this, Query);

        if (LOG_OPS.indexOf(logOp) === -1) {
            throw new Error(logOp + ' is invalid logical operator');
        }

        this.data = {
            logOp: logOp,
            params: [],
            orders: [],
            limit: null,
            offset: null
        };

        return this;
    }

    _createClass(Query, [{
        key: 'join',
        value: function join(query) {
            this.data.params.push({ type: 'query', query: query });
            return this;
        }
    }, {
        key: 'param',
        value: function param(field, relOp, value) {

            if (REL_OPS.indexOf(relOp) === -1) {
                throw new Error(relOp + ' is invalid relational operator');
            }

            this.data.params.push({ type: 'param', field: field, relOp: relOp, value: value });
            return this;
        }
    }, {
        key: 'orderBy',
        value: function orderBy(field) {
            var sortType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'asc';


            if (SORT_TYPES.indexOf(sortType) === -1) {
                throw new Error(sortType + ' is invalid sort type');
            }

            this.data.orders.push({ field: field, sortType: sortType });
            return this;
        }
    }, {
        key: 'limit',
        value: function limit(_limit) {

            if (!isNull(_limit) && isNaN(Number(_limit))) {
                throw new Error('limit must be a number');
            }

            this.data.limit = isNull(_limit) ? null : Number(_limit);
            return this;
        }
    }, {
        key: 'offset',
        value: function offset(_offset) {

            if (!isNull(_offset) && isNaN(Number(_offset))) {
                throw new Error('offset must be a number');
            }

            this.data.offset = isNull(_offset) ? null : Number(_offset);
            return this;
        }
    }, {
        key: 'queryCondition',
        value: function queryCondition() {
            var _data = this.data,
                logOp = _data.logOp,
                params = _data.params;


            return params.map(function (_ref) {
                var type = _ref.type,
                    query = _ref.query,
                    field = _ref.field,
                    relOp = _ref.relOp,
                    value = _ref.value;

                switch (type) {
                    case 'query':
                        return '(' + query.queryCondition() + ')';
                    case 'param':
                        return field + ' ' + relOp + ' ' + stringify(value);
                }
            }).join(' ' + logOp + ' ');
        }
    }, {
        key: 'query',
        value: function query() {

            var queryCondition = this.queryCondition();

            var _data2 = this.data,
                orders = _data2.orders,
                limit = _data2.limit,
                offset = _data2.offset;


            var orderStr = orders.length === 0 ? '' : 'order by ' + orders.map(function (_ref2) {
                var field = _ref2.field,
                    sortType = _ref2.sortType;
                return field + ' ' + sortType;
            }).join(', ');
            var limitStr = isNull(limit) ? '' : 'limit ' + limit;
            var offsetStr = isNull(offset) ? '' : 'offset ' + offset;

            return [queryCondition, orderStr, limitStr, offsetStr].filter(function (n) {
                return n;
            }).join(' ');
        }
    }], [{
        key: 'fn',
        value: function fn(fnName) {
            for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
            }

            return new (Function.prototype.bind.apply(QueryFn, [null].concat([fnName], args)))();
        }
    }, {
        key: 'const',
        value: function _const(constName) {
            return new QueryConst(constName);
        }
    }]);

    return Query;
}();

exports.Query = Query;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = "<form id=\"easy-search-form\">\r\n    <div class=\"easy-search-outer\">\r\n        <input class=\"easy-search-text\" type=\"text\" name=\"keyword\" autocomplete=\"off\" placeholder=\"かんたん検索\">\r\n        <button class=\"easy-search-clear\" type=\"button\" tabindex=\"-1\"></button>\r\n        <button class=\"easy-search-button\" type=\"submit\" tabindex=\"-1\"></button>\r\n    </div>\r\n</form>";

/***/ })
/******/ ]);