import { computed } from 'vue'
import { IProps } from '../types'
import { UseClassesComputed, Classes } from 'src/types/global'

const useClassesComputed: UseClassesComputed<IProps> = (classNamePrefix, props) => {
  const classes = computed<Classes>(() => ([
    classNamePrefix,
    {
      [`${classNamePrefix}-align-self-${props?.align}`]: !!props?.align
    }
  ]))

  return classes
}

export default useClassesComputed
