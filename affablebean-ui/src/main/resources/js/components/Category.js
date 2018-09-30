import React from 'react';
import PropTypes from 'prop-types';

const Category = ({data, actions}) => {
    const cols = data.map(datum => (
        <div key={datum.id} className="col-md-3">
            <div className="card md-3 box-shadow">
                <img id={datum.id} className="card-img-top" src={datum.imgUrl} onClick={actions.selectCategory}/>
                <div className="card-body">
                    <h4>{datum.name}</h4>
                </div>
            </div>
        </div>
    ));
    return (
        <div className="container">
            <div className="row">{cols}</div>
        </div>
    )
};

Category.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        imgUrl: PropTypes.string
    })),
    actions: PropTypes.shape({
        selectCategory: PropTypes.func
    })
};

export default Category;