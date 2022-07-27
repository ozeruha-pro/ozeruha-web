export const roundTwoDecimal = (num) => Math.round(num * 100) / 100

const BASE_PRICE_HEIGHT = 8

export const calcWorkPriceByM2 = ({
  height,
  square,
  basePrice,
  smallObjectPrice,
}) => {
  if (square * basePrice < smallObjectPrice) {
    return square > 0 ? roundTwoDecimal(smallObjectPrice / square) : 0
  }

  if (height <= BASE_PRICE_HEIGHT) {
    return basePrice
  }

  return roundTwoDecimal((height - BASE_PRICE_HEIGHT) * 5 + basePrice)
}

export const calcWorkWithMaterialsPriceByM2 = ({ height, basePrice }) => {
  if (height <= BASE_PRICE_HEIGHT) {
    return basePrice
  }

  return roundTwoDecimal((height - BASE_PRICE_HEIGHT) * 15 + basePrice)
}
