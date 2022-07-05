import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../Styles/CartTotal/CartTotal.styles.css';

class CartTotal extends Component {
    constructor(props){
        super(props);

        this.state = {
            tax: 0.21
        }
    }

    render() {        
        const {tax} = this.state;
        const {cartItems:items,currencyLabel} = this.props;

        const quantity = items.reduce((acc,item) => ( acc + item.quantity ),0);
        const netTotal = items.reduce((acc,item) => ( acc + (item.prices[currencyLabel.index].amount * item.quantity) ),0);
        const taxTotal = netTotal*tax;
        const grossTotal = netTotal + taxTotal;
         
        
        return (
            <div className='cart-total'>
                <div className='cart-total__text-div'>
                    <p className='cart-total__text'>{`Tax ${tax*100}%:`}</p>
                    <p className='cart-total__text cart-total__text--boldened'>{`${currencyLabel.symbol}${taxTotal.toFixed(2)}`}</p>
                    <p className='cart-total__text'>Quantity:</p>
                    <p className='cart-total__text cart-total__text--boldened'>{quantity}</p>
                    <p className='cart-total__text'>Total:</p>
                    <p className='cart-total__text cart-total__text--boldened'>{`${currencyLabel.symbol}${grossTotal.toFixed(2)}`}</p>
                </div>
                <button className='cart-total__button'>ORDER</button>
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


export default connect(mapStateToProps)(CartTotal);
