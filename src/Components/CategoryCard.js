import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import cart_white from '../Assets/cart_white.svg'
import '../Styles/CategoryCard/CategoryCard.styles.css';
import { addToCart } from '../Redux/action'; 

class CategoryCard extends Component {
    constructor(props){
        super(props);
    }

    addProductToCart = (product) =>{
        let cartProduct = {...product, quantity: 1};
        let foundItemInCart = this.props.cartItems.find(item => item.id == product.id);
        if(!foundItemInCart && !product.attributes.length) this.props.addToCart(cartProduct);
    }


    render() {
        const {product,currencyLabel} = this.props; 
        const price = product.prices?.find(price => price.currency.label === currencyLabel.label)
        return (
            <div className='card-div'>
                <Link  to={(product.inStock) ? `products/${product.id}` : `/`}  className='card' key={product.id} >
                    <div className='card__image-div'>
                        <img src={product.gallery[0]} alt='product' className='card__image' />
                    </div>
                    <div className="card__text-div">
                        <p className="card__item-name">{product.name}</p>
                        <p className="card__item-price">{`${price?.currency?.symbol}${price?.amount}`}</p>
                    </div>
                    { !product.inStock && <div className='card__out-of-stock'><h2>OUT OF STOCK</h2></div>}
                </Link>
                { 
                    product.inStock && <div className='card-div__button-div' onClick={()=> this.addProductToCart(product)}>
                            <img src={cart_white} alt="cart" className="card__button-image" />    
                    </div>
                }
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

const mapDispatchToProps = { addToCart };

export default connect(mapStateToProps, mapDispatchToProps)(CategoryCard);
