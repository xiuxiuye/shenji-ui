export interface Props {
  colSpan?: number | string | [number | string, number | string];
  rowSpan?: number | string | [number | string, number | string];
  justify?: 'start' | 'end' | 'center' | 'stretch';
  align?: 'start' | 'end' | 'center' | 'stretch';
}
