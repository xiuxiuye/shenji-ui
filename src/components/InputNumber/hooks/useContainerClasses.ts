import { computed } from 'vue'
import type { UseContainerClasses } from '../types'
import type { Classes } from 'src/types/global'

const useConatinerClasses: UseContainerClasses = (classNamePrefix, props) => {
  const classes = computed<Classes>(() => {
    return [
      `${classNamePrefix}-container`,
      {
        [`${classNamePrefix}-container-disabled`]: props?.disabled,
        [`${classNamePrefix}-container-size-${props?.size}`]: !!props?.size
      }
    ]
  })

  return classes
}

export default useConatinerClasses
