import { computed } from 'vue'
import type { Props } from '../types'
import type { UseClasses, Classes } from 'src/types/global'

const useClasses: UseClasses<Props> = (classNamePrefix, props) => {
  const classes = computed<Classes>(() => {
    const isValidMode = !!props?.mode && ['inline', 'horizontal', 'vertical'].includes(props?.mode)
    const isValidTheme = !!props?.theme && ['light', 'dark'].includes(props?.theme)
    return [
      classNamePrefix,
      {
        [`${classNamePrefix}-mode-${props?.mode}`]: isValidMode,
        [`${classNamePrefix}-theme-${props?.theme}`]: isValidTheme
      }
    ]
  })

  return classes
}

export default useClasses
