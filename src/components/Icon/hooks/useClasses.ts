import { computed } from 'vue'
import { COMMON_SIZE } from 'src/utils/constant'
import type { IProps } from '../types'
import type { UseClasses, Classes, CommonSize } from 'src/types/global'

const useClasses: UseClasses<IProps> = (classNamePrefix, props) => {
  const isValidSize = COMMON_SIZE.includes(props?.size as CommonSize)
  const classes = computed<Classes>(() => {
    return [
      'iconfont',
      props.type,
      classNamePrefix,
      {
        'sj-spin': /^loading-[a-f]$/.test(props?.type),
        [`${classNamePrefix}-size-${props?.size}`]: isValidSize
      }
    ]
  })
  return classes
}

export default useClasses
