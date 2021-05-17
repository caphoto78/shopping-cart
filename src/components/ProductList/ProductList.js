import React from 'react'
import Product from './Product/Product'

import styles from './ProductList.module.scss'

const ProductList = (props) => {

  const products = props.products
    .sort((a, b) => b.price - a.price)
    .map(product => {
    return (
      <Product 
        product={product}
        key={product.id}
      />
    )
  })

  return (
    <section className={styles.productList}>
      {products}
    </section>

  )
}

export default ProductList
