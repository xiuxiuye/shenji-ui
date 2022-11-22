import { computed } from 'vue'
import type { UseClasses, UseHeaderClasses, UseExpandIconClasses } from '../types'
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

export const useHeaderClasses: UseHeaderClasses = (classNamePrefix, horizontal, currentMenuLevel) => {
  const classes = computed<Classes>(() => {
    return [
      `${classNamePrefix}-header`,
      {
        [`${classNamePrefix}-horizontal-header`]: horizontal.value && currentMenuLevel.value === 1
      }
    ]
  })

  return classes
}

export const useExpandIconClasses: UseExpandIconClasses = (classNamePrefix, expanded, ignoreExpandAnimation) => {
  const classes = computed<Classes>(() => {
    return [
      `${classNamePrefix}-expand-icon`,
      {
        [`${classNamePrefix}-expanded-icon`]: expanded.value && !ignoreExpandAnimation.value
      }
    ]
  })

  return classes
}
