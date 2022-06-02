import { computed } from 'vue'
import { StyleValue } from 'src/types/global'
import { UseContentStylesComputed } from '../types'

const useContentStylesComputed: UseContentStylesComputed = (isHeaderExisted, isFooterExisted) => {
  const styles = computed<StyleValue>(() => {
    const tempStyles: StyleValue = {}
    if (!isHeaderExisted.value) {
      tempStyles.borderTopWidth = 0
    }
    if (!isFooterExisted.value) {
      tempStyles.borderBottomWidth = 0
    }
    return tempStyles
  })
  return styles
}

export default useContentStylesComputed
