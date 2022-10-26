import { provide } from 'vue'
import type { ComputedRef } from 'src/types/global'

type UseProvide = <T extends Record<string, unknown>>(providerKey: string, provider: ComputedRef<T>) => void;

const useProvide: UseProvide = (providerKey, provider) => {
  provide(providerKey, provider)
}

export default useProvide
