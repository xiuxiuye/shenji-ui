import { computed } from 'vue'
import { Props } from '../types/index'
import isString from 'src/utils/isString'
import { StyleValue, UseStyles } from 'src/types/global'

const useStyles: UseStyles<Props> = (props) => {
  const styles = computed<StyleValue>(() => {
    const tempStyles: StyleValue = {}
    /**
     * background color
     */
    if (props?.color && isString(props?.color)) {
      tempStyles.backgroundColor = props?.color
    }

    /**
     * border-color
     */
    if (props?.borderColor && isString(props?.borderColor)) {
      tempStyles.borderColor = props?.borderColor
    }

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

export default useStyles
