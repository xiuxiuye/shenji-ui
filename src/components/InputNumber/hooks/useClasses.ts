import { computed } from 'vue'
import type { UseClasses } from '../types'
import type { Classes } from 'src/types/global'

const useClasses: UseClasses = (classNamePrefix, props, isValidValue) => {
  const classes = computed<Classes>(() => {
    return [
      classNamePrefix,
      {
        [`${classNamePrefix}-border-${props?.borderType}`]: !!props?.borderType,
        [`${classNamePrefix}-status-${props?.status}`]: props?.status,
        [`${classNamePrefix}-no-controls`]: !props?.controls,
        [`${classNamePrefix}-invalid-value`]: !isValidValue?.value
      }
    ]
  })

  return classes
}

export default useClasses
