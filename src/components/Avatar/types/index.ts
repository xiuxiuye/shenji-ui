export interface IProps {
  size?: 'normal' | 'large' | 'small' | number | string;
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
