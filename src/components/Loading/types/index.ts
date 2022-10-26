import type { ComputedRef, Classes } from 'src/types/global'

export interface Props {
  tips?: string;
  size?: 'small' | 'normal' | 'large' | number | string;
  visible?: boolean;
  fit?: boolean;
}

export type UseClasses = (classNamePrefix: string, isMaskExist: ComputedRef<boolean>, props: Props) => ComputedRef<Classes>;

export type UseContentClasses = (classNamePrefix: string, isMaskVisible: ComputedRef<boolean>) => ComputedRef<Classes>;
