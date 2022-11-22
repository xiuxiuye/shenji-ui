import { computed } from 'vue'
import type { UseClasses } from '../types'
import type { Classes } from 'src/types/global'

const useClasses: UseClasses = (classNamePrefix, active, disabled, horizontal, currentMenuLevel) => {
  const classes = computed<Classes>(() => {
    return [
      classNamePrefix,
      {
        [`${classNamePrefix}-disabled`]: disabled?.value,
        [`${classNamePrefix}-active`]: active?.value,
        [`${classNamePrefix}-active-disabled`]: active?.value && disabled?.value,
        [`${classNamePrefix}-horizontal-active`]: active?.value && horizontal.value && currentMenuLevel.value === 1,
        [`${classNamePrefix}-horizontal-active-disabled`]: active?.value && disabled?.value && horizontal.value && currentMenuLevel.value === 1
      }
    ]
  })

  return classes
}

export default useClasses
