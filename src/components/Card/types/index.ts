import { ComputedRef, StyleValue, CommonSize } from 'src/types/global'

export interface IProps {
  bordered?: boolean;
  loading?: boolean;
  divideble?: boolean;
  cover?: string;
  title?: string;
  icon?: string;
  description?: string;
  size?: CommonSize;
  shadow?: 'never' | 'hover' | 'always';
  noPadding?: string | string[];
}

export type UseContentStyles = (isHeaderExisted: ComputedRef<boolean>, isFooterExisted: ComputedRef<boolean>) => ComputedRef<StyleValue>;
