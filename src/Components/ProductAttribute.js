import React, { Component } from 'react';

class ProductAttribute extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        const attributeGroup = document.getElementsByClassName(`attribute__${this.props.attribute.id}`);
        this.setState({attributeGroup})
    }

    selectAttribute = (e, name , value) => {
        for(let attribute of this.state.attributeGroup){
            attribute.classList.remove('product-detail__attribute--selected');}
            e.target.classList.add('product-detail__attribute--selected');

            let attributeObject = {[name]: value}
            this.props.changeAttributeValue(attributeObject);
    }

    selectColorAttribute = (e, name , value) => {
        for(let attribute of this.state.attributeGroup){
            attribute.classList.remove('product-detail__color--selected'); }
            e.target.classList.add('product-detail__color--selected');

            let attributeObject = {[name]: value}
            this.props.changeAttributeValue(attributeObject);
    }
    
    render() {
        const {attribute} = this.props;
        const isSwatch = (attribute.type === 'swatch');

        return (
            <div className='product-detail__attribute-div' key={this.props.index}>
                {!isSwatch && (
                <>    
                    <h4 className='product-detail__header'>{attribute.name}:</h4>    
                    <div className='product-detail__attribute-inner-div'>
                        {attribute.items.map((item,index) => (
                            <div className={(index === 0) ? 
                                `product-detail__attribute product-detail__attribute--selected attribute__${attribute.id}` : 
                                `product-detail__attribute attribute__${attribute.id}`} 
                                key={index} onClick={(e) => this.selectAttribute(e,attribute.name, item.displayValue) } >
                                {item.value}
                            </div>
                        ))}
                    </div>
                </>
                )}
                {isSwatch && (
                    <>
                        <h4 className='product-detail__header'>{attribute.name}:</h4>
                        <div className='product-detail__color-inner-div'>
                            { attribute.items.map((item,index) => (
                                <div className={(index === 0) ? 
                                    `product-detail__color product-detail__color--selected attribute__${attribute.id}`:
                                    `product-detail__color attribute__${attribute.id}`} 
                                     title={item.displayValue} 
                                     style={{backgroundColor: item.value}} 
                                     key={index} onClick={(e) => this.selectColorAttribute(e,attribute.name, item.displayValue) } >
                                </div>
                            ))}
                        </div>
                    </>
                   )}
            </div>
        );
    }
}

export default ProductAttribute;
