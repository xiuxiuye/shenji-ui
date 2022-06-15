import { computed } from 'vue'
import { IProps } from '../types'
import { UseClasses, Classes } from 'src/types/global'

const useClasses: UseClasses<IProps> = (classNamePrefix, props) => {
  const classes = computed<Classes>(() => ([
    classNamePrefix,
    {
      [`${classNamePrefix}-dashed`]: props?.dashed,
      [`${classNamePrefix}-vertical`]: props?.vertical
    }
  ]))
  return classes
}

export default useClasses
