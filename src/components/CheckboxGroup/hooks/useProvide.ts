import { provide, computed } from 'vue'
import type { ProvideProps, UseProvide } from '../types'

const useProvide: UseProvide = (props, methods) => {
  const provideProps = computed<ProvideProps>(() => {
    return {
      size: props?.size,
      disabled: props?.disabled,
      modelValue: props?.modelValue
    }
  })
  provide('checkboxGroupProps', provideProps)
  provide('checkboxGroupMethods', methods)
}

export default useProvide
