import { computed } from 'vue'
import type { Props } from '../types'
import type { UseClasses, Classes } from 'src/types/global'

const useClasses: UseClasses<Props> = (classNamePrefix, props) => {
  const classes = computed<Classes>(() => ([
    classNamePrefix,
    {
      [`${classNamePrefix}-nowrap`]: props?.wrap === false,
      [`${classNamePrefix}-wrap`]: props?.wrap === true,
      [`${classNamePrefix}-direction-${props?.direction}`]: !!props?.direction,
      [`${classNamePrefix}-justify-${props?.justify}`]: !!props?.justify,
      [`${classNamePrefix}-align-${props?.align}`]: !!props?.align
    }
  ]))

  return classes
}

export default useClasses
