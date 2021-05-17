import React from 'react'
import Product from './Product/Product'

import styles from './ProductList.module.scss'

const ProductList = () => {
  return (
    <section className={styles.productList}>
      <Product />
      <Product />
      <Product />
    </section>

  )
}

export default ProductList
