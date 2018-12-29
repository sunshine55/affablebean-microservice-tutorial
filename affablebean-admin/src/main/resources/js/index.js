import React, {Component} from 'react';
import {render} from 'react-dom';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';

const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true;
        setTimeout(cb, 1000);
    },
    logout(cb) {
        this.isAuthenticated = false;
        setTimeout(cb, 1000);
    }
};

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
        if (this.state.isLogged) {
            return (<Redirect to="/dashboard"/>);
        }
        return (
            <div>
                <p>Please login.</p>
                <input type="button" value="Login" onClick={this.login}/>
            </div>
        );
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
        if (this.state.isLogged) {
            return (
                <div>
                    <p>Welcome to Dashboard view.</p>
                    <input type="button" value="Logout" onClick={this.logout}/>
                </div>
            );
        }
        return (<Redirect to="/"/>);
    }
}


const App = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route path="/dashboard" component={Dashboard}/>
        </Switch>
    </BrowserRouter>
);

render(<App/>, document.getElementById('root'));