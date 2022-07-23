export const roundTwoDecimal = (num) => Math.round(num * 100) / 100


export const calcWorkPriceByM2 = ({ height, square, basePrice,  smallObjectPrice }) => {
  const baseHeight = 8;

  if(square * basePrice < smallObjectPrice) {
    return smallObjectPrice/square
  }

  if(height <= baseHeight) {
    return basePrice;
  }

  return (height-baseHeight)*5 + basePrice;
}