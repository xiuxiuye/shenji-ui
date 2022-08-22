import { Ref, CommonSize } from 'src/types/global'

export interface IProps {
  size?: CommonSize;
  disabled?: boolean;
  modelValue?: string | number;
  vertical?: boolean;
  name?: string;
}

interface IProvideProps extends Omit<IProps, 'vertical' | 'modelValue'> {
  realValue: string | number;
}

export type ProvideProps = IProvideProps | undefined;

export interface IProvideMethods {
  updateRadioGroupValue: (value: string | number) => void;
}

export type UseProvide = (realValue: Ref<string | number>, props: IProps, methods: IProvideMethods) => void;
