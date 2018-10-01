import * as types from '../types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import Jumbotron from '../components/Jumbotron';
import Navbar from '../components/Navbar';
import Category from '../components/Category';
import Item from '../components/Item';
import Cart from '../components/Cart';
import {addCart, clearCart, selectCategory, selectNav, updateQuantity} from '../actions';

class Home extends Component {
    constructor(props) {
        super(props);
        this.categoryActions = {
            selectCategory: this.onCategoryClick.bind(this)
        };
        this.itemActions = {
            selectCategory: this.onCategoryClick.bind(this),
            addCart: this.onAddCartClick.bind(this)
        };
        this.navActions = {
            selectNav: this.onNavClick.bind(this)
        };
        this.cartActions = {
            clearCart: this.onClearCartClick.bind(this),
            updateQuantity: this.onUpdateQuantityClick.bind(this)
        }
    }

    onCategoryClick(e) {
        this.props.dispatch(selectCategory(e.target.id));
    }

    onNavClick(e) {
        this.props.dispatch(selectNav(parseInt(e.target.id)));
    }

    onAddCartClick(e) {
        this.props.dispatch(addCart(e.target.id));
    }

    onClearCartClick() {
        this.props.dispatch(clearCart());
    }

    onUpdateQuantityClick(e) {
        this.props.dispatch(updateQuantity(e.target.name, e.target.value));
    }

    render() {
        let page = null;
        switch (this.props.currentPage) {
            case types.ITEM_PAGE:
                page = (<Item data={this.props.itemData} actions={this.itemActions}/>);
                break;
            case types.CART_PAGE:
                page = (<Cart data={this.props.cartData} actions={this.cartActions}/>);
                break;
            default:
                page = (<Category data={this.props.categoryData} actions={this.categoryActions}/>);
        }

        return (
            <div>
                <Navbar data={this.props.navData} actions={this.navActions}/>
                <Jumbotron/>
                {page}
            </div>
        );
    }
}

export default connect(
    ({currentPage, categoryData, itemData, navData, cartData}) => ({currentPage, categoryData, itemData, navData, cartData})
)(Home);