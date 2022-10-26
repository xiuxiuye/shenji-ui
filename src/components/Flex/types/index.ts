export interface Props {
  justify?: 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  wrap?: boolean | undefined;
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
}
