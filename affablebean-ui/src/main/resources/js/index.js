import React from 'react';
import {render} from 'react-dom';
import {createStore} from 'redux';
import {reduce} from "./reducer";
import {initState} from "./state";
import Home from "./containers/Home";

const store = createStore(reduce, initState());

render(
    <Provider store={store}>
        <Home/>
    </Provider>,
    document.getElementById('wrap')
);