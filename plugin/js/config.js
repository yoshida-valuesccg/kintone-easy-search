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


var getProperties = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(appId) {
        var appIdStr, _ref2, properties;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        appIdStr = String(appId);

                        if (propertiesCache[appIdStr]) {
                            _context.next = 7;
                            break;
                        }

                        _context.next = 4;
                        return kintone.api('/k/v1/app/form/fields', 'GET', { app: appId });

                    case 4:
                        _ref2 = _context.sent;
                        properties = _ref2.properties;

                        propertiesCache[appIdStr] = properties;

                    case 7:
                        return _context.abrupt('return', propertiesCache[appIdStr]);

                    case 8:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function getProperties(_x) {
        return _ref.apply(this, arguments);
    };
}();

var getFields = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _ref4, properties, _ref5, layout, fieldsInOrder, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, row, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _ref7, _code, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, _row, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, _ref8, _code2, fields, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, code, prop, type, label, subTable, _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, _ref9, _code3, _type, _label, _prop$referenceTable, displayFields, relatedApp, referenceTable, _iteratorNormalCompletion7, _didIteratorError7, _iteratorError7, _iterator7, _step7, _code4, _properties, _properties$_code, _type2, _label2, field;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return kintone.api('/k/v1/preview/app/form/fields', 'GET', { app: APP_ID });

                    case 2:
                        _ref4 = _context2.sent;
                        properties = _ref4.properties;
                        _context2.next = 6;
                        return kintone.api('/k/v1/preview/app/form/layout', 'GET', { app: APP_ID });

                    case 6:
                        _ref5 = _context2.sent;
                        layout = _ref5.layout;
                        fieldsInOrder = [];
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context2.prev = 12;
                        _iterator = layout[Symbol.iterator]();

                    case 14:
                        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                            _context2.next = 90;
                            break;
                        }

                        row = _step.value;

                        if (!(row.type === 'ROW')) {
                            _context2.next = 38;
                            break;
                        }

                        _iteratorNormalCompletion3 = true;
                        _didIteratorError3 = false;
                        _iteratorError3 = undefined;
                        _context2.prev = 20;

                        for (_iterator3 = row.fields[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                            _ref7 = _step3.value;
                            _code = _ref7.code;

                            if (_code) {
                                fieldsInOrder.push(_code);
                            }
                        }
                        _context2.next = 28;
                        break;

                    case 24:
                        _context2.prev = 24;
                        _context2.t0 = _context2['catch'](20);
                        _didIteratorError3 = true;
                        _iteratorError3 = _context2.t0;

                    case 28:
                        _context2.prev = 28;
                        _context2.prev = 29;

                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }

                    case 31:
                        _context2.prev = 31;

                        if (!_didIteratorError3) {
                            _context2.next = 34;
                            break;
                        }

                        throw _iteratorError3;

                    case 34:
                        return _context2.finish(31);

                    case 35:
                        return _context2.finish(28);

                    case 36:
                        _context2.next = 87;
                        break;

                    case 38:
                        if (!(row.type === 'SUBTABLE')) {
                            _context2.next = 42;
                            break;
                        }

                        fieldsInOrder.push(row.code);
                        _context2.next = 87;
                        break;

                    case 42:
                        if (!(row.type === 'GROUP')) {
                            _context2.next = 87;
                            break;
                        }

                        _iteratorNormalCompletion4 = true;
                        _didIteratorError4 = false;
                        _iteratorError4 = undefined;
                        _context2.prev = 46;
                        _iterator4 = _row.layout[Symbol.iterator]();

                    case 48:
                        if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                            _context2.next = 73;
                            break;
                        }

                        _row = _step4.value;

                        if (!(_row.type === 'ROW')) {
                            _context2.next = 70;
                            break;
                        }

                        _iteratorNormalCompletion5 = true;
                        _didIteratorError5 = false;
                        _iteratorError5 = undefined;
                        _context2.prev = 54;

                        for (_iterator5 = _row.fields[Symbol.iterator](); !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                            _ref8 = _step5.value;
                            _code2 = _ref8.code;

                            if (_code2) {
                                fieldsInOrder.push(_code2);
                            }
                        }
                        _context2.next = 62;
                        break;

                    case 58:
                        _context2.prev = 58;
                        _context2.t1 = _context2['catch'](54);
                        _didIteratorError5 = true;
                        _iteratorError5 = _context2.t1;

                    case 62:
                        _context2.prev = 62;
                        _context2.prev = 63;

                        if (!_iteratorNormalCompletion5 && _iterator5.return) {
                            _iterator5.return();
                        }

                    case 65:
                        _context2.prev = 65;

                        if (!_didIteratorError5) {
                            _context2.next = 68;
                            break;
                        }

                        throw _iteratorError5;

                    case 68:
                        return _context2.finish(65);

                    case 69:
                        return _context2.finish(62);

                    case 70:
                        _iteratorNormalCompletion4 = true;
                        _context2.next = 48;
                        break;

                    case 73:
                        _context2.next = 79;
                        break;

                    case 75:
                        _context2.prev = 75;
                        _context2.t2 = _context2['catch'](46);
                        _didIteratorError4 = true;
                        _iteratorError4 = _context2.t2;

                    case 79:
                        _context2.prev = 79;
                        _context2.prev = 80;

                        if (!_iteratorNormalCompletion4 && _iterator4.return) {
                            _iterator4.return();
                        }

                    case 82:
                        _context2.prev = 82;

                        if (!_didIteratorError4) {
                            _context2.next = 85;
                            break;
                        }

                        throw _iteratorError4;

                    case 85:
                        return _context2.finish(82);

                    case 86:
                        return _context2.finish(79);

                    case 87:
                        _iteratorNormalCompletion = true;
                        _context2.next = 14;
                        break;

                    case 90:
                        _context2.next = 96;
                        break;

                    case 92:
                        _context2.prev = 92;
                        _context2.t3 = _context2['catch'](12);
                        _didIteratorError = true;
                        _iteratorError = _context2.t3;

                    case 96:
                        _context2.prev = 96;
                        _context2.prev = 97;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 99:
                        _context2.prev = 99;

                        if (!_didIteratorError) {
                            _context2.next = 102;
                            break;
                        }

                        throw _iteratorError;

                    case 102:
                        return _context2.finish(99);

                    case 103:
                        return _context2.finish(96);

                    case 104:
                        fields = [];
                        _iteratorNormalCompletion2 = true;
                        _didIteratorError2 = false;
                        _iteratorError2 = undefined;
                        _context2.prev = 108;
                        _iterator2 = fieldsInOrder[Symbol.iterator]();

                    case 110:
                        if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                            _context2.next = 176;
                            break;
                        }

                        code = _step2.value;
                        prop = properties[code];
                        type = prop.type, label = prop.label;

                        if (!(type === 'SUBTABLE')) {
                            _context2.next = 137;
                            break;
                        }

                        subTable = { code: code };
                        _iteratorNormalCompletion6 = true;
                        _didIteratorError6 = false;
                        _iteratorError6 = undefined;
                        _context2.prev = 119;


                        for (_iterator6 = Object.values(prop.fields)[Symbol.iterator](); !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                            _ref9 = _step6.value;
                            _code3 = _ref9.code;
                            _type = _ref9.type;
                            _label = _ref9.label;

                            fields.push({ code: _code3, type: _type, label: _label, subTable: subTable });
                        }

                        _context2.next = 127;
                        break;

                    case 123:
                        _context2.prev = 123;
                        _context2.t4 = _context2['catch'](119);
                        _didIteratorError6 = true;
                        _iteratorError6 = _context2.t4;

                    case 127:
                        _context2.prev = 127;
                        _context2.prev = 128;

                        if (!_iteratorNormalCompletion6 && _iterator6.return) {
                            _iterator6.return();
                        }

                    case 130:
                        _context2.prev = 130;

                        if (!_didIteratorError6) {
                            _context2.next = 133;
                            break;
                        }

                        throw _iteratorError6;

                    case 133:
                        return _context2.finish(130);

                    case 134:
                        return _context2.finish(127);

                    case 135:
                        _context2.next = 173;
                        break;

                    case 137:
                        if (!(type === 'REFERENCE_TABLE')) {
                            _context2.next = 172;
                            break;
                        }

                        _prop$referenceTable = prop.referenceTable, displayFields = _prop$referenceTable.displayFields, relatedApp = _prop$referenceTable.relatedApp;
                        referenceTable = { code: code, label: label, app: relatedApp.app };
                        _iteratorNormalCompletion7 = true;
                        _didIteratorError7 = false;
                        _iteratorError7 = undefined;
                        _context2.prev = 143;
                        _iterator7 = displayFields[Symbol.iterator]();

                    case 145:
                        if (_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done) {
                            _context2.next = 156;
                            break;
                        }

                        _code4 = _step7.value;
                        _context2.next = 149;
                        return getProperties(relatedApp.app);

                    case 149:
                        _properties = _context2.sent;
                        _properties$_code = _properties[_code4], _type2 = _properties$_code.type, _label2 = _properties$_code.label;
                        field = { code: _code4, type: _type2, label: _label2, referenceTable: referenceTable };


                        fields.push(field);

                    case 153:
                        _iteratorNormalCompletion7 = true;
                        _context2.next = 145;
                        break;

                    case 156:
                        _context2.next = 162;
                        break;

                    case 158:
                        _context2.prev = 158;
                        _context2.t5 = _context2['catch'](143);
                        _didIteratorError7 = true;
                        _iteratorError7 = _context2.t5;

                    case 162:
                        _context2.prev = 162;
                        _context2.prev = 163;

                        if (!_iteratorNormalCompletion7 && _iterator7.return) {
                            _iterator7.return();
                        }

                    case 165:
                        _context2.prev = 165;

                        if (!_didIteratorError7) {
                            _context2.next = 168;
                            break;
                        }

                        throw _iteratorError7;

                    case 168:
                        return _context2.finish(165);

                    case 169:
                        return _context2.finish(162);

                    case 170:
                        _context2.next = 173;
                        break;

                    case 172:
                        fields.push({ code: code, type: type, label: label });

                    case 173:
                        _iteratorNormalCompletion2 = true;
                        _context2.next = 110;
                        break;

                    case 176:
                        _context2.next = 182;
                        break;

                    case 178:
                        _context2.prev = 178;
                        _context2.t6 = _context2['catch'](108);
                        _didIteratorError2 = true;
                        _iteratorError2 = _context2.t6;

                    case 182:
                        _context2.prev = 182;
                        _context2.prev = 183;

                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }

                    case 185:
                        _context2.prev = 185;

                        if (!_didIteratorError2) {
                            _context2.next = 188;
                            break;
                        }

                        throw _iteratorError2;

                    case 188:
                        return _context2.finish(185);

                    case 189:
                        return _context2.finish(182);

                    case 190:
                        return _context2.abrupt('return', fields.filter(function (_ref6) {
                            var type = _ref6.type;
                            return targetFieldTypes.includes(type);
                        }));

                    case 191:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this, [[12, 92, 96, 104], [20, 24, 28, 36], [29,, 31, 35], [46, 75, 79, 87], [54, 58, 62, 70], [63,, 65, 69], [80,, 82, 86], [97,, 99, 103], [108, 178, 182, 190], [119, 123, 127, 135], [128,, 130, 134], [143, 158, 162, 170], [163,, 165, 169], [183,, 185, 189]]);
    }));

    return function getFields() {
        return _ref3.apply(this, arguments);
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

var propertiesCache = {};

_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var vm, fields, table, $checkboxAll, _loop, i;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
            switch (_context3.prev = _context3.next) {
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
                    _context3.next = 3;
                    return getFields();

                case 3:
                    fields = _context3.sent;
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
                    return _context3.stop();
            }
        }
    }, _callee3, undefined);
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