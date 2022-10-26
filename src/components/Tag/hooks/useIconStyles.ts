import { computed } from 'vue'
import { Props } from '../types/index'
import isString from 'src/utils/isString'
import { StyleValue, UseStyles } from 'src/types/global'

const useIconStyles: UseStyles<Props> = (props) => {
  const styles = computed<StyleValue>(() => {
    const tempStyles: StyleValue = {}
    /**
     * text-color
     */
    if (props?.textColor && isString(props?.textColor)) {
      tempStyles.color = props?.textColor
    }

    return tempStyles
  })
  return styles
}

export default useIconStyles
