import { computed } from 'vue'
import { COMMON_SIZE } from 'src/utils/constant'
import type { UseClasses } from '../types'
import type { Classes } from 'src/types/global'

const useClasses: UseClasses = (classNamePrefix, props, injecter, selected) => {
  const classes = computed<Classes>(() => {
    const size = injecter?.value?.size
    const disabled = injecter?.value?.disabled || props?.disabled
    const isValidSize = size ? COMMON_SIZE.includes(size) : false
    return [
      classNamePrefix,
      {
        [`${classNamePrefix}-selected`]: selected?.value,
        [`${classNamePrefix}-disabled`]: disabled,
        [`${classNamePrefix}-size-${size}`]: isValidSize
      }
    ]
  })

  return classes
}

export default useClasses
