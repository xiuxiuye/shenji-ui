import type { Ref, ComputedRef, StyleValue, Plugin, Slots, Component, VNode } from 'vue'

export type { Ref, ComputedRef, StyleValue, Slots, VNode }

export type Classes = Array<string | Record<string, boolean | undefined>>;

export type UseClasses<Props> = (classNamePrefix: string, props: Props) => ComputedRef<Classes>;

export type UseStyles<Props> = (props: Props) => ComputedRef<StyleValue>;

export type SJComponent = Plugin & Component;

export type CommonSize = 'small' | 'normal' | 'large';

export type CommonFormStatus = 'success' | 'error' | 'warning';

export type CommonFormBorderType = 'none' | 'line' | 'block';
