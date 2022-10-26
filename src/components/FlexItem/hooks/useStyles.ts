import { computed } from 'vue'
import isVaildNumber from 'src/utils/isVaildNumber'
import type { Props } from '../types'
import type { UseStyles, StyleValue } from 'src/types/global'

const useStyles: UseStyles<Props> = (props) => {
  const styles = computed<StyleValue>(() => {
    const tempStyles: StyleValue = {}
    if (isVaildNumber(props?.order)) {
      tempStyles.order = Number(props?.order)
    }

    if (isVaildNumber(props?.grow)) {
      tempStyles.flexGrow = Number(props?.grow)
    }

    if (isVaildNumber(props?.shrink)) {
      tempStyles.flexShrink = Number(props?.shrink)
    }
    return tempStyles
  })
  return styles
}

export default useStyles
