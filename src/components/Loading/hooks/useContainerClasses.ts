import { computed } from 'vue'
import type { Props } from '../types'
import type { Classes, UseClasses } from 'src/types/global'

const useContainerClasses: UseClasses<Props> = (classNamePrefix, props) => {
  const classes = computed<Classes>(() => {
    return [
      `${classNamePrefix}-container`,
      {
        [`${classNamePrefix}-container-fit`]: props?.fit
      }
    ]
  })

  return classes
}

export default useContainerClasses
