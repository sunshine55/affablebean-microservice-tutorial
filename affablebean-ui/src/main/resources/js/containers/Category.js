import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {selectCategory} from '../actions';

class Category extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        this.props.dispatch(selectCategory(e.target.id));
    }

    render() {
        let cols = [];
        this.props.categoryData.forEach(datum => {
            cols.push(
                <div key={datum.id} className="col-md-3">
                    <div className="card md-3 box-shadow">
                        <img id={datum.id} className="card-img-top" src={datum.imgUrl} onClick={this.onClick}/>
                        <div className="card-body">
                            <h4>{datum.name}</h4>
                        </div>
                    </div>
                </div>
            );
        });
        return (
            <div className="container">
                <div className="row">{cols}</div>
            </div>
        );
    }
}

Category.propTypes = {
    categoryData: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string,
        imgUrl: PropTypes.string
    })).isRequired
};

export default connect(
    ({categoryData}) => ({categoryData})
)(Category);