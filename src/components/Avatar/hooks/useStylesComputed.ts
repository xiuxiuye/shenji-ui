import { computed } from 'vue'
import { IProps } from '../types/index'
import isVaildNumber from 'src/utils/isVaildNumber'
import isString from 'src/utils/isString'
import { StyleValue, UseStylesComputed } from 'src/types/global'

const useStylesComputed: UseStylesComputed<IProps> = (props) => {
  const styles = computed<StyleValue>(() => {
    const tempStyles: StyleValue = {}
    /**
     * size
     */
    if (props?.size) {
      let size = ''
      if (isVaildNumber(props?.size)) {
        size = `${props?.size}px`
      } else if (isString(props?.size) && /^\d+px$/.test(props?.size as string)) {
        size = props?.size as string
      }

      if (size) {
        tempStyles.width = size
        tempStyles.height = size
      }
    }

    /**
     * border-color
     */
    if (props?.borderColor && isString(props?.borderColor)) {
      tempStyles.borderColor = props?.borderColor
    }

    /**
     * background color
     */
    if (props?.color && isString(props?.color)) {
      tempStyles.backgroundColor = props?.color
    }

    return tempStyles
  })
  return styles
}

export default useStylesComputed
