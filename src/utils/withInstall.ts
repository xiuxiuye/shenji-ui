import type { App, Component } from 'vue'
import './theme'
import registerVueComponent from 'src/utils/registerVueComponent'
import type { SJComponent } from 'src/types/global'

type WithInstall = (component: Component) => SJComponent

const withInstall: WithInstall = (component) => {
  return {
    install: (app: App) => {
      registerVueComponent(app, component)
    },
    ...component
  }
}

export default withInstall
