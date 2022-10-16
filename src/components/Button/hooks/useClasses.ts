import { computed } from 'vue'
import { COMMON_SIZE } from 'src/utils/constant'
import type { IProps } from '../types'
import type { UseClasses, Classes, CommonSize } from 'src/types/global'

const useClasses: UseClasses<IProps> = (classNamePrefix, props) => {
  const classes = computed<Classes>(() => {
    const isValidSize = COMMON_SIZE.includes(props?.size as CommonSize)
    return [
      classNamePrefix,
      `${classNamePrefix}-type-${props?.type}`,
      {
        [`${classNamePrefix}-size-${props?.size}`]: !props?.text && isValidSize,
        [`${classNamePrefix}-shape-${props?.shape}`]: !!props?.shape && props?.shape !== 'normal',
        [`${classNamePrefix}-shape-${props?.shape}-${props?.size}`]: !!props?.shape && props?.shape !== 'normal' && isValidSize,
        [`${classNamePrefix}-long`]: props?.long,
        [`${classNamePrefix}-loading`]: props?.loading,
        [`${classNamePrefix}-border-dashed`]: props?.dashed,
        [`${classNamePrefix}-ghost`]: props?.ghost,
        [`${classNamePrefix}-${props?.type}-ghost`]: props?.ghost && props?.type !== 'normal',
        [`${classNamePrefix}-${props?.type}-text`]: props?.text,
        [`${classNamePrefix}-text-${props?.size}`]: props?.text,
        [`${classNamePrefix}-disabled`]: props?.disabled,
        [`${classNamePrefix}-text-disabled`]: props?.disabled && props?.text,
        [`${classNamePrefix}-ghost-disabled`]: props?.disabled && props?.ghost
      }
    ]
  })

  return classes
}

export default useClasses
