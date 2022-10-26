export interface Props {
  order?: number | string;
  grow?: boolean | number | string | undefined;
  shrink?: boolean | number | string | undefined;
  align?: 'auto' | 'start' | 'end' | 'center' | 'baseline' | 'stretch';
}
