import * as types from './types';

export const selectNav = (navId) => (dispatch) => {
    if (navId === -1) {
        $.get(types.FETCH_CATEGORY_URL, (data) => {
            dispatch({
                type: types.SELECT_HOME,
                categories: data
            });
        });
    }
};

export const selectCategory = (categoryId) => (dispatch) => {
    $.get(types.FETCH_ITEM_URL + categoryId, (data) => {
        dispatch({
            type: types.SELECT_CATEGORY,
            selectedCategoryId: categoryId,
            items: data
        });
    });
};