import React from 'react'
import styles from './Main.module.scss'

const Main = (props) => {
  return (
    <main className={styles.contentContainer} {...props}>
      {props.children}
    </main>
  )
}

export default Main
