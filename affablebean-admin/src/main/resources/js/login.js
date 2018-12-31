import React, {Component} from 'react';

export default class LoginView extends Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: ''};
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    onSubmit() {
        this.props.login(this.state);
    }

    render() {
        return (
            <form className="form-signin text-center">
                <img className="mb-4" src="https://netbeans.org/images_www/articles/73/javaee/ecommerce/conclusion/logo.png"/>
                <h1 className="h3 mb-3 font-weight-normal">Please Login</h1>
                <label className="sr-only">Email address</label>
                <input className="form-control" placeholder="Username" type="text" name="username" value={this.state.username} onChange={this.onChange}/>
                <label className="sr-only">Password</label>
                <input className="form-control" placeholder="Password" type="password" name="password" value={this.state.password} onChange={this.onChange}/>
                <br/>
                <input type="button" className="btn btn-lg btn-primary btn-block" value="Submit" onClick={this.onSubmit}/>
                <p className="mt-5 mb-3 text-muted">&copy; Developed by <a href="https://github.com/sunshine55?tab=repositories">sunshine55</a></p>
            </form>
        );
    }
}