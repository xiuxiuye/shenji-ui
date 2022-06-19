import { computed } from 'vue'
import { IProps } from '../types'
import { Classes, UseClasses } from 'src/types/global'

const useContainerClasses: UseClasses<IProps> = (classNamePrefix, props) => {
  const classes = computed<Classes>(() => {
    return [
      `${classNamePrefix}-container`,
      {
        [`${classNamePrefix}-container-fit`]: props?.fit
      }
    ]
  })

  return classes
}

export default useContainerClasses
