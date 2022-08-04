import { inject } from 'vue'
import type { UseInject } from '../types'

const useInject: UseInject = () => {
  return {
    checkGroupProps: inject('checkGroupProps', undefined),
    checkGroupMethods: inject('checkGroupMethods', undefined)
  }
}

export default useInject
