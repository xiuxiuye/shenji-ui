import { computed } from 'vue'
import { UseContainerClasses } from '../types'
import { Classes } from 'src/types/global'

const useConatinerClasses: UseContainerClasses = (classNamePrefix, props, searchBtnVisible) => {
  const classes = computed<Classes>(() => {
    return [
      `${classNamePrefix}-container`,
      {
        [`${classNamePrefix}-container-size-${props?.size}-round`]: props?.round,
        [`${classNamePrefix}-container-disabled`]: props?.disabled,
        [`${classNamePrefix}-container-size-${props?.size}`]: !!props?.size,
        [`${classNamePrefix}-container-search-button`]: searchBtnVisible?.value
      }
    ]
  })

  return classes
}

export default useConatinerClasses
