import React, { Component } from 'react';
import '../Styles/Products/Products.styles.css';
import { GET_PRODUCT_DETAIL } from '../EndPointQueries/queries';
import { Query } from "@apollo/client/react/components";
import ProductAttribute from '../Components/ProductAttribute';
import { connect } from 'react-redux';
import { addToCart } from '../Redux/action';
import ErrorPage from './ErrorPage';
import LoadingSpinner from '../Components/LoadingSpinner';

class ProductDetailPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            image: '',
        }

        this.list = {}
} 

    componentDidMount(){
        document.title = 'Junior Developer Test | Product Detail';
    }

    addProductToCart = (product) => {
        let {selectedAttribute} = this.state;
        let newProductId = product.id;
        for(let key in selectedAttribute){
            newProductId += `${key}${selectedAttribute[key]}`
        }
        let foundItemInCart = this.props.cartItems.find(item => item.id == newProductId);

        if(!foundItemInCart){
            let cartProduct = {...product, quantity: 1, id: newProductId, selectedAttribute};
            this.props.addToCart(cartProduct);
        } 
    }

    changeAttributeValue = (attributeObject) => {
        let attributeSelect = {selectedAttribute: {...this.state.selectedAttribute, ...attributeObject}};
        console.log('attributeObject', attributeSelect);
        this.setState(attributeSelect)
    }

    

    render() {
        const {currencyLabel} = this.props; 

        return (
            <>
                <Query query={GET_PRODUCT_DETAIL} 
                       variables={{ product_id: window.location.pathname.split('/')[2] }}
                       onCompleted={(data) =>
                            // this.setState({ attributesList : data.product.attributes })
                            
                            data.product.attributes.forEach(attribute => {
                                // this.list.push({[attribute.name] : attribute.items[0].displayValue})
                                this.list = { ...this.list , [attribute.name] : attribute.items[0].displayValue}
                                this.setState({selectedAttribute: this.list})
                            })
                            

                       }>
                        {({loading, data, error}) => {
                            if(loading) return <LoadingSpinner />
                            if(error) return <ErrorPage />
                            const {product} = data;
                            const price = product.prices?.find(price => price.currency.label === currencyLabel.label);
                            return ( 
                                <section className='products'>
                                    <div className='products__product-tile'>
                                        <div className='products__alternative-product-div'>
                                            { (product.gallery.length > 1) &&
                                                product.gallery.map((image,index)=>
                                                    (
                                                        <div key={index} className='products__alternative-image-div' onClick={() => this.setState({image})} >
                                                            <img src={image} alt='product' className='products__alternative-image' />
                                                        </div>
                                                    )
                                                )
                                            }
                                        </div>
                                        <div className='products__main-product-div'>
                                            <img src={(this.state.image !== '') ? this.state.image : product.gallery[0] } alt='product' className='products__main-product-image'/>   
                                        </div>
                                    </div>
                                    <div className='product-detail'>
                                        <div className='product-detail__product-title-div'>
                                            <h2 className='product-detail__product-name product-detail__product-name--boldened'>{product.brand}</h2>
                                            <h2 className='product-detail__product-name'>{product.name}</h2>
                                        </div>

                                        {
                                            product.attributes.map((attribute,index) => (
                                                <ProductAttribute 
                                                    attribute={attribute}   
                                                    index={index} 
                                                    changeAttributeValue={this.changeAttributeValue}
                                                    // addToSelectedAttribute={this.addToSelectedAttribute} 
                                                    />
                                            ))
                                        }

                                        <div className='product-detail__price-div'>
                                            <h4 className='product-detail__header'>PRICE:</h4>
                                            <p className='product-detail__price'>{`${price?.currency?.symbol}${price?.amount}`}</p>
                                        </div>

                                        <button className='product-detail__submit-button' onClick={()=> this.addProductToCart(product)}>ADD TO CART</button>

                                        <div className='product-detail__dscription-div'
                                             dangerouslySetInnerHTML={{ __html: product.description}} >  
                                        </div>
                                    </div>
                                </section>
                             )                         
                            }
                        }
                    </Query>
            </>
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

export default connect(mapStateToProps,mapDispatchToProps)(ProductDetailPage);
