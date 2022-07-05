import React, { Component } from 'react';
import CategoryCard from '../Components/CategoryCard';
import '../Styles/Category/Category.styles.css';
import { GET_ALL_PRODUCTS } from '../EndPointQueries/queries';
import { Query } from "@apollo/client/react/components";
import ErrorPage from './ErrorPage';
import LoadingSpinner from '../Components/LoadingSpinner';

class CategoryPage extends Component {
    render() {
        return (
            <div className='category'>
                
                
                    <Query query={GET_ALL_PRODUCTS}>
                        {({loading, data, error}) => {
                            if(loading) return <LoadingSpinner />
                            if(error) return <ErrorPage />
                            const {products} = data.category;
                            return (
                                <>
                                <h1 className='category__header'>All</h1>
                                <section className='card-section'>
                                    {products.map(product => (
                                    <CategoryCard product={product} />
                                )) }
                            </section>
                            </>
                            )
                            }
                        }
                    </Query>
            </div>
        );
    }
}

export default CategoryPage;
