import { computed } from 'vue'
import { COMMON_SIZE } from 'src/utils/constant'
import type { UseClasses } from '../types'
import type { Classes, CommonSize } from 'src/types/global'

const useClasses: UseClasses = (classNamePrefix, isMaskExist, props) => {
  const classes = computed<Classes>(() => {
    const isValidSize = COMMON_SIZE.includes(props?.size as CommonSize)
    return [
      classNamePrefix,
      {
        [`${classNamePrefix}-size-${props?.size}`]: isValidSize,
        [`${classNamePrefix}-fixed`]: isMaskExist?.value
      }
    ]
  })

  return classes
}

export default useClasses
