import React from 'react';

const NavBar = ({logout}) => (
    <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
        <span className="navbar-brand col-md-2 mr-0"/>
        <input className="form-control form-control-dark w-100" type="text" placeholder="Search"/>
        <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap" onClick={logout}>
                <a className="nav-link">Sign Out</a>
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

const DashboardView = ({logout}) => (
    <div>
        <NavBar logout={logout}/>
        <div className="container-fluid">
            <div className="row">
                <SideBar/>
                <main role="main" className="col-md-9 col-lg-10 ml-sm-auto pt-3 px-4"/>
            </div>
        </div>
    </div>
);

export default DashboardView;