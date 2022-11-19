export interface Props {
  mode?: 'horizontal' | 'vertical' | 'inline';
  activeItem?: string;
  expandedSubMenus?: string[];
  theme?: 'light' | 'dark';
  accordion?: boolean
}

export interface Provider {
  basePaddingLeft: number;
  activeItem: string;
  expandedSubMenus: string[];
  updateActiveItem: (symbol: string) => void;
  updateExpandedSubMenus: (symbol: string) => void;
}
