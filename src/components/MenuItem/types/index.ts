import type { ComputedRef, Classes } from 'src/types/global'

export interface Props {
  symbol: string;
  icon?: string;
  disabled?: boolean;
}

export type UseClasses = (classNamePrefix: string, props: Props, active: ComputedRef<boolean>) => ComputedRef<Classes>;
