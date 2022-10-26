import { computed } from 'vue'
import isVaildNumber from 'src/utils/isVaildNumber'
import type { Props, Gutter } from '../types'
import type { Ref, ComputedRef } from 'src/types/global'
import type { ScreenSize } from 'src/utils/hooks/useScreenResize'

const useOffset: (size: Ref<ScreenSize> | null, props: Props) => ComputedRef<[number, number]> = (size, props) => {
  const offset = computed<[number, number]>(() => {
    let [horOffset, verOffset] = [0, 0]
    if (props?.gutter) {
      const gutter = size?.value ? (props?.gutter as Gutter)[size?.value] : props?.gutter
      if (isVaildNumber(gutter)) {
        // gutter: number | string
        horOffset = Number(gutter) / 2
      } else if (Array.isArray(gutter) && gutter?.length) {
        // gutter: [number | string, number | string]
        horOffset = isVaildNumber(gutter[0]) ? Number(gutter[0]) / 2 : 0
        verOffset = isVaildNumber(gutter[1]) ? Number(gutter[1]) / 2 : 0
      }
    }

    return [horOffset, verOffset]
  })
  return offset
}
export default useOffset
