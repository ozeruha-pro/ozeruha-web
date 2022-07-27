import React, { useState, useEffect } from 'react'
import { Row, Statistic, Card, Alert } from 'antd'
import { MaterialPriceTable } from './material-price-table'
import { InputNumbers } from './input-numbers'
import { calcWorkPriceByM2, roundTwoDecimal } from './utils'
import { MaterialAmountTable } from './material-amount-table'
import { useMaterialPriceMap } from './get-price'

const BASE_PRICE_BY_M2 = 110
const SMALL_OBJECT_PRICE = 9000

export const ScreedCalculator = () => {
  const materialPrice = useMaterialPriceMap()

  const [square, setSquare] = useState(100)
  const [height, setHeight] = useState(8)

  const [workPriceSum, setWorkPriceSum] = useState()
  const [workPriceM2, setWorkPriceM2] = useState(
    calcWorkPriceByM2({
      height,
      square,
      basePrice: BASE_PRICE_BY_M2,
      smallObjectPrice: SMALL_OBJECT_PRICE,
    })
  )
  const [materialPriceSum, setMaterialPriceSum] = useState()
  const [materialPriceM2, setMaterialPriceM2] = useState()

  const [activeTabKey1, setActiveTabKey1] = useState('tab1')

  const onTab1Change = (key) => {
    setActiveTabKey1(key)
  }

  useEffect(() => {
    const workPrice = calcWorkPriceByM2({
      height,
      square,
      basePrice: BASE_PRICE_BY_M2,
      smallObjectPrice: SMALL_OBJECT_PRICE,
    })
    const materialPriceSum = Object.values(materialPrice).reduce(
      (sum, item) => sum + item.amount(square, height) * item.price,
      0
    )

    setWorkPriceM2(workPrice)
    setWorkPriceSum(roundTwoDecimal(square * workPrice))
    setMaterialPriceSum(roundTwoDecimal(materialPriceSum))
    setMaterialPriceM2(
      square > 0 ? roundTwoDecimal(materialPriceSum / square) : 0
    )
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
        <Row>
          <Statistic
            title="Робота за м2"
            value={workPriceM2}
            formatter={(value) => value}
            suffix="грн/м2"
            style={{ margin: '16px 24px 16px 4px' }}
          />
          <Statistic
            title="Робота"
            value={workPriceSum}
            formatter={(value) => value}
            suffix="грн"
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
            title="Матеріали"
            value={materialPriceSum}
            formatter={(value) => value}
            suffix="грн/м2"
            style={{ margin: '16px 24px 16px 4px' }}
          />
        </Row>
        <br />
        <Alert
          message="На вартість також впливає дальність розташування об'єкту від Києва!"
          type="warning"
          showIcon
          closable
        />
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
        <MaterialAmountTable
          materialPriceObj={materialPrice}
          height={height}
          square={square}
        />
        <br />
        <br />
        <MaterialPriceTable materialPriceObj={materialPrice} />
      </div>
    ),
  }

  return (
    <>
      <Card
        style={{ width: '100%' }}
        bodyStyle={{ padding: '24px 0' }}
        headStyle={{ padding: '0' }}
        bordered={false}
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={(key) => {
          onTab1Change(key)
        }}
      >
        {contentList[activeTabKey1]}
      </Card>
      {/*<br /> <br />*/}
      {/*<Button type="primary" key="console">*/}
      {/*  Відправити розрахунки прорабу*/}
      {/*</Button>*/}
    </>
  )
}
