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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getFields = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _ref3, properties, _ref4, layout, fieldsInOrder, fields, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, code, prop, type, label, subTable, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, _ref7, _code, _type, _label, _prop$referenceTable, displayFields, relatedApp, referenceTable, _properties, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, _code2, _type2, _label2, field;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return kintone.api('/k/v1/preview/app/form/fields', 'GET', { app: APP_ID });

                    case 2:
                        _ref3 = _context.sent;
                        properties = _ref3.properties;
                        _context.next = 6;
                        return kintone.api('/k/v1/preview/app/form/layout', 'GET', { app: APP_ID });

                    case 6:
                        _ref4 = _context.sent;
                        layout = _ref4.layout;
                        fieldsInOrder = [];


                        (function forEachRow(layout) {
                            var _iteratorNormalCompletion = true;
                            var _didIteratorError = false;
                            var _iteratorError = undefined;

                            try {

                                for (var _iterator = layout[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                    var row = _step.value;

                                    if (row.type === 'ROW') {
                                        var _iteratorNormalCompletion2 = true;
                                        var _didIteratorError2 = false;
                                        var _iteratorError2 = undefined;

                                        try {
                                            for (var _iterator2 = row.fields[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                                var _ref5 = _step2.value;
                                                var code = _ref5.code;

                                                if (code) {
                                                    fieldsInOrder.push(code);
                                                }
                                            }
                                        } catch (err) {
                                            _didIteratorError2 = true;
                                            _iteratorError2 = err;
                                        } finally {
                                            try {
                                                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                                    _iterator2.return();
                                                }
                                            } finally {
                                                if (_didIteratorError2) {
                                                    throw _iteratorError2;
                                                }
                                            }
                                        }
                                    } else if (row.type === 'SUBTABLE') {
                                        fieldsInOrder.push(row.code);
                                    } else if (row.type === 'GROUP') {
                                        forEachRow(row.layout);
                                    }
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
                        })(layout);

                        fields = [];
                        _iteratorNormalCompletion3 = true;
                        _didIteratorError3 = false;
                        _iteratorError3 = undefined;
                        _context.prev = 14;
                        _iterator3 = fieldsInOrder[Symbol.iterator]();

                    case 16:
                        if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                            _context.next = 75;
                            break;
                        }

                        code = _step3.value;
                        prop = properties[code];
                        type = prop.type, label = prop.label;

                        if (!(type === 'SUBTABLE')) {
                            _context.next = 43;
                            break;
                        }

                        subTable = { code: code };
                        _iteratorNormalCompletion4 = true;
                        _didIteratorError4 = false;
                        _iteratorError4 = undefined;
                        _context.prev = 25;


                        for (_iterator4 = Object.values(prop.fields)[Symbol.iterator](); !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                            _ref7 = _step4.value;
                            _code = _ref7.code;
                            _type = _ref7.type;
                            _label = _ref7.label;

                            fields.push({ code: _code, type: _type, label: _label, subTable: subTable });
                        }

                        _context.next = 33;
                        break;

                    case 29:
                        _context.prev = 29;
                        _context.t0 = _context['catch'](25);
                        _didIteratorError4 = true;
                        _iteratorError4 = _context.t0;

                    case 33:
                        _context.prev = 33;
                        _context.prev = 34;

                        if (!_iteratorNormalCompletion4 && _iterator4.return) {
                            _iterator4.return();
                        }

                    case 36:
                        _context.prev = 36;

                        if (!_didIteratorError4) {
                            _context.next = 39;
                            break;
                        }

                        throw _iteratorError4;

                    case 39:
                        return _context.finish(36);

                    case 40:
                        return _context.finish(33);

                    case 41:
                        _context.next = 72;
                        break;

                    case 43:
                        if (!(type === 'REFERENCE_TABLE')) {
                            _context.next = 71;
                            break;
                        }

                        if (!prop.referenceTable) {
                            _context.next = 69;
                            break;
                        }

                        _prop$referenceTable = prop.referenceTable, displayFields = _prop$referenceTable.displayFields, relatedApp = _prop$referenceTable.relatedApp;
                        referenceTable = { code: code, label: label, app: relatedApp.app };
                        _context.next = 49;
                        return getProperties(relatedApp.app);

                    case 49:
                        _properties = _context.sent;
                        _iteratorNormalCompletion5 = true;
                        _didIteratorError5 = false;
                        _iteratorError5 = undefined;
                        _context.prev = 53;


                        for (_iterator5 = displayFields[Symbol.iterator](); !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                            _code2 = _step5.value;


                            if (_properties[_code2]) {
                                _type2 = _properties[_code2].type;
                                _label2 = _properties[_code2].label;
                                field = { code: _code2, type: _type2, label: _label2, referenceTable: referenceTable };


                                fields.push(field);
                            }
                        }

                        _context.next = 61;
                        break;

                    case 57:
                        _context.prev = 57;
                        _context.t1 = _context['catch'](53);
                        _didIteratorError5 = true;
                        _iteratorError5 = _context.t1;

                    case 61:
                        _context.prev = 61;
                        _context.prev = 62;

                        if (!_iteratorNormalCompletion5 && _iterator5.return) {
                            _iterator5.return();
                        }

                    case 64:
                        _context.prev = 64;

                        if (!_didIteratorError5) {
                            _context.next = 67;
                            break;
                        }

                        throw _iteratorError5;

                    case 67:
                        return _context.finish(64);

                    case 68:
                        return _context.finish(61);

                    case 69:
                        _context.next = 72;
                        break;

                    case 71:
                        fields.push({ code: code, type: type, label: label });

                    case 72:
                        _iteratorNormalCompletion3 = true;
                        _context.next = 16;
                        break;

                    case 75:
                        _context.next = 81;
                        break;

                    case 77:
                        _context.prev = 77;
                        _context.t2 = _context['catch'](14);
                        _didIteratorError3 = true;
                        _iteratorError3 = _context.t2;

                    case 81:
                        _context.prev = 81;
                        _context.prev = 82;

                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }

                    case 84:
                        _context.prev = 84;

                        if (!_didIteratorError3) {
                            _context.next = 87;
                            break;
                        }

                        throw _iteratorError3;

                    case 87:
                        return _context.finish(84);

                    case 88:
                        return _context.finish(81);

                    case 89:
                        return _context.abrupt('return', fields.filter(function (_ref6) {
                            var type = _ref6.type;
                            return targetFieldTypes.includes(type);
                        }));

                    case 90:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[14, 77, 81, 89], [25, 29, 33, 41], [34,, 36, 40], [53, 57, 61, 69], [62,, 64, 68], [82,, 84, 88]]);
    }));

    return function getFields() {
        return _ref2.apply(this, arguments);
    };
}();

