import React from 'react';
import PropTypes from 'prop-types';

const Item = ({data, actions}) => {
    const navList = data.categories.map(datum => {
        const css = (data.currentCategory === datum.id) ? 'nav-link active' : 'nav-link';
        return (
            <li key={datum.id} className="nav-item">
                <a id={datum.id} className={css} onClick={actions.selectCategory}>{datum.name}</a>
            </li>
        );
    });

    const tabContent = data.items.map(datum => (
        <div key={datum.id} className="col-md-3">
            <figure className="figure">
                <img id={datum.id} className="figure-img img-fluid rounded" src={datum.imgUrl}/>
                <figcaption className="figure-caption">
                    <p><b>{datum.name}</b></p>
                    <p>{`Price: ${datum.price}`}</p>
                </figcaption>
            </figure>
        </div>
    ));

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <ul className="nav nav-pills flex-column">{navList}</ul>
                </div>
                <div className="col-md-9">
                    <div className="row tab-content">{tabContent}</div>
                </div>
            </div>
        </div>
    );
};

Item.propTypes = {
    data: PropTypes.shape({
        currentCategory: PropTypes.string,
        items: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            price: PropTypes.number,
            imgUrl: PropTypes.string,
            categoryId: PropTypes.string
        })),
        categories: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string
        }))
    }),
    actions: PropTypes.shape({
        selectCategory: PropTypes.func
    })
};

export default Item;