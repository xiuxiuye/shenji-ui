import { Ref, ComputedRef, StyleValue, App } from 'vue'

export type { Ref, ComputedRef, StyleValue }

export type Classes = Array<string | Record<string, unknown>>;

export type UseClassesComputed<IProps> = (classNamePrefix: string, props: IProps) => ComputedRef<Classes>;

export type UseStylesComputed<IProps> = (props: IProps) => ComputedRef<StyleValue>;

export interface IComponent {
  install: (app: App) => void;
  [preopName: string]: any;
}
