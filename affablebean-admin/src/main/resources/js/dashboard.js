import React from 'react';
import {Link} from 'react-router-dom';

const NavBar = () => (
    <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
        <span className="navbar-brand col-md-2 mr-0"><Link to="/admin">AffableBean Admin</Link></span>
        <input className="form-control form-control-dark w-100" type="text" placeholder="Search"/>
        <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap">
                <span className="nav-link"><Link to="/admin/logout">Sign out</Link></span>
            </li>
        </ul>
    </nav>
);

const SideBar = () => (
    <nav className="col-md-2 d-none d-md-block bg-light sidebar">
        <div className="sidebar-sticky">
            <ul className="nav flex-column">
                <li className="nav-item">
                    <span className="nav-link">
                        <i className="fas fa-th-large"/><Link to="/admin/category"> Category Management</Link>
                    </span>
                </li>
                <li className="nav-item">
                    <span className="nav-link">
                        <i className="fas fa-list"/><Link to="/admin/item"> Item Management</Link>
                    </span>
                </li>
            </ul>
        </div>
    </nav>
);

const DashboardView = () => (
    <div>
        <NavBar/>
        <div className="container-fluid">
            <div className="row">
                <SideBar/>
                <main role="main" className="col-md-9 col-lg-10 ml-sm-auto pt-3 px-4"/>
            </div>
        </div>
    </div>
);

export default DashboardView;