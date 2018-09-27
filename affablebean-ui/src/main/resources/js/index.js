import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {rootReducer} from './reducers';
import {initState} from './states';
import Home from './components/Home';

$.get('/ws/category/fetch', (categoryData) => {
    const store = createStore(rootReducer, initState(categoryData), applyMiddleware(thunk));
    
    render(
        <Provider store={store}>
            <Home/>
        </Provider>,
        document.getElementById('wrap')
    );
});