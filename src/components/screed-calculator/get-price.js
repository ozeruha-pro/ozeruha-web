import { graphql, useStaticQuery } from 'gatsby'
import get from 'lodash/get'
import keyBy from 'lodash/keyBy'
import { roundTwoDecimal } from './utils'

export const useMaterialPriceMap = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulScreedPrice {
        nodes {
          slug
          shortName
          name
          unit
          price
          note
        }
      }
    }
  `)

  const price = keyBy(get(data, 'allContentfulScreedPrice.nodes'), 'slug')

  return {
    SAND: {
      name: price.SAND.name,
      shortName: price.SAND.shortName,
      price: price.SAND.price,
      unit: price.SAND.unit,
      note: price.SAND.note,
      amountUnit: 'т',
      amount: (square, height) =>
        roundTwoDecimal(((square * height) / 100) * 1.6),
    },
    CEMENT: {
      name: price.CEMENT.name,
      shortName: price.CEMENT.shortName,
      price: price.CEMENT.price,
      unit: price.CEMENT.unit,
      note: price.CEMENT.note,
      amountUnit: 'т',
      amount: (square, height) =>
        roundTwoDecimal(((square * height * 0.01) / 0.17) * 1.05),
    },
    FIBER: {
      name: price.FIBER.name,
      shortName: price.FIBER.shortName,
      price: price.FIBER.price,
      unit: price.FIBER.unit,
      note: price.FIBER.note,
      amountUnit: 'т',
      amount: (square) => roundTwoDecimal(square / 500),
    },
    SOFTENER: {
      name: price.SOFTENER.name,
      shortName: price.SOFTENER.shortName,
      price: price.SOFTENER.price,
      unit: price.SOFTENER.unit,
      note: price.SOFTENER.note,
      amountUnit: 'т',
      amount: (square) => roundTwoDecimal(square / 300),
    },
    DAMPER_TAPE: {
      name: price.DAMPER_TAPE.name,
      shortName: price.DAMPER_TAPE.shortName,
      price: price.DAMPER_TAPE.price,
      unit: price.DAMPER_TAPE.unit,
      note: price.DAMPER_TAPE.note,
      amountUnit: 'т',
      amount: (square) => roundTwoDecimal(square / 300),
    },
    DELIVERY: {
      name: price.DELIVERY.name,
      shortName: price.DELIVERY.shortName,
      price: price.DELIVERY.price,
      unit: price.DELIVERY.unit,
      note: price.DELIVERY.note,
      amountUnit: 'шт',
      amount: (square) => roundTwoDecimal(square / 100),
    },
  }
}
