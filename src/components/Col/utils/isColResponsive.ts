import isObject from 'src/utils/isObject'
import isVaildNumber from 'src/utils/isVaildNumber'
import { DefaultScreenSize } from 'src/utils/hooks/useScreenResize'
import type { Props, BaseProps } from '../types'
import type { ScreenSize } from 'src/utils/hooks/useScreenResize'

const isColResponsive: (props: Props) => boolean = (props) => {
  const keys = Object.keys(DefaultScreenSize) as ScreenSize[]
  for (const key of keys) {
    if (isObject(props[key]) && isVaildNumber((props[key] as BaseProps)?.order)) return true
  }
  return false
}

export default isColResponsive
