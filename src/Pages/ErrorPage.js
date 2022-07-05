import React, { Component } from 'react';
import '../Styles/ErrorScreens/ErrorScreens.css';

class ErrorPage extends Component {
    render() {
        return (
            <section>
                <div className='page-load-error'>
                    <h1>Error Loading Page!</h1>
                    <h2>Try checking if database is running.</h2>
                    <h3 onClick={()=> window.location.reload()}>Reload</h3>
                </div>
            </section>
        );
    }
}

export default ErrorPage;
