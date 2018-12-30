import React, {Component} from 'react';
import {render} from 'react-dom';
import {BrowserRouter, Redirect, Route} from 'react-router-dom';
import {fakeAuth} from '../lib/api';
import LoginView from './login';
import DashboardView from './dashboard';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {isLogged: fakeAuth.isAuthenticated};
        this.login = this.login.bind(this);
    }

    login() {
        const _this = this;
        fakeAuth.authenticate(() => _this.setState({isLogged: true}));
    }

    render() {
        return this.state.isLogged ? (<Redirect to="/admin/dashboard"/>) : (<LoginView login={this.login}/>);
    }
}

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {isLogged: fakeAuth.isAuthenticated};
        this.logout = this.logout.bind(this);
    }

    logout() {
        const _this = this;
        fakeAuth.logout(() => _this.setState({isLogged: false}));
    }

    render() {
        return this.state.isLogged ? (<DashboardView logout={this.logout}/>) : (<Redirect to="/admin"/>);
    }
}

const App = () => (
    <BrowserRouter>
        <div>
            <Route exact path="/admin" component={Login}/>
            <Route path="/admin/dashboard" component={Dashboard}/>
        </div>
    </BrowserRouter>
);

render(<App/>, document.getElementById('root'));