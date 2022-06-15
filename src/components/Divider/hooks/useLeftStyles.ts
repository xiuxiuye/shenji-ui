import { computed } from 'vue'
import isVaildNumber from 'src/utils/isVaildNumber'
import { StyleValue } from 'src/types/global'
import { UseStyles } from '../types'

const useStyles: UseStyles = (hasText, props) => {
  const styles = computed<StyleValue>(() => {
    const tempStyles: StyleValue = {}
    if (hasText.value && props?.placement === 'left') {
      if (props?.vertical) {
        tempStyles.height = isVaildNumber(props?.offset) ? `${props?.offset}px` : props?.offset
      } else {
        tempStyles.width = isVaildNumber(props?.offset) ? `${props?.offset}px` : props?.offset
      }
      tempStyles.flexGrow = 0
    }
    return tempStyles
  })
  return styles
}

export default useStyles
