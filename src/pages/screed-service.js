import React from 'react'
import { Link } from 'gatsby'

//import { SmileOutlined, SolutionOutlined, PhoneOutlined, BuildOutlined } from '@ant-design/icons';
import { Breadcrumb, PageHeader } from 'antd'

import Seo from '../components/seo'
import Layout from '../components/layout'
import { ScreedCalculator } from '../components/screed-calculator'
import { getUaMonth } from '../utils'
import Contact from '../components/contact'

//const { Step } = Steps;

class ScreedServiceIndex extends React.Component {
  render() {
    const now = new Date()
    const title = `Калькулятор cтяжки підлоги ${getUaMonth(
      now
    )}, ${now.getFullYear()}`

    return (
      <Layout>
        <Seo title={title} />

        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>
            {' '}
            <Link to="/">Головна</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Калькулятор cтяжки підлоги</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">
          <PageHeader title={title} style={{ paddingLeft: 0 }} />
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
}

export default ScreedServiceIndex
