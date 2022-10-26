import { VNode } from 'vue'
import type { DefaultMessage } from '../message'

export enum MessagePlacements {
  'top' = 'top',
  'top-left' = 'top-left',
  'left-top' = 'left-top',
  'top-right' = 'top-right',
  'right-top' = 'right-top',
  'bottom' = 'bottom',
  'bottom-left' = 'bottom-left',
  'left-bottom' = 'left-bottom',
  'bottom-right' = 'bottom-right',
  'right-bottom' = 'right-bottom',
}

export type MessagePlacement = keyof typeof MessagePlacements;

export interface Message {
  id: string;
  closable: boolean;
  icon: string | null;
  iconColor: string;
  showIcon: boolean;
  timer: NodeJS.Timer | null;
  content: () => unknown;
  destroyed: () => void;
  remove: () => void;
  onClose: () => void;
}

export interface OriginCreateOptions {
  closable?: boolean;
  duration?: number;
  placement?: MessagePlacement;
  icon?: string | null;
  iconColor?: string;
  showIcon?: boolean;
  content?: string | VNode | (() => VNode);
  onClose?: () => void;
}

export interface MessageConstructorOptions extends Required<Omit<OriginCreateOptions, 'placement'>> {
  id: string;
}

export type RemoveMessage = (message: DefaultMessage) => void;

export type RemoveAllMessage = () => void;

export type AddMessage = (message: DefaultMessage) => void;

export type CreateMessageId = () => string;

type CreateMethod<T> = (options: T) => Pick<Message, 'destroyed'>;

export type CreateMessage = CreateMethod<OriginCreateOptions>;

export type CreateOptions = OriginCreateOptions | string;

export type HandleCreatingMessage = (options: CreateOptions, icon?: string, iconColor?: string) => Pick<Message, 'destroyed'>;

export type Create = CreateMethod<CreateOptions>;

export type InfoOptions = Omit<OriginCreateOptions, 'icon' | 'iconColor'> | string;

export type Info = CreateMethod<InfoOptions>;

export type SuccessOptions = InfoOptions;

export type Success = CreateMethod<SuccessOptions>;

export type ErrorOptions = InfoOptions;

export type Error = CreateMethod<ErrorOptions>;

export type WarningOptions = InfoOptions;

export type Warning = CreateMethod<WarningOptions>;

export type LoadingOptions = InfoOptions;

export type Loading = CreateMethod<LoadingOptions>;

export interface MessageProvider {
  create: Create;
  info: Info;
  error: Error;
  success: Success;
  warning: Warning;
  loading: Loading;
  destroyAll: () => void;
}
