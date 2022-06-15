import { ComputedRef, Classes } from 'src/types/global'

export interface IProps {
  tip?: string;
  size?: 'small' | 'normal' | 'large' | number | string;
  visible?: boolean;
}

export type UseAnimationClasses = (classNamePrefix: string, isMaskExist: boolean) => ComputedRef<Classes>;
