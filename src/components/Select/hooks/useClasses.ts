import { computed } from 'vue'
import { COMMON_SIZE, COMMON_FORM_BORDER_TYPE, COMMON_FORM_STATUS } from 'src/utils/constant'
import type { Props } from '../types'
import type { UseClasses, Classes, CommonSize, CommonFormBorderType, CommonFormStatus } from 'src/types/global'

const useClasses: UseClasses<Props> = (classNamePrefix, props) => {
  const classes = computed<Classes>(() => {
    const isValidSize = COMMON_SIZE.includes(props?.size as CommonSize)
    const isValidStatus = COMMON_FORM_STATUS?.includes(props?.status as CommonFormStatus)
    const isValidBorderType = COMMON_FORM_BORDER_TYPE?.includes(props?.borderType as CommonFormBorderType)
    return [
      classNamePrefix,
      {
        [`${classNamePrefix}-border-${props?.borderType}`]: isValidBorderType,
        [`${classNamePrefix}-size-${props?.size}`]: isValidSize,
        [`${classNamePrefix}-status-${props?.status}`]: isValidStatus,
        [`${classNamePrefix}-${props?.size}-round`]: isValidSize && props?.round
      }
    ]
  })

  return classes
}

export default useClasses
