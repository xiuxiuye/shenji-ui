export enum MenuModes {
  horizontal = 'horizontal',
  vertical = 'vertical',
  inline = 'inline'
}

export type MenuMode = keyof typeof MenuModes

type Theme = 'light' | 'dark';

export interface Props {
  mode?: MenuMode;
  activeItem?: string;
  expandedSubMenus?: string[];
  theme?: Theme;
  accordion?: boolean
}

export interface Provider {
  theme: Theme | undefined;
  mode: MenuMode;
  popupMenu: boolean;
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
