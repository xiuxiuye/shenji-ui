import isNumber from './isNumber'

const handleRounding = (decimalStr: string, precision: number): [number, string] => {
  const tempArr = decimalStr.slice(0, precision).split('').map(el => +el)
  let carry = 1
  for (let i = tempArr?.length - 1; i >= 0; i--) {
    if (!carry) break
    if (+tempArr[i] < 9) {
      tempArr[i] = +tempArr[i] + carry
      carry = 0
    } else {
      tempArr[i] = 0
    }
  }
  return [carry, tempArr.join('')]
}

const toFixed = (value: number, precision: number): string => {
  if (!isNumber(value)) return ''
  if (!isNumber(precision) || precision < 0) {
    precision = 0
  }
  let [integerStr = '0', decimalStr = ''] = `${value}`.split('.')
  if (decimalStr?.length <= precision) {
    decimalStr = decimalStr.padEnd(precision, '0')
  } else {
    if (+decimalStr[precision] < 5) {
      decimalStr = decimalStr.slice(0, precision)
    } else {
      const roundingResult = handleRounding(decimalStr, precision)
      integerStr = `${+integerStr + roundingResult[0]}`
      decimalStr = roundingResult[1]
    }
  }
  if (!decimalStr) return `${integerStr}`
  return `${integerStr}.${decimalStr}`
}

export default toFixed
