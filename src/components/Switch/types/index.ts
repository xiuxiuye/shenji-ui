import type { CommonSize, ComputedRef, Classes, Ref } from 'src/types/global'

export interface IProps {
  size?: CommonSize;
  disabled?: boolean;
  autofocus?: boolean;
  modelValue?: boolean | number | string;
  loading?: boolean;
  round?: boolean;
  icon?: string;
  checkedValue?: boolean | number | string;
  uncheckedValue?: boolean | number | string;
  checkedText?: string;
  uncheckedText?: string;
  rubberBand?: boolean;
}

export type UseClasses = (classNamePrefix: string, props: IProps, checked: Ref<boolean>) => ComputedRef<Classes>;

export type UseDotClasses = (classNamePrefix: string, checked: Ref<boolean>, rubberBanding: Ref<boolean>) => ComputedRef<Classes>;
