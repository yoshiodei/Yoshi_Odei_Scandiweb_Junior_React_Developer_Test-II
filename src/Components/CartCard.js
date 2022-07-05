import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCartList } from '../Redux/action';
import '../Styles/CartCard/CartCard.styles.css';
import CartCardCarousel from './CartCardCarousel';
import CartPageAttributes from './CartPageAttributes';

class CartCard extends Component {
    constructor(props){
        super(props);
    }

    addToQuantity = (id) => {
        let newCartList = this.props.cartItems.map(cartItem => (
            cartItem.id !== id ? cartItem : {...cartItem, quantity: ++cartItem.quantity}
            ));
        this.props.updateCartList(newCartList);
    }

    subtractFromQuantity = (item) => {
        if(item.quantity > 1) {
            let newCartList = this.props.cartItems.map(
                cartItem => (cartItem.id !== item.id ? cartItem : {...cartItem, quantity: --cartItem.quantity}
                    ));
            this.props.updateCartList(newCartList);
        }
        else {
            let newCartList = this.props.cartItems.filter( cartItem => cartItem.id !== item.id );
            this.props.updateCartList(newCartList);
        }
    }

    render() {
        const {cartItem, currencyLabel} = this.props;
        const price = cartItem.prices?.find(price => price.currency.label === currencyLabel.label)
        
        return (
            <div className='cart-card'>
                <div className='cart-card__details-div'>
                    <div className='cart-card__left-div'>
                        <div className='cart-card__product-title-div'>
                            <h2 className='cart-card__product-name cart-card__product-name--boldened'>{cartItem.brand}</h2>
                            <h2 className='cart-card__product-name'>{cartItem.name}</h2>
                        </div>

                        <div className='cart-card__price-div'>
                            <p className='cart-card__price'>{`${price?.currency?.symbol}${price?.amount}`}</p>
                        </div>

                        {
                        cartItem?.attributes?.map(attribute => (
                            <CartPageAttributes attribute={attribute} selectedAttribute={cartItem.selectedAttribute} />
                        ))    
                        }

                    </div>
                    
                    <div className='cart-card__right-div'>
                        <div className='cart-card__counter-div'>
                            <div className='cart-card__counter-button' onClick={() => this.addToQuantity(cartItem.id)}>
                                <p className='cart-card__counter-button-text'>+</p>
                            </div>
                            <div className='cart-card__counter-value'>
                                <p className='cart-card__counter-text'>{cartItem.quantity}</p>
                            </div>
                            <div className='cart-card__counter-button' onClick={()=> this.subtractFromQuantity(cartItem)}>
                                <p className='cart-card__counter-button-text' >-</p>
                            </div>
                        </div>

                        <CartCardCarousel gallery={cartItem.gallery} id={cartItem.id}  />

                    </div>
                </div>
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

const mapDispatchToProps = { updateCartList };

export default connect(mapStateToProps, mapDispatchToProps)(CartCard);
