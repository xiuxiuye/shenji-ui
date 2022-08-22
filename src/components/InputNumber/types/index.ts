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
  formatter?: (value: number) => string;
  keyboard?: boolean;
}

export type UseContainerClasses = (classNamePrefix: string, slots: Slots) => ComputedRef<Classes>;

export type UseControlClasses = (classNamePrefix: string, type: 'add' | 'minus', disabled: Ref<boolean>) => ComputedRef<Classes>;
