import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import readingTime from 'reading-time'

import Seo from '../components/seo'
import Layout from '../components/layout'
import Hero from '../components/hero'
import Tags from '../components/tags'
import * as styles from './blog-post.module.css'
import { Breadcrumb } from 'antd'

class BlogPostTemplate extends React.Component {
  render() {
    const post = get(this.props, 'data.contentfulBlogPost')
    const previous = get(this.props, 'data.previous')
    const next = get(this.props, 'data.next')
    const plainTextDescription = documentToPlainTextString(
      JSON.parse(post.description.raw)
    )
    const plainTextBody = documentToPlainTextString(JSON.parse(post.body.raw))
    const { minutes: timeToRead } = readingTime(plainTextBody)

    return (
      <Layout>
        <Seo
          title={post.title}
          description={plainTextDescription}
          image={`http:${post.heroImage.resize.src}`}
        />
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>
            <Link to="/">Головна</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/blog">Блог</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{post.title}</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">
          <Hero
            image={post.heroImage?.gatsbyImageData}
            title={post.title}
            content={post.description}
          />
          <div className={styles.container}>
            <span className={styles.meta}>
              {post.author?.name} &middot;{' '}
              <time dateTime={post.rawDate}>
                {new Date(post.publishDate).toLocaleDateString()}
              </time>{' '}
              – {timeToRead} хвилини читання
            </span>
            <div className={styles.article}>
              <div className={styles.body}>
                {post.body?.raw && renderRichText(post.body)}
              </div>
              <Tags tags={post.tags} />
              {(previous || next) && (
                <nav>
                  <ul className={styles.articleNavigation}>
                    {previous && (
                      <li>
                        <Link to={`/blog/${previous.slug}`} rel="prev">
                          ← {previous.title}
                        </Link>
                      </li>
                    )}
                    {next && (
                      <li>
                        <Link to={`/blog/${next.slug}`} rel="next">
                          {next.title} →
                        </Link>
                      </li>
                    )}
                  </ul>
                </nav>
              )}
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $slug: String!
    $previousPostSlug: String
    $nextPostSlug: String
  ) {
    contentfulBlogPost(slug: { eq: $slug }) {
      slug
      title
      author {
        name
      }
      publishDate
      heroImage {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, width: 1280)
        resize(height: 630, width: 1200) {
          src
        }
      }
      body {
        raw
      }
      tags
      description {
        raw
      }
    }
    previous: contentfulBlogPost(slug: { eq: $previousPostSlug }) {
      slug
      title
    }
    next: contentfulBlogPost(slug: { eq: $nextPostSlug }) {
      slug
      title
    }
  }
`
