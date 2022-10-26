import isObject from 'src/utils/isObject'
import isArray from 'src/utils/isArray'
import isVaildNumber from 'src/utils/isVaildNumber'
import { DefaultScreenSize } from 'src/utils/hooks/useScreenResize'
import type { Props, Gutter, GutterArrayValue } from '../types'
import type { ScreenSize } from 'src/utils/hooks/useScreenResize'

const isRowResponsive: (props: Props) => boolean = (props) => {
  if (props?.gutter && isObject(props?.gutter)) {
    const gutter = props?.gutter as Gutter
    const keys = Object.keys(DefaultScreenSize) as ScreenSize[]
    for (const key of keys) {
      if (isVaildNumber(gutter[key])) return true
      if (isArray(gutter[key]) && (isVaildNumber((gutter[key] as GutterArrayValue)[0]) || isVaildNumber((gutter[key] as GutterArrayValue)[1]))) return true
    }
  }
  return false
}

export default isRowResponsive
