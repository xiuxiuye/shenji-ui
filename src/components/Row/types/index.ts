type NumOrStr = number | string;

export type GutterArrayValue = [NumOrStr, NumOrStr];

export type BaseType = NumOrStr | GutterArrayValue;

export interface Gutter {
  xs?: BaseType;
  sm?: BaseType;
  md?: BaseType;
  lg?: BaseType;
  xl?: BaseType;
  xxl?: BaseType;
  xxxl?: BaseType;
}

export interface Props {
  gutter?: BaseType | Gutter;
}
