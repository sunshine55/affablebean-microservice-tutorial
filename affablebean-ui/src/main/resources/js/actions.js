import * as types from './types';

export const selectNav = (navId) => (dispatch) => {
    if (navId === -1) {
        $.get(types.FETCH_CATEGORY_URL, (data) => {
            dispatch({
                type: types.SELECT_HOME,
                categories: data
            });
        });
    } else {
        dispatch({
            type: types.SELECT_NAV,
            navId: navId
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

export function addCart(itemId) {
    return {
        type: types.ADD_CART,
        itemId: itemId
    };
}

export function clearCart() {
    return {type: types.CLEAR_CART};
}

export function updateQuantity(itemId, updateType) {
    return {
        type: types.UPDATE_QUANTITY,
        itemId: itemId,
        updateType: updateType
    }
}