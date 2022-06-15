import { computed } from 'vue'
import { IProps } from '../types'
import { UseClasses, Classes } from 'src/types/global'

const useClasses: UseClasses<IProps> = (classNamePrefix, props) => {
  const classes = computed<Classes>(() => {
    const SIZE = ['large', 'normal', 'small']
    return [
      classNamePrefix,
      {
        [`${classNamePrefix}-size-${props?.size}`]: SIZE.includes(props?.size as string)
      }
    ]
  })

  return classes
}

export default useClasses
