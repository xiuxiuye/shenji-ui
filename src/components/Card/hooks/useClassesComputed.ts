import { computed } from 'vue'
import { IProps } from '../types'
import { UseClassesComputed, Classes } from 'src/types/global'

const useClassesComputed: UseClassesComputed<IProps> = (classNamePrefix, props) => {
  const classes = computed<Classes>(() => {
    const tempClasses: Classes = [
      classNamePrefix,
      {
        [`${classNamePrefix}-bordered`]: props?.bordered,
        [`${classNamePrefix}-divideble`]: props?.divideble,
        [`${classNamePrefix}-size-${props?.size}`]: props?.size,
        [`${classNamePrefix}-shadow-${props?.shadow}`]: props?.shadow && props?.shadow !== 'never'
      }
    ]

    if (Array.isArray(props?.noPadding)) {
      props?.noPadding.forEach(item => {
        tempClasses.push(`${classNamePrefix}-${item}-no-padding`)
      })
    } else if (props?.noPadding) {
      tempClasses.push(`${classNamePrefix}-${props?.noPadding}-no-padding`)
    }

    return tempClasses
  })

  return classes
}

export default useClassesComputed
