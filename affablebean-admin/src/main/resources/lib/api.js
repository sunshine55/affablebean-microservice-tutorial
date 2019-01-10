export const CATEGORY_FETCH_URI = '/ws/ui/category/fetch';
export const CATEGORY_BULK_UPSERT_URI = '/ws/admin/category/bulkUpsert';
export const CATEGORY_BULK_DELETE_URI = '/ws/admin/category/bulkDelete';

export const ITEM_FETCH_URI = '/ws/ui/item/fetch';
export const ITEM_BULK_UPSERT_URI = '/ws/admin/item/bulkUpsert';
export const ITEM_BULK_DELETE_URI = '/ws/admin/item/bulkDelete';

function injectAuth() {
    return window.AUTH.getAuth() && !!window.AUTH.getToken() ? {headers: {Authorization: window.AUTH.getToken()}} : null;
}

export const post = (url, data, cb) => {
    $.ajax(Object.assign({
        url: url,
        data: JSON.stringify(data),
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        timeout: 60000
    }, injectAuth())).then(
        (responseData) => cb(responseData),
        (e) => alert(`HTTP ${e.status}: ${e.responseJSON.error}!`)
    );
};

export const get = (url, cb) => {
    $.ajax(Object.assign({
        url: url,
        type: 'GET',
        contentType: 'application/json; charset=utf-8'
    }, injectAuth())).then(
        (responseData) => cb(responseData),
        (e) => alert(`HTTP ${e.status}: ${e.responseJSON.error}!`)
    );
};