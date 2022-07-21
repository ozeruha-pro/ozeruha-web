import React, { useState, useEffect } from 'react'
import { Button, Row, Statistic, Card } from 'antd'
import { MaterialPriceTable } from './material-price-table'
import { InputNumbers } from './input-numbers'
import { roundTwoDecimal } from './utils'
import { MaterialAmountTable } from './material-amount-table'

const MATERIALS_PRICE = {
  SAND: {
    name: 'Пісок',
    price: 400,
    unit: 'т',
    amountUnit: 'т',
    amount: (square, height) =>
      roundTwoDecimal(((square * height) / 100) * 1.6),
  },
  CEMENT: {
    name: 'Цемент',
    price: 122.3,
    unit: 'шт',
    amountUnit: 'т',
    amount: (square, height) =>
      roundTwoDecimal(((square * height * 0.01) / 0.17) * 1.05),
  },
  FIBER: {
    name: 'Фібра',
    price: 200,
    unit: 'уп',
    amountUnit: 'т',
    amount: (square) => roundTwoDecimal(square / 500),
  },
  SOFTENER: {
    name: 'Пластифікатор',
    price: 350,
    unit: 'кан',
    amountUnit: 'т',
    amount: (square) => roundTwoDecimal(square / 300),
  },
  DAMPER_TAPE: {
    name: 'Демпферна лєнта',
    price: 460,
    unit: 'рул',
    amountUnit: 'т',
    amount: (square) => roundTwoDecimal(square / 300),
  },
  DELIVERY: {
    name: 'Доставка',
    price: 700,
    unit: 'шт',
    amountUnit: 'шт',
    amount: (square) => roundTwoDecimal(square / 100),
  },
}

export const ScreedCalculator = () => {
  const [square, setSquare] = useState(118)
  const [height, setHeight] = useState(8)

  const [workPriceSum, setWorkPriceSum] = useState()
  const [workPriceM2, setWorkPriceM2] = useState(110)
  const [materialPriceSum, setMaterialPriceSum] = useState()
  const [materialPriceM2, setMaterialPriceM2] = useState()

  const [activeTabKey1, setActiveTabKey1] = useState('tab1')

  const onTab1Change = (key) => {
    setActiveTabKey1(key)
  }

  useEffect(() => {
    const workPrice = workPriceM2
    const materialPriceSum = Object.values(MATERIALS_PRICE).reduce(
      (sum, item) => sum + item.amount(square, height) * item.price,
      0
    )

    setWorkPriceM2(workPrice)
    setWorkPriceSum(roundTwoDecimal(square * workPrice))
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
    tab1: (
      <div>
        <InputNumbers
          square={square}
          setSquare={setSquare}
          height={height}
          setHeight={setHeight}
        />
        <br />
        <br />
        <Row>
          <Statistic
            title="Робота"
            value={workPriceSum}
            formatter={(value) => value}
            suffix="грн"
            style={{ margin: '16px 24px 16px 4px' }}
          />
          <Statistic
            title="Робота за м2"
            value={workPriceM2}
            formatter={(value) => value}
            suffix="грн/м2"
            style={{ margin: '16px 24px 16px 4px' }}
          />
          <Statistic
            title="Матеріали"
            value={materialPriceSum}
            formatter={(value) => value}
            suffix="грн/м2"
            style={{ margin: '16px 24px 16px 4px' }}
          />
          <Statistic
            title="Матеріали за м2"
            value={materialPriceM2}
            formatter={(value) => value}
            suffix="грн/м2"
            style={{ margin: '16px 24px 16px 4px' }}
          />
          <Statistic
            title="Ціна за роботу та матеріали за м2"
            value={roundTwoDecimal(materialPriceM2 + workPriceM2)}
            formatter={(value) => value}
            suffix="грн/м2"
            style={{ margin: '16px 24px 16px 4px' }}
          />
        </Row>
      </div>
    ),
    tab2: (
      <div>
        <InputNumbers
          square={square}
          setSquare={setSquare}
          height={height}
          setHeight={setHeight}
        />
        <br />
        <br />
        <MaterialAmountTable
          materialPriceObj={MATERIALS_PRICE}
          height={height}
          square={square}
        />
        <br />
        <br />
        <MaterialPriceTable materialPriceObj={MATERIALS_PRICE} />
      </div>
    ),
  }

  return (
    <>
      <Card
        style={{ width: '100%' }}
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={(key) => {
          onTab1Change(key)
        }}
      >
        {contentList[activeTabKey1]}
      </Card>
      <br /> <br />
      <Button type="primary" key="console">
        Відправити розрахунки прорабу
      </Button>
      <br /> <br /> <br />
    </>
  )
}
