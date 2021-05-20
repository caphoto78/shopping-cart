import React from 'react'
import styles from './Product.module.scss'
import {changeCurrSymbols} from '../../../helper'

const Product = (props) => {

  const handleAddToCart = () => {
      props.addToCart(props.product)
  }

  const productPrice = (cur) => {
    return (props.product.price*props.rates[cur]).toFixed(2)
  }

  return (
    <div className={styles.product}>
      <p className={styles.productName}> {props.product.name} </p>
      <p className={styles.productPrice}>Price: <span>{changeCurrSymbols(`${props.currency}`)}{productPrice(`${props.currency}`)}</span></p>
      <button onClick={handleAddToCart} className={styles.button}>
        <i className="fas fa-cart-plus"></i>
          Add to Cart
      </button>
    </div>
  )
}

export default Product
