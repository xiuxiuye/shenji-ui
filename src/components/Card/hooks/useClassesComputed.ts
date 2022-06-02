import { computed } from 'vue'
import { IProps } from '../types'
import { UseClassesComputed, Classes } from 'src/types/global'

const useClassesComputed: UseClassesComputed<IProps> = (classNamePrefix, props) => {
  const classes = computed<Classes>(() => {
    console.log(props?.divideble)
    return [
      classNamePrefix,
      {
        [`${classNamePrefix}-bordered`]: props?.bordered,
        [`${classNamePrefix}-divideble`]: props?.divideble,
        [`${classNamePrefix}-size-${props?.size}`]: props?.size
      }
    ]
  })

  return classes
}

export default useClassesComputed
