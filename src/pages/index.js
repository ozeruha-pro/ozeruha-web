import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'

import Layout from '../components/layout'
import Hero from '../components/hero'
//import ArticlePreview from '../components/article-preview'
import Contact from '../components/contact'
import Seo from '../components/seo'
import { Breadcrumb } from 'antd'

class RootIndex extends React.Component {
  render() {
    const [author] = get(this, 'props.data.allContentfulPerson.nodes')

    return (
      <Layout>
        <Seo />
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Головна</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">
          <Hero
            image={author.heroImage.gatsbyImageData}
            title={author.name}
            content={author.shortBio}
          />
          <Contact />
          {/*<ArticlePreview posts={posts} />*/}
        </div>
      </Layout>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
      nodes {
        title
        slug
        publishDate
        tags
        heroImage {
          gatsbyImageData(
            layout: FULL_WIDTH
            placeholder: BLURRED
            width: 424
            height: 212
          )
        }
        description {
          raw
        }
      }
    }
    allContentfulPerson(
      filter: { contentful_id: { eq: "15jwOBqpxqSAOy2eOO4S0m" } }
    ) {
      nodes {
        name
        shortBio {
          raw
        }
        instagram
        heroImage: image {
          gatsbyImageData(
            layout: CONSTRAINED
            placeholder: BLURRED
            width: 1180
          )
        }
      }
    }
  }
`
