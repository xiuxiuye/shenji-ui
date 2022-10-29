import { computed } from 'vue'
import type { Props, UseClasses } from '../types'
import type { Classes } from 'src/types/global'

const useSelectedTagClasses: UseClasses = (classNamePrefix, popupVisible) => {
  const classes = computed<Classes>(() => {
    return [
      `${classNamePrefix}-arrow`,
      {
        [`${classNamePrefix}-arrow-up`]: popupVisible?.value
      }
    ]
  })

  return classes
}

export default useSelectedTagClasses
