import { computed } from 'vue'
import type { Props } from '../types'
import type { UseClasses, Classes } from 'src/types/global'

const useClasses: UseClasses<Props> = (classNamePrefix, props) => {
  const classes = computed<Classes>(() => ([
    classNamePrefix,
    {
      [`${classNamePrefix}-align-self-${props?.align}`]: !!props?.align
    }
  ]))

  return classes
}

export default useClasses
