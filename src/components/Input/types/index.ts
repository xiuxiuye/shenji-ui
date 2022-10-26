import type { ComputedRef, Classes, CommonSize, CommonFormStatus, CommonFormBorderType } from 'src/types/global'

export interface Props {
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
  status?: CommonFormStatus;
  autofocus?: boolean;
  value?: string;
  borderType?: CommonFormBorderType;
  placeholder?: string;
}

export interface InputRefExpose {
  focus: () => void;
  blur: () => void;
}

export type UseContainerClasses = (classNamePrefix: string, props: Props, searchBtnVisible: ComputedRef<boolean>) => ComputedRef<Classes>;
