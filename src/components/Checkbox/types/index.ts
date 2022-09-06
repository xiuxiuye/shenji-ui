import type { ComputedRef, Classes, CommonSize } from 'src/types/global'
import type { ProvideProps } from '../../CheckboxGroup/types'

export interface IProps {
  size?: CommonSize;
  disabled?: boolean;
  autofocus?: boolean;
  modelValue?: boolean;
  indeterminate?: boolean;
}

export interface ICheckboxRefExpose {
  focus: () => void;
  blur: () => void;
}

export type UseClasses = (classNamePrefix: string, props: IProps, checkboxGroupProps?: ComputedRef<ProvideProps>) => ComputedRef<Classes>;

interface UserInjectReturn {
  checkboxGroupProps: ComputedRef<ProvideProps> | undefined;
  checkboxGroupMethods: Record<string, (value: number | string | boolean) => void> | undefined;
}

export type UseInject = () => UserInjectReturn;
