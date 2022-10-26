import type { ComputedRef, StyleValue } from 'src/types/global'

export interface Props {
  dashed?: boolean;
  text?: string;
  placement?: 'left' | 'right' | 'center';
  vertical?: boolean;
  offset?: string | number;
}

export type UseStyles = (hasText: ComputedRef<boolean>, props: Props) => ComputedRef<StyleValue>;
