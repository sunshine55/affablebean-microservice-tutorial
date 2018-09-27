import * as types from './types';

function selectCategory(itemData) {

}

export function rootReducer(state = {}, action) {
    switch (action.type) {
        case types.SELECT_CATEGORY:
            return selectCategory(state, action.itemData);
        default:
            return state;
    }
}