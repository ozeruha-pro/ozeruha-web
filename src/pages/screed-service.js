import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import get from 'lodash/get'

import {
  SmileOutlined,
  SolutionOutlined,
  PhoneOutlined,
  BuildOutlined,
} from '@ant-design/icons'
import { Breadcrumb, PageHeader, Steps, Typography, Divider } from 'antd'

import Seo from '../components/seo'
import Layout from '../components/layout'
import { ScreedCalculator } from '../components/screed-calculator'
import { getUaMonth } from '../utils'

const { Step } = Steps
const { Title } = Typography

function ScreedServiceIndex() {
  const data = useStaticQuery(graphql`
    query {
      allContentfulBanner(filter: { slug: { eq: "screed-calculator" } }) {
        nodes {
          photo {
            gatsbyImageData(
              layout: FULL_WIDTH
              placeholder: BLURRED
              width: 1280
            )
            resize(height: 630, width: 1200) {
              src
            }
          }
        }
      }
    }
  `)

  const [banner] = get(data, 'allContentfulBanner.nodes')

  const now = new Date()
  const title = `Калькулятор cтяжки підлоги онлайн ${getUaMonth(
    now
  )}, ${now.getFullYear()}`

  return (
    <Layout>
      <Seo
        title={title}
        description="Розрахуй ціну роботи та кількість матеріалів необхідних для якісної стяжки самостійно за декілька кліків"
        image={banner.photo.resize.src}
      />

      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>
          {' '}
          <Link to="/">Головна</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Стяжка підлоги</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-content">
        <PageHeader title="Калькулятор cтяжки" style={{ paddingLeft: 0 }} />
        <ScreedCalculator />
        <br />
        <br />
        <br />
        <br />
        <Divider dashed>Шлях до успіху</Divider>
        <br />
        <Steps>
          <Step
            status="finish"
            title="Планування"
            description="Рахуємо об’єм рабіт та кількість матеріалів. Ціну робіт, кількість матеріалів ви можете розрахувати за допомогою мого онлайн калькулятора"
            icon={<SolutionOutlined />}
          />
          <Step
            status="finish"
            title="Знаходимо виконавця"
            description="Роботу та закупку матеріалів можна зробити самостійно, а можна довірити це професіоналам. Відправляйте заявку мені"
            icon={<PhoneOutlined />}
          />
          <Step
            status="finish"
            title="Виконання"
            description="Закупка та  доставка матеріалів. Виконання робіт в заплановані дати"
            icon={<BuildOutlined />}
          />
          <Step
            status="finish"
            title="Готово"
            description="Оплата по факту без додаткових платежів"
            icon={<SmileOutlined />}
          />
        </Steps>
      </div>
    </Layout>
  )
}

export default ScreedServiceIndex
