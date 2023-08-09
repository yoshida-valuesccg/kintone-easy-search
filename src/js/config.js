/* eslint-disable indent */
/* eslint-disable max-len */
/* eslint-disable new-cap */
import { fieldTypes } from './fieldTypes';
import checkboxHtml from '../html/checkbox.html';
import '../css/config.scss';

const PLUGIN_ID = kintone.$PLUGIN_ID;
const APP_ID = kintone.app.getId();

const config = kintone.plugin.app.getConfig(PLUGIN_ID);
config.fields = config.fields ? JSON.parse(config.fields) : [];

const targetFieldTypes = [
    'SINGLE_LINE_TEXT',
    'MULTI_LINE_TEXT',
    'RICH_TEXT',
    'LINK',
    'NUMBER',
    'CHECK_BOX',
    'RADIO_BUTTON',
    'DROP_DOWN',
    'MULTI_SELECT',
    'RECORD_NUMBER'
];

const language = {
    search: '_INPUT_',
    searchPlaceholder: '検索',
    zeroRecords: 'データがありません。'
};

const getPropertiesCache = {};

function getProperties(appId) {

    const appIdStr = String(appId);

    if (!getPropertiesCache[appIdStr]) {
        getPropertiesCache[appIdStr] = kintone.api(kintone.api.url('/k/v1/app/form/fields', true), 'GET', { app: appId })
            .then(({ properties }) => properties)
            .catch(() => ({}));
    }

    return getPropertiesCache[appIdStr];

}

async function getFields() {

    let { properties } = await kintone.api(kintone.api.url('/k/v1/preview/app/form/fields', true), 'GET', { app: APP_ID });
    let { layout } = await kintone.api(kintone.api.url('/k/v1/preview/app/form/layout', true), 'GET', { app: APP_ID });

    const fieldsInOrder = [];

    (function forEachRow(layout) {

        for (const row of layout) {
            if (row.type === 'ROW') {
                for (const { code }
                    of row.fields) {
                    if (code) {
                        fieldsInOrder.push(code);
                    }
                }
            } else if (row.type === 'SUBTABLE') {
                fieldsInOrder.push(row.code);
            } else if (row.type === 'GROUP') {
                forEachRow(row.layout);
            }
        }

    })(layout);

    const fields = [];

    for (const code of fieldsInOrder) {

        const prop = properties[code];
        const { type, label, options } = prop;

        if (type === 'SUBTABLE') {

            const subTable = { code };

            for (const { code, type, label, options }
                of Object.values(prop.fields)) {
                fields.push({ code, type, label, options, subTable });
                if (!options && ['CHECK_BOX', 'RADIO_BUTTON', 'DROP_DOWN', 'MULTI_SELECT'].includes(type)) {
                    console.error("実装不備! optionsが未定義 " + type);
                }
            }

        } else if (type === 'REFERENCE_TABLE') {

            if (prop.referenceTable) {

                const { displayFields, relatedApp } = prop.referenceTable;
                const referenceTable = { code, label, app: relatedApp.app };

                const properties = await getProperties(relatedApp.app);

                for (const code of displayFields) {

                    if (properties[code]) {

                        let type = properties[code].type;
                        let label = properties[code].label;
                        let options = properties[code].options;

                        const field = { code, type, label, options, referenceTable };
                        fields.push(field);
                    }
                    if (properties[code] && !options && ['CHECK_BOX', 'RADIO_BUTTON', 'DROP_DOWN', 'MULTI_SELECT'].includes(properties[code].type)) {
                        console.error("実装不備! optionsが未定義 " + prop.type + " " + properties[code].type);
                    }

                }

            }

        } else {
            fields.push({ code, type, label, options });
            if (!options && ['CHECK_BOX', 'RADIO_BUTTON', 'DROP_DOWN', 'MULTI_SELECT'].includes(type)) {
                console.error("実装不備! optionsが未定義 " + type);
            }
        }

    }

    return fields.filter(({ type }) => targetFieldTypes.includes(type));

}

