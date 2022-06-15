import { computed } from 'vue'
import { UseAnimationClasses } from '../types'
import { Classes } from 'src/types/global'

const useAnimationClasses: UseAnimationClasses = (classNamePrefix, isMaskExist) => {
  const classes = computed<Classes>(() => {
    return [
      `${classNamePrefix}-animation`,
      {
        [`${classNamePrefix}-animation-witn-mask`]: isMaskExist
      }
    ]
  })

  return classes
}

export default useAnimationClasses
