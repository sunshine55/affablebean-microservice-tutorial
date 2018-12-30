import React from 'react';

const LoginView = ({login}) => (
    <form className="form-signin text-center">
        <img className="mb-4" src="https://netbeans.org/images_www/articles/73/javaee/ecommerce/conclusion/logo.png"/>
        <h1 className="h3 mb-3 font-weight-normal">Please Login</h1>
        <label className="sr-only">Email address</label>
        <input className="form-control" placeholder="Username" type="text"/>
        <label className="sr-only">Password</label>
        <input className="form-control" placeholder="Password" type="password"/>
        <br/>
        <input type="button" className="btn btn-lg btn-primary btn-block" value="Submit" onClick={login}/>
        <p className="mt-5 mb-3 text-muted">&copy; Developed by <a href="https://github.com/sunshine55?tab=repositories">sunshine55</a></p>
    </form>
);

export default LoginView;