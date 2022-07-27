import React from 'react'
import { Table } from 'antd'

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
    title: 'Примітки',
    dataIndex: 'note',
    key: 'note',
  },
]

export const MaterialAmountTable = ({ square, height, materialPriceObj }) => {
  const data = Object.values(materialPriceObj).map((item, i) => {
    const amount = item.amount(square, height)

    return {
      key: String(i),
      name: item.name,
      amount: amount ? `${amount} ${item.amountUnit}` : item.amountUnit,
      note: item.note,
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
