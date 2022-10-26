import { computed } from 'vue'
import { COMMON_SIZE } from 'src/utils/constant'
import type { UseClasses } from '../types'
import type { Classes, CommonSize } from 'src/types/global'

const useClasses: UseClasses = (classNamePrefix, props, injecter) => {
  const classes = computed<Classes>(() => {
    const size = injecter?.value?.size || props?.size
    const isValidSize = COMMON_SIZE.includes(size as CommonSize)
    const disabled = injecter?.value?.disabled || props?.disabled
    return [
      classNamePrefix,
      {
        [`${classNamePrefix}-size-${size}`]: isValidSize,
        [`${classNamePrefix}-disabled`]: disabled
      }
    ]
  })
  return classes
}

export default useClasses
