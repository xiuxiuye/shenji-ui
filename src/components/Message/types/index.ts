import { VNode } from 'vue'
import type { Message } from '../message'

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

export interface IMessage {
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

export interface ICreateOptions {
  closable?: boolean;
  duration?: number;
  placement?: MessagePlacement;
  icon?: string | null;
  iconColor?: string;
  showIcon?: boolean;
  content?: string | VNode | (() => VNode);
  onClose?: () => void;
}

export interface IMessageConstructorOptions extends Required<Omit<ICreateOptions, 'placement'>> {
  id: string;
}

export type RemoveMessage = (message: Message) => void;

export type RemoveAllMessage = () => void;

export type AddMessage = (message: Message) => void;

export type CreateMessageId = () => string;

export type CreateMessage = (options: ICreateOptions) => Pick<IMessage, 'destroyed'>;

export type HandleCreatingMessage = (options: ICreateOptions | string, icon?: string, iconColor?: string) => Pick<IMessage, 'destroyed'>;

export type Create = CreateMessage;

export type Info = (options: Omit<ICreateOptions, 'icon' | 'iconColor'> | string) => Pick<IMessage, 'destroyed'>;

export type Success = Info;

export type Error = Info;

export type Warning = Info;

export type Loading = Info;

export interface IMessageProvider {
  create: Create;
  info: Info;
  error: Error;
  success: Success;
  warning: Warning;
  loading: Loading;
  destroyAll: () => void;
}
