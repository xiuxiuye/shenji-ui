import * as Components from '../components'
import type { App } from 'vue'
import type { SJComponent } from 'src/types/global'

const install: (app: App) => void = (app) => {
  const keys = Object.keys(Components) as Array<keyof typeof Components>
  keys.forEach((key) => {
    const component = Components[key] as SJComponent
    if (component?.install) {
      component?.install(app)
    }
  })
}

export default install
