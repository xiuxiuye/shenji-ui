import type { App } from 'vue'
import MessageProvider from './provider'
import './styles'

export default {
  install: (app: App) => {
    app.config.globalProperties.$message = MessageProvider
  },
  ...MessageProvider
}
