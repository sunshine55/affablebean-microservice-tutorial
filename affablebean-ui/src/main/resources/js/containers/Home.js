import * as types from '../types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import Jumbotron from '../components/Jumbotron';
import Navbar from '../components/Navbar';
import Category from '../components/Category';
import Item from '../components/Item';
import {selectCategory} from '../actions';

class Home extends Component {
    constructor(props) {
        super(props);
        this.categoryActions = {
            selectCategory: this.onCategoryClick.bind(this)
        };
        this.itemActions = {
            selectCategory: this.onCategoryClick.bind(this)
        };
    }

    onCategoryClick(e) {
        this.props.dispatch(selectCategory(e.target.id));
    }

    render() {
        let page = null;
        switch (this.props.currentPage) {
            case types.ITEM_PAGE:
                page = (<Item data={this.props.itemData} actions={this.itemActions}/>);
                break;
            default:
                page = (<Category data={this.props.categoryData} actions={this.categoryActions}/>);
        }

        return (
            <div>
                <Navbar/>
                <Jumbotron/>
                {page}
            </div>
        );
    }
}

export default connect(
    ({currentPage, categoryData, itemData}) => ({currentPage, categoryData, itemData})
)(Home);