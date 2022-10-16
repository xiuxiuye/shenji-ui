import { computed } from 'vue'
import { COMMON_SIZE } from 'src/utils/constant'
import type { IProps } from '../types'
import type { UseClasses, Classes, CommonSize } from 'src/types/global'

const useClasses: UseClasses<IProps> = (classNamePrefix, props) => {
  const classes = computed<Classes>(() => {
    const isValidSize = COMMON_SIZE.includes(props?.size as CommonSize)
    return [
      classNamePrefix,
      {
        [`${classNamePrefix}-bordered`]: props?.bordered,
        [`${classNamePrefix}-disabled`]: props?.disabled,
        [`${classNamePrefix}-type-${props?.type}`]: !!props?.type,
        [`${classNamePrefix}-size-${props?.size}`]: isValidSize,
        [`${classNamePrefix}-size-${props?.size}-round`]: props?.round && isValidSize
      }
    ]
  })

  return classes
}

export default useClasses
