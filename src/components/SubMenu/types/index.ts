import type { ComputedRef, Classes } from 'src/types/global'
import type { Provider as MenuProvider } from '../../Menu/types'
export interface Props {
  symbol: string;
  title?: string;
  icon?: string;
  expandedIcon?: string;
  disabled?: boolean;
}

export interface Provider {
  menuLevel: number;
  paddingLeftSpan: number;
  disabled: boolean;
  updateActiveSubMenus: (symbols: string[]) => void;
  updateExpandedSubMenus: (symbols: string[], self?: boolean) => void;
  handlePopupMouseEnter: () => void;
  handlePopupMouseLeave: () => void;
}

export type UseClasses = (
  classNamePrefix: string,
  active: ComputedRef<boolean>,
  disabled: ComputedRef<boolean>,
) => ComputedRef<Classes>;

export type UseHeaderClasses = (
  classNamePrefix: string,
  horizontal: ComputedRef<boolean>,
  currentMenuLevel: ComputedRef<number>,
) => ComputedRef<Classes>;

export type UseExpandIconClasses = (
  classNamePrefix: string,
  expanded: ComputedRef<boolean>,
  ignoreExpandAnimation: ComputedRef<boolean>
) => ComputedRef<Classes>;

export type UsePopupBodyClasses = (
  classNamePrefix: string,
  menuInjecter: ComputedRef<MenuProvider> | undefined
) => ComputedRef<Classes>;
