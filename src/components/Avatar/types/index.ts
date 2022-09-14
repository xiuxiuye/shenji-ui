import type { CommonSize } from 'src/types/global'

export interface IProps {
  size?: CommonSize | number | string;
  icon?: string;
  bordered?: boolean;
  borderColor?: string;
  color?: string;
  src?: string;
  alt?: string;
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
  fallbackSrc?: string;
  shape?: 'circle' | 'square';
}
