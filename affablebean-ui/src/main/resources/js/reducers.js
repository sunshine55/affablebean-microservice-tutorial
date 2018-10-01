import * as types from './types';
import {initState} from './states';

function selectHome(state, categories) {
    let nextState = initState(categories);
    nextState.navData.cartQuantity = state.navData.cartQuantity;
    nextState.cartData = state.cartData;
    return nextState;
}

function selectCategory(state, selectedCategoryId, items) {
    let nextState = {};
    ['categoryData', 'navData', 'cartData'].forEach(prop => nextState[prop] = state[prop]);
    nextState.currentPage = types.ITEM_PAGE;
    nextState.itemData = {
        currentCategory: selectedCategoryId,
        items: items,
        categories: state.categoryData.map(datum => ({id: datum.id, name: datum.name}))
    };
    return nextState;
}

function selectNav(state, navId) {
    let nextState = {};
    Object.keys(state).forEach(key => {
        if (key === 'navData') {
            nextState[key] = Object.assign({}, state[key]);
            nextState[key].currentNav = navId;
        } else {
            nextState[key] = state[key];
        }
    });
    nextState.currentPage = navId;
    return nextState;
}

function clearCart(state) {
    let nextState = {};
    Object.keys(state).forEach(key => {
        if (key === 'navData') {
            nextState.navData = Object.assign({}, state.navData);
            nextState.navData.cartQuantity = 0;
        } else if (key === 'cartData') {
            nextState.cartData = {};
        } else {
            nextState[key] = state[key];
        }
    });
    return nextState;
}

function updateQuantity(state, itemId, updateType) {
    let nextState = {};
    const quantity = (updateType === '+' ? 1 : -1);
    const nextQuantity = state.navData.cartQuantity + quantity;
    ['currentPage', 'categoryData', 'itemData'].forEach(prop => nextState[prop] = state[prop]);
    nextState.navData = {
        currentNav: types.CART_PAGE,
        navItems: state.navData.navItems,
        cartQuantity: nextQuantity > 0 ? nextQuantity : 0
    };
    nextState.cartData = Object.assign({}, state.cartData);
    if (nextState.cartData[itemId] === undefined) {
        const item = state.itemData.items.filter(datum => datum.id === itemId)[0];
        if (quantity > 0) {
            nextState.cartData[itemId] = {
                imgUrl: item.imgUrl,
                name: item.name,
                price: item.price,
                quantity: 1
            }
        }
    } else {
        nextState.cartData[itemId].quantity += quantity;
        if (nextState.cartData[itemId].quantity <= 0) {
            delete nextState.cartData[itemId];
        }
    }
    return nextState;
}

export function rootReducer(state = {}, action) {
    switch (action.type) {
        case types.SELECT_HOME:
            return selectHome(state, action.categories);
        case types.SELECT_CATEGORY:
            return selectCategory(state, action.selectedCategoryId, action.items);
        case types.SELECT_NAV:
            return selectNav(state, action.navId);
        case types.ADD_CART:
            return updateQuantity(state, action.itemId, '+');
        case types.CLEAR_CART:
            return clearCart(state);
        case types.UPDATE_QUANTITY:
            return updateQuantity(state, action.itemId, action.updateType);
        default:
            return state;
    }
}