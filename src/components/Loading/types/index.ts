import { ComputedRef, Classes } from 'src/types/global'

export interface IProps {
  tips?: string;
  size?: 'small' | 'normal' | 'large' | number | string;
  visible?: boolean;
  fit?: boolean;
}

export type UseClasses = (classNamePrefix: string, isMaskExist: ComputedRef<boolean>, props: IProps) => ComputedRef<Classes>;

export type UseContentClasses = (classNamePrefix: string, isMaskVisible: ComputedRef<boolean>) => ComputedRef<Classes>;
