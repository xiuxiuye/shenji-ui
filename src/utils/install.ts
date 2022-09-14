import * as Components from '../components'
import type { App } from 'vue'

const install: (app: App) => void = (app) => {
  Object.keys(Components).forEach((key) => {
    const component = Components[key]
    component.install(app)
  })
}

export default install
