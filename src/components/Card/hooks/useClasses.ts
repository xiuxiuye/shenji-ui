import { computed } from 'vue'
import { COMMON_SIZE } from 'src/utils/constant'
import type { IProps } from '../types'
import type { UseClasses, Classes, CommonSize } from 'src/types/global'

const useClasses: UseClasses<IProps> = (classNamePrefix, props) => {
  const classes = computed<Classes>(() => {
    const isValidSize = COMMON_SIZE.includes(props?.size as CommonSize)
    const tempClasses: Classes = [
      classNamePrefix,
      {
        [`${classNamePrefix}-bordered`]: props?.bordered,
        [`${classNamePrefix}-divideble`]: props?.divideble,
        [`${classNamePrefix}-size-${props?.size}`]: isValidSize,
        [`${classNamePrefix}-shadow-${props?.shadow}`]: props?.shadow && props?.shadow !== 'never'
      }
    ]

    if (Array.isArray(props?.noPadding)) {
      props?.noPadding.forEach(item => {
        tempClasses.push(`${classNamePrefix}-${item}-no-padding`)
      })
    } else if (props?.noPadding) {
      tempClasses.push(`${classNamePrefix}-${props?.noPadding}-no-padding`)
    }

    return tempClasses
  })

  return classes
}

export default useClasses
