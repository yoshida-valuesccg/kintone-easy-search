import { Query } from './Query';
import formHtml from '../html/form.html';
import '../css/desktop.scss';

const PLUGIN_ID = kintone.$PLUGIN_ID;
// const Promise = kintone.Promise;
// const APP_ID = kintone.app.getId();

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

// function createElementByHtml(html) {
//     let div = document.createElement('div');
//     div.innerHTML = html;
//     return div.firstElementChild;
// }

// const getPropertiesCache = {};

// function getProperties(appId) {

//     const appIdStr = String(appId);

//     if (!getPropertiesCache[appIdStr]) {
//         getPropertiesCache[appIdStr] = kintone.api('/k/v1/form', 'GET', { app: appId })
//             .then(({ properties }) => properties)
//             .catch(() => []);
//     }

//     return getPropertiesCache[appIdStr];

// }

kintone.events.on('app.record.index.show', (event) => {

    // console.log("Easy search debug config=", config);


    let headerMenuEl = document.getElementById("easy-search-form-root");
    if (!headerMenuEl) {
        headerMenuEl = document.createElement("span");
        headerMenuEl.id = "easy-search-form-root";
        const headerMenuSpaceElement = kintone.app.getHeaderMenuSpaceElement();
        if (headerMenuSpaceElement) {
            headerMenuSpaceElement.appendChild(headerMenuEl);
        }
    }
    removeElementById('easy-search-form');

    headerMenuEl.innerHTML = formHtml;
    const formEl = headerMenuEl.firstElementChild;
    const textEl = formEl.getElementsByClassName('easy-search-text')[0];
    // const searchEl = formEl.getElementsByClassName('easy-search-button')[0];
    const clearEl = formEl.getElementsByClassName('easy-search-clear')[0];

    const urlParam = getUrlParam();
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

        // const promises = [];
        const query = new Query('or');

        for (const { code, type, options, subTable, referenceTable } of config.fields) {

            const fieldCode = referenceTable ? `${referenceTable.code}.${code}` : code;
            // const appId = referenceTable ? referenceTable.app : APP_ID;

            // const promise = Promise.all([getProperties(APP_ID), getProperties(appId)])
            //     .then(([thisProperties, properties]) => {

            //         const prop = properties.find((prop) =>
            //             prop.code === code && prop.type === type);

            //         if (!prop) {
            //             return;
            //         }

            //         if (referenceTable) {

            //             const thisProp = thisProperties.find((prop) =>
            //                 prop.code === referenceTable.code && prop.type === 'REFERENCE_TABLE');

            //             if (!thisProp) {
            //                 return;
            //             }

            //         }

            // let options;

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
                    if (options) {
                        let filterdOptions = Object.values(options)
                            .filter((option) => option.label.indexOf(keyword) > -1)
                            .map((option) => option.label);
                        if (filterdOptions.length > 0) {
                            query.param(fieldCode, 'in', filterdOptions);
                        }
                    }
                    break;
            }

            //         });

            //     promises.push(promise);

        }

        // Promise.all(promises)
        //     .then(() => {
        console.log("debug query.query()=", query.query());
        const url = `?view=${event.viewId}&query=${encodeURIComponent(query.query())}`
            + `&keyword=${encodeURIComponent(keyword)}${location.hash}`;

        location.href = url;

        // });

        return false;

    };

    clearEl.onclick = () => {

        const url = `?view=${event.viewId}${location.hash}`;
        location.href = url;

        return false;

    };

    return event;

});
