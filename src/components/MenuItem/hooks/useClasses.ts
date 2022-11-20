import { computed } from 'vue'
import type { UseClasses } from '../types'
import type { Classes } from 'src/types/global'

const useClasses: UseClasses = (classNamePrefix, props, active, disabled) => {
  const classes = computed<Classes>(() => {
    return [
      classNamePrefix,
      {
        [`${classNamePrefix}-disabled`]: disabled?.value,
        [`${classNamePrefix}-active`]: active?.value,
        [`${classNamePrefix}-active-disabled`]: active?.value && disabled?.value
      }
    ]
  })

  return classes
}

export default useClasses
