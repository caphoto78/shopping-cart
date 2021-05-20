import React from 'react'
import styles from './Product.module.scss'

const Product = (props) => {

  const handleAddToCart = () => {
      props.addToCart(props.product)
  }

  return (
    <div className={styles.product}>
      <p className={styles.productName}> {props.product.name} </p>
      <p className={styles.productPrice}>Price: <span>${props.product.price}</span></p>
      <button onClick={handleAddToCart} className={styles.button}>
        <i className="fas fa-cart-plus"></i>
          Add to Cart
      </button>
    </div>
  )
}

export default Product
