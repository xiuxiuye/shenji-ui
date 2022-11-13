import type { Provider } from '../../Select/types'
import type { Classes, VNode, ComputedRef } from 'src/types/global'

export interface Props {
  disabled?: boolean;
  label?: string;
  value?: string | number;
  custom?: VNode;
}

export type UseClasses = (
  classNamePrefix: string,
  props: Props,
  injecter: ComputedRef<Provider> | undefined,
  selected: ComputedRef<boolean>
) => ComputedRef<Classes>;
