import type { Ref, ComputedRef, StyleValue, Plugin, Slots, Component } from 'vue'

export type { Ref, ComputedRef, StyleValue, Slots }

export type Classes = Array<string | Record<string, boolean | undefined>>;

export type UseClasses<IProps> = (classNamePrefix: string, props: IProps) => ComputedRef<Classes>;

export type UseStyles<IProps> = (props: IProps) => ComputedRef<StyleValue>;

export type ISJComponent = Plugin & Component;

export type CommonSize = 'small' | 'normal' | 'large';

export type CommonFormStatus = 'success' | 'error' | 'warning';

export type CommonFormBorderType = 'none' | 'line' | 'block';
