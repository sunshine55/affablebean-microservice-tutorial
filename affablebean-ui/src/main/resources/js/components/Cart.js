import React from 'react';
import PropTypes from 'prop-types';

const Cart = ({data, actions}) => {
    let total = 0;
    let rows = [];
    Object.keys(data).forEach(key => {
        const datum = data[key];
        const subtotal = parseFloat((datum.price * datum.quantity).toFixed(10));
        total += subtotal;
        rows.push(
            <tr key={key}>
                <td><img src={datum.imgUrl}/></td>
                <td>{datum.name}</td>
                <td>{datum.price}</td>
                <td>
                    <form className="form-inline">
                        <div className="form-group">
                            <input type="button" name={key} value="-" className="btn btn-outline-secondary mr-sm-2" onClick={actions.updateQuantity}/>
                            <span className="badge badge-info mr-sm-2">{datum.quantity}</span>
                            <input type="button" name={key} value="+" className="btn btn-outline-primary" onClick={actions.updateQuantity}/>
                        </div>
                    </form>
                </td>
                <td>{subtotal}</td>
            </tr>
        );
    });

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <div className="jumbotron">
                        <h4>{`Total: ${parseFloat(total.toFixed(10))}`}</h4>
                        <button className="btn btn-danger" onClick={actions.clearCart}>Clear Cart</button>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="table-responsive-md">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>{rows}</tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

Cart.propTypes = {
    data: PropTypes.object,
    actions: PropTypes.shape({
        clearCart: PropTypes.func,
        updateQuantity: PropTypes.func
    })
};

export default Cart;