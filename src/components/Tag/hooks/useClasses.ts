import { computed } from 'vue'
import { IProps } from '../types'
import { UseClasses, Classes } from 'src/types/global'

const useClasses: UseClasses<IProps> = (classNamePrefix, props) => {
  const classes = computed<Classes>(() => {
    return [
      classNamePrefix,
      {
        [`${classNamePrefix}-bordered`]: props?.bordered,
        [`${classNamePrefix}-disabled`]: props?.disabled,
        [`${classNamePrefix}-type-${props?.type}`]: !!props?.type,
        [`${classNamePrefix}-size-${props?.size}`]: !!props?.size,
        [`${classNamePrefix}-size-${props?.size}-round`]: props?.round
      }
    ]
  })

  return classes
}

export default useClasses
