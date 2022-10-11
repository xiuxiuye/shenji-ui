import { computed } from 'vue'
import type { IProps } from '../types'
import type { UseClasses, Classes } from 'src/types/global'

const useClasses: UseClasses<IProps> = (classNamePrefix, props) => {
  const SIZE = ['large', 'normal', 'small']
  const classes = computed<Classes>(() => {
    return [
      classNamePrefix,
      {
        [`${classNamePrefix}-size-${props?.size}`]: SIZE.includes(props?.size as string),
        [`${classNamePrefix}-bordered`]: !!props?.bordered,
        [`${classNamePrefix}-shape-${props?.shape}`]: !!props?.shape
      }
    ]
  })

  return classes
}

export default useClasses
