import React, { Component } from 'react';
import { connect } from 'react-redux';

class CartModalTotal extends Component {
    render() {
    const {cartItems, currencyLabel} = this.props;
    const total = cartItems.reduce((acc,item) => ( acc + (item.prices[currencyLabel.index].amount * item.quantity) ),0);
        return (
            <div className='navbar__modal-total'>
                <h4>Total</h4>
                <h4>{`${currencyLabel.symbol}${total.toFixed(2)}`}</h4>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        cartItems : state.cartItems,
        currencyLabel : state.currency
    }
}

export default connect(mapStateToProps)(CartModalTotal);
