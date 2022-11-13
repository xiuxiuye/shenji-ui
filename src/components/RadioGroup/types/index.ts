import type { CommonSize } from 'src/types/global'

export interface Props {
  size?: CommonSize;
  disabled?: boolean;
  modelValue?: string | number;
  vertical?: boolean;
  name?: string;
}

export interface Provider {
  size?: CommonSize;
  disabled: boolean;
  name?: string;
  realValue: string | number;
  updateRadioGroupValue: (value: string | number) => void;
}
