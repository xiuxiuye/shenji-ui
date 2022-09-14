import { computed } from 'vue'
import isString from 'src/utils/isString'
import type { IProps } from '../types/index'
import type { StyleValue, UseStyles } from 'src/types/global'

const useImgStyles: UseStyles<IProps> = (props) => {
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
