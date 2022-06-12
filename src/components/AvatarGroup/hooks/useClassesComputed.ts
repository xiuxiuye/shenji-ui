import { computed } from 'vue'
import { IProps } from '../types'
import { UseClassesComputed, Classes } from 'src/types/global'

const useClassesComputed: UseClassesComputed<IProps> = (classNamePrefix, props) => {
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

export default useClassesComputed
