import { computed } from 'vue'
import type { UseClasses } from '../types'
import type { Classes } from 'src/types/global'

const useClasses: UseClasses = (classNamePrefix, props, radioGroupProps) => {
  const classes = computed<Classes>(() => {
    const size = radioGroupProps?.value?.size || props?.size
    const disabled = radioGroupProps?.value?.disabled || props?.disabled
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
