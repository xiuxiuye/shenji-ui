import { computed } from 'vue'
import isNumber from 'src/utils/isNumber'
import isString from 'src/utils/isString'
import type { Props } from '../types/index'
import type { StyleValue, UseStyles } from 'src/types/global'

const usePopupStyles: UseStyles<Props> = (props) => {
  const styles = computed<StyleValue>(() => {
    const tempStyles: StyleValue = {}
    /**
     * dropdown height
     */
    const maxHeight = props?.popupMaxHeight
    if (isNumber(maxHeight)) {
      tempStyles.maxHeight = `${maxHeight}px`
    } else if (isString(maxHeight)) {
      tempStyles.maxHeight = maxHeight
    }

    return tempStyles
  })
  return styles
}

export default usePopupStyles
