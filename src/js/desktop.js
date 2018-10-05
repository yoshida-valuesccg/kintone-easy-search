import { Query } from './Query';
import formHtml from '../html/form.html';

const PLUGIN_ID = kintone.$PLUGIN_ID;
const Promise = kintone.Promise;
const APP_ID = kintone.app.getId();

const config = kintone.plugin.app.getConfig(PLUGIN_ID);
config.fields = config.fields ? JSON.parse(config.fields) : [];

function getUrlParam() {

    let urlParam = {};

    let params = location.search.substring(1).split('&');

    for (let i = 0; i < params.length; i++) {
        let [key, value] = params[i].split('=');
        urlParam[key] = value;
    }

    return urlParam;

}

function removeElementById(id) {
    let el = document.getElementById(id);
    if (el) {
        el.parentNode.removeChild(el);
    }
}

function createElementByHtml(html) {
    let div = document.createElement('div');
    div.innerHTML = html;
    return div.firstElementChild;
}

const getPropertiesCache = {};

function getProperties(appId) {

    const appIdStr = String(appId);

    if (!getPropertiesCache[appIdStr]) {
        getPropertiesCache[appIdStr] = kintone.api('/k/v1/form', 'GET', { app: appId })
            .then(({ properties }) => properties)
            .catch(() => []);
    }

    return getPropertiesCache[appIdStr];

}

kintone.events.on('app.record.index.show', (event) => {

    removeElementById('easy-search-form');

    const urlParam = getUrlParam();

    const formEl = createElementByHtml(formHtml);
    const textEl = formEl.getElementsByClassName('easy-search-text')[0];
    const clearEl = formEl.getElementsByClassName('easy-search-clear')[0];

    const headerMenuEl = kintone.app.getHeaderMenuSpaceElement();
    // headerMenuEl.prepend(formEl);
    headerMenuEl.insertBefore(formEl, headerMenuEl.childNodes[0]);

    if (urlParam.keyword) {
        urlParam.keyword = decodeURIComponent(urlParam.keyword);
        textEl.value = urlParam.keyword;
        textEl.focus();
    }

    formEl.onsubmit = () => {

        const keyword = textEl.value;

        if (!keyword) {
            return false;
        }

        const promises = [];
        const query = new Query('or');

        for (const { code, type, subTable, referenceTable } of config.fields) {

            const fieldCode = referenceTable ? `${referenceTable.code}.${code}` : code;
            const appId = referenceTable ? referenceTable.app : APP_ID;

            const promise = Promise.all([getProperties(APP_ID), getProperties(appId)])
                .then(([thisProperties, properties]) => {

                    const prop = properties.find((prop) =>
                        prop.code === code && prop.type === type);

                    if (!prop) {
                        return;
                    }

                    if (referenceTable) {

                        const thisProp = thisProperties.find((prop) =>
                            prop.code === referenceTable.code && prop.type === 'REFERENCE_TABLE');

                        if (!thisProp) {
                            return;
                        }

                    }

                    let options;

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

                            options = prop.options.filter((option) => option.indexOf(keyword) > -1);
                            if (options.length > 0) {
                                query.param(fieldCode, 'in', options);
                            }

                            break;
                    }

                });

            promises.push(promise);

        }

        Promise.all(promises)
            .then(() => {

                const url = `?view=${event.viewId}&query=${encodeURIComponent(query.query())}`
                    + `&keyword=${encodeURIComponent(keyword)}${location.hash}`;

                location.href = url;

            });

        return false;

    };

    clearEl.onclick = () => {

        const url = `?view=${event.viewId}${location.hash}`;
        location.href = url;

        return false;

    };

    return event;

});
