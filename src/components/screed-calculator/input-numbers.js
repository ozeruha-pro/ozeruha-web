import React from 'react'
import { InputNumber } from 'antd'
import * as styles from './input-numbers.module.css'

export const InputNumbers = ({ square, setSquare, height, setHeight }) => {
  return (
    <div className={styles.inputsWrapper}>
      <div className={styles.inputWrapper}>
        <InputNumber
          type="number"
          size="large"
          className={styles.inputNumber}
          addonBefore="Площа&nbsp;&nbsp;&nbsp;"
          addonAfter="м²"
          value={square}
          onChange={setSquare}
        />
      </div>
      <div className={styles.inputWrapper}>
        <InputNumber
          type="number"
          size="large"
          className={styles.inputNumber}
          addonBefore="Товщина"
          addonAfter="см"
          value={height}
          onChange={setHeight}
          min={4}
          max={25}
        />
      </div>
    </div>
  )
}
