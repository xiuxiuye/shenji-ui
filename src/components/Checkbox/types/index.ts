import type { ComputedRef, Classes, CommonSize } from 'src/types/global'
import type { Provider } from '../../CheckboxGroup/types'

export interface Props {
  size?: CommonSize;
  disabled?: boolean;
  autofocus?: boolean;
  modelValue?: boolean;
  indeterminate?: boolean;
}

export interface CheckboxRefExpose {
  focus: () => void;
  blur: () => void;
}

export type UseClasses = (classNamePrefix: string, props: Props, injecter?: ComputedRef<Provider>) => ComputedRef<Classes>;
