import { computed } from 'vue'
import type { Props } from '../types'
import type { UseClasses, Classes } from 'src/types/global'

const useClasses: UseClasses<Props> = (classNamePrefix, props) => {
  const classes = computed<Classes>(() => {
    return [
      classNamePrefix,
      {
        [`${classNamePrefix}-tight`]: props?.tight,
        [`${classNamePrefix}-vertical`]: props?.vertical,
        [`${classNamePrefix}-horizontal`]: !props?.vertical,
        [`${classNamePrefix}-vertical-tight`]: props?.vertical && props?.tight,
        [`${classNamePrefix}-horizontal-tight`]: !props?.vertical && props?.tight
      }
    ]
  })

  return classes
}

export default useClasses
