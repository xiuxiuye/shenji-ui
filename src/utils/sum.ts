const sum = (num1: number, num2: number): number => {
  const num1Deci = `${num1}`.split('.')[1] || ''
  const num2Deci = `${num2}`.split('.')[1] || ''
  const n = Math.max(0, num1Deci?.length, num2Deci?.length)
  const times = Math.pow(10, n)
  return Math.round((num1 * times + num2 * times)) / times
}

export default sum
