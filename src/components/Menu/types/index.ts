export interface Props {
  mode?: 'horizontal' | 'vertical' | 'inline';
  activeKey?: string;
  expandedKeys?: string[];
  theme?: 'light' | 'dark';
  accordion?: boolean
}
