import { Query } from './Query';
import formHtml from '../html/form.html';

const PLUGIN_ID = kintone.$PLUGIN_ID;
const Promise = kintone.Promise;

let config = kintone.plugin.app.getConfig(PLUGIN_ID);
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


let propertiesCache = {};
function getProperties(appId) {

    let appIdStr = String(appId);

    if (!propertiesCache[appIdStr]) {
        propertiesCache[appIdStr] = kintone.api('/k/v1/form', 'GET', { app: appId })
            .then(({ properties }) => properties)
            .catch((error) => []);
    }

    return propertiesCache[appIdStr];

}

// let usersCache = {};
// function getUsers(keyword) {

//     if (!usersCache[keyword]) {
//         usersCache[keyword] = kintone.api('/v1/users', 'GET', { codes: [keyword] }).then(({ users }) => {
//             if (users.length > 0) {
//                 return users[0].code;
//             }
//         }).catch((error) => {
//             // 閲覧権限がないので空の配列を返す
//             return null;
//         });
//     }

//     return usersCache[keyword];

// }

kintone.events.on('app.record.index.show', (event) => {

    removeElementById('easy-search-form');

    const urlParam = getUrlParam();

    const formEl = createElementByHtml(formHtml);
    const textEl = formEl.getElementsByClassName('easy-search-text')[0];
    const clearEl = formEl.getElementsByClassName('easy-search-clear')[0];

    const headerMenuEl = kintone.app.getHeaderMenuSpaceElement();
    headerMenuEl.prepend(formEl);

    if (urlParam.keyword) {
        urlParam.keyword = decodeURIComponent(urlParam.keyword);
        textEl.value = urlParam.keyword;
        textEl.focus();
    }

    formEl.onsubmit = (e) => {

        const keyword = textEl.value;

        if (!keyword) {
            return false;
        }

        const promises = [];
        let query = new Query('or');

        for (let { code, type, subTable, referenceTable } of config.fields) {

            const fieldCode = referenceTable ? `${referenceTable.code}.${code}` : code;
            const appId = referenceTable ? referenceTable.app : kintone.app.getId();

            let promise;

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

                    promise = getProperties(appId).then((properties) => {

                        let prop = properties.find((prop) => prop.code === code && prop.type === type);

                        if (prop) {
                            let o = prop.options.filter((option) => option.indexOf(keyword) > -1);
                            if (o.length > 0) {
                                query.param(fieldCode, 'in', o);
                            }
                        }

                    });

                    promises.push(promise);

                    break;
                // case 'USER_SELECT':
                // case 'GROUP_SELECT':
                // case 'ORGANIZATION_SELECT':
                //     query.param(fieldCode, 'in', [keyword]);
                //     break;
            }

        }

        Promise.all(promises).then(() => {

            let url = `?view=${event.viewId}&query=${encodeURIComponent(query.query())}`
                + `&keyword=${encodeURIComponent(keyword)}` + location.hash;

            location.href = url;

        });

        return false;

    };

    clearEl.onclick = (e) => {

        let url = `?view=${event.viewId}` + location.hash;
        location.href = url;

        return false;

    };

    return event;

});
