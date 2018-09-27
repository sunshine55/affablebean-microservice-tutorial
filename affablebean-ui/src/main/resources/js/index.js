import React from 'react';
import {render} from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {rootReducer} from './reducers';
import {initState} from './states';
import Home from './components/Home';

$.get('/ws/category/fetch', (categoryData) => {
    const store = createStore(rootReducer, initState(categoryData));
    
    render(
        <Provider store={store}>
            <Home/>
        </Provider>,
        document.getElementById('wrap')
    );
});