import React, { Component } from 'react';
import CartCard from '../Components/CartCard';
import CartTotal from '../Components/CartTotal';
import { connect } from 'react-redux';
import '../Styles/Cart/Cart.styles.css';

class CartPage extends Component {
    constructor(props){
        super(props);
    } 

    componentDidMount(){
        document.title = 'Junior Developer Test | Cart';
    }

    render() {
        const {cartItems, currencyLabel} = this.props;

        return (
            <div className='cart'>
                <h1 className='cart__header'>CART</h1>
                <section className='cart-section'>
                    {
                        cartItems.map(cartItem => (
                            <CartCard cartItem={cartItem} currencyLabel={currencyLabel}/>
                        ))   
                    }
                    
                    <CartTotal />
                </section>
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

const mapDispatchToProps = {};

export default connect(mapStateToProps,mapDispatchToProps)(CartPage);
