import * as types from './types';

export function initState(categoryData) {
    return {
        currentPage: types.CATEGORY_PAGE,
        categoryData: categoryData,
        itemData: {
            currentCategory: '',
            items: [],
            categories: []
        },
        navData: {
            currentNav: -1,
            navItems: ['Cart', 'Checkout'],
            cartQuantity: 0
        },
        cartData: {}
    };
}