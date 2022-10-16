import type { ComputedRef, Classes, CommonSize, Ref, CommonFormStatus, CommonFormBorderType } from 'src/types/global'

type Formatter = (value: string) => string;
type Parse = (value: string) => number | undefined;

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
  status?: CommonFormStatus;
  borderType?: CommonFormBorderType;
  stringMode?: boolean;
  prefix?: string;
  suffix?: string;
  controls?: boolean;
  addIcon?: string;
  minusIcon?: string;
  formatter?: Formatter;
  parser?: Parse;
  keyboard?: boolean;
}

export interface IInputNumberRefExpose {
  focus: () => void;
  blur: () => void;
}

export type UseClasses = (classNamePrefix: string, props: IProps, isValidValue: ComputedRef<boolean>) => ComputedRef<Classes>;

export type UseContainerClasses = (classNamePrefix: string, props: IProps) => ComputedRef<Classes>;

export type UseControlClasses = (classNamePrefix: string, type: 'add' | 'minus', disabled: Ref<boolean>) => ComputedRef<Classes>;
