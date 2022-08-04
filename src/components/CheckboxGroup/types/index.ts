export interface IProps {
  size?: 'small' | 'normal' | 'large';
  disabled?: boolean;
  modelValue?: Array<number | string | boolean>;
  vertical?: boolean;
}

export type ProvideProps = Pick<IProps, 'size' | 'disabled' | 'modelValue'> | undefined;

export type UseProvide = (props: IProps, methods: Record<string, (value: number | string | boolean) => void>) => void;
