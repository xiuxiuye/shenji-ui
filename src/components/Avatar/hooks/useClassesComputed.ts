import { computed } from 'vue'
import { IProps } from '../types'
import { UseClassesComputed, Classes } from 'src/types/global'

const useClassesComputed: UseClassesComputed<IProps> = (classNamePrefix, props) => {
  const SIZE = ['large', 'normal', 'small']
  const classes = computed<Classes>(() => {
    return [
      classNamePrefix,
      {
        [`${classNamePrefix}-size-${props?.size}`]: SIZE.includes(props?.size as string),
        [`${classNamePrefix}-bordered`]: props?.bordered,
        [`${classNamePrefix}-shape-${props?.shape}`]: props?.shape
      }
    ]
  })

  return classes
}

export default useClassesComputed
