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
    title: 'Примітки',
    dataIndex: 'note',
    key: 'note',
  },
]

const MATERIAL_DATA = {
  SAND: {
    name: 'Пісок річковий митий крупнозернистий',
    note: "Пісок має бути ОБОВ'ЯЗКОВО: КРУПНОЗЕРНИСТИЙ, МИТИЙ, РІЧКОВИЙ",
    amountUnit: 'т',
    amount: (square, height) =>
      roundTwoDecimal(((square * height) / 100) * 1.6),
  },
  CEMENT: {
    name: 'Цемент М500 25кг',
    note: 'ЗЕКОНОМИТЕ на цементі - ми вам ПЕРЕРОБИМО! ЗА ВАШ КОШТ!',
    amountUnit: 'шт',
    amount: (square, height) =>
      Math.round(((square * height * 0.01) / 0.17) * 1.1),
  },
  FIBER: {
    name: 'Фібра поліпропіленова В12 900гр',
    note: null,
    amountUnit: 'шт',
    amount: (square) => Math.ceil(square / 100),
  },
  SOFTENER: {
    name: 'Пластифікатор для теплої підлоги',
    note: "Якщо, у вас тепла підлога - то обов'язково купіть ПЛАСТИФІКАТОР для теплої підлоги!",
    amountUnit: 'л',
    amount: (square) => Math.ceil(square / 50),
  },
  DAMPER_TAPE: {
    name: 'Стрічка демпферна 150мм*50м*8мм',
    note: null,
    amountUnit:
      'Поміряйте довжину периметр всіх приміщень вашого будинку і розділіть на 50 м/рул',
    amount: () => undefined,
  },
  DELIVERY: {
    name: 'Доставка',
    note: 'Доставка цементу, фібри, пластифікатору та стрічки демпферної. Якщо вага цементу більша 2-х тонн - то доцільніше замовити централізовану доставку з будівельного магазину маніпулятором',
    amountUnit: 'грузовий(х) бус(ів)',
    amount: (square, height) =>
      Math.ceil(Math.round(((square * height * 0.01) / 0.17) * 1.1) / 80),
  },
}

export const MaterialAmountTable = ({ square, height }) => {
  const data = Object.values(MATERIAL_DATA).map((item, i) => {
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
