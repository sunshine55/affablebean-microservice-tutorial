import React, {Component} from 'react';
import {render} from 'react-dom';
import {BrowserRouter, Redirect, Route} from 'react-router-dom';
import LoginView from './login';
import DashboardView from './dashboard';

const initAuth = () => {
    let isAuthenticated = false;
    let token = null;

    const getAuth = () => isAuthenticated;

    const getToken = () => token;

    const login = (credentials, cb) => {
        $.ajax({
            url: '/admin',
            data: JSON.stringify(credentials),
            type: 'POST',
            contentType: 'application/json; charset=utf-8'
        }).then(
            (res, status, xhr) => {
                isAuthenticated = true;
                token = xhr.getResponseHeader('Authorization');
                cb(true);
            },
            (e) => {
                if (e.status === 401) {
                    isAuthenticated = false;
                    token = null;
                    cb(false);
                } else {
                    alert(`HTTP ${e.status}: ${e.responseJSON.error}!`)
                }
            }
        );
    };

    const logout = (cb) => {
        isAuthenticated = false;
        token = null;
        cb(false);
    };

    return {getAuth, getToken, login, logout};
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {isAuthenticated: window.AUTH.getAuth()};
        this.login = this.login.bind(this);
    }

    login(credentials) {
        window.AUTH.login(credentials, (isAuthenticated) => this.setState({isAuthenticated: isAuthenticated}));
    }

    render() {
        return this.state.isAuthenticated ? (<Redirect to="/admin/dashboard"/>) : (<LoginView login={this.login}/>);
    }
}

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {isAuthenticated: window.AUTH.getAuth()};
        this.logout = this.logout.bind(this);
    }

    logout() {
        window.AUTH.logout((isAuthenticated) => this.setState({isAuthenticated: isAuthenticated}));
    }

    render() {
        return this.state.isAuthenticated ? (<DashboardView logout={this.logout}/>) : (<Redirect to="/admin"/>);
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

window.AUTH = initAuth();
render(<App/>, document.getElementById('root'));