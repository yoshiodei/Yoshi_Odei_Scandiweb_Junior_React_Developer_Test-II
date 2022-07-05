import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Routes from './Routes/Routes';
import { ApolloProvider ,ApolloClient, InMemoryCache } from "@apollo/client";
import { Provider } from 'react-redux';
import { store } from './Redux/store';

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(), 
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>  
          <Routes />
      </Provider>      
    </ApolloProvider>
  </React.StrictMode>
);


