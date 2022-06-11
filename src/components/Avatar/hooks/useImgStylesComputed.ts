import { computed } from 'vue'
import { IProps } from '../types/index'
import isString from 'src/utils/isString'
import { StyleValue, UseStylesComputed } from 'src/types/global'

const useImgStylesComputed: UseStylesComputed<IProps> = (props) => {
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

export default useImgStylesComputed
