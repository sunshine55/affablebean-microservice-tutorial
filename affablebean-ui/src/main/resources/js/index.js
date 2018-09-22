import React, {Component} from 'react';
import {render} from 'react-dom';
import CategoryView from "./category";

const JumbotronView = () => (
    <div className="jumbotron">
        <div className="container">
            <h1 className="display-3">Hello, AffableBean!</h1>
            <p>This is a template for a simple marketing or informational website. Use it as a starting point to create something more unique.</p>
        </div>
    </div>
);

const NavbarView = () => (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <a className="navbar-brand" href="#">AffableBean</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsAffableBean"
                aria-controls="navbarsAffableBean" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"/>
        </button>

        <div className="collapse navbar-collapse" id="navbarsAffableBean">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <a className="nav-link" href="#">Cart</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Checkout</a>
                </li>
            </ul>
            <form className="form-inline">
                <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
        </div>
    </nav>
);

class HomeView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <NavbarView/>
                <JumbotronView/>
                <CategoryView/>
            </div>
        );
    }
}

const rootEl = document.getElementById('wrap');
render(<HomeView/>, rootEl);