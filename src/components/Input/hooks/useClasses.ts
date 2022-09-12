import { computed } from 'vue'
import type { IProps } from '../types'
import type { UseClasses, Classes } from 'src/types/global'

const useClasses: UseClasses<IProps> = (classNamePrefix, props) => {
  const classes = computed<Classes>(() => {
    return [
      classNamePrefix,
      {
        [`${classNamePrefix}-border-${props?.borderType}`]: !!props?.borderType,
        [`${classNamePrefix}-status-${props?.status}`]: props?.status
      }
    ]
  })

  return classes
}

export default useClasses
