import React from 'react'
import { Tag } from 'antd'

import * as styles from './tags.module.css'

const Tags = ({ tags }) =>
  tags?.length > 0 && (
    <small className={styles.tags}>
      {tags.map((tag) => (
        <Tag key={tag} color="lime">
          {tag}
        </Tag>
      ))}
    </small>
  )

export default Tags
