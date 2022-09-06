import { computed } from 'vue'
import { UseContainerClasses } from '../types'
import { Classes } from 'src/types/global'

const useConatinerClasses: UseContainerClasses = (classNamePrefix, props, slots) => {
  const classes = computed<Classes>(() => {
    return [
      `${classNamePrefix}-container`,
      {
        [`${classNamePrefix}-container-size-${props?.size}-round`]: props?.round,
        [`${classNamePrefix}-container-disabled`]: props?.disabled,
        [`${classNamePrefix}-container-size-${props?.size}`]: !!props?.size,
        [`${classNamePrefix}-group`]: props?.prepend || props?.append || props?.searchButton || slots['search-button'] || slots?.prepend || slots?.append
      }
    ]
  })

  return classes
}

export default useConatinerClasses
