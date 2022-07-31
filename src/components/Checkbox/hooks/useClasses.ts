import { computed } from 'vue'
import { IProps } from '../types'
import { UseClasses, Classes } from 'src/types/global'

const useClasses: UseClasses<IProps> = (classNamePrefix, props) => {
  const classes = computed<Classes>(() => ([
    classNamePrefix,
    {
      [`${classNamePrefix}-size-${props?.size}`]: props?.size,
      [`${classNamePrefix}-disabled`]: props?.disabled
    }
  ]))
  return classes
}

export default useClasses
