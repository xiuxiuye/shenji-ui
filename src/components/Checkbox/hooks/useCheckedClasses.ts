import { computed } from 'vue'
import type { IProps } from '../types'
import type { UseClasses, Classes } from 'src/types/global'

const useCheckedClasses: UseClasses<IProps> = (classNamePrefix, props) => {
  const classes = computed<Classes>(() => ([
    `${classNamePrefix}-box-checked`,
    props?.indeterminate ? `${classNamePrefix}-box-checked-partial` : `${classNamePrefix}-box-checked-all`
  ]))
  return classes
}

export default useCheckedClasses