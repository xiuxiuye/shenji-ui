export interface Options {
  mode?: 'light' | 'dark';
  backgroundColor?: string;
}

export type Generate = (color?: string, options?: Options) => string[];

export type Create = (color?: string, options?: Options) => void;

export type SetColorVar = (prop: string, value: string) => void;

export type InitSubColorVars = (options?: Options) => void;
