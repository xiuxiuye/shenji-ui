import type { ComputedRef, Classes, Slots, CommonSize, Ref } from 'src/types/global'

export interface IProps {
  size?: CommonSize;
  clearable?: boolean;
  disabled?: boolean;
  autofocus?: boolean;
  modelValue?: number;
  max?: number | string;
  min?: number | string;
  step?: number | string;
  precision?: number | string;
  status?: 'success' | 'warning' | 'error';
  border?: 'none' | 'block' | 'line';
  stringMode?: boolean;
  prefix?: string;
  suffix?: string;
  controls?: boolean;
  addIcon?: string;
  minusIcon?: string;
  formatter?: (value?: number) => string | undefined;
  parser?: (value?: string) => number | undefined;
  keyboard?: boolean;
}

export type UseClasses = (classNamePrefix: string, props: IProps, isValidValue: ComputedRef<boolean>) => ComputedRef<Classes>;

export type UseContainerClasses = (classNamePrefix: string, slots: Slots) => ComputedRef<Classes>;

export type UseControlClasses = (classNamePrefix: string, type: 'add' | 'minus', disabled: Ref<boolean>) => ComputedRef<Classes>;
