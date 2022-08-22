import { computed } from 'vue'
import { IProps, UseContainerClasses } from '../types'
import { Classes } from 'src/types/global'

const useConatinerClasses: UseContainerClasses<IProps> = (classNamePrefix, props, slots) => {
  const classes = computed<Classes>(() => {
    return [
      `${classNamePrefix}-container`,
      {
        [`${classNamePrefix}-container-disabled`]: props?.disabled,
        [`${classNamePrefix}-group`]: props?.searchButton || slots['search-button'] || slots?.prepend || slots?.append
      }
    ]
  })

  return classes
}

export default useConatinerClasses
