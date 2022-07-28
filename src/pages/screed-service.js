import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import get from 'lodash/get'

//import { SmileOutlined, SolutionOutlined, PhoneOutlined, BuildOutlined } from '@ant-design/icons';
import { Breadcrumb, PageHeader } from 'antd'

import Seo from '../components/seo'
import Layout from '../components/layout'
import { ScreedCalculator } from '../components/screed-calculator'
import { getUaMonth } from '../utils'
import Contact from '../components/contact'

//const { Step } = Steps;

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

  console.log(banner)
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
        <Contact />
      </div>

      {/*<Steps>*/}
      {/*  <Step status="finish" title="Зв'язатися" description="Зателефонувати чи написати" icon={<PhoneOutlined />} />*/}
      {/*  <Step status="finish" title="Розрахунок"  description="Рахуємо об'єми та вартість. Виїзд на об'єкт"  icon={<SolutionOutlined />} />*/}
      {/*  <Step status="finish" title="Виконання"  description="В запланованні дати виконуємо роботи" icon={<BuildOutlined />} />*/}
      {/*  <Step status="finish" title="Готово" description="Оплата по факту без додаткових платежів" icon={<SmileOutlined />} />*/}
      {/*</Steps>*/}
    </Layout>
  )
}

export default ScreedServiceIndex
