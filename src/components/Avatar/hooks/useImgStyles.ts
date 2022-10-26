import { computed } from 'vue'
import isString from 'src/utils/isString'
import type { Props } from '../types/index'
import type { StyleValue, UseStyles } from 'src/types/global'

const useImgStyles: UseStyles<Props> = (props) => {
  const styles = computed<StyleValue>(() => {
    const tempStyles: StyleValue = {}
    /**
     * object-fit
     */
    if (props?.objectFit && isString(props?.objectFit)) {
      tempStyles.objectFit = props?.objectFit
    }

    return tempStyles
  })
  return styles
}

export default useImgStyles
