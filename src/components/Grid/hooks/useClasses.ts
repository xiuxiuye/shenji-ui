import { computed } from 'vue'
import type { Props } from '../types'
import type { UseClasses, Classes } from 'src/types/global'

const useClasses: UseClasses<Props> = (classNamePrefix, props) => {
  const classes = computed<Classes>(() => {
    const tempClassesArray: Classes = [classNamePrefix]

    const tempClassesOb = {
      [`${classNamePrefix}-flow-${props?.flow}`]: !!props?.flow,
      [`${classNamePrefix}-justify-items-${props?.justify}`]: !!props?.justify
    }
    tempClassesArray.push(tempClassesOb)

    return tempClassesArray
  })
  return classes
}

export default useClasses
