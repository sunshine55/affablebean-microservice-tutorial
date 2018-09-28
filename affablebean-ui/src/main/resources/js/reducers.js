import * as types from './types';

function selectCategory(state, itemData) {
    return {
        currentPage: 'item',
        categoryData: state.categoryData,
        itemData: itemData
    };
}

export function rootReducer(state = {}, action) {
    switch (action.type) {
        case types.SELECT_CATEGORY:
            return selectCategory(state, action.itemData);
        default:
            return state;
    }
}