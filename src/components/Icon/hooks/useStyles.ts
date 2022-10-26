import { computed } from 'vue'
import isVaildNumber from 'src/utils/isVaildNumber'
import isString from 'src/utils/isString'
import type { Props } from '../types'
import type { UseStyles, StyleValue } from 'src/types/global'

const useStyles: UseStyles<Props> = (props) => {
  const styles = computed<StyleValue>(() => {
    const tempStyles: StyleValue = { color: props?.color }
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
        tempStyles.fontSize = size
      }
    }

    return tempStyles
  })
  return styles
}

export default useStyles
