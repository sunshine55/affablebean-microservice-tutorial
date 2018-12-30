import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import LoginView from './login';
import DashboardView from './dashboard';

const App = () => (
    <BrowserRouter>
        <div>
            <Route exact path="/admin" component={LoginView}/>
            <Route path="/admin/dashboard" component={DashboardView}/>
        </div>
    </BrowserRouter>
);

render(<App/>, document.getElementById('root'));