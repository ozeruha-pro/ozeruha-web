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
    title: 'Ціна',
    dataIndex: 'price',
    key: 'price',
  },
]

export const MaterialPriceTable = ({ materialPriceObj }) => {
  const data = Object.values(materialPriceObj).map((item, i) => ({
    key: String(i),
    name: item.name,
    price: `${item.price} грн/${item.unit}`,
  }))
  return (
    <Table
      title={() => <b>{`Ціна на матеріали`}</b>}
      columns={columns}
      dataSource={data}
      pagination={false}
      showHeader={false}
      bordered
    />
  )
}
