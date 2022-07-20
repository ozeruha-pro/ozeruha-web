import React from 'react'

//import { SmileOutlined, SolutionOutlined, PhoneOutlined, BuildOutlined } from '@ant-design/icons';
import { PageHeader } from 'antd';

import Seo from '../components/seo'
import Layout from '../components/layout'
import Container from '../components/container'
import  { ScreedCalculator } from '../components/screed-calculator'


//const { Step } = Steps;

class ScreedServiceIndex extends React.Component {
  render() {

    return (
      <Layout location={this.props.location}>
        <Seo title="Стяжка підлоги" />

        <Container>
          <PageHeader
            title="Стяжка підлоги"
            style={{ paddingLeft: 0 }}
          />

          <ScreedCalculator/>

          {/*<Steps>*/}
          {/*  <Step status="finish" title="Зв'язатися" description="Зателефонувати чи написати" icon={<PhoneOutlined />} />*/}
          {/*  <Step status="finish" title="Розрахунок"  description="Рахуємо об'єми та вартість. Виїзд на об'єкт"  icon={<SolutionOutlined />} />*/}
          {/*  <Step status="finish" title="Виконання"  description="В запланованні дати виконуємо роботи" icon={<BuildOutlined />} />*/}
          {/*  <Step status="finish" title="Готово" description="Оплата по факту без додаткових платежів" icon={<SmileOutlined />} />*/}
          {/*</Steps>*/}
        </Container>
      </Layout>
    )
  }
}

export default ScreedServiceIndex
