import { inject } from 'vue'
import type { UseInject } from '../types'

const useInject: UseInject = () => {
  return {
    checkboxGroupProps: inject('checkboxGroupProps', undefined),
    checkboxGroupMethods: inject('checkboxGroupMethods', undefined)
  }
}

export default useInject
