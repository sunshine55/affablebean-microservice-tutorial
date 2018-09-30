import * as types from './types';

export const selectCategory = (categoryId) => (dispatch) => {
    $.get(`/ws/item/fetch?categoryId=${categoryId}`, (data) => {
        dispatch({
            type: types.SELECT_CATEGORY,
            selectedCategoryId: categoryId,
            items: data
        })
    });
};