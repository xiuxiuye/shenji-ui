import { computed } from 'vue'
import { COMMON_SIZE } from 'src/utils/constant'
import type { UseClasses } from '../types'
import type { Classes, CommonSize } from 'src/types/global'

const useClasses: UseClasses = (classNamePrefix, props, checkboxGroupProps) => {
  const classes = computed<Classes>(() => {
    const size = checkboxGroupProps?.value?.size || props?.size
    const isValidSize = COMMON_SIZE.includes(size as CommonSize)
    const disabled = checkboxGroupProps?.value?.disabled || props?.disabled
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
