import type { App } from 'vue'
import MessageProvider from './provider'
import './styles'

export type {
  CreateOptions,
  InfoOptions,
  SuccessOptions,
  ErrorOptions,
  WarningOptions,
  LoadingOptions
} from './types'

export default {
  install: (app: App) => {
    app.config.globalProperties.$message = MessageProvider
  },
  ...MessageProvider
}
