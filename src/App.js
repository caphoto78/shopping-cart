import React, { useState, useEffect, useCallback } from 'react'
import './App.scss';
import Main from './components/Main/Main'
import ProductList from './components/ProductList/ProductList';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import axios from 'axios';

const App = () => {

  const [products, setProducts] = useState({})

  const getProducts = useCallback(async () => {
    try {
      let response = await axios.get('http://private-32dcc-products72.apiary-mock.com/product')
      setProducts(response.data)
    }
    catch (error) {
      console.log('Error', error);
    }
  }, [])

    useEffect(() => {
      getProducts()
    }, [getProducts])


  return (
    <div className="App">
      <h1>Checkout page</h1>
      <Main>
        <ProductList 
          products={products}
        />
        <ShoppingCart />
      </Main>
    </div>
  );
}

export default App;
