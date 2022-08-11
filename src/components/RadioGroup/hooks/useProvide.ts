import { provide, computed } from 'vue'
import type { ProvideProps, UseProvide } from '../types'

const useProvide: UseProvide = (realValue, props, methods) => {
  const provideProps = computed<ProvideProps>(() => {
    return {
      size: props?.size,
      disabled: props?.disabled,
      name: props?.name,
      realValue: realValue?.value
    }
  })
  provide('radioGroupProps', provideProps)
  provide('radioGroupMethods', methods)
}

export default useProvide
