import React from 'react'
import styles from './ShoppingCart.module.scss'
import TableBody from './TableBody/TableBody'
import { changeCurrSymbols } from '../../helper'

const ShoppingCart = (props) => {

  const { cartItems } = props



  const productsAddedToCart = cartItems.map((prod, index) => {
    return (
      <TableBody
        key={index}
        prod={prod}
        currency={props.currency}
        rates={props.rates}
        onDelete={(payload) => props.onDelete(payload)}
        onQuantityInput={(qty, id) => props.onQuantityInput(qty, id)}
      ></TableBody>
    )
  })

  const handleContinue = () => {
    alert(JSON.stringify(cartItems, null, 4))
  }

  const shoppincCart = () => {
    if (cartItems.length > 0) {
      return (
        <section className={styles.shoppingCart}>
          <div className={styles.cartTitle}>
            <h2>Products in your shopping cart</h2>
          </div>

          <table className={styles.cartContent}>
            <thead>
              <tr className={styles.tableHeader}>
                <th>Remove</th>
                <th>Product</th>
                <th>Quantity</th>
                <th className={styles.right}>Value</th>
              </tr>
            </thead>

            {productsAddedToCart}

            <tfoot>
              <tr>
                <td colSpan="4">Total: {changeCurrSymbols(`${props.currency}`)}{props.total.toFixed(2)}</td>
              </tr>
            </tfoot>

          </table>
          <button
            className={`${styles.button} ${styles.big}`}
            onClick={handleContinue}
          >Continue</button>
        </section>
      )
    } else {
      return (
        <section className={styles.shoppingCart}>
          <div className={styles.cartTitle}>
            <h2>No products in your shopping cart</h2>
          </div>
        </section>
      )
    }
  }

  return (
    shoppincCart()
  )
}

export default ShoppingCart
