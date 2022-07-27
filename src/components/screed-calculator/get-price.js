// import { graphql, useStaticQuery } from 'gatsby'
// import get from 'lodash/get'
import { roundTwoDecimal } from './utils'

export const useMaterialPriceMap = () => {
  // const data = useStaticQuery(graphql`
  //   query {
  //     allContentfulScreedPrice {
  //       nodes {
  //         slug
  //         shortName
  //         name
  //         unit
  //         price
  //         note
  //       }
  //     }
  //   }
  // `)

  return {
    SAND: {
      name: 'Пісок річковий митий крупнозернистий',
      note: "Пісок має бути ОБОВ'ЯЗКОВО: КРУПНОЗЕРНИСТИЙ, МИТИЙ, РІЧКОВИЙ",
      amountUnit: 'т',
      amount: (square, height) =>
        roundTwoDecimal(((square * height) / 100) * 1.6),
    },
    CEMENT: {
      name: 'Цемент М500 25 кг',
      note: 'ЗЕКОНОМИТЕ на цементі - ми вам ПЕРЕРОБИМО! ЗА ВАШ КОШТ!',
      amountUnit: 'шт',
      amount: (square, height) =>
        Math.round(((square * height * 0.01) / 0.17) * 1.1),
    },
    FIBER: {
      name: 'Фібра поліпропіленова В12 900 гр',
      note: null,
      amountUnit: 'шт',
      amount: (square) => Math.ceil(square / 100),
    },
    SOFTENER: {
      name: 'Пластифікатор для теплої підлоги',
      note: "Якщо, у вас тепла підлога - то обов'язково купіть ПЛАСТИФІКАТОР для теплої підлоги!",
      amountUnit: 'л',
      amount: (square) => Math.ceil(square / 50),
    },
    DAMPER_TAPE: {
      name: 'Стрічка демпферна 150мм*50м*8мм',
      note: null,
      amountUnit:
        'Поміряйте довжину периметр всіх приміщень вашого будинку і розділіть на 50 м/рул ',
      amount: (square) => undefined,
    },
    DELIVERY: {
      name: 'Доставка',
      note: 'Доставка цементу, фібри, пластифікатору та стрічки демпферної. Якщо вага цементу більша 2-х тонн - то доцільніше замовити централізовану доставку з будівельного магазину маніпулятором',
      amountUnit: 'грузовий(х) бус(ів)',
      amount: (square, height) =>
        Math.ceil(Math.round(((square * height * 0.01) / 0.17) * 1.1) / 80),
    },
  }
}
