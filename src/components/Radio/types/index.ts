import type { ComputedRef, Classes } from 'src/types/global'
import type { ProvideProps, IProvideMethods } from '../../RadioGroup/types'

export interface IProps {
  size?: 'small' | 'normal' | 'large';
  disabled?: boolean;
  autofocus?: boolean;
  modelValue?: boolean;
  name?: string;
  value?: string | number;
}

export type UseClasses = (classNamePrefix: string, props: IProps, radioGroupProps?: ComputedRef<ProvideProps>) => ComputedRef<Classes>;

interface UserInjectReturn {
  radioGroupProps: ComputedRef<ProvideProps> | undefined;
  radioGroupMethods: IProvideMethods | undefined;
}

export type UseInject = () => UserInjectReturn;
