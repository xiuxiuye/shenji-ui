export interface Props {
  mode?: 'horizontal' | 'vertical' | 'inline';
  activeItem?: string;
  expandedSubMenus?: string[];
  theme?: 'light' | 'dark';
  accordion?: boolean
}

export interface Provider {
  accordion: boolean;
  menuLevel: number;
  basePaddingLeft: number;
  activeItem: string;
  activeSubMenus: string[];
  expandedSubMenus: string[];
  updateActiveItem: (symbol: string) => void;
  updateActiveSubMenus: (symbols: string[]) => void;
  updateExpandedSubMenus: (symbols: string | string[]) => void;
}
