import React from 'react'
import Product from './Product/Product'

import styles from './ProductList.module.scss'

const ProductList = (props) => {
  
const products = () => {
  if (props.products) {
  return props.products
    .sort((a, b) => b.price - a.price)
    .map((product, index) => {
     return (
       <Product 
         product={product}
         currency={props.currency}
         rates={props.rates}
         key={index}
         addToCart={(item)=>props.addToCart(item)}
       />
     )
   })
  }
}

  return (
    <section className={styles.productList}>
      {products()}
    </section>

  )
}

export default ProductList
