import { useState } from 'react'
import styles from '../styles/Display.module.css'

function Display({ pool }) {

  return (
    <div className={styles.display}>
      {pool.map((item) => {
          return (
            <div className={styles.card} key={item.id}>
              <img src={item.gif} alt={item.name} />
              <div>{item.name}</div>
            </div>
          )
        })
      }
    </div>
  )
}
export default Display