export const CATEGORY_API_FETCH = '/ws/ui/category/fetch';
export const CATEGORY_API_BULK_UPSERT = '/ws/admin/category/bulkUpsert';
export const CATEGORY_API_BULK_DELETE = '/ws/admin/category/bulkDelete';

export const ITEM_API_FETCH = '/ws/ui/item/fetch';
export const ITEM_API_BULK_UPSERT = '/ws/admin/item/bulkUpsert';
export const ITEM_API_BULK_DELETE = '/ws/admin/item/bulkDelete';

const JWT = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4uZG9lMTIzNCIsInBhc3N3b3JkIjoiNmg1SG5qMlZIRSJ9.pyTm3UxoV8DeLIywJzU3SCPn5jBmCkAUu45G888lN9Q';

export const post = (url, data, cb) => {
    $.ajax({
        url: url,
        data: JSON.stringify(data),
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        headers: {Authorization: JWT},
        timeout: 60000
    }).then(
        (responseData) => cb(responseData),
        (e) => alert(`HTTP ${e.status}: ${e.responseJSON.error}!`)
    );
};

export const get = (url, cb) => {
    $.ajax({
        url: url,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        headers: {Authorization: JWT}
    }).then(
        (responseData) => cb(responseData),
        (e) => alert(`HTTP ${e.status}: ${e.responseJSON.error}!`)
    );
};

export const fakeAuth = {
    isAuthenticated: false,
    login(credentials, cb) {
        this.isAuthenticated = (credentials.username === 'admin' && credentials.password === 'abc123');
        setTimeout(cb, 700);
    },
    logout(cb) {
        this.isAuthenticated = false;
        setTimeout(cb, 700);
    }
};