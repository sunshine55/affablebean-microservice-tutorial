import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Category from './Category';
import Item from './Item';
import Jumbotron from '../components/Jumbotron';
import Navbar from '../components/Navbar';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const page = (this.props.currentPage === 'category' ? <Category/> : <Item/>);
        return (
            <div>
                <Navbar/>
                <Jumbotron/>
                {page}
            </div>
        );
    }
}

Home.propTypes = {
    currentPage: PropTypes.string.isRequired
};

export default connect(
    ({currentPage}) => ({currentPage})
)(Home);