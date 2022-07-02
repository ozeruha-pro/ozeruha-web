import React from 'react'

import Container from './container'
import * as styles from './footer.module.css'

const Footer = () => (
  <Container as="footer">
    <div className={styles.container}>
      Я в <a href="https://www.instagram.com/ozeruha.pro/">Instagram</a> та{' '}
      <a href="https://www.tiktok.com/@ozeruha.pro/">TikTok</a>
    </div>
  </Container>
)

export default Footer
