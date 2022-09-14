import { computed } from 'vue'
import type { StyleValue } from 'src/types/global'
import type { UseContentStyles } from '../types'

const useContentStyles: UseContentStyles = (isHeaderExisted, isFooterExisted) => {
  const styles = computed<StyleValue>(() => {
    const tempStyles: StyleValue = {}
    if (!isHeaderExisted?.value) {
      tempStyles.borderTopWidth = 0
    }
    if (!isFooterExisted?.value) {
      tempStyles.borderBottomWidth = 0
    }
    return tempStyles
  })
  return styles
}

export default useContentStyles
