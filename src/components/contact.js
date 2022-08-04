import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import get from 'lodash/get'
import {
  MailOutlined,
  InstagramOutlined,
  PhoneOutlined,
  YoutubeOutlined,
} from '@ant-design/icons'
import { onPhoneClick } from '../utils'

const contactLinkStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '12px 0',
}

const formatPhoneNumber = (str) => {
  const cleaned = ('' + str).replace(/\D/g, '')

  const match = cleaned.match(/^(38|)?(\d{3})(\d{3})(\d{4})$/)

  if (match) {
    const intlCode = match[1] ? '+38 ' : ''
    return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
  }

  return null
}

const Contact = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulPerson(
        filter: { contentful_id: { eq: "15jwOBqpxqSAOy2eOO4S0m" } }
      ) {
        nodes {
          phone
          email
          tiktok
          instagram
        }
      }
    }
  `)

  const [author] = get(data, 'allContentfulPerson.nodes')

  return (
    <div>
      <a
        style={contactLinkStyle}
        href={`tel:+${author.phone}`}
        onClick={() => onPhoneClick('contact block')}
      >
        <PhoneOutlined />
        &nbsp;{formatPhoneNumber(author.phone)}
      </a>
      <a style={contactLinkStyle}>
        <MailOutlined />
        &nbsp;{author.email}
      </a>
      <a style={contactLinkStyle} href={author.instagram} target="_blank">
        <InstagramOutlined />
        &nbsp;Instagram
      </a>
      <a style={contactLinkStyle} href={author.tiktok} target="_blank">
        <YoutubeOutlined />
        &nbsp;TikTok
      </a>
    </div>
  )
}

export default Contact
