export interface IProps {
  closable?: boolean;
  closeIcon?: string;
  size?: 'small' | 'normal' | 'large' | number | string;
  visible?: boolean;
  color?: string;
  textColor?: string;
  icon?: string;
  bordered?: boolean;
  borderColor?: string;
  type?: 'normal' | 'info' | 'success' | 'error' | 'warning';
  disabled?: boolean;
  round?: boolean;
}
