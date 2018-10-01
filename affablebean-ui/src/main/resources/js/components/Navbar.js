import React from 'react';
import PropTypes from 'prop-types';

const Navbar = ({data, actions}) => {
    let navItems = [];
    data.navItems.forEach((datum, idx) => {
        let css = (data.currentNav === idx ? 'nav-item active' : 'nav-item');
        let badge = datum === 'Cart' ? (<span className="badge badge-pill badge-light">{data.cartQuantity}</span>) : null;
        navItems.push(
            <li key={`nav-${idx}`} className={css}>
                <div id={idx} className="nav-link c-pointer" onClick={actions.selectNav}>{datum} {badge}</div>
            </li>
        );
    });
    return (
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <span id="-1" className="navbar-brand c-pointer" onClick={actions.selectNav}>AffableBean</span>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">{navItems}</ul>
                <form className="form-inline">
                    <input className="form-control mr-sm-2" type="text" placeholder="Search"/>
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </nav>
    );
};

Navbar.propTypes = {
    data: PropTypes.shape({
        currentNav: PropTypes.number,
        navItems: PropTypes.array,
        cartQuantity: PropTypes.number
    }),
    actions: PropTypes.shape({
        selectNav: PropTypes.func
    })
};

export default Navbar;