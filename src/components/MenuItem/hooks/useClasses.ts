import { computed } from 'vue'
import type { UseClasses } from '../types'
import type { Classes } from 'src/types/global'

const useClasses: UseClasses = (classNamePrefix, props, active) => {
  const classes = computed<Classes>(() => {
    return [
      classNamePrefix,
      {
        [`${classNamePrefix}-disabled`]: props?.disabled,
        [`${classNamePrefix}-active`]: active?.value
      }
    ]
  })

  return classes
}

export default useClasses
