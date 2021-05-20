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
  // const [id, setId] = useState(0)

  console.log(products)
  console.log('TOOOTAAAALLL: ', total)
  console.log('CAAAARRRTTTT: ', cartItems)

  useEffect(() => {
    setTotal(cartItems.reduce((sum,el) => {
      return sum + el.count*el.price
    }, 0))
  }, [cartItems])

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
      console.log('QTY: ', qty, 'ID: ', item, 'CART ITEMS: ', cartItems)
      const exist = cartItems.find(x=>x.id===item.id)
      if (exist.count!==qty) {
        setCartItems(
          cartItems.map(x =>
            x.id === item.id ? {...item, count: qty} : x)
        )
      }
    }, [cartItems])

  return (
    <div className="App">
      <h1>Checkout page</h1>
      <Main>
        <ProductList 
          products={products}
          addToCart={(id)=>addToCart(id)}
        />
        <ShoppingCart 
          cartItems={cartItems}
          total={total}
          onDelete={(id) => deleteHandler(id)}
          onQuantityInput={(qty, id)=>quantityInputHandler(qty, id)}
        />
      </Main>
    </div>
  );
}

export default App;
