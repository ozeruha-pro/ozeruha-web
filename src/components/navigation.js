import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import * as styles from './navigation.module.css'

const Navigation = () => {
  const { file } = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "logo.png" }) {
        childImageSharp {
          fixed(width: 150, height: 45) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  return (
    <nav role="navigation" className={styles.container} aria-label="Main">
      <Link to="/" className={styles.logoLink}>
        <Img fixed={file.childImageSharp.fixed} loading="lazy" fadeIn={false} />
      </Link>
      <ul className={styles.navigation}>
        <li className={styles.navigationItem}>
          <Link to="/screed-service">Калькулятор стяжки</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
