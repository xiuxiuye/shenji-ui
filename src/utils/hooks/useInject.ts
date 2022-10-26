import { inject } from 'vue'
import type { ComputedRef } from 'src/types/global'

type UseInject = <T extends Record<string, unknown>>(prividerKey: string) => ComputedRef<T> | undefined;

const useInject: UseInject = (prividerKey) => {
  return inject(prividerKey, undefined)
}

export default useInject
