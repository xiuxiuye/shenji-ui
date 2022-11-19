import type { ComputedRef, Classes } from 'src/types/global'
export interface Props {
  symbol: string;
  title?: string;
  icon?: string;
  expandedIcon?: string;
  disabled?: boolean;
}

export interface Provider {
  paddingLeftLevel?: number;
}

export type UseExpandIconClasses = (classNamePrefix: string, expanded: ComputedRef<boolean>) => ComputedRef<Classes>;
