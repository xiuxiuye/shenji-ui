import { computed } from 'vue'
import type { IProps } from '../types'
import type { UseClasses, Classes } from 'src/types/global'

const useClasses: UseClasses<IProps> = (classNamePrefix, props) => {
  const classes = computed<Classes>(() => {
    const tempClassesArray: Classes = [classNamePrefix]

    const tempClassesOb = {
      [`${classNamePrefix}-justify-self-${props?.justify}`]: !!props?.justify,
      [`${classNamePrefix}-align-self-${props?.align}`]: !!props?.align
    }
    tempClassesArray.push(tempClassesOb)

    return tempClassesArray
  })
  return classes
}

export default useClasses
