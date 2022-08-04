import { computed } from 'vue'
import type { UseClasses } from '../types'
import type { Classes } from 'src/types/global'

const useClasses: UseClasses = (classNamePrefix, props, checkGroupProps) => {
  const classes = computed<Classes>(() => {
    const size = checkGroupProps?.value?.size || props?.size
    const disabled = checkGroupProps?.value?.disabled || props?.disabled
    return [
      classNamePrefix,
      {
        [`${classNamePrefix}-size-${size}`]: !!size,
        [`${classNamePrefix}-disabled`]: disabled
      }
    ]
  })
  return classes
}

export default useClasses
