
import type { ScreenSize } from 'src/utils/hooks/useScreenResize'
import type { Ref, ComputedRef, StyleValue } from 'src/types/global'

export interface BaseProps {
  order?: number | string;
  span?: number | string;
  offset?: number | string;
  push?: number | string;
  pull?: number | string;
}

export type SizeProp = number | string | BaseProps;

export interface Props extends BaseProps {
  xs?: SizeProp
  sm?: SizeProp
  md?: SizeProp
  lg?: SizeProp
  xl?: SizeProp
  xxl?: SizeProp
  xxxl?: SizeProp
}

export type UseStyles = (size: Ref<ScreenSize> | null, offset: ComputedRef<[number, number]>, props: Props) => ComputedRef<StyleValue>;