(async () => {

    // eslint-disable-next-line no-unused-vars
    const vm = new Vue({
        el: '#config',
        data: {},
        methods: {
            submit: () => {

                const table = $('#fields').DataTable();
                const fields = [];

                for (let i = 0; i < table.data().count(); i++) {

                    let row = table.row(i);
                    let field = row.data();
                    let node = row.node();

                    if ($('.kintoneplugin-input-checkbox', node).find('input')
                        .prop('checked')) {
                        fields.push(field);
                    }

                }

                kintone.plugin.app.setConfig({ fields: JSON.stringify(fields) });

            },
            cancel: () => {
                history.back();
            }
        }
    });

    const fields = await getFields();

    const table = $('#fields').DataTable({
        language,
        data: fields,
        columnDefs: [
            {
                targets: 0,
                title: '',
                data: null,
                orderable: false,
                defaultContent: checkboxHtml,
                width: '5%'
            },
            {
                targets: 1,
                title: 'インデックス',
                data: (field) => fields.indexOf(field),
                defaultContent: '',
                visible: false
            },
            {
                targets: 2,
                title: 'フィールド名',
                data: 'label',
                defaultContent: '',
                width: '35%',
                orderable: false
            },
            {
                targets: 3,
                title: 'フィールドコード',
                data: 'code',
                defaultContent: '',
                orderable: false,
                visible: false
            },
            {
                targets: 4,
                title: 'フィールド種類',
                data: (field) => fieldTypes[field.type].name,
                defaultContent: '',
                width: '25%',
                orderable: false
            },
            {
                targets: 5,
                title: 'テーブル・関連レコード一覧',
                data: (field) => field.subTable ?
                    field.subTable.code : field.referenceTable ?
                        field.referenceTable.label : '',
                defaultContent: '',
                width: '35%',
                orderable: false
            }
        ],
        scrollY: '400px',
        scrollCollapse: true,
        paging: false,
        order: [
            [1, 'asc']
        ],
        info: false,
        searching: true,
        createdRow: (row, data, index) => {

            const $checkbox = $('.kintoneplugin-input-checkbox', row);

            $checkbox.find('input')
                .attr('id', `checkbox-${index}`)
                .on('change', (event) => {

                    if ($(event.target).prop('checked')) {
                        $(row).addClass('selected');
                    } else {
                        $(row).removeClass('selected');
                    }

                });

            $checkbox.find('label')
                .attr('for', `checkbox-${index}`);

        }
    });

    // adjust width
    $(window).resize(() => {
        const $dataTablesWrapper = $('.dataTables_wrapper').width('100%');
        let scrollDiff = document.body.scrollWidth - document.body.clientWidth;
        if (scrollDiff > 0) {
            $dataTablesWrapper.width($dataTablesWrapper.width() - scrollDiff);
        }
    });

    // adjust height
    $(window).resize(() => {
        const $scrollBody = $('.dataTables_scrollBody').css('maxHeight', document.body.clientHeight);
        let scrollDiff = document.body.scrollHeight - document.body.clientHeight;
        if (scrollDiff > 0) {
            $scrollBody.css('maxHeight', $scrollBody.height() - scrollDiff - 5);
        }
    });

    $(window).resize(() => {
        table.columns.adjust().draw();
    });

    setTimeout(() => $(window).resize());

    const $checkboxAll = $(checkboxHtml).appendTo(table.column(0).header());

    $checkboxAll.find('input')
        .attr('id', 'checkbox-all')
        .on('change', (event) => {
            if ($(event.target).prop('checked')) {
                $('.kintoneplugin-input-checkbox').find('input:not(#checkbox-all)')
                    .prop('checked', true)
                    .trigger('change');
            } else {
                $('.kintoneplugin-input-checkbox').find('input:not(#checkbox-all)')
                    .prop('checked', false)
                    .trigger('change');
            }
        });

    $checkboxAll.find('label')
        .attr('for', 'checkbox-all');

    table.on('search', () => {
        $checkboxAll.find('input')
            .prop('checked', false);
    });

    for (let i = 0; i < table.data().count(); i++) {

        const row = table.row(i);
        const field = row.data();
        const node = row.node();

        const { code, type, subTable = {}, referenceTable = {} } = field;

        if (config.fields.findIndex((field) => field.code === code &&
            field.type === type &&
            (field.subTable || {}).code === subTable.code &&
            (field.referenceTable || {}).code === referenceTable.code &&
            (field.referenceTable || {}).app === referenceTable.app
        ) > -1) {

            $('.kintoneplugin-input-checkbox', node).find('input')
                .prop('checked', true)
                .trigger('change');

        }
    }

})();
