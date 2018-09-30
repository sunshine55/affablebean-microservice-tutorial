import * as types from './types';

function selectCategory(state, selectedCategoryId, items) {
    let nextState = {};
    nextState.currentPage = types.ITEM_PAGE;
    nextState.categoryData = state.categoryData;
    nextState.itemData = {
        currentCategory: selectedCategoryId,
        items: items,
        categories: state.categoryData.map(datum => ({id: datum.id, name: datum.name}))
    };
    return nextState;
}

export function rootReducer(state = {}, action) {
    switch (action.type) {
        case types.SELECT_CATEGORY:
            return selectCategory(state, action.selectedCategoryId, action.items);
        default:
            return state;
    }
}