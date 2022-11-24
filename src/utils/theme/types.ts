type DefaultColor = 'red' | 'volcano' | 'gold' | 'yellow' | 'lime' | 'green' | 'cyan' | 'blue' | 'geekblue' | 'purple' | 'magenta' | 'grey';

export enum ThemeMode {
  Light = 'light',
  Dark = 'dark'
}

export interface ThemeColorVars {
  current: Record<string, string>;
  [ThemeMode.Light]: Record<string, string>;
  [ThemeMode.Dark]: Record<string, string>;
}

export interface Options {
  mode?: ThemeMode;
  backgroundColor?: string;
}

export interface Color {
  primary: string;
  info: string;
  success: string;
  error: string;
  warning: string;
}

export type SetTheme = (color?: Color | string, options?: Options) => void;

export type Generate = (color: string, options: Options) => string[] | null;

export type Create = (color?: string, options?: Options) => void;

export type SetColorVar = (name: string, value: string) => void;

export type InitSubColorVars = (options?: Options) => void;
