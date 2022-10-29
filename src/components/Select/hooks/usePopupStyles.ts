import { computed } from 'vue'
import isNumber from 'src/utils/isNumber'
import isString from 'src/utils/isString'
import isVaildNumber from 'src/utils/isVaildNumber'
import type { Props } from '../types/index'
import type { StyleValue, UseStyles } from 'src/types/global'

const usePopupStyles: UseStyles<Props> = (props) => {
  const styles = computed<StyleValue>(() => {
    const tempStyles: StyleValue = {}
    /**
     * popup height
     */
    const maxHeight = props?.popupMaxHeight
    if (isNumber(maxHeight)) {
      tempStyles.maxHeight = `${maxHeight}px`
    } else if (isString(maxHeight)) {
      tempStyles.maxHeight = maxHeight
    }
    /**
     * popup width
     */
    if (props?.popupWithSelectWidth === false) {
      tempStyles.width = 'auto'
    } else if (isNumber(props?.popupWithSelectWidth)) {
      tempStyles.width = `${props?.popupWithSelectWidth}px`
    } else if (isString(props?.popupWithSelectWidth)) {
      tempStyles.width = isVaildNumber(props?.popupWithSelectWidth) ? `${props?.popupWithSelectWidth}px` : props?.popupWithSelectWidth as string
    }

    return tempStyles
  })
  return styles
}

export default usePopupStyles
