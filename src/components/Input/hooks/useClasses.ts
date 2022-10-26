import { computed } from 'vue'
import { COMMON_FORM_BORDER_TYPE, COMMON_FORM_STATUS } from 'src/utils/constant'
import type { Props } from '../types'
import type { UseClasses, Classes, CommonFormBorderType, CommonFormStatus } from 'src/types/global'

const useClasses: UseClasses<Props> = (classNamePrefix, props) => {
  const classes = computed<Classes>(() => {
    const isValidStatus = COMMON_FORM_STATUS?.includes(props?.status as CommonFormStatus)
    const isValidBorderType = COMMON_FORM_BORDER_TYPE?.includes(props?.borderType as CommonFormBorderType)
    return [
      classNamePrefix,
      {
        [`${classNamePrefix}-border-${props?.borderType}`]: isValidBorderType,
        [`${classNamePrefix}-status-${props?.status}`]: isValidStatus
      }
    ]
  })

  return classes
}

export default useClasses
