import { Message } from './message'
import { render, createVNode, ref } from 'vue'
import MessageComponent from './Message.vue'
import { Ref } from 'src/types/global'
import isString from 'src/utils/isString'
import { MessagePlacements } from './types'
import type { RemoveMessage, RemoveAllMessage, AddMessage, CreateMessageId, CreateMessage, MessagePlacement } from './types'

let idCounter = 1
const messageQueue: Ref<Set<Message>> = ref(new Set())

const placement = ref<MessagePlacement>(MessagePlacements.top)

/**
 * 移除消息队列中的指定Message
 */
export const removeMessage: RemoveMessage = (message) => {
  messageQueue?.value.delete(message)
}
/**
 * 清空消息队列
 */
export const removeAllMessage: RemoveAllMessage = () => {
  messageQueue?.value.forEach(message => message.destroyed())
}
/**
 * 消息队列中新增Message
 */
export const addMessage: AddMessage = (message) => {
  messageQueue?.value.add(message)
}

/**
 * 创建Message的唯一标识
 */
export const createMessageId: CreateMessageId = () => {
  return `sj-message-${idCounter++}-${+new Date()}`
}
/**
* 新建Message
*/
export const createMessage: CreateMessage = (options) => {
  if (options?.placement && isString(options?.placement)) {
    placement.value = options?.placement
  }

  const {
    closable = false,
    duration = 3,
    icon = null,
    iconColor = '',
    showIcon = true,
    content = '',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onClose = () => {}
  } = options
  const id = createMessageId()
  const message = new Message({
    id,
    closable,
    duration,
    icon,
    iconColor,
    showIcon,
    content,
    onClose
  })
  addMessage(message)
  return { destroyed: message?.destroyed }
}

render(createVNode(MessageComponent, { data: messageQueue?.value, placement: placement }), document.body)
