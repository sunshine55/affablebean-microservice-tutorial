export const CATEGORY_API_FETCH = '/ws/category/fetch';
export const CATEGORY_API_BULK_UPSERT = '/ws/category/bulkUpsert';
export const CATEGORY_API_BULK_DELETE = '/ws/category/bulkDelete';

export const post = (url, data, callback) => {
    $.ajax({
        url: url,
        data: JSON.stringify(data),
        type: 'POST',
        contentType: 'application/json; charset=utf-8'
    }).then(
        (responseData) => callback(responseData),
        () => alert('HTTP 500: Internal Server Error!')
    );
};