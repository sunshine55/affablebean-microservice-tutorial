import * as types from './types';

export const selectCategory = (categoryId) => (dispatch) => {
    $.get(`/ws/item/fetch?categoryId=${categoryId}`, (itemData) => {
        dispatch({
            type: types.SELECT_CATEGORY,
            itemData: itemData
        })
    });
};