var _fieldTypes = __webpack_require__(4);

var _checkbox = __webpack_require__(5);

var _checkbox2 = _interopRequireDefault(_checkbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var PLUGIN_ID = kintone.$PLUGIN_ID;
var APP_ID = kintone.app.getId();

var config = kintone.plugin.app.getConfig(PLUGIN_ID);
config.fields = config.fields ? JSON.parse(config.fields) : [];

var targetFieldTypes = ['SINGLE_LINE_TEXT', 'MULTI_LINE_TEXT', 'RICH_TEXT', 'LINK', 'NUMBER', 'CHECK_BOX', 'RADIO_BUTTON', 'DROP_DOWN', 'MULTI_SELECT'];

var language = {
    search: '_INPUT_',
    searchPlaceholder: '検索',
    zeroRecords: 'データがありません。'
};

var getPropertiesCache = {};

function getProperties(appId) {

    var appIdStr = String(appId);

    if (!getPropertiesCache[appIdStr]) {
        getPropertiesCache[appIdStr] = kintone.api('/k/v1/app/form/fields', 'GET', { app: appId }).then(function (_ref) {
            var properties = _ref.properties;
            return properties;
        }).catch(function () {
            return {};
        });
    }

    return getPropertiesCache[appIdStr];
}

_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var vm, fields, table, $checkboxAll, _loop, i;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    vm = new Vue({
                        el: '#config',
                        data: {},
                        methods: {
                            submit: function submit() {

                                var table = $('#fields').DataTable();
                                var fields = [];

                                for (var i = 0; i < table.data().count(); i++) {

                                    var row = table.row(i);
                                    var field = row.data();
                                    var node = row.node();

                                    if ($('.kintoneplugin-input-checkbox', node).find('input').prop('checked')) {
                                        fields.push(field);
                                    }
                                }

                                kintone.plugin.app.setConfig({ fields: JSON.stringify(fields) });
                            },
                            cancel: function cancel() {
                                history.back();
                            }
                        }
                    });
                    _context2.next = 3;
                    return getFields();

                case 3:
                    fields = _context2.sent;
                    table = $('#fields').DataTable({
                        language: language,
                        data: fields,
                        columnDefs: [{
                            targets: 0,
                            title: '',
                            data: null,
                            orderable: false,
                            defaultContent: _checkbox2.default,
                            width: '5%'
                        }, {
                            targets: 1,
                            title: 'インデックス',
                            data: function data(field) {
                                return fields.indexOf(field);
                            },
                            defaultContent: '',
                            visible: false
                        }, {
                            targets: 2,
                            title: 'フィールド名',
                            data: 'label',
                            defaultContent: '',
                            width: '35%',
                            orderable: false
                        }, {
                            targets: 3,
                            title: 'フィールドコード',
                            data: 'code',
                            defaultContent: '',
                            orderable: false,
                            visible: false
                        }, {
                            targets: 4,
                            title: 'フィールド種類',
                            data: function data(field) {
                                return _fieldTypes.fieldTypes[field.type].name;
                            },
                            defaultContent: '',
                            width: '25%',
                            orderable: false
                        }, {
                            targets: 5,
                            title: 'テーブル・関連レコード一覧',
                            data: function data(field) {
                                return field.subTable ? field.subTable.code : field.referenceTable ? field.referenceTable.label : '';
                            },
                            defaultContent: '',
                            width: '35%',
                            orderable: false
                        }],
                        scrollY: '400px',
                        scrollCollapse: true,
                        paging: false,
                        order: [[1, 'asc']],
                        info: false,
                        searching: true,
                        createdRow: function createdRow(row, data, index) {

                            var $checkbox = $('.kintoneplugin-input-checkbox', row);

                            $checkbox.find('input').attr('id', 'checkbox-' + index).on('change', function (event) {

                                if ($(event.target).prop('checked')) {
                                    $(row).addClass('selected');
                                } else {
                                    $(row).removeClass('selected');
                                }
                            });

                            $checkbox.find('label').attr('for', 'checkbox-' + index);
                        }
                    });

                    // adjust width

                    $(window).resize(function () {
                        var $dataTablesWrapper = $('.dataTables_wrapper').width('100%');
                        var scrollDiff = document.body.scrollWidth - document.body.clientWidth;
                        if (scrollDiff > 0) {
                            $dataTablesWrapper.width($dataTablesWrapper.width() - scrollDiff);
                        }
                    });

                    // adjust height
                    $(window).resize(function () {
                        var $scrollBody = $('.dataTables_scrollBody').css('maxHeight', document.body.clientHeight);
                        var scrollDiff = document.body.scrollHeight - document.body.clientHeight;
                        if (scrollDiff > 0) {
                            $scrollBody.css('maxHeight', $scrollBody.height() - scrollDiff - 5);
                        }
                    });

                    $(window).resize(function () {
                        table.columns.adjust().draw();
                    });

                    setTimeout(function () {
                        return $(window).resize();
                    });

                    $checkboxAll = $(_checkbox2.default).appendTo(table.column(0).header());


                    $checkboxAll.find('input').attr('id', 'checkbox-all').on('change', function (event) {
                        if ($(event.target).prop('checked')) {
                            $('.kintoneplugin-input-checkbox').find('input:not(#checkbox-all)').prop('checked', true).trigger('change');
                        } else {
                            $('.kintoneplugin-input-checkbox').find('input:not(#checkbox-all)').prop('checked', false).trigger('change');
                        }
                    });

                    $checkboxAll.find('label').attr('for', 'checkbox-all');

                    table.on('search', function () {
                        $checkboxAll.find('input').prop('checked', false);
                    });

                    _loop = function _loop(i) {

                        var row = table.row(i);
                        var field = row.data();
                        var node = row.node();

                        var code = field.code,
                            type = field.type,
                            _field$subTable = field.subTable,
                            subTable = _field$subTable === undefined ? {} : _field$subTable,
                            _field$referenceTable = field.referenceTable,
                            referenceTable = _field$referenceTable === undefined ? {} : _field$referenceTable;


                        if (config.fields.findIndex(function (field) {
                            return field.code === code && field.type === type && (field.subTable || {}).code === subTable.code && (field.referenceTable || {}).code === referenceTable.code && (field.referenceTable || {}).app === referenceTable.app;
                        }) > -1) {

                            $('.kintoneplugin-input-checkbox', node).find('input').prop('checked', true).trigger('change');
                        }
                    };

                    for (i = 0; i < table.data().count(); i++) {
                        _loop(i);
                    }

                case 15:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _callee2, undefined);
}))();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var fieldTypes = exports.fieldTypes = {
    "RECORD_NUMBER": {
        "name": "レコード番号",
        "type": "RECORD_NUMBER"
    },
    "MODIFIER": {
        "name": "更新者",
        "type": "MODIFIER"
    },
    "CREATOR": {
        "name": "作成者",
        "type": "CREATOR"
    },
    "UPDATED_TIME": {
        "name": "更新日時",
        "type": "UPDATED_TIME"
    },
    "CREATED_TIME": {
        "name": "作成日時",
        "type": "CREATED_TIME"
    },
    "STATUS": {
        "name": "ステータス",
        "type": "STATUS"
    },
    "STATUS_ASSIGNEE": {
        "name": "作業者",
        "type": "STATUS_ASSIGNEE"
    },
    "CATEGORY": {
        "name": "カテゴリー",
        "type": "CATEGORY"
    },
    "SINGLE_LINE_TEXT": {
        "name": "文字列 (1行)",
        "type": "SINGLE_LINE_TEXT"
    },
    "RICH_TEXT": {
        "name": "リッチエディター",
        "type": "RICH_TEXT"
    },
    "MULTI_LINE_TEXT": {
        "name": "文字列 (複数行)",
        "type": "MULTI_LINE_TEXT"
    },
    "NUMBER": {
        "name": "数値",
        "type": "NUMBER"
    },
    "CALC": {
        "name": "計算",
        "type": "CALC"
    },
    "RADIO_BUTTON": {
        "name": "ラジオボタン",
        "type": "RADIO_BUTTON"
    },
    "CHECK_BOX": {
        "name": "チェックボックス",
        "type": "CHECK_BOX"
    },
    "MULTI_SELECT": {
        "name": "複数選択",
        "type": "MULTI_SELECT"
    },
    "DROP_DOWN": {
        "name": "ドロップダウン",
        "type": "DROP_DOWN"
    },
    "DATE": {
        "name": "日付",
        "type": "DATE"
    },
    "TIME": {
        "name": "時刻",
        "type": "TIME"
    },
    "DATETIME": {
        "name": "日時",
        "type": "DATETIME"
    },
    "FILE": {
        "name": "添付ファイル",
        "type": "FILE"
    },
    "LINK": {
        "name": "リンク",
        "type": "LINK"
    },
    "USER_SELECT": {
        "name": "ユーザー選択",
        "type": "USER_SELECT"
    },
    "GROUP_SELECT": {
        "name": "グループ選択",
        "type": "GROUP_SELECT"
    },
    "ORGANIZATION_SELECT": {
        "name": "組織選択",
        "type": "ORGANIZATION_SELECT"
    },
    "REFERENCE_TABLE": {
        "name": "関連レコード一覧",
        "type": "REFERENCE_TABLE"
    },
    "SUBTABLE": {
        "name": "テーブル",
        "type": "SUBTABLE"
    },
    "GROUP": {
        "name": "グループ",
        "type": "GROUP"
    }
};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = "<div class=\"kintoneplugin-input-checkbox\">\r\n    <span class=\"kintoneplugin-input-checkbox-item\">\r\n        <input type=\"checkbox\" name=\"checkbox\" id=\"\">\r\n        <label for=\"\"></label>\r\n    </span>\r\n</div>";

/***/ })
/******/ ]);