import { computed } from 'vue'
import type { UseClasses } from '../types'
import type { Classes } from 'src/types/global'

const useClasses: UseClasses = (classNamePrefix, isMaskExist, props) => {
  const classes = computed<Classes>(() => {
    const SIZE = ['large', 'normal', 'small']
    return [
      classNamePrefix,
      {
        [`${classNamePrefix}-size-${props?.size}`]: SIZE.includes(props?.size as string),
        [`${classNamePrefix}-fixed`]: isMaskExist?.value
      }
    ]
  })

  return classes
}

export default useClasses
