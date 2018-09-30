import * as types from './types';

export function initState(categoryData) {
    return {
        currentPage: types.CATEGORY_PAGE,
        categoryData: categoryData,
        itemData: {
            currentCategory: '',
            items: [],
            categories: []
        }
    };
}