import { computed } from 'vue'
import type { UseClasses, UseHeaderClasses, UseExpandIconClasses, UsePopupBodyClasses } from '../types'
import type { Classes } from 'src/types/global'

export const useClasses: UseClasses = (classNamePrefix, active, disabled) => {
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

export const usePopupBodyClasses: UsePopupBodyClasses = (classNamePrefix, menuInjecter) => {
  const classes = computed<Classes>(() => {
    return [
      `${classNamePrefix}-popup-body`,
      {
        [`${classNamePrefix}-popup-body-${menuInjecter?.value?.theme}`]: !!menuInjecter?.value?.theme
      }
    ]
  })

  return classes
}
