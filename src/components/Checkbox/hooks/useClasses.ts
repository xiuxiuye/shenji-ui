import { computed } from 'vue'
import type { UseClasses } from '../types'
import type { Classes } from 'src/types/global'

const useClasses: UseClasses = (classNamePrefix, props, checkboxGroupProps) => {
  const classes = computed<Classes>(() => {
    const size = checkboxGroupProps?.value?.size || props?.size
    const disabled = checkboxGroupProps?.value?.disabled || props?.disabled
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
