import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { renderRichText } from 'gatsby-source-contentful/rich-text'

import Tags from './tags'
import * as styles from './article-preview.module.css'

const ArticlePreview = ({ posts }) => {
  if (!posts) return null
  if (!Array.isArray(posts)) return null

  return (
    <ul className={styles.articleList}>
      {posts.map((post) => {
        return (
          <li key={post.slug}>
            <Link to={`/blog/${post.slug}`} className={styles.link}>
              <GatsbyImage alt="" image={post.heroImage.gatsbyImageData} />
              <h2 className={styles.title}>{post.title}</h2>
            </Link>
            <div>
              {post.description?.raw && renderRichText(post.description)}
            </div>
            <div className={styles.meta}>
              <small className="meta">
                {new Date(post.publishDate).toLocaleDateString()}
              </small>
              <Tags tags={post.tags} />
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default ArticlePreview
