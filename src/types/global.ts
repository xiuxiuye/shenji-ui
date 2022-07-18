import { Ref, ComputedRef, StyleValue, Plugin, Slots } from 'vue'

export type { Ref, ComputedRef, StyleValue, Slots }

export type Classes = Array<string | Record<string, unknown>>;

export type UseClasses<IProps> = (classNamePrefix: string, props: IProps) => ComputedRef<Classes>;

export type UseStyles<IProps> = (props: IProps) => ComputedRef<StyleValue>;

export type ISJComponent = Plugin & Record<string, unknown>;
