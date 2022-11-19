import { computed } from 'vue'
import type { Props, UseExpandIconClasses } from '../types'
import type { UseClasses, Classes } from 'src/types/global'

export const useClasses: UseClasses<Props> = (classNamePrefix, props) => {
  const classes = computed<Classes>(() => {
    return [
      classNamePrefix,
      {
        [`${classNamePrefix}-${props?.disabled}`]: props?.disabled
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
