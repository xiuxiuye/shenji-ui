import { computed } from 'vue'
import type { UseContentClasses } from '../types'
import type { Classes } from 'src/types/global'

const useContentClasses: UseContentClasses = (classNamePrefix, isMaskVisible) => {
  const classes = computed<Classes>(() => {
    return [
      `${classNamePrefix}-content`,
      {
        [`${classNamePrefix}-content-masked`]: isMaskVisible?.value
      }
    ]
  })

  return classes
}

export default useContentClasses
