import { computed } from 'vue'
import isObject from 'src/utils/isObject'
import isVaildNumber from 'src/utils/isVaildNumber'
import consoleError from 'src/utils/console/error'
import { DefaultScreenSize } from 'src/utils/hooks/useScreenResize'
import type { ScreenSize } from 'src/utils/hooks/useScreenResize'
import type { Props, BaseProps } from '../types'
import type { UseClasses, Classes } from 'src/types/global'

const useClasses: UseClasses<Props> = (classNamePrefix, props) => {
  const classes = computed<Classes>(() => {
    const tempClassesArray: Classes = [classNamePrefix]
    /**
     * handle span prop
     */
    if (isVaildNumber(props?.span)) {
      const tempSpan = Number(props?.span)
      if (tempSpan >= 0 && tempSpan <= 24) {
        tempClassesArray.push(`${classNamePrefix}-span-${tempSpan}`)
      } else {
        consoleError('神机：COl组件span属性取值范围错误 ([0, 24])')
      }
    } else {
      consoleError('神机：Col组件span属性类型错误 (number | string)')
    }

    const tempClassesObj = {
      [`${classNamePrefix}-offset-${props?.offset}`]: isVaildNumber(props?.offset) && !!Number(props?.offset),
      [`${classNamePrefix}-push-${props?.push}`]: isVaildNumber(props?.push) && !!Number(props?.push),
      [`${classNamePrefix}-pull-${props?.pull}`]: isVaildNumber(props?.pull) && !!Number(props?.pull)
    }

    /**
     * handle responsive props
     */
    const screenSizeKeys = Object.keys(DefaultScreenSize) as Array<ScreenSize>
    screenSizeKeys.forEach((size) => {
      const screenSizeValue = props[size] as BaseProps
      if (isObject(screenSizeValue)) {
        const screenSizeValueKeys = Object.keys(screenSizeValue) as Array<keyof BaseProps>
        screenSizeValueKeys.forEach((key) => {
          if (key !== 'order') {
            if (isVaildNumber(screenSizeValue[key])) {
              const tempValue = Number(screenSizeValue[key])
              if (tempValue < 0 || tempValue > 24) {
                consoleError(`神机：Col组件${size}属性${key}字段取值范围错误 ([0, 24])`)
              } else {
                tempClassesArray.push(`${classNamePrefix}-${size}-${key}-${Number(screenSizeValue[key])}`)
              }
            } else {
              consoleError(`神机：Col组件${size}属性${key}字段类型错误 (number | string | Record<string, number | string>)`)
            }
          }
        })
      } else if (isVaildNumber(screenSizeValue)) {
        const tempSpan = Number(screenSizeValue)
        if (tempSpan >= 0 && tempSpan <= 24) {
          tempClassesArray.push(`${classNamePrefix}-${size}-span-${tempSpan}`)
        } else {
          consoleError(`神机：Col组件${size}属性取值范围错误 ([0, 24])`)
        }
      } else if (screenSizeValue) {
        consoleError(`神机：Col组件${size}属性类型错误 (number | string | Record<string, number | string>)`)
      }
    })

    tempClassesArray.push(tempClassesObj)

    return tempClassesArray
  })

  return classes
}

export default useClasses
