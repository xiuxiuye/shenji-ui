import { computed } from 'vue'
import { COMMON_SIZE, COMMON_FORM_BORDER_TYPE, COMMON_FORM_STATUS } from 'src/utils/constant'
import type { Props, UseSelectClasses, UseArrowClasses, UseFilterClasses } from '../types'
import type { UseClasses, Classes, CommonSize, CommonFormBorderType, CommonFormStatus } from 'src/types/global'

export const useClasses: UseSelectClasses = (classNamePrefix, props, focused) => {
  const classes = computed<Classes>(() => {
    const isValidSize = COMMON_SIZE.includes(props?.size as CommonSize)
    const isValidStatus = COMMON_FORM_STATUS?.includes(props?.status as CommonFormStatus)
    const isValidBorderType = COMMON_FORM_BORDER_TYPE?.includes(props?.borderType as CommonFormBorderType)
    return [
      classNamePrefix,
      {
        [`${classNamePrefix}-focused`]: focused.value,
        [`${classNamePrefix}-border-${props?.borderType}`]: isValidBorderType,
        [`${classNamePrefix}-border-${props?.borderType}-focused`]: isValidBorderType && focused.value,
        [`${classNamePrefix}-size-${props?.size}`]: isValidSize && !props?.multiple,
        [`${classNamePrefix}-multiple-size-${props?.size}`]: isValidSize && props?.multiple,
        [`${classNamePrefix}-status-${props?.status}`]: isValidStatus,
        [`${classNamePrefix}-status-${props?.status}-focused`]: isValidStatus && focused.value,
        [`${classNamePrefix}-${props?.size}-round`]: isValidSize && props?.round,
        [`${classNamePrefix}-disabled`]: props?.disabled,
        [`${classNamePrefix}-disabled-focused`]: props?.disabled && focused.value
      }
    ]
  })

  return classes
}

export const useArrowClasses: UseArrowClasses = (classNamePrefix, popupVisible) => {
  const classes = computed<Classes>(() => {
    return [
      `${classNamePrefix}-arrow`,
      {
        [`${classNamePrefix}-arrow-up`]: popupVisible?.value
      }
    ]
  })

  return classes
}

export const useSelectedTagClasses: UseClasses<Props> = (classNamePrefix, props) => {
  const classes = computed<Classes>(() => {
    return [
      `${classNamePrefix}-content-item`,
      {
        'sj-text-ellipsis': !props?.multiple,
        [`${classNamePrefix}-content-tag`]: props?.multiple
      }
    ]
  })

  return classes
}

export const useFilterClasses: UseFilterClasses = (classNamePrefix, props, filterText) => {
  const classes = computed<Classes>(() => {
    return [
      `${classNamePrefix}-filter`,
      {
        [`${classNamePrefix}-filter-single`]: !props?.multiple,
        [`${classNamePrefix}-filter-solid`]: !!filterText.value
      }
    ]
  })

  return classes
}
