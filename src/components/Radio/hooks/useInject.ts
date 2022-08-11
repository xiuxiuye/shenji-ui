import { inject } from 'vue'
import type { UseInject } from '../types'

const useInject: UseInject = () => {
  return {
    radioGroupProps: inject('radioGroupProps', undefined),
    radioGroupMethods: inject('radioGroupMethods', undefined)
  }
}

export default useInject
