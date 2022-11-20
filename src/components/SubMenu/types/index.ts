import type { ComputedRef, Classes } from 'src/types/global'
export interface Props {
  symbol: string;
  title?: string;
  icon?: string;
  expandedIcon?: string;
  disabled?: boolean;
}

export interface Provider {
  menuLevel: number;
  updateActiveSubMenus: (symbols: string[]) => void;
}

export type UseClasses = (classNamePrefix: string, props: Props, active: ComputedRef<boolean>) => ComputedRef<Classes>;

export type UseExpandIconClasses = (classNamePrefix: string, expanded: ComputedRef<boolean>) => ComputedRef<Classes>;
