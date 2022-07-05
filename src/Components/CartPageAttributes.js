import React, { Component } from 'react';

class CartPageAttributes extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const {attribute, selectedAttribute} = this.props;
        const isSwatch = (attribute.type === 'swatch');

        return (
            <>
                { !isSwatch && 
                    ( <div className='cart-card__attribute-div' key={attribute.id}>
                            <h4 className='cart-card__header'>{attribute.name}:</h4>
                            <div className='cart-card__attribute-inner-div'>
                            {attribute.items.map( item => (
                                <div 
                                    className={(selectedAttribute[attribute.name] === item.displayValue) ? 'cart-card__attribute cart-card__attribute--selected' : 'cart-card__attribute'}>
                                    <h6 className='cart-card__attribute-text' key={item.id}>
                                        {item.value}
                                    </h6>
                                </div>
                            ))
                            }
                            </div>
                        </div>
                    )
                }
                { isSwatch && 
                        (<div className='cart-card__color-div'>
                            <h4 className='cart-card__header'>COLOR:</h4>
                            <div className='cart-card__color-inner-div'>
                                { attribute.items.map((item,index) => (
                                <div 
                                    className={(selectedAttribute[attribute.name] === item.displayValue) ? 'cart-card__color cart-card__color--selected' : 'cart-card__color'}
                                    title={item.displayValue} 
                                    style={{backgroundColor: item.value}} 
                                    key={index}>
                                </div>
                                ))}
                            </div>
                        </div>)
                }           
            </>
        );
    }
}

export default CartPageAttributes;
