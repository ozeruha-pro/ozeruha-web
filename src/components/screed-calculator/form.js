import { Alert, Button, Modal, Input, Select, Typography } from 'antd'
import { UserOutlined, PhoneOutlined, SendOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import sendLead from '../../utils/tg-lead'
import * as styles from './form.module.css'

const { Option } = Select
const { Paragraph, Text } = Typography

const CITIES = {
  KYIV: 'м. Київ',
  KYIV_REGION: 'Київська область',
  OTHER_REGION: 'Інша область',
}

const success = () => {
  Modal.success({
    title: 'Дякую!',
    content: 'Вашу заявку відправлено. Найближчим часом ми з Вами зв’яжемось.',
    okText: 'Добре',
    centered: true,
  })
}

const CalculatorForm = ({
  height,
  square,
  workPriceSum,
  workPriceWithMaterialsSum,
}) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const [name, setName] = useState()
  const [phone, setPhone] = useState()
  const [city, setCity] = useState(CITIES.KYIV)

  const handleCancel = () => {
    setModalVisible(false)
  }

  const handleOk = async () => {
    if (phone) {
      setLoading(true)

      await sendLead({
        message: `Стяжка ${square}м², ${height}см. Робота ${workPriceSum}грн, робота з матеріалами ${workPriceWithMaterialsSum}грн. ${city}.`,
        phone,
        name,
        form: 'Калькулятор стяжки 👷🏻‍♂️',
      })

      setLoading(false)
      setModalVisible(false)

      if (typeof window.gtag !== 'undefined') {
        window.gtag('event', 'form', {
          action: 'send',
          label: 'screed calculator order',
        })
      }

      success()
    }
  }

  return (
    <>
      <Button
        type="primary"
        size="large"
        shape="round"
        icon={<SendOutlined />}
        onClick={() => setModalVisible(true)}
      >
        Відправити заявку прорабу
      </Button>
      <Modal
        title={`Ваша напівсуха стяжка ${square} м², ${height} см`}
        centered
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Закрити
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Відправити
          </Button>,
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Ваше ім'я"
          name="name"
          size="large"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <br />
        <Input
          prefix={<PhoneOutlined className="site-form-item-icon" />}
          placeholder="Номер телефону"
          name="phone"
          type="tel"
          size="large"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <br />
        <br />
        <Select
          defaultValue={city}
          style={{ width: '100%' }}
          onChange={(value) => setCity(value)}
        >
          <Option value={CITIES.KYIV}>{CITIES.KYIV}</Option>
          <Option value={CITIES.KYIV_REGION}>{CITIES.KYIV_REGION}</Option>
          <Option value={CITIES.OTHER_REGION}>{CITIES.OTHER_REGION}</Option>
        </Select>
        <br />
        <br />
        <Input prefix="₴" value={workPriceSum} suffix="робота" disabled />
        {square >= 100 && (
          <React.Fragment>
            <br />
            <br />
            <Input
              prefix="₴"
              value={workPriceWithMaterialsSum}
              suffix="робота з матеріалами"
              disabled
            />
          </React.Fragment>
        )}
        <br />
        <br />
        <Paragraph>
          <Text
            type="secondary"
            style={{
              fontSize: 16,
            }}
          >
            {`Відправляйте заявку! Безплатно проконсультую, як якісніше та економніше залити стяжку площею ${square}м², висотою ${height}см`}
          </Text>
        </Paragraph>

        {city !== 'м. Київ' && (
          <Alert
            message="На вартість також впливає дальність розташування об'єкту від Києва!"
            type="warning"
            showIcon
            closable
          />
        )}
      </Modal>
    </>
  )
}

export default CalculatorForm
