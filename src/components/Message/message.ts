import isFunction from 'src/utils/isFunction'
import { removeMessage } from './queue'
import type { IMessage, IMessageConstructorOptions } from './types'

export class Message implements IMessage {
  id: string
  closable: boolean
  icon: string | null
  iconColor: string
  showIcon: boolean
  timer: NodeJS.Timer | null
  content: () => unknown
  onClose: () => void

  constructor (options: IMessageConstructorOptions) {
    const { id, closable, icon, iconColor, duration, showIcon, content, onClose } = options

    this.id = id
    this.closable = closable
    this.icon = icon
    this.iconColor = iconColor
    this.showIcon = showIcon
    this.content = (isFunction(content) ? content : () => content) as (() => unknown)
    this.onClose = onClose

    /**
     * 初始化定时器
     */
    if (duration <= 0) {
      this.timer = null
    } else {
      this.timer = setTimeout(() => {
        this.remove()
      }, duration * 1000)
    }
  }

  remove () {
    /**
     * 清理定时器
     */
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
    /**
     * 从渲染队列中移除对应的message实例
     */
    removeMessage(this)
  }

  destroyed () {
    this.remove()
  }
}
