import { Ref, ComputedRef, StyleValue } from 'src/types/global'

export interface IProps {
  bordered?: boolean;
  loading?: boolean;
  divideble?: boolean;
  cover?: string;
  title?: string;
  icon?: string;
  description?: string;
  size?: 'small' | 'normal' | 'large';
  shadow?: 'never' | 'hover' | 'always';
  noPadding?: string | string[];
}

export type UseContentStylesComputed = (isHeaderExisted: ComputedRef<boolean>, isFooterExisted: ComputedRef<boolean>) => ComputedRef<StyleValue>;
