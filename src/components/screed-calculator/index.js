import React, { useState, useEffect } from 'react'
import { Row, Statistic, Card } from 'antd'
import { useStaticQuery, graphql } from 'gatsby'
import get from 'lodash/get'
import { InputNumbers } from './input-numbers'
import {
  calcWorkPriceByM2,
  calcWorkWithMaterialsPriceByM2,
  roundTwoDecimal,
} from './utils'
import { MaterialAmountTable } from './material-amount-table'
import CalculatorForm from './form'

import * as styles from './index.module.css'

export const ScreedCalculator = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulScreedPrice {
        nodes {
          workPriceByM2
          workPriceWithMaterialsByM2
          minWorkPrice
        }
      }
    }
  `)

  const [screedPrice] = get(data, 'allContentfulScreedPrice.nodes')

  const [square, setSquare] = useState(100)
  const [height, setHeight] = useState(8)

  const [workPriceSum, setWorkPriceSum] = useState()
  const [workPriceM2, setWorkPriceM2] = useState(
    calcWorkPriceByM2({
      height,
      square,
      basePrice: screedPrice.workPriceByM2,
      smallObjectPrice: screedPrice.minWorkPrice,
    })
  )
  const [workPriceWithMaterialsSum, setWorkPriceWithMaterialsSum] = useState()

  const [activeTabKey1, setActiveTabKey1] = useState('tab1')

  const onTab1Change = (key) => {
    setActiveTabKey1(key)
  }

  useEffect(() => {
    const workPrice = calcWorkPriceByM2({
      height,
      square,
      basePrice: screedPrice.workPriceByM2,
      smallObjectPrice: screedPrice.minWorkPrice,
    })
    const workPriceWithMaterials = calcWorkWithMaterialsPriceByM2({
      height,
      basePrice: screedPrice.workPriceWithMaterialsByM2,
    })

    setWorkPriceM2(workPrice)
    setWorkPriceSum(roundTwoDecimal(square * workPrice))
    setWorkPriceWithMaterialsSum(
      roundTwoDecimal(square * workPriceWithMaterials)
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
        <Row className={styles.priceItems}>
          <Statistic
            title="Робота за м²"
            value={workPriceM2}
            formatter={(value) => value}
            suffix="грн/м²"
            className={styles.priceItem}
          />
          <Statistic
            title="Робота"
            value={workPriceSum}
            formatter={(value) => value}
            suffix="грн"
            className={styles.priceItem}
          />

          <Statistic
            title="Робота з матеріалами"
            value={square >= 100 ? workPriceWithMaterialsSum : '—'}
            formatter={(value) => value}
            suffix="грн/м²"
            className={styles.priceItem}
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
        <MaterialAmountTable height={height} square={square} />
        <br />
        <br />
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
      <CalculatorForm
        square={square}
        height={height}
        workPriceSum={workPriceSum}
        workPriceWithMaterialsSum={workPriceWithMaterialsSum}
      />
    </>
  )
}
