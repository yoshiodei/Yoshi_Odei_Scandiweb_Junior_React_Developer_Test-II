import React, { Component } from 'react';
import '../Styles/Nav/Nav.styles.css';
import { Link } from 'react-router-dom';
import logo from '../Assets/logo.svg';
import cart from '../Assets/cart.svg';
import arrow from '../Assets/arrow.svg';
import CartModalCard from '../Components/CartModalCard';
import CurrencySwitcher from '../Components/CurrencySwitcher';
import {connect} from 'react-redux';
import CartModalTotal from '../Components/CartModalTotal';
import { updateCartList, changeCurrency } from '../Redux/action';


class Navbar extends Component {

    constructor(props){
            super(props);
    }

    componentDidMount() {
        const cartItem = window.sessionStorage.getItem('cartItem');
        const currency = window.sessionStorage.getItem('currency');
        if(cartItem) this.props.updateCartList(JSON.parse(cartItem));
        if(currency) this.props.changeCurrency(JSON.parse(currency));

        const [cartOverlayModal] = document.getElementsByClassName('navbar__cart-overlay-div');
        const [currencySwitcherCaret] = document.getElementsByClassName('navbar__button-icon');
        const [currencySwitcher] = document.getElementsByClassName('navbar__currency-switcher-div');
        this.setState({cartOverlayModal, currencySwitcher, currencySwitcherCaret});
    }

    toggleModal = () => {
        this.state.currencySwitcher.classList.remove('navbar__currency-switcher-div--show');
        this.state.cartOverlayModal.classList.toggle('navbar__cart-overlay-div--show');
        this.state.currencySwitcherCaret.classList.remove('navbar__button-icon--open');
    }

    toggleCurrencySwitcher = () => {
        this.state.cartOverlayModal.classList.remove('navbar__cart-overlay-div--show');
        this.state.currencySwitcherCaret.classList.toggle('navbar__button-icon--open');
        this.state.currencySwitcher.classList.toggle('navbar__currency-switcher-div--show');
    }

    preventPropagation = (e) => {
        if(e.target === this.state.cartOverlayModal) this.toggleModal();
    }

    render() {
        const { cartItems,currencyLabel } = this.props;

        return (
            <nav className='navbar'>
               <ul className='navbar__list'>
                   <li className='navbar__list-item navbar__list-item--active'>ALL</li>
                   <li className='navbar__list-item'>CLOTHES</li>
                   <li className='navbar__list-item'>TECH</li>
               </ul>

               <Link to="/" className='navbar__logo'>
                    <img src={logo} alt='logo'/> 
               </Link> 

               <div className='navbar__icons' >
                    <div className='navbar__currency-button' onClick={this.toggleCurrencySwitcher}>
                       <p>{currencyLabel.symbol}</p>
                       <img src={arrow} className='navbar__button-icon' alt='caret' />
                    </div>
                    <div className='navbar__cart-button' onClick={this.toggleModal}>
                        <div className='navbar__cart-button-badge'>
                            <p className='navbar__cart-button-badge-text'>{cartItems.length}</p>
                        </div>
                       <img src={cart} className='navbar__button-icon' alt='cart' />
                    </div>
               </div>

               <CurrencySwitcher toggleCurrencySwitcher={this.toggleCurrencySwitcher} />

               <div className='navbar__cart-overlay-div' onClick={(e) => this.preventPropagation(e)}>
                    <div className='navbar__cart-overlay-modal'>
                        <h3 className='navbar__modal-title'><span className='navbar__modal-title navbar__modal-title--boldened'>
                            My Bag, </span> {cartItems.length} {`item${(cartItems.length > 1)? 's':''}`}
                        </h3>
                            {(cartItems.length !== 0) ?
                                <>{(cartItems.map(item => (
                                    <CartModalCard item={item} />
                                )))
                                }<CartModalTotal /></> :
                                <h3 className='navbar__cart-empty-header'>Cart is Empty</h3>
                            }
                        <div className='navbar__modal-button-div'>
                            <Link to='/cart' className='navbar__modal-button' onClick={this.toggleModal}>VIEW BAG</Link>
                            <button className='navbar__modal-button navbar__modal-button--green'onClick={this.toggleModal}>CHECK OUT</button>
                        </div>
                    </div>
               </div>
            </nav>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        cartItems : state.cartItems,
        currencyLabel : state.currency
     }
}

const mapDispatchToProps = { updateCartList, changeCurrency }

export default connect(mapStateToProps,mapDispatchToProps)(Navbar);
