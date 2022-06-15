import { ComputedRef, StyleValue } from 'src/types/global'

export interface IProps {
  dashed?: boolean;
  text?: string;
  placement?: 'left' | 'right' | 'center';
  vertical?: boolean;
  offset?: string | number;
}

export type UseStyles = (hasText: ComputedRef<boolean>, props: IProps) => ComputedRef<StyleValue>;
