import React from 'react'
import { Layout, Menu } from 'antd'
import { CalculatorOutlined, PhoneOutlined } from '@ant-design/icons'
import { Link } from 'gatsby'
import './layout.css'
import logoPng from '../images/logo_white.png'

const { Header, Content, Footer } = Layout

const Template = ({ children }) => {
  return (
    <Layout className="layout">
      <Header className="site-layout-header">
        <div className="logo">
          <Link to="/">
            <img
              src={logoPng}
              style={{ width: '100%', height: '100%' }}
              alt="Ozeruha Pro"
            />
          </Link>
        </div>
        <Menu theme="dark" mode="horizontal" selectable={false}>
          <Menu.Item
            key="screed-service"
            icon={<CalculatorOutlined />}
            className="menu-item-ozeruha"
          >
            <Link to="/screed-service">Стяжка</Link>
          </Menu.Item>
          <Menu.Item
            key="contact"
            icon={<PhoneOutlined />}
            className="menu-item-ozeruha"
          >
            <Link to="/contact">Контакти</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content className="site-layout-content-wrapper">{children}</Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ozeruha Pro ©{new Date().getFullYear()} Створено в Україні
      </Footer>
    </Layout>
  )
}

export default Template
