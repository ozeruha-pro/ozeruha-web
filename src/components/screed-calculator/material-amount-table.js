import React from 'react'
import { Table } from 'antd'
import { roundTwoDecimal } from './utils'

const columns = [
  {
    title: 'Назва',
    dataIndex: 'name',
    key: 'name',
    render: (text) => text,
  },
  {
    title: 'Кількість',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Ціна',
    dataIndex: 'price',
    key: 'price',
  },
]

export const MaterialAmountTable = ({ square, height, materialPriceObj }) => {
  const data = Object.values(materialPriceObj).map((item, i) => {
    const amount = item.amount(square, height)

    return {
      key: String(i),
      name: item.shortName,
      amount: `${amount} ${item.amountUnit}`,
      price: `${roundTwoDecimal(amount * item.price)} грн`,
    }
  })

  return (
    <Table
      title={() => (
        <b>{`Матеріали необхідні для вашої стяжки ${square} м2 товщиною ${height} см`}</b>
      )}
      columns={columns}
      dataSource={data}
      pagination={false}
      showHeader={false}
      scroll={{ x: 400 }}
      bordered
    />
  )
}
