import { computed } from 'vue'
import type { UseClasses, UseExpandIconClasses } from '../types'
import type { Classes } from 'src/types/global'

export const useClasses: UseClasses = (classNamePrefix, props, active, disabled) => {
  const classes = computed<Classes>(() => {
    return [
      classNamePrefix,
      {
        [`${classNamePrefix}-disabled`]: disabled.value,
        [`${classNamePrefix}-active`]: active.value
      }
    ]
  })

  return classes
}

export const useExpandIconClasses: UseExpandIconClasses = (classNamePrefix, expanded) => {
  const classes = computed<Classes>(() => {
    return [
      `${classNamePrefix}-expand-icon`,
      {
        [`${classNamePrefix}-expanded-icon`]: expanded.value
      }
    ]
  })

  return classes
}
