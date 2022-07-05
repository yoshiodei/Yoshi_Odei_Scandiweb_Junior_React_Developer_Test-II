import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../Styles/CartModalCard/CartModalCard.styles.css';
import CartModalAttribute from './CartModalAttribute';
import { updateCartList } from '../Redux/action';

class CartModalCard extends Component {
    constructor(props){
        super(props)
    }

    addToQuantity = (id) => {
        let newCartList = this.props.cartItems.map(cartItem => (cartItem.id !== id ? cartItem : {...cartItem, quantity: ++cartItem.quantity}) )
        this.props.updateCartList(newCartList);
    }

    subtractFromQuantity = (item) => {
        if(item.quantity > 1) {
            let newCartList = this.props.cartItems.map(cartItem => (cartItem.id !== item.id ? cartItem : {...cartItem, quantity: --cartItem.quantity}) )
            this.props.updateCartList(newCartList);
        }
        else {
            let newCartList = this.props.cartItems.filter( cartItem => cartItem.id !== item.id );
            this.props.updateCartList(newCartList);
        }
    }

    render() {
        const {item, currencyLabel} = this.props;
        const price = item.prices?.find(item => item.currency.label === currencyLabel.label)
        console.log(currencyLabel);
        return (
            <div className='modal-card'>
                <div className='modal-card__details-div'>
                    <div className='modal-card__name-div'>
                        <h3 className='modal-card__name'>{item.brand}</h3>
                        <h3 className='modal-card__name' >{item.name}</h3>
                    </div>

                    <div className='modal-card__price-div'>
                        <h3 className='modal-card__price'>{`${price?.currency?.symbol}${price?.amount}`}</h3>
                    </div>

                    {
                        item?.attributes?.map(attribute => (
                            <CartModalAttribute attribute={attribute} selectedAttribute={item.selectedAttribute} />
                        ))    
                    }
        
                </div>
                <div className='modal-card__item-div'>
                    <div className='modal-card__counter-div'>
                        <div className='modal-card__counter-button' onClick={() => this.addToQuantity(item.id)}>
                            <p className='modal-card__counter-button-text'>+</p>
                        </div>

                        <div className='modal-card__counter-value'>
                            <p className='modal-card__counter-text'>{item.quantity}</p>
                        </div>

                        <div className='modal-card__counter-button' onClick={()=> this.subtractFromQuantity(item)}>
                            <p className='modal-card__counter-button-text'>-</p>
                        </div>
                    </div>

                    <div className='modal-card__image-div'>
                        <div className='modal-card__image-nav-div'>
                            <img src={item.gallery[0]} className='modal-card__image' alt='product' />
                            <div className='modal-card__image-nav'></div>
                            <div className='modal-card__image-nav'></div>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CartModalCard);
