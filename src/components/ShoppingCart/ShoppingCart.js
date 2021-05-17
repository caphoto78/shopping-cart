import React from 'react'
import styles from './ShoppingCart.module.scss'

const ShoppingCart = () => {
  return (
    <section className={styles.shoppingCart}>
      <div className={styles.cartTitle}>
        <h2>Products in your shopping cart</h2>
      </div>

      <table className={styles.cartContent}>
        <thead>
          <tr className={styles.tableHeader}>
            <th>Product</th>
            <th>Quantity</th>
            <th className={styles.right}>Value</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Product number 1</td>
            <td><input type="number" name="quantity" value="1" /></td>
            <td className={styles.right}>$120.00</td>
          </tr>
          <tr>
            <td>Product number 2</td>
            <td><input type="number" name="quantity" value="3" /></td>
            <td className={styles.right}>$120.00</td>
          </tr>
          <tr>
            <td>Product number 2</td>
            <td><input type="number" name="quantity" value="3" /></td>
            <td className={styles.right}>$120.00</td>
          </tr>

        </tbody>

        <tfoot>
          <tr>
            <td colspan="3">Total: $120.00</td>
          </tr>
        </tfoot>

      </table>
      <button className={`${styles.button} ${styles.big}`}>Continue</button>
    </section>
  )
}

export default ShoppingCart
