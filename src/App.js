import React, { useState, useEffect, useCallback } from 'react'
import './App.scss';
import Main from './components/Main/Main'
import ProductList from './components/ProductList/ProductList';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import axios from 'axios';

const App = () => {

  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [total, setTotal] = useState(0)
  const [currency, setCurrency] = useState('USD')
  const [rates, setRates] = useState({})


  const API_KEY = process.env.REACT_APP_API_KEY;
  
  const getCurrency = useCallback(async () => {
    try {
      let response = await axios.get(`http://data.fixer.io/api/latest?access_key=${API_KEY}`)
      const filtered = Object.keys(response.data.rates)
                              .filter(key => ['USD', 'EUR', 'GBP'].includes(key))
                              .reduce((obj, key) => {
                                obj[key] = response.data.rates[key];
                                return obj
                              }, {})
      setRates({USD: 1, EUR: filtered.EUR/filtered.USD, GBP: filtered.GBP/filtered.USD})
    }
    catch (error) {
      console.log('Error', error);
    }
  }, [API_KEY])

  useEffect(() => {
    getCurrency()
  }, [getCurrency])

  

  const flexibleTotal = (curr) => {
    return setTotal(cartItems.reduce((sum,el) => {
      return sum + el.count*el.price*rates[curr]
    }, 0))
  }
  
  useEffect(() => {
   flexibleTotal(currency)
  }, [cartItems, currency])

  //GET THE PRODUCTS FROM THE EXTERNAL API
  const getProducts = useCallback(async () => {
    try {
      let response = await axios.get('http://private-32dcc-products72.apiary-mock.com/product')
      setProducts(response.data
        .map(item => {
        return {
          ...item,
          count: 0,
        }
      })
      )
    }
    catch (error) {
      console.log('Error', error);
    }
  }, [])

    useEffect(() => {
      getProducts()
    }, [getProducts])

    //  ********** HANDLE ADD TO CART BUTTON ************
  const addToCart = (item) => {
    const productToAdd = products.filter(product => product.id === item.id)
    setCartItems(prevState => [...prevState, {...productToAdd[0], count: 1}])
    setProducts(prevState => prevState.filter(product => product.id!==item.id))
  }

  // ********** HANDLE DELETE FROM CART ************
  const deleteHandler = (id) => {
    const productToRemove = cartItems.filter(product => product.id === id)
    setProducts(prevState => [...prevState, {...productToRemove[0], count: 0}])
    setCartItems(prevState => prevState.filter(product => product.id!==id))
  }
    
    const quantityInputHandler = useCallback((qty, item) => {
      const exist = cartItems.find(x=>x.id===item.id)
      if (exist.count!==qty) {
        setCartItems(
          cartItems.map(x =>
            x.id === item.id ? {...item, count: qty} : x)
        )
      }
    }, [cartItems])

    const handleCurrencySelector = (e) => {
      setCurrency(e.target.value)
    }

  return (
    <div className="App">
      <div className="header">
        <h1>Checkout page</h1>
        <select
          name="currency"
          id="currency"
          value={currency}
          onChange={handleCurrencySelector}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </select>
      </div>
      <Main>
        <ProductList 
          products={products}
          currency={currency}
          rates={rates}
          addToCart={(id)=>addToCart(id)}
        />
        <ShoppingCart 
          cartItems={cartItems}
          total={total}
          currency={currency}
          rates={rates}
          onDelete={(id) => deleteHandler(id)}
          onQuantityInput={(qty, id)=>quantityInputHandler(qty, id)}
        />
      </Main>
    </div>
  );
}

export default App;
