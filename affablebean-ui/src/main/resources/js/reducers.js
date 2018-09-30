import * as types from './types';
import {initState} from './states';

function selectCategory(state, selectedCategoryId, items) {
    let nextState = {};
    ['categoryData', 'navData'].forEach(prop => nextState[prop] = state[prop]);
    nextState.currentPage = types.ITEM_PAGE;
    nextState.itemData = {
        currentCategory: selectedCategoryId,
        items: items,
        categories: state.categoryData.map(datum => ({id: datum.id, name: datum.name}))
    };
    return nextState;
}

export function rootReducer(state = {}, action) {
    switch (action.type) {
        case types.SELECT_HOME:
            return initState(action.categories);
        case types.SELECT_CATEGORY:
            return selectCategory(state, action.selectedCategoryId, action.items);
        default:
            return state;
    }
}