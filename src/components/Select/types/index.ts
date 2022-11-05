import type { CommonSize, CommonFormStatus, CommonFormBorderType, ComputedRef, Ref, Classes, VNode } from 'src/types/global'

export type SingleModelValue = string | number;

export type Option = Record<string, any> & {
  groupable?: boolean;
  children?: Option[];
}

export type Options = Option[];

export type OptionRender = (option: Option, selected: boolean) => VNode;

export type LabelRender = (option: Option, onRemove?: (value: SingleModelValue) => void) => VNode;

export interface Props {
  size?: CommonSize;
  disabled?: boolean;
  autofocus?: boolean;
  modelValue?: SingleModelValue | SingleModelValue[];
  clearable?: boolean;
  clearIcon?: string;
  round?: boolean;
  loading?: boolean;
  loadingIcon?: string;
  loadingIconVisible?: boolean;
  loadingText?: string;
  filterable?: boolean;
  filter?: (filterText: string, option: Record<string, any>) => boolean;
  asyncFilter?: (filterText: string) => void;
  labelField?: string;
  valueField?: string;
  maxCount?: number | string;
  multiple?: boolean;
  options?: Options;
  placeholder?: string;
  placement?:
  | 'top-start'
  | 'top'
  | 'top-end'
  | 'right-start'
  | 'right'
  | 'right-end'
  | 'bottom-start'
  | 'bottom'
  | 'bottom-end'
  | 'left-start'
  | 'left'
  | 'left-end';
  status?: CommonFormStatus;
  container?: string | HTMLElement;
  virtual?: boolean;
  arrow?: string;
  borderType?: CommonFormBorderType;
  popupMaxHeight?: number;
  search?: boolean;
  visible?: boolean;
  popupWithSelectWidth?: boolean | number | string;
  emptyText?: string;
  optionRender?: OptionRender;
  labelRender?: LabelRender;
}

export interface SelectRefExpose {
  focus: () => void;
  blur: () => void;
}

export interface SelectedOptionMeta {
  originOption: Record<string, any>;
}

export interface SelectedOption {
  label: string;
  value: string | number;
  meta?: SelectedOptionMeta;
}

export interface Provider {
  selectedValues: Array<string | number>;
  disabled: boolean;
  handleOptionClicked: (option: SelectedOption) => void;
}

export type UseArrowClasses = (classNamePrefix: string, popupVisible: Ref<boolean>) => ComputedRef<Classes>;

export type UseFilterClasses = (classNamePrefix: string, props: Props, filterText: Ref<string>) => ComputedRef<Classes>;
