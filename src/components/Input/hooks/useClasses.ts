import { computed } from 'vue'
import type { IProps } from '../types'
import type { UseClasses, Classes } from 'src/types/global'

const useClasses: UseClasses<IProps> = (classNamePrefix, props) => {
  const classes = computed<Classes>(() => {
    return [
      classNamePrefix,
      {
        [`${classNamePrefix}-border-${props?.border}`]: !!props?.border,
        [`${classNamePrefix}-size-${props?.size}`]: !!props?.size,
        [`${classNamePrefix}-round`]: props?.round,
        [`${classNamePrefix}-status-${props?.status}`]: props?.status,
        [`${classNamePrefix}-disabled`]: props?.disabled
      }
    ]
  })

  return classes
}

export default useClasses
