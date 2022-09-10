import type { ComputedRef, Classes, CommonSize } from 'src/types/global'

export interface IProps {
  clearable?: boolean;
  size?: CommonSize;
  round?: boolean;
  prefix?: string;
  suffix?: string;
  search?: boolean;
  searchButton?: boolean;
  searchButtonText?: string;
  showSearch?: boolean;
  autosize?: boolean;
  loading?: boolean;
  password?: boolean;
  disabled?: boolean;
  maxLength?: number | string;
  showLength?: boolean;
  status?: 'success' | 'warning' | 'error';
  autofocus?: boolean;
  value?: string;
  border?: 'none' | 'line' | 'block';
  placeholder?: string;
}

export interface IInputRefExpose {
  focus: () => void;
  blur: () => void;
}

export type UseContainerClasses = (classNamePrefix: string, props: IProps, searchBtnVisible: ComputedRef<boolean>) => ComputedRef<Classes>;
