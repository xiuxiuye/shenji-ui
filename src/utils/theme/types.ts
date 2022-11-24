type DefaultColor = 'red' | 'volcano' | 'gold' | 'yellow' | 'lime' | 'green' | 'cyan' | 'blue' | 'geekblue' | 'purple' | 'magenta' | 'grey';

export enum ThemeMode {
  light = 'light',
  dark = 'dark'
}

export interface ThemeColorVars {
  current: Record<string, string>;
  [ThemeMode.light]: Record<string, string>;
  [ThemeMode.dark]: Record<string, string>;
}

export type Mode = keyof typeof ThemeMode

export interface Options {
  mode?: Mode;
  backgroundColor?: string;
}

export interface Color {
  primary: string;
  info: string;
  success: string;
  error: string;
  warning: string;
}

interface SetThemeOptions extends Options {
  color?: Color | string;
}

export type SetTheme = (options?: SetThemeOptions) => void;

export type Generate = (color: string, options: Options) => string[] | null;

export type Create = (color?: string, options?: Options) => void;

export type SetColorVar = (name: string, value: string) => void;

export type InitSubColorVars = (options?: Options) => void;
