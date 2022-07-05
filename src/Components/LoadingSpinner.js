import React, { Component } from 'react';
import '../Styles/LodingSpinner/LoadingSpinner.styles.css';

class LoadingSpinner extends Component {
    render() {
        return (
            <div className='spinner-div'>
                <div className='loading-spinner'></div>
            </div>
        );
    }
}

export default LoadingSpinner;
