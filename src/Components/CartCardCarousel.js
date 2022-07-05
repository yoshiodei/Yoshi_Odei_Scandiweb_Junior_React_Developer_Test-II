import React, { Component } from 'react';

class CartCardCarousel extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        const track = document.getElementById(this.props.id);
        const slides = Array.from(track.children);
        const slideWidth = slides[0].getBoundingClientRect().width;
        const setSlidePosition = (slide, index) => {
            slide.style.left = slideWidth * index + 'px';
        }
        slides.forEach(setSlidePosition);
        this.setState({track, slides, slideWidth});
    }

    moveSlideTo = (track, currentSlide, targetSlide) => {
        track.style.transform = 'translateX(-' + targetSlide.style.left + ')'; 
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    }

    moveToNextSlide = () => {
        let currentSlide = this.state.track.querySelector(`.current-slide`);
        let nextSlide = currentSlide.nextElementSibling;

        if(!nextSlide) {
            nextSlide = this.state.slides[0];
            this.moveSlideTo(this.state.track, currentSlide, nextSlide); 
        }
        else{
            this.moveSlideTo(this.state.track, currentSlide, nextSlide);
        }
    }

    moveToPreviousSlide = () => {
        let currentSlide = this.state.track.querySelector(`.current-slide`);
        let prevSlide = currentSlide.previousElementSibling;
        if(!prevSlide) {
            prevSlide = this.state.slides[this.state.slides.length-1];
            this.moveSlideTo(this.state.track, currentSlide, prevSlide);
        }
        else{    
            this.moveSlideTo(this.state.track, currentSlide, prevSlide);
        }
    }

    render() {
        const {gallery,id} = this.props;
        console.log( 'item id is', id );

        return (
            <div className='cart-card__image-div'>                
                <ul className='cart-card__carousel-track' id={id}>
                    {
                        gallery.map((imageUrl,index) => 
                        (<li 
                            className={(index === 0) ? 'cart-card__carousel-slide current-slide': 'cart-card__carousel-slide'} 
                            key={index}>
                                <img src={imageUrl} className='cart-card__image' />
                        </li>
                        ))
                    }
                </ul>
                {
                    (gallery.length > 1) &&
                    (<div className='cart-card__image-nav-div'>
                        <div className='cart-card__image-nav cart-card__image-nav--left'
                            onClick={this.moveToPreviousSlide}
                        ><p>&lt;</p></div>
                        <div className='cart-card__image-nav cart-card__image-nav--right'
                            onClick={this.moveToNextSlide}
                        ><p>&gt;</p></div>
                    </div>)
                 }
            </div>
        );
    }
}

export default CartCardCarousel;
