import React from 'react'

import Seo from '../components/seo'
import Layout from '../components/layout'
import Hero from '../components/hero'

class ScreedServiceIndex extends React.Component {
  render() {

    return (
      <Layout location={this.props.location}>
        <Seo title="Стяжка підлоги" />
        <Hero title="Стяжка підлоги" />

      </Layout>
    )
  }
}

export default ScreedServiceIndex
