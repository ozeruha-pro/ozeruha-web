import React from 'react'
import { Table } from 'antd'


const materialColumns = [
  {
    title: 'Назва',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <b>{text}</b>,
  },
  {
    title: 'Ціна',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Одиниця кількості',
    dataIndex: 'unit',
    key: 'unit',
  },
]

export const MaterialPriceTable = ({ materialPriceObj }) => {
  const data = Object.values(materialPriceObj).map((item, i) => ({
    key: String(i),
    name: item.name,
    price: item.price,
    unit: item.unit,

  }))
  return (
    <Table
      title={() => 'Ціна на матеріали'}
      columns={materialColumns}
      dataSource={data}
      pagination={false}
      showHeader={false}
      bordered
    />
  )
}