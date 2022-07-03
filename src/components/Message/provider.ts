import { createMessage, removeAllMessage } from './queue'
import isObject from 'src/utils/isObject'
import isString from 'src/utils/isString'
import type { IMessageProvider, ICreateOptions, HandleCreatingMessage } from './types'

const handleCreatingMessage: HandleCreatingMessage = (options, icon, iconColor) => {
  let tempOptions: ICreateOptions
  if (!isObject(options)) {
    tempOptions = {
      content: String(options)
    }
  } else {
    tempOptions = options as ICreateOptions
  }

  if (isString(icon) && icon) tempOptions.icon = icon

  if (isString(iconColor) && iconColor) tempOptions.iconColor = iconColor

  return createMessage(tempOptions)
}

const provider: Readonly<IMessageProvider> = {
  create (options) {
    return handleCreatingMessage(options)
  },
  info (options) {
    return handleCreatingMessage(options, 'info-circle-fill', 'var(--sj-primary-color)')
  },
  success (options) {
    return handleCreatingMessage(options, 'check-circle-fill', 'var(--sj-success-color)')
  },
  error (options) {
    return handleCreatingMessage(options, 'close-circle-fill', 'var(--sj-error-color)')
  },
  warning (options) {
    return handleCreatingMessage(options, 'warning-circle-fill', 'var(--sj-warning-color)')
  },
  loading (options) {
    return handleCreatingMessage(options, 'loading-a', 'var(--sj-primary-color)')
  },
  destroyAll () {
    removeAllMessage()
  }
}

export default provider
