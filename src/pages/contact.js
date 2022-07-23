import React from 'react'
import { Breadcrumb, PageHeader } from 'antd'

import Layout from '../components/layout'
import Seo from '../components/seo'
import Contact from '../components/contact'

class ContactIndex extends React.Component {
  render() {
    const title = 'Контакти'

    return (
      <Layout location={this.props.location}>
        <Seo title={title} />
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Головна</Breadcrumb.Item>
          <Breadcrumb.Item>Контакти</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">
          <PageHeader title={title} style={{ paddingLeft: 0 }} />
          <Contact />
        </div>
      </Layout>
    )
  }
}

export default ContactIndex
