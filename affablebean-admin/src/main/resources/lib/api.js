export const CATEGORY_API_FETCH = '/ws/category/fetch';
export const CATEGORY_API_BULK_UPSERT = '/ws/category/bulkUpsert';
export const CATEGORY_API_BULK_DELETE = '/ws/category/bulkDelete';

export const ITEM_API_FETCH = '/ws/item/fetch';
export const ITEM_API_BULK_UPSERT = '/ws/item/bulkUpsert';
export const ITEM_API_BULK_DELETE = '/ws/item/bulkDelete';

export const post = (url, data, callback) => {
    $.ajax({
        url: url,
        data: JSON.stringify(data),
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        timeout: 54000
    }).then(
        (responseData) => callback(responseData),
        (e) => alert(`HTTP ${e.status}: ${e.responseJSON.error}!`)
    );
};