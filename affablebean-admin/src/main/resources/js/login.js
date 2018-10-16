import React, {Component} from 'react';
import {render} from 'react-dom';

class LoginView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <form className="form-signin">
                <img className="mb-4" src="https://fakeimg.pl/72x72/ff0000%2C128/000%2C255/?text=AffableBean"/>
                <h1 className="h3 mb-3 font-weight-normal">Please Login</h1>
                <label className="sr-only">Email address</label>
                <input className="form-control" placeholder="Email address" type="email"/>
                <label className="sr-only">Password</label>
                <input className="form-control" placeholder="Password" type="password"/>
                <br/>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                <p className="mt-5 mb-3 text-muted">&copy; Developed by <a href="https://github.com/sunshine55?tab=repositories">sunshine55</a></p>
            </form>
        );
    }
}

render(<LoginView/>, document.getElementById('wrap'));