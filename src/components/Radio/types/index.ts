import type { ComputedRef, Classes, CommonSize } from 'src/types/global'
import type { Provider } from '../../RadioGroup/types'

export interface Props {
  size?: CommonSize;
  disabled?: boolean;
  autofocus?: boolean;
  modelValue?: boolean;
  name?: string;
  value?: string | number;
}

export interface RadioRefExpose {
  focus: () => void;
  blur: () => void;
}

export type UseClasses = (classNamePrefix: string, props: Props, injecter?: ComputedRef<Provider>) => ComputedRef<Classes>;
