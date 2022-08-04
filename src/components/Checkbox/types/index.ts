import type { ComputedRef, Classes } from 'src/types/global'
import type { ProvideProps } from '../../CheckboxGroup/types'

export interface IProps {
  size?: 'small' | 'normal' | 'large';
  disabled?: boolean;
  autofocus?: boolean;
  modelValue?: boolean;
  indeterminate?: boolean;
}

export type UseClasses = (classNamePrefix: string, props: IProps, checkGroupProps?: ComputedRef<ProvideProps>) => ComputedRef<Classes>;

interface UserInjectReturn {
  checkGroupProps: ComputedRef<ProvideProps> | undefined;
  checkGroupMethods: Record<string, (value: number | string | boolean) => void> | undefined;
}

export type UseInject = () => UserInjectReturn;
