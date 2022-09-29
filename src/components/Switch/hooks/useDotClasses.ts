import { computed } from 'vue'
import type { UseDotClasses } from '../types'
import type { Classes } from 'src/types/global'

const useDotClasses: UseDotClasses = (classNamePrefix, checked, rubberBanding) => {
  const classes = computed<Classes>(() => {
    return [
      `${classNamePrefix}-dot`,
      {
        [`${classNamePrefix}-dot-checked`]: checked?.value,
        [`${classNamePrefix}-dot-checked-rubber-band`]: checked?.value && rubberBanding?.value,
        [`${classNamePrefix}-dot-unchecked-rubber-band`]: !checked?.value && rubberBanding?.value
      }
    ]
  })

  return classes
}

export default useDotClasses
