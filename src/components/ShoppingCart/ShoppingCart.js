import React from 'react'
import styles from './ShoppingCart.module.scss'
import TableBody from './TableBody/TableBody'

const ShoppingCart = (props) => {


  const productsAddedToCart = props.cart.map((prod, index) => {
    return (
      <TableBody
        key={index}
        prod={prod}
        onDelete={(payload)=>props.onDelete(payload)}
      ></TableBody>
    )
  })

  const shoppincCart = () => {
    if (props.cart.length!==0) {
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
                <td colSpan="4">Total: ${props.total.toFixed(2)}</td>
              </tr>
            </tfoot>

          </table>
          <button className={`${styles.button} ${styles.big}`}>Continue</button>
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
