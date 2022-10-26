import type { Ref, CommonSize } from 'src/types/global'

export interface Props {
  size?: CommonSize;
  disabled?: boolean;
  modelValue?: string | number;
  vertical?: boolean;
  name?: string;
}

export type Provider = {
  size?: CommonSize;
  disabled: boolean;
  name?: string;
  realValue: string | number;
  updateRadioGroupValue: (value: string | number) => void;
}
