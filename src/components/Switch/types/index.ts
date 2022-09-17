import type { CommonSize } from 'src/types/global'

export interface IProps {
  size?: CommonSize;
  disabled?: boolean;
  autofocus?: boolean;
  modelValue?: boolean | number | string;
  loading?: boolean;
  round?: boolean;
  icon?: string;
  checkedValue?: boolean | number | string;
  uncheckedValue?: boolean | number | string;
  rubberBand?: boolean;
}
