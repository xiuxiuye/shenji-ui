import { computed } from 'vue'
import { UseControlClasses } from '../types'
import { Classes } from 'src/types/global'

const useControlClasses: UseControlClasses = (classNamePrefix, type, disabled) => {
  const classes = computed<Classes>(() => {
    return [
      `${classNamePrefix}-control-${type}`,
      {
        [`${classNamePrefix}-control-${type}-disabled`]: disabled?.value
      }
    ]
  })

  return classes
}

export default useControlClasses
