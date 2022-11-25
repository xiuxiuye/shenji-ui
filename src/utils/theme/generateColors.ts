import isString from '../isString'
import consoleError from '../console/error'
import {
  generate,
  presetPalettes,
  presetDarkPalettes
} from '@ant-design/colors'
import { ThemeMode, type Generate } from './types'

const generateColors: Generate = (
  color,
  options = { mode: ThemeMode.light }
) => {
  if (!isString(color)) {
    consoleError('神机：请输入有效的color值')
    return null
  }
  const colors =
    (options?.mode === ThemeMode.dark
      ? presetDarkPalettes[color]
      : presetPalettes[color]) ||
    generate(color, {
      theme: options?.mode === ThemeMode.light ? 'default' : options?.mode,
      backgroundColor: options?.backgroundColor
    })
  return colors
}

export default generateColors
