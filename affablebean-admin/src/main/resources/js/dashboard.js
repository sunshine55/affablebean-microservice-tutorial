import React, {Component} from 'react';
import CategoryView from './category';
import ItemView from './item';

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

const SideBar = ({select}) => (
    <nav className="col-md-2 d-none d-md-block bg-light sidebar">
        <div className="sidebar-sticky">
            <ul className="nav flex-column">
                <li className="nav-item">
                    <a name="category" className="nav-link" onClick={select}><i className="fas fa-th-large"/> Category Management</a>
                </li>
                <li className="nav-item">
                    <a name="item" className="nav-link" onClick={select}><i className="fas fa-list"/> Item Management</a>
                </li>
            </ul>
        </div>
    </nav>
);

export default class DashboardView extends Component{
    constructor(props) {
        super(props);
        this.state = {selected: <CategoryView/>};
        this.onSelect = this.onSelect.bind(this);
    }

    onSelect(e) {
        switch (e.target.name) {
            case 'category':
                this.setState({selected: <CategoryView/>});
                break;
            case 'item':
                this.setState({selected: <ItemView/>});
                break;
            default:
                this.setState({selected: null})
        }
    }

    render() {
        return (
            <div>
                <NavBar logout={this.props.logout}/>
                <div className="container-fluid">
                    <div className="row">
                        <SideBar select={this.onSelect}/>
                        <main role="main" className="col-md-9 col-lg-10 ml-sm-auto pt-3 px-4">{this.state.selected}</main>
                    </div>
                </div>
            </div>
        );
    }
}