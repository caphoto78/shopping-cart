import React from 'react'
import styles from './Product.module.scss'

const Product = (props) => {
  return (
    <div className={styles.product}>
      <p className={styles.productName}>Product number 1</p>
      <p className={styles.productPrice}>Price: <span>$120.00</span></p>
      <button className={styles.button}>
        <img src="/src/assets/shopping-cart.svg" />
          Add to Cart
      </button>
    </div>
  )
}

export default Product
