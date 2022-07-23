import React from 'react'
import { graphql, Link } from 'gatsby'
import get from 'lodash/get'

import Seo from '../components/seo'
import Layout from '../components/layout'
import ArticlePreview from '../components/article-preview'
import { Breadcrumb, PageHeader } from 'antd'

class BlogIndex extends React.Component {
  render() {
    const posts = get(this, 'props.data.allContentfulBlogPost.nodes')
    const title = 'Блог'

    return (
      <Layout>
        <Seo title={title} />
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>
            {' '}
            <Link to="/">Головна</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Блог</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">
          <PageHeader title={title} style={{ paddingLeft: 0 }} />
          <ArticlePreview posts={posts} />
        </div>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query BlogIndexQuery {
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
      nodes {
        title
        slug
        publishDate(formatString: "MMMM Do, YYYY")
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
  }
`
