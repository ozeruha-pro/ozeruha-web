import React from 'react'
import { InputNumber, Space } from 'antd'

export const InputNumbers = ({ square, setSquare, height, setHeight }) => {
  return (
    <Space align="center" wrap>
      <InputNumber
        type="number"
        size="large"
        style={{ maxWidth: '300px' }}
        addonBefore="Площа&nbsp;&nbsp;&nbsp;"
        addonAfter="м2"
        value={square}
        onChange={setSquare}
      />
      <InputNumber
        type="number"
        size="large"
        style={{ maxWidth: '300px' }}
        addonBefore="Товщина"
        addonAfter="см"
        value={height}
        onChange={setHeight}
        min={4}
        max={25}
      />
    </Space>
  )
}
