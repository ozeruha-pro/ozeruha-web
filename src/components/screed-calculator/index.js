import React, { useState, useEffect } from 'react'
import { Table, Button, Col, Row, Statistic, Card } from 'antd'
import { MaterialPriceTable } from './material-price-table'
import { InputNumbers } from './input-numbers'

const roundTwoDecimal = num => Math.round(num * 100) / 100

const materialCalculationColumns = [
  {
    title: 'Назва',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <b>{text}</b>,
  },
  {
    title: 'Кількість',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Одиниця кількості',
    dataIndex: 'unit',
    key: 'unit',
  },
  {
    title: 'Ціна',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Валюта',
    dataIndex: 'currency',
    key: 'currency',
  },
]

const MATERIALS_PRICE = {
  SAND: {
    name: 'Пісок',
    price: 400,
    unit: 'грн/т',
  },
  CEMENT: {
    name: 'Цемент',
    price: 122.3,
    unit: 'грн/шт',
  },
  FIBER: {
    name: 'Фібра',
    price: 200,
    unit: 'грн/уп',
  },
  SOFTENER: {
    name: 'Пластифікатор',
    price: 350,
    unit: 'грн/кан',
  },
  DAMPER_TAPE: {
    name: 'Демпферна лєнта',
    price: 460,
    unit: 'грн/рул',
  },
}

export const ScreedCalculator = () => {
  const [square, setSquare] = useState(118)
  const [height, setHeight] = useState(8)

  const [workPriceSum, setWorkPriceSum] = useState()
  const [workPriceM2, setWorkPriceM2] = useState(110)
  const [materialPriceSum, setMaterialPriceSum] = useState()
  const [materialPriceM2, setMaterialPriceM2] = useState()

  const [materialPriceTableData, setMaterialTableData] = useState([])

  const [activeTabKey1, setActiveTabKey1] = useState('tab1')

  const onTab1Change = (key) => {
    setActiveTabKey1(key)
  }

  useEffect(() => {
    const workPrice = workPriceM2
    const materialPriceData = [
      {
        key: '1',
        name: MATERIALS_PRICE.SAND.name,
        amount: roundTwoDecimal((square * height / 100) * 1.6),
        price: roundTwoDecimal((square * height / 100) * 1.6 * MATERIALS_PRICE.SAND.price),
        unit: 'т',
        currency: 'грн',
      },
      {
        key: '2',
        name: MATERIALS_PRICE.CEMENT.name,
        amount: roundTwoDecimal((square * height * 0.01 / 0.17) * 1.05),
        price: roundTwoDecimal((square * height * 0.01 / 0.17) * 1.05 * MATERIALS_PRICE.CEMENT.price),
        unit: 'т',
        currency: 'грн',
      },
      {
        key: '3',
        name: MATERIALS_PRICE.FIBER.name,
        amount: roundTwoDecimal(square / 500),
        price: roundTwoDecimal((square / 500) * MATERIALS_PRICE.FIBER.price),
        unit: 'т',
        currency: 'грн',
      },
      {
        key: '4',
        name: MATERIALS_PRICE.SOFTENER.name,
        amount: roundTwoDecimal(square / 300),
        price: roundTwoDecimal((square / 300) * MATERIALS_PRICE.SOFTENER.price),
        unit: 'т',
        currency: 'грн',
      },
      {
        key: '5',
        name: MATERIALS_PRICE.DAMPER_TAPE.name,
        amount: roundTwoDecimal(square / 300),
        price: roundTwoDecimal(MATERIALS_PRICE.DAMPER_TAPE.price),// check
        unit: 'т',
        currency: 'грн',
      },
      {
        key: '6',
        name: 'Доставка',
        amount: roundTwoDecimal((square / 100)),
        price: roundTwoDecimal((square / 100) * 700),
        unit: 'шт',
        currency: 'грн',
      },
    ]
    const materialPriceSum = materialPriceData.reduce((sum, item) => sum + item.price, 0)

    setWorkPriceM2(workPrice)
    setWorkPriceSum(square * workPrice)
    setMaterialTableData(materialPriceData)
    setMaterialPriceSum(roundTwoDecimal(materialPriceSum))
    setMaterialPriceM2(roundTwoDecimal(materialPriceSum / square))
  }, [square, height])

  const tabList = [
    {
      key: 'tab1',
      tab: 'Ціна',
    },
    {
      key: 'tab2',
      tab: 'Матеріали',
    },
  ]

  const contentList = {
    tab1: <div>
      <InputNumbers
        square={square}
        setSquare={setSquare}
        height={height}
        setHeight={setHeight}
      />
      <br />
      <br />
      <Row gutter={16}>
        <Col span={12}>
          <Statistic title='Робота' value={workPriceSum} suffix='грн' />
        </Col>
        <Col span={12}>
          <Statistic title='Робота за м2' value={workPriceM2} suffix='грн/м2' />
        </Col>
        <Col span={12}>
          <Statistic title='Матеріали' value={materialPriceSum} suffix='грн/м2' />
        </Col>
        <Col span={12}>
          <Statistic title='Матеріали за м2' value={materialPriceM2} suffix='грн/м2' />
        </Col>
        <Col span={12}>
          <Statistic title='Ціна за роботу та матеріали за м2' value={materialPriceM2 + workPriceM2} suffix='грн/м2' />
        </Col>
      </Row>
    </div>,
    tab2: <div>
      <Table columns={materialCalculationColumns} dataSource={materialPriceTableData} pagination={false}
             showHeader={false} bordered
             title={() => `Матеріали необхідні для вашої стяжки ${square} м2 товщиною ${height} см`} />
      <br /><br />
      <MaterialPriceTable materialPriceObj={MATERIALS_PRICE} />
    </div>,
  }

  return (
    <>
      <Card
        style={{ width: '100%' }}
        title='Калькулятор'
        extra={<a href='#'>Більше?</a>}
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={key => {
          onTab1Change(key)
        }}
      >
        {contentList[activeTabKey1]}
      </Card>
      <br /> <br />
      <Button type='primary' key='console'>
        Відправити розрахунки прорабу
      </Button>
      <br /> <br />
    </>
  )
}
