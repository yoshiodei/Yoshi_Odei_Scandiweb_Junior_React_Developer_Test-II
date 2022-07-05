import React, { Component } from 'react';

class CartModalAttribute extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const {attribute, selectedAttribute} = this.props;
        const isSwatch = (attribute.type === 'swatch');

        return (
            <>
            {
            !isSwatch && 
            (<div className='modal-card__attribute-div' key={attribute.id}>
                <h4 className='modal-card__attribute-header'>{attribute.name}:</h4>
                <div className='modal-card__attribute-inner-div'>
                    {attribute.items.map( item => (
                        <div 
                            className={(selectedAttribute[attribute.name] === item.displayValue) ? 'modal-card__attribute modal-card__attribute--selected' : 'modal-card__attribute'} 
                            key={item.id}>
                            <p>{item.value}</p>
                        </div>
                    ))
                    }
                </div>
            </div>)
            }
            {isSwatch &&
             (<div className='modal-card__color-div' key={attribute.id}>
                <h4 className='modal-card__color-header'>{attribute.name}:</h4>
                <div className='modal-card__color-inner-div'>
                    { attribute.items.map((item,index) => (
                        <div
                            className={(selectedAttribute[attribute.name] === item.displayValue) ? 'modal-card__color modal-card__color--selected' : 'modal-card__color'} 
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

export default CartModalAttribute;
