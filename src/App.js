import React, { useState, useEffect, useCallback } from 'react'
import './App.scss';
import Main from './components/Main/Main'
import ProductList from './components/ProductList/ProductList';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import axios from 'axios';

const App = () => {

  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [total, setTotal] = useState(0)
  const [qty, setQty] = useState(1)

  //HANDLE ADD TO CART BUTTON
  const addToCart = (id) => {
    const productToAdd = products.filter(product => product.id === id)
    setCart(prevState => [...prevState, productToAdd[0]])
    setProducts(prevState => prevState.filter(product => product.id!==id))
    setTotal(prevState => prevState+(productToAdd[0].price*qty))
    console.log('qty ', qty)
  }

/*   const getTotal = () => {
    const prices = cart.map(item => item.price*qty)
    console.log(prices)
    if (cart.length !== 0) {
      setTotal(prices.reduce((acc, val)=> {
        return acc + val
      }))
    }
  }

  useEffect(() => {
    getTotal()
  }, [getTotal]) */

  //GET THE PRODUCTS FROM THE EXTERNAL API
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

    const deleteHandler = (id) => {
      const productToRemove = cart.filter(product => product.id === id)
      setProducts(prevState => [...prevState, productToRemove[0]])
      setCart(prevState => prevState.filter(product => product.id!==id))
      setTotal(prevState => prevState-(productToRemove[0].price*qty))
    }

    const quantityInputHandler = (qty) => {
      setQty(qty)
    }


  return (
    <div className="App">
      <h1>Checkout page</h1>
      <Main>
        <ProductList 
          products={products}
          addToCart={(id)=>addToCart(id)}
        />
        <ShoppingCart 
          cart={cart}
          total={total}
          onDelete={(id) => deleteHandler(id)}
          onQuantityInput={(qty)=>quantityInputHandler(qty)}
          qty={qty}
        />
      </Main>
    </div>
  );
}

export default App;
