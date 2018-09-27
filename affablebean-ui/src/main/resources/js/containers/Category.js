import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {data: this.props.categoryData}
    }

    render() {
        let cols = [];
        this.state.data.forEach(datum => {
            cols.push(
                <div key={datum.id} className="col-md-3">
                    <div className="card md-3 box-shadow">
                        <img className="card-img-top" src={datum.imgUrl}/>
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
    categoryData: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string,
        imgUrl: PropTypes.string
    }).isRequired
};

export default connect(
    ({categoryData}) => ({categoryData})
)(Category);