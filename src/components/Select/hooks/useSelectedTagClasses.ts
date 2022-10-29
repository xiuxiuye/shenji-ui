import { computed } from 'vue'
import type { Props } from '../types'
import type { UseClasses, Classes } from 'src/types/global'

const useSelectedTagClasses: UseClasses<Props> = (classNamePrefix, props) => {
  const classes = computed<Classes>(() => {
    return [
      `${classNamePrefix}-content-item`,
      {
        [`${classNamePrefix}-content-tag`]: props?.multiple
      }
    ]
  })

  return classes
}

export default useSelectedTagClasses
