import React, {Component} from 'react';

const NavBar = () => (
    <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
        <a className="navbar-brand col-md-2 mr-0">AffableBean Admin</a>
        <input className="form-control form-control-dark w-100" type="text" placeholder="Search"/>
        <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap">
                <a className="nav-link" href="#">Sign out</a>
            </li>
        </ul>
    </nav>
);

const SideBar = () => (
    <nav className="col-md-2 d-none d-md-block bg-light sidebar">
        <div className="sidebar-sticky">
            <ul className="nav flex-column">
                <li className="nav-item">
                    <a className="nav-link"><i className="fas fa-th-large"/> Category Management</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link"><i className="fas fa-list"/> Item Management</a>
                </li>
            </ul>
        </div>
    </nav>
);

class AppView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return null;
    }
}