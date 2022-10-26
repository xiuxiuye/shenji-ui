import type { CommonSize, CommonFormStatus, CommonFormBorderType } from 'src/types/global'

export interface Props {
  size?: CommonSize;
  disabled?: boolean;
  autofocus?: boolean;
  modelValue?: string | number | Array<string | number>;
  clearable?: boolean;
  loading?: boolean;
  round?: boolean;
  filterable?: boolean;
  filter?: (pattern: string, option: Record<string, any>) => boolean;
  labelField?: string;
  valueField?: string;
  maxCount?: number;
  multiple?: boolean;
  options?: Array<Record<string, any>>;
  placeholder?: string;
  placement?: 'top-start' | 'top' | 'top-end' | 'right-start' | 'right' | 'right-end' | 'bottom-start' | 'bottom' | 'bottom-end' | 'left-start' | 'left' | 'left-end';
  remote?: boolean;
  remoteMethod?: () => Promise<Array<Record<string, any>>>;
  status?: CommonFormStatus;
  container?: string | HTMLElement;
  virtual?: boolean;
  arrow?: string;
  borderType?: CommonFormBorderType;
  popupMaxHeight?: number;
  search?: boolean;
  visible?: boolean;
  popupWithSelectWidth?: boolean | number | string;
}

export interface SelectRefExpose {
  focus: () => void;
  blur: () => void;
}

export type Provider = {
  selectedValues: Array<string | number>;
}
