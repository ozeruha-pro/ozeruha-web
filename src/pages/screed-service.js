import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import get from 'lodash/get'

import { CaretRightOutlined } from '@ant-design/icons'
import { Breadcrumb, PageHeader, Divider, Typography } from 'antd'

import Seo from '../components/seo'
import Layout from '../components/layout'
import { ScreedCalculator } from '../components/screed-calculator'
import { getUaMonth } from '../utils'

const { Paragraph, Text } = Typography

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
        <Breadcrumb.Item>Стяжка підлоги напівсуха</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-content">
        <PageHeader title="Калькулятор cтяжки" style={{ paddingLeft: 0 }} />
        <Paragraph>
          <Text
            type="secondary"
            style={{
              fontSize: 16,
            }}
          >
            {`Краща ціна на ${getUaMonth(now)} ${now.getFullYear()} року`}
          </Text>
        </Paragraph>
        <ScreedCalculator />
        <br />
        <br />
        <Divider dashed />
        <div>
          <Paragraph>
            <Text
              strong
              style={{
                fontSize: 16,
              }}
            >
              Пропоную послугу машинної напівсухої стяжки в м. Києві та
              Київській області:
            </Text>
          </Paragraph>
          <Paragraph>
            &nbsp;
            <CaretRightOutlined />
            &nbsp;Безкоштовна консультація та замір об'єкту.{' '}
            <Link to="/contact">Мої контакти &gt;</Link>
          </Paragraph>
          <Paragraph>
            &nbsp;
            <CaretRightOutlined />
            &nbsp;Доставка і розвантаження матеріалу
          </Paragraph>
          <Paragraph>
            &nbsp;
            <CaretRightOutlined />
            &nbsp;Залиття стяжки з допомогою пневмонагнітача
          </Paragraph>
          <Paragraph>
            &nbsp;
            <CaretRightOutlined />
            &nbsp;Вирівнювання та шліфування поверхні
          </Paragraph>
          <Paragraph>
            &nbsp;
            <CaretRightOutlined />
            &nbsp;Прибирання будівельного сміття
          </Paragraph>
        </div>
        <br />
      </div>
    </Layout>
  )
}

export default ScreedServiceIndex
