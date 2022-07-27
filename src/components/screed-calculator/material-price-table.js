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
  {
    title: 'Примітки',
    dataIndex: 'note',
    key: 'note',
  },
]

export const MaterialPriceTable = ({ materialPriceObj }) => {
  const data = Object.values(materialPriceObj).map((item, i) => ({
    key: String(i),
    name: item.name,
    price: `${item.price} грн/${item.unit}`,
    note: item.note,
  }))
  return (
    <Table
      title={() => <b>{`Ціна на матеріали`}</b>}
      columns={columns}
      dataSource={data}
      pagination={false}
      showHeader={false}
      scroll={{ x: 600 }}
      bordered
    />
  )
}
