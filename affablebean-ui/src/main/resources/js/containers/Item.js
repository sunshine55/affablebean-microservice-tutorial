import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class Item extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let cols = [];
        this.props.itemData.forEach(datum => cols.push(<p key={datum.id}>{datum.name}</p>));
        return (<div>{cols}</div>);
    }
}

Item.propTypes = {
    itemData: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string,
        price: PropTypes.number,
        imgUrl: PropTypes.string,
        categoryId: PropTypes.string.isRequired
    })).isRequired
};

export default connect(
    ({itemData}) => ({itemData})
)(Item);