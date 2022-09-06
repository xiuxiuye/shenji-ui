import { computed } from 'vue'
import { UseContainerClasses } from '../types'
import { Classes } from 'src/types/global'

const useConatinerClasses: UseContainerClasses = (classNamePrefix, props, slots) => {
  const classes = computed<Classes>(() => {
    return [
      `${classNamePrefix}-container`,
      {
        [`${classNamePrefix}-container-disabled`]: props?.disabled,
        [`${classNamePrefix}-group`]: slots?.prepend || slots?.append
      }
    ]
  })

  return classes
}

export default useConatinerClasses
