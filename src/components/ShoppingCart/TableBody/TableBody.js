import React, {useState, useEffect} from 'react'
import styles from './TableBody.module.scss'
import {changeCurrSymbols} from '../../../helper'

const TableBody = (props) => {

  console.log('PROPS PROD COUNT:::', props.prod.count)
  
  const [isShown, setIsShown] = useState(false)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    props.onQuantityInput(quantity, props.prod)
    
  }, [quantity, props])

  const handleMouseEnter = () => {
      setIsShown(true)
  }

  const handleMouseLeave = () => {
    setIsShown(false)
  }

  const handleDelete = () => {
      props.onDelete(props.prod.id)
  }

  const quantityHandler = (e) => {
    setQuantity(e.target.value)
  }

  const productPrice = (cur) => {
    return (props.prod.price*props.rates[cur]).toFixed(2)
  }

  return (
    <tbody>
      <tr>
        <td className={styles.remove}>
          <i 
            className="far fa-trash-alt"
            onClick={handleDelete}
          ></i>
        </td>
        <td className={styles.product}>
          {props.prod.name}
          {props.prod.description && <i 
            className="fas fa-info-circle"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          ></i>}
          <div className={isShown ? styles.bubble : styles.hidden}>
            <p>{props.prod.description}</p>
          </div>
        </td>
        <td>
          <input 
            type="number"
            name="quantity"
            min="0"
            value={props.prod.count}
            onChange={(e)=>quantityHandler(e)}
          />
        </td>
        <td className={styles.right}>
          {props.prod.count} x {changeCurrSymbols(`${props.currency}`)}{productPrice(`${props.currency}`)}
        </td>
      </tr>
    </tbody>
  )
}

export default TableBody
