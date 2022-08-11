import { computed } from 'vue'
import type { IProps } from '../types'
import type { UseClasses, Classes } from 'src/types/global'

const useClasses: UseClasses<IProps> = (classNamePrefix, props) => {
  const classes = computed<Classes>(() => ([
    classNamePrefix,
    `${classNamePrefix}-${props?.vertical ? 'vertical' : 'horizontal'}`
  ]))
  return classes
}

export default useClasses
