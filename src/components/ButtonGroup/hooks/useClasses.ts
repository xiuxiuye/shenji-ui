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
        [`${classNamePrefix}-size-${props?.size}`]: isValidSize,
        [`${classNamePrefix}-horizontal`]: !props?.vertical,
        [`${classNamePrefix}-vertical`]: props?.vertical,
        [`${classNamePrefix}-horizontal-round-${props?.size}`]: props?.round && !props?.vertical,
        [`${classNamePrefix}-vertical-round-${props?.size}`]: props?.round && props?.vertical
      }
    ]
  })

  return classes
}

export default useClasses
