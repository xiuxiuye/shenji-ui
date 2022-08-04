import { computed } from 'vue'
import type { IProps } from '../types'
import type { UseClasses, Classes } from 'src/types/global'

const useClasses: UseClasses<IProps> = (classNamePrefix, props) => {
  const SIZE = ['large', 'normal', 'small']
  const classes = computed<Classes>(() => ([
    'iconfont',
    props.type,
    classNamePrefix,
    SIZE.includes(props?.size as string) ? `${classNamePrefix}-size-${props?.size}` : '',
    {
      'sj-spin': /^loading-[a-f]$/.test(props?.type)
    }
  ]))
  return classes
}

export default useClasses
