import type { CommonSize } from 'src/types/global'

export interface Props {
  size?: CommonSize;
  disabled?: boolean;
  modelValue?: Array<number | string | boolean>;
  vertical?: boolean;
}

export type Provider = {
  size?: CommonSize;
  disabled: boolean;
  modelValue: Array<number | string | boolean>;
  addChecked: (value: number | string | boolean) => void;
  removeChecked: (value: number | string | boolean) => void;
}
