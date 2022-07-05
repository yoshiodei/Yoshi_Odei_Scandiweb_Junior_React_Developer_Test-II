import React, { Component } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from '../Navigation/Navbar';
import CartPage from '../Pages/CartPage';
import CategoryPage from '../Pages/CategoryPage';
import PageNotFound from '../Pages/PageNotFound';
import ProductDetailPage from '../Pages/ProductDetailPage';

class RoutesList extends Component {

    render() {
        return (
            <Router>
                <Navbar />
                <Routes>
                    <Route path='/' element={<CategoryPage />} />
                    <Route path='/products/:id' element={<ProductDetailPage />} />
                    <Route path='/cart' element={<CartPage />} />
                    <Route path='*' element={<PageNotFound />} />
                </Routes>
            </Router>    
        );
    }
}

export default RoutesList;
