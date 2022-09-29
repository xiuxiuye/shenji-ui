import { computed } from 'vue'
import type { UseClasses } from '../types'
import type { Classes } from 'src/types/global'

const useClasses: UseClasses = (classNamePrefix, props, checked) => {
  const classes = computed<Classes>(() => {
    return [
      classNamePrefix,
      {
        [`${classNamePrefix}-size-${props?.size}`]: !!props?.size,
        [`${classNamePrefix}-square`]: !props?.round,
        [`${classNamePrefix}-checked`]: checked?.value,
        [`${classNamePrefix}-loading`]: props?.loading,
        [`${classNamePrefix}-disabled`]: props?.disabled
      }
    ]
  })

  return classes
}

export default useClasses
