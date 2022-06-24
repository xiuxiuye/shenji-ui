import { computed } from 'vue'
import { IProps } from '../types/index'
import isString from 'src/utils/isString'
import { StyleValue, UseStyles } from 'src/types/global'

const useIconStyles: UseStyles<IProps> = (props) => {
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
