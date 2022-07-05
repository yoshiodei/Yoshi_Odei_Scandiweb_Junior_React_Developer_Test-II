import React, { Component } from 'react';
import '../Styles/ErrorScreens/ErrorScreens.css';
import { Link } from 'react-router-dom'; 
import LoadingSpinner from '../Components/LoadingSpinner';

class PageNotFound extends Component {
    render() {
        return (
            <section>
                <div className='page-not-found'>
                    <h1>Page Not Found!</h1>
                    <Link to="/">
                        <h3>Go Back To Home Page</h3>
                    </Link>
                </div>
                
            </section>
        );
    }
}

export default PageNotFound;